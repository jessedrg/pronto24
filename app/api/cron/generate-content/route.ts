import { NextRequest, NextResponse } from "next/server"
import { getSQL, queryWithRetry } from "@/lib/db"
import {
  generatePageContent,
  saveGeneratedContent,
  buildGenerationQueue,
  getGenerationStats,
} from "@/lib/ai-content-generator"

// Max duration: 300s on Pro plan (Vercel max for Pro)
export const maxDuration = 300

const CRON_SECRET = process.env.CRON_SECRET

// --- TURBO CONFIG ---
// Pages per invocation (total across all parallel batches)
const BATCH_SIZE = 50
// How many AI calls run at the same time
const CONCURRENCY = 5
// Delay between concurrent rounds (ms) - prevents rate limits
const ROUND_DELAY = 300
// Max retries for a single page
const MAX_RETRIES = 2
// Safety margin before function timeout (seconds)
const TIME_SAFETY_MARGIN = 30

// Parallel execution with concurrency limit
async function processInParallel<T, R>(
  items: T[],
  fn: (item: T) => Promise<R>,
  concurrency: number,
  delayBetweenRounds: number
): Promise<Array<{ item: T; result?: R; error?: string }>> {
  const results: Array<{ item: T; result?: R; error?: string }> = []

  // Process in chunks of `concurrency`
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

    // Small delay between rounds to avoid rate limits
    if (i + concurrency < items.length) {
      await new Promise((r) => setTimeout(r, delayBetweenRounds))
    }
  }

  return results
}

async function ensurePendingRowsExist() {
  const sql = getSQL()

  const countResult = await queryWithRetry(async () => {
    return await sql`SELECT COUNT(*) as cnt FROM page_content`
  })
  const existing = parseInt(countResult[0].cnt) || 0

  if (existing > 0) return existing

  // Seed all page combinations as pending rows - use batched inserts
  const queue = await buildGenerationQueue()
  let inserted = 0
  const SEED_BATCH = 100

  for (let i = 0; i < queue.length; i += SEED_BATCH) {
    const chunk = queue.slice(i, i + SEED_BATCH)
    const values = chunk.map((item) => {
      const pageUrl =
        item.pageType === "problem" && item.problemId
          ? `/problema/${item.professionId}/${item.problemId}/${item.citySlug}`
          : `/${item.professionId}/${item.citySlug}`
      return { ...item, pageUrl }
    })

    try {
      for (const v of values) {
        await sql`
          INSERT INTO page_content (profession_id, city_slug, problem_id, page_url, ai_status)
          VALUES (${v.professionId}, ${v.citySlug}, ${v.problemId || null}, ${v.pageUrl}, 'pending')
          ON CONFLICT (profession_id, city_slug, COALESCE(problem_id, ''), COALESCE(modifier, ''))
          DO NOTHING
        `
        inserted++
      }
    } catch (err) {
      console.error(`[CRON] Seed batch error at offset ${i}:`, err)
    }
  }

  console.log(`[CRON] Seeded ${inserted} pending rows`)
  return inserted
}

async function getNextBatch(batchSize: number) {
  const sql = getSQL()
  return await queryWithRetry(async () => {
    return await sql`
      SELECT id, profession_id, city_slug, problem_id, modifier, page_url
      FROM page_content
      WHERE ai_status = 'pending' OR ai_status = 'error'
      ORDER BY 
        CASE WHEN ai_status = 'pending' THEN 0 ELSE 1 END,
        id ASC
      LIMIT ${batchSize}
    `
  })
}

async function markStatus(id: number, status: string, errorMsg?: string) {
  const sql = getSQL()
  await queryWithRetry(async () => {
    await sql`
      UPDATE page_content 
      SET ai_status = ${status}, 
          ai_error_message = ${status === 'error' ? (errorMsg || null) : null},
          updated_at = NOW()
      WHERE id = ${id}
    `
  })
}

async function logRun(
  batchSize: number,
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
        ${batchSize}, ${totalProcessed}, ${totalSuccess}, ${totalErrors},
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

    // Fire and forget
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

// Process a single page with retries
async function processPage(row: Record<string, unknown>): Promise<{ wordCount: number }> {
  const pageType = row.problem_id ? "problem" : "city"
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const content = await generatePageContent(
        row.profession_id as string,
        row.city_slug as string,
        pageType as "city" | "problem",
        {
          problemId: (row.problem_id as string) || undefined,
        }
      )

      await saveGeneratedContent(
        row.profession_id as string,
        row.city_slug as string,
        content,
        pageType as "city" | "problem",
        {
          problemId: (row.problem_id as string) || undefined,
          modifier: (row.modifier as string) || undefined,
        }
      )

      return { wordCount: content.wordCount }
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err))
      if (attempt < MAX_RETRIES) {
        // Exponential backoff: 1s, 2s
        await new Promise((r) => setTimeout(r, attempt * 1000))
      }
    }
  }

  throw lastError || new Error("Unknown error after retries")
}

