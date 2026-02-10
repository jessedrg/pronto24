import { NextRequest, NextResponse } from "next/server"
import { getSQL, queryWithRetry } from "@/lib/db"
import {
  generatePageContent,
  saveGeneratedContent,
  buildGenerationQueue,
} from "@/lib/ai-content-generator"

// Max duration: 300s on Pro plan (Vercel max for Pro)
export const maxDuration = 300

const CRON_SECRET = process.env.CRON_SECRET

// --- TURBO CONFIG ---
const CONCURRENCY = 5
const ROUND_DELAY = 300
const MAX_RETRIES = 2
const TIME_SAFETY_MARGIN = 30

// Parallel execution with concurrency limit
async function processInParallel<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number,
  delayBetweenRounds: number
): Promise<Array<{ item: T; result?: R; error?: string }>> {
  const results: Array<{ item: T; result?: R; error?: string }> = []

  for (let i = 0; i < items.length; i += concurrency) {
    const chunk = items.slice(i, i + concurrency)

    const chunkResults = await Promise.allSettled(
      chunk.map(async (item) => {
        const result = await fn(item)
        return { item, result }
      })
    )

    for (let j = 0; j < chunkResults.length; j++) {
      const cr = chunkResults[j]
      if (cr.status === "fulfilled") {
        results.push(cr.value)
      } else {
        results.push({
          item: chunk[j],
          error: cr.reason instanceof Error ? cr.reason.message : String(cr.reason),
        })
      }
    }

    if (i + concurrency < items.length) {
      await new Promise((r) => setTimeout(r, delayBetweenRounds))
    }
  }

  return results
}

// Get pages that haven't been generated yet (no seeding needed)
async function getPendingPages(limit: number) {
  const sql = getSQL()

  // 1. Build full queue in memory
  const fullQueue = await buildGenerationQueue()

  // 2. Get all already-generated page keys from DB
  const existing = await queryWithRetry(async () => {
    return await sql`
      SELECT profession_id, city_slug, COALESCE(problem_id, '') as problem_id
      FROM page_content
      WHERE ai_status = 'generated'
    `
  })

  // 3. Build a Set of existing keys for fast lookup
  const existingKeys = new Set(
    existing.map(
      (r: Record<string, string>) => `${r.profession_id}|${r.city_slug}|${r.problem_id || ""}`
    )
  )

  // 4. Filter out already-generated pages
  const pending = fullQueue.filter((item) => {
    const key = `${item.professionId}|${item.citySlug}|${item.problemId || ""}`
    return !existingKeys.has(key)
  })

  console.log(`[CRON] Total: ${fullQueue.length} | Generated: ${existingKeys.size} | Pending: ${pending.length}`)

  return { pending: pending.slice(0, limit), totalPending: pending.length, totalPages: fullQueue.length }
}

// Process a single page: generate AI content and save directly to DB
async function processPage(item: {
  professionId: string
  citySlug: string
  pageType: "city" | "problem"
  problemId?: string
}): Promise<{ wordCount: number }> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const content = await generatePageContent(
        item.professionId,
        item.citySlug,
        item.pageType,
        { problemId: item.problemId }
      )

      await saveGeneratedContent(
        item.professionId,
        item.citySlug,
        content,
        item.pageType,
        { problemId: item.problemId }
      )

      return { wordCount: content.wordCount }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, attempt * 1000))
      }
    }
  }

  throw lastError || new Error("Unknown error after retries")
}

async function logRun(
  totalProcessed: number,
  totalSuccess: number,
  totalErrors: number,
  durationMs: number
) {
  const sql = getSQL()
  try {
    await sql`
      INSERT INTO ai_generation_runs (
        batch_size, pages_processed, pages_success, pages_error,
        duration_ms, status
      ) VALUES (
        ${totalProcessed}, ${totalProcessed}, ${totalSuccess}, ${totalErrors},
        ${durationMs}, 'completed'
      )
    `
  } catch (err) {
    console.error("[CRON] Failed to log run:", err)
  }
}

function getBaseUrl() {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return "http://localhost:3000"
}

async function selfChain() {
  try {
    const url = `${getBaseUrl()}/api/cron/generate-content`
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (CRON_SECRET) headers["Authorization"] = `Bearer ${CRON_SECRET}`

    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ chained: true }),
    }).catch(() => {})
    console.log("[CRON] Self-chained next batch")
  } catch {
    console.log("[CRON] Self-chain failed, cron will retry in 5 min")
  }
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const startTime = Date.now()
  let totalSuccess = 0
  let totalErrors = 0

  console.log("[CRON] === AI Content Generation Started ===")

  try {
    // Loop: keep processing batches until we run out of time
    while (true) {
      const elapsed = (Date.now() - startTime) / 1000
      if (elapsed > maxDuration - TIME_SAFETY_MARGIN) {
        console.log(`[CRON] Time limit approaching (${Math.round(elapsed)}s), stopping.`)
        break
      }

      // Get next batch of pending pages (no seeding, direct from queue)
      const { pending, totalPending, totalPages } = await getPendingPages(CONCURRENCY)

      if (pending.length === 0) {
        console.log("[CRON] ALL PAGES GENERATED! Nothing left to do.")
        await logRun(totalSuccess + totalErrors, totalSuccess, totalErrors, Date.now() - startTime)
        return NextResponse.json({
          status: "complete",
          message: `All ${totalPages} pages have been generated`,
          processed: { success: totalSuccess, errors: totalErrors },
        })
      }

      console.log(`[CRON] Processing ${pending.length} pages... (${totalPending} remaining of ${totalPages})`)

      // Process batch in parallel
      const results = await processInParallel(
        pending,
        async (item) => {
          const label = `${item.professionId}/${item.citySlug}${item.problemId ? `/${item.problemId}` : ""}`
          console.log(`[CRON] Generating: ${label}`)
          return await processPage(item)
        },
        CONCURRENCY,
        ROUND_DELAY
      )

      for (const r of results) {
        if (r.error) {
          console.error(`[CRON] Error: ${r.item.professionId}/${r.item.citySlug}: ${r.error}`)
          totalErrors++
        } else {
          totalSuccess++
        }
      }

      const pps = (totalSuccess / ((Date.now() - startTime) / 1000)).toFixed(1)
      console.log(`[CRON] Running total: ${totalSuccess} ok, ${totalErrors} errors (${pps} pages/s)`)
    }

    // Time ran out but pages remain - log and self-chain
    const durationMs = Date.now() - startTime
    await logRun(totalSuccess + totalErrors, totalSuccess, totalErrors, durationMs)

    const { totalPending } = await getPendingPages(1)
    if (totalPending > 0) {
      console.log(`[CRON] ${totalPending} pages remaining, self-chaining...`)
      await selfChain()
    }

    return NextResponse.json({
      status: totalPending > 0 ? "in_progress" : "complete",
      processed: { success: totalSuccess, errors: totalErrors },
      remaining: totalPending,
      durationMs,
      selfChained: totalPending > 0,
    })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error"
    console.error("[CRON] Fatal error:", errorMsg)
    return NextResponse.json(
      { error: "Generation failed", details: errorMsg },
      { status: 500 }
    )
  }
}

// GET endpoint for Vercel Cron
export async function GET(request: NextRequest) {
  return POST(request)
}
