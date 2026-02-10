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

// --- CONFIG ---
const BATCH_SIZE = 3 // pages processed concurrently per round
const MAX_RETRIES = 2
const TIME_SAFETY_MARGIN = 45 // seconds before deadline to stop accepting new work

// Build pending queue once: compute full queue, subtract already-generated keys
async function buildPendingQueue() {
  const sql = getSQL()

  const fullQueue = await buildGenerationQueue()

  const existing = await queryWithRetry(async () => {
    return await sql`
      SELECT profession_id, city_slug, COALESCE(problem_id, '') as problem_id
      FROM page_content
      WHERE ai_status = 'generated'
    `
  })

  const existingKeys = new Set(
    existing.map(
      (r: Record<string, string>) => `${r.profession_id}|${r.city_slug}|${r.problem_id || ""}`
    )
  )

  const pending = fullQueue.filter((item) => {
    const key = `${item.professionId}|${item.citySlug}|${item.problemId || ""}`
    return !existingKeys.has(key)
  })

  console.log(`[CRON] Queue built — Total: ${fullQueue.length} | Generated: ${existingKeys.size} | Pending: ${pending.length}`)

  return { pending, totalPages: fullQueue.length }
}

// Process a single page with retries
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

// Fire-and-forget: trigger a new invocation to continue processing remaining pages
function selfChain() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  const headers: Record<string, string> = { "Content-Type": "application/json" }
  if (CRON_SECRET) headers["Authorization"] = `Bearer ${CRON_SECRET}`

  fetch(`${baseUrl}/api/cron/generate-content`, {
    method: "POST",
    headers,
    body: JSON.stringify({ chained: true }),
  }).catch(() => {})

  console.log("[CRON] Self-chained next invocation")
}

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const startTime = Date.now()
  const deadline = startTime + (maxDuration - TIME_SAFETY_MARGIN) * 1000
  let totalSuccess = 0
  let totalErrors = 0

  console.log(`[CRON] === AI Content Generation Started ===`)
  console.log(`[CRON] Config: batch=${BATCH_SIZE}, retries=${MAX_RETRIES}, safetyMargin=${TIME_SAFETY_MARGIN}s`)

  try {
    // Build the pending queue ONCE at the start
    const { pending, totalPages } = await buildPendingQueue()

    if (pending.length === 0) {
      console.log("[CRON] ALL PAGES GENERATED! Nothing left to do.")
      await logRun(0, 0, 0, Date.now() - startTime)
      return NextResponse.json({
        status: "complete",
        message: `All ${totalPages} pages have been generated`,
        processed: { success: 0, errors: 0 },
      })
    }

    let cursor = 0

    // Process pages in batches until time runs out
    while (cursor < pending.length) {
      // Check time BEFORE starting a new batch
      if (Date.now() >= deadline) {
        console.log(`[CRON] Time limit approaching (${Math.round((Date.now() - startTime) / 1000)}s), stopping gracefully.`)
        break
      }

      const batch = pending.slice(cursor, cursor + BATCH_SIZE)
      cursor += batch.length

      console.log(`[CRON] Batch ${Math.ceil(cursor / BATCH_SIZE)}: processing ${batch.length} pages (${cursor}/${pending.length})`)

      const results = await Promise.allSettled(
        batch.map(async (item) => {
          const label = `${item.professionId}/${item.citySlug}${item.problemId ? `/${item.problemId}` : ""}`
          console.log(`[CRON] Generating: ${label}`)
          return processPage(item)
        })
      )

      for (let i = 0; i < results.length; i++) {
        const r = results[i]
        if (r.status === "fulfilled") {
          totalSuccess++
        } else {
          const item = batch[i]
          console.error(`[CRON] Error: ${item.professionId}/${item.citySlug}: ${r.reason}`)
          totalErrors++
        }
      }

      const elapsed = (Date.now() - startTime) / 1000
      const pps = elapsed > 0 ? (totalSuccess / elapsed).toFixed(1) : "0"
      console.log(`[CRON] Progress: ${totalSuccess} ok, ${totalErrors} errors (${pps} pages/s, ${Math.round(elapsed)}s elapsed)`)
    }

    const durationMs = Date.now() - startTime
    const remaining = pending.length - cursor
    await logRun(totalSuccess + totalErrors, totalSuccess, totalErrors, durationMs)

    // If pages remain, fire-and-forget a new invocation to keep going
    if (remaining > 0) {
      console.log(`[CRON] ${remaining} pages remaining, self-chaining...`)
      selfChain()
    }

    console.log(`[CRON] === Run complete: ${totalSuccess} generated, ${totalErrors} errors, ${remaining} remaining (${Math.round(durationMs / 1000)}s) ===`)

    return NextResponse.json({
      status: remaining > 0 ? "in_progress" : "complete",
      processed: { success: totalSuccess, errors: totalErrors },
      remaining,
      totalPages,
      durationMs,
      selfChained: remaining > 0,
    })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error"
    console.error("[CRON] Fatal error:", errorMsg)

    // Still try to log the partial run
    try {
      await logRun(totalSuccess + totalErrors, totalSuccess, totalErrors, Date.now() - startTime)
    } catch { /* ignore */ }

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