export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("authorization")
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const startTime = Date.now()

  console.log("[CRON] === TURBO AI Content Generation Started ===")
  console.log(`[CRON] Config: batch=${BATCH_SIZE}, concurrency=${CONCURRENCY}, retries=${MAX_RETRIES}`)

  try {
    // 1. Ensure rows exist
    await ensurePendingRowsExist()

    // 2. Check progress
    const statsBefore = await getGenerationStats()
    console.log(
      `[CRON] Progress: ${statsBefore.generated}/${statsBefore.total} (${statsBefore.percentage}%) | Pending: ${statsBefore.pending} | Errors: ${statsBefore.errored}`
    )

    if (statsBefore.pending === 0 && statsBefore.errored === 0) {
      console.log("[CRON] ALL PAGES GENERATED! Nothing left to do.")
      return NextResponse.json({
        status: "complete",
        message: "All pages have been generated",
        stats: statsBefore,
      })
    }

    // 3. Get batch
    const batch = await getNextBatch(BATCH_SIZE)
    if (batch.length === 0) {
      return NextResponse.json({
        status: "complete",
        message: "No pages to process",
        stats: statsBefore,
      })
    }

    console.log(`[CRON] Processing ${batch.length} pages with concurrency=${CONCURRENCY}...`)

    // Mark all as generating
    await Promise.all(batch.map((row: Record<string, unknown>) => markStatus(row.id as number, "generating")))

    // 4. Process all pages in parallel with concurrency limit
    const results = await processInParallel(
      batch as Record<string, unknown>[],
      async (row) => {
        const label = `${row.profession_id}/${row.city_slug}${row.problem_id ? `/${row.problem_id}` : ""}`
        console.log(`[CRON] Generating: ${label}`)
        return await processPage(row)
      },
      CONCURRENCY,
      ROUND_DELAY
    )

    // 5. Tally results
    let successCount = 0
    let errorCount = 0
    let totalWords = 0

    for (const r of results) {
      const row = r.item as Record<string, unknown>
      if (r.error) {
        await markStatus(row.id as number, "error", r.error)
        errorCount++
      } else {
        successCount++
        totalWords += r.result?.wordCount || 0
      }
    }

    const durationMs = Date.now() - startTime
    const durationSec = Math.round(durationMs / 1000)
    const pagesPerSec = (successCount / (durationMs / 1000)).toFixed(2)

    // 6. Log run
    await logRun(BATCH_SIZE, batch.length, successCount, errorCount, durationMs)

    // 7. Updated stats
    const statsAfter = await getGenerationStats()
    console.log(
      `[CRON] Batch done: ${successCount} ok, ${errorCount} errors, ${totalWords} words in ${durationSec}s (${pagesPerSec} pages/s)`
    )
    console.log(
      `[CRON] Overall: ${statsAfter.generated}/${statsAfter.total} (${statsAfter.percentage}%) | ETA: ${
        statsAfter.pending > 0
          ? `~${Math.round(statsAfter.pending / (successCount / (durationMs / 1000)) / 3600)}h`
          : "done"
      }`
    )

    // 8. Self-chain if more remain and we still have time budget
    const hasMore = statsAfter.pending > 0 || statsAfter.errored > 0
    const elapsedSec = (Date.now() - startTime) / 1000
    const timeLeft = maxDuration - elapsedSec

    if (hasMore && timeLeft > TIME_SAFETY_MARGIN) {
      // We have time left in this invocation - keep going within the same function
      // With maxDuration=800 on Pro, we can process ~12 batches (600 pages) per invocation
      console.log(`[CRON] ${Math.round(timeLeft)}s left, continuing within invocation...`)

      let continueBatches = 0
      const maxContinueBatches = Math.floor(timeLeft / 50) // ~1 batch per 50s

      while (continueBatches < maxContinueBatches) {
        const nextBatch = await getNextBatch(BATCH_SIZE)
        if (nextBatch.length === 0) break

        await Promise.all(nextBatch.map((row: Record<string, unknown>) => markStatus(row.id as number, "generating")))

        const moreResults = await processInParallel(
          nextBatch as Record<string, unknown>[],
          async (row) => processPage(row),
          CONCURRENCY,
          ROUND_DELAY
        )

        for (const r of moreResults) {
          const row = r.item as Record<string, unknown>
          if (r.error) {
            await markStatus(row.id as number, "error", r.error)
            errorCount++
          } else {
            successCount++
          }
        }

        continueBatches++

        // Check if we're running low on time (respect maxDuration - safety margin)
        if ((Date.now() - startTime) / 1000 > (maxDuration - TIME_SAFETY_MARGIN)) break
      }

      // Log the extended run
      const totalDurationMs = Date.now() - startTime
      await logRun(BATCH_SIZE, successCount + errorCount, successCount, errorCount, totalDurationMs)
    }

    // Final stats
    const finalStats = await getGenerationStats()
    const finalHasMore = finalStats.pending > 0 || finalStats.errored > 0

    if (finalHasMore) {
      console.log(`[CRON] ${finalStats.pending} pages remaining, self-chaining...`)
      await selfChain()
    } else {
      console.log("[CRON] === ALL PAGES GENERATED! ===")
    }

    return NextResponse.json({
      status: finalHasMore ? "in_progress" : "complete",
      batch: {
        processed: successCount + errorCount,
        success: successCount,
        errors: errorCount,
        durationMs: Date.now() - startTime,
        pagesPerSecond: parseFloat(pagesPerSec),
      },
      stats: finalStats,
      selfChained: finalHasMore,
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
