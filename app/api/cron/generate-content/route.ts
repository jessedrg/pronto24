import { NextRequest, NextResponse } from "next/server"
import { getSQL, queryWithRetry } from "@/lib/db"
import {
  generatePageContent,
  saveGeneratedContent,
  buildGenerationQueue,
  getGenerationStats,
} from "@/lib/ai-content-generator"

// Max duration for Vercel serverless (300s on Pro, 60s on Hobby)
export const maxDuration = 300

// CRON_SECRET protects the endpoint
const CRON_SECRET = process.env.CRON_SECRET

// How many pages to generate per invocation before self-chaining
const BATCH_SIZE = 10
// Delay between generations to avoid rate limits (ms)
const INTER_GENERATION_DELAY = 2000

async function ensurePendingRowsExist() {
  const sql = getSQL()

  // Check if we already have rows seeded
  const countResult = await queryWithRetry(async () => {
    return await sql`SELECT COUNT(*) as cnt FROM page_content`
  })
  const existing = parseInt(countResult[0].cnt) || 0

  if (existing > 0) return existing

  // Seed all possible page combinations as pending rows
  const queue = buildGenerationQueue()
  let inserted = 0

  for (const item of queue) {
    const pageUrl =
      item.pageType === "problem" && item.problemId
        ? `/problema/${item.professionId}/${item.problemId}/${item.citySlug}`
        : `/${item.professionId}/${item.citySlug}`

    try {
      await queryWithRetry(async () => {
        await sql`
          INSERT INTO page_content (profession_id, city_slug, problem_id, page_url, ai_status)
          VALUES (${item.professionId}, ${item.citySlug}, ${item.problemId || null}, ${pageUrl}, 'pending')
          ON CONFLICT (profession_id, city_slug, COALESCE(problem_id, ''), COALESCE(modifier, ''))
          DO NOTHING
        `
      })
      inserted++
    } catch (err) {
      console.error(`[CRON] Failed to seed row: ${pageUrl}`, err)
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
  if (status === "error") {
    await queryWithRetry(async () => {
      await sql`
        UPDATE page_content 
        SET ai_status = ${status}, 
            ai_error_message = ${errorMsg || null},
            updated_at = NOW()
        WHERE id = ${id}
      `
    })
  } else if (status === "generating") {
    await queryWithRetry(async () => {
      await sql`
        UPDATE page_content 
        SET ai_status = 'generating', updated_at = NOW()
        WHERE id = ${id}
      `
    })
  }
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
        ${BATCH_SIZE}, ${totalProcessed}, ${totalSuccess}, ${totalErrors},
        ${durationMs}, 'completed'
      )
    `
  } catch (err) {
    console.error("[CRON] Failed to log run:", err)
  }
}

async function selfChain(baseUrl: string) {
  try {
    const url = `${baseUrl}/api/cron/generate-content`
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    if (CRON_SECRET) {
      headers["Authorization"] = `Bearer ${CRON_SECRET}`
    }
    // Fire and forget - don't await the response
    fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ chained: true }),
    }).catch(() => {
      // Ignore errors from self-chain
    })
    console.log("[CRON] Self-chained next batch")
  } catch {
    console.log("[CRON] Self-chain failed, will retry on next cron trigger")
  }
}

export async function POST(request: NextRequest) {
  // Auth check
  const authHeader = request.headers.get("authorization")
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const startTime = Date.now()
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"

  console.log("[CRON] === AI Content Generation Started ===")

  try {
    // 1. Ensure all pending rows exist in DB
    await ensurePendingRowsExist()

    // 2. Get stats before
    const statsBefore = await getGenerationStats()
    console.log(
      `[CRON] Progress: ${statsBefore.generated}/${statsBefore.total} (${statsBefore.percentage}%) | Pending: ${statsBefore.pending} | Errors: ${statsBefore.errored}`
    )

    // 3. If all done, stop
    if (statsBefore.pending === 0 && statsBefore.errored === 0) {
      console.log("[CRON] All pages generated! Nothing left to do.")
      return NextResponse.json({
        status: "complete",
        message: "All pages have been generated",
        stats: statsBefore,
      })
    }

    // 4. Get next batch
    const batch = await getNextBatch(BATCH_SIZE)
    if (batch.length === 0) {
      console.log("[CRON] No pages to process")
      return NextResponse.json({
        status: "complete",
        message: "No pages to process",
        stats: statsBefore,
      })
    }

    console.log(`[CRON] Processing batch of ${batch.length} pages...`)

    let successCount = 0
    let errorCount = 0

    // 5. Process each page in the batch
    for (const row of batch) {
      const pageLabel = `${row.profession_id}/${row.city_slug}${row.problem_id ? `/${row.problem_id}` : ""}`

      try {
        // Mark as generating
        await markStatus(row.id, "generating")

        console.log(`[CRON] Generating: ${pageLabel}`)

        const pageType = row.problem_id ? "problem" : "city"

        // Generate AI content
        const content = await generatePageContent(
          row.profession_id,
          row.city_slug,
          pageType as "city" | "problem",
          {
            problemId: row.problem_id || undefined,
          }
        )

        // Save to DB
        await saveGeneratedContent(
          row.profession_id,
          row.city_slug,
          content,
          pageType as "city" | "problem",
          {
            problemId: row.problem_id || undefined,
            modifier: row.modifier || undefined,
          }
        )

        console.log(
          `[CRON] SUCCESS: ${pageLabel} (${content.wordCount} words)`
        )
        successCount++

        // Delay between generations
        if (batch.indexOf(row) < batch.length - 1) {
          await new Promise((r) => setTimeout(r, INTER_GENERATION_DELAY))
        }
      } catch (err) {
        const errorMsg =
          err instanceof Error ? err.message : "Unknown error"
        console.error(`[CRON] ERROR: ${pageLabel} - ${errorMsg}`)
        await markStatus(row.id, "error", errorMsg)
        errorCount++

        // Shorter delay after error
        await new Promise((r) => setTimeout(r, 1000))
      }
    }

    const durationMs = Date.now() - startTime

    // 6. Log this run
    await logRun(batch.length, successCount, errorCount, durationMs)

    // 7. Get updated stats
    const statsAfter = await getGenerationStats()
    console.log(
      `[CRON] Batch complete: ${successCount} success, ${errorCount} errors in ${Math.round(durationMs / 1000)}s`
    )
    console.log(
      `[CRON] Overall: ${statsAfter.generated}/${statsAfter.total} (${statsAfter.percentage}%)`
    )

    // 8. Self-chain if there are more pages to process
    const hasMore = statsAfter.pending > 0 || statsAfter.errored > 0
    if (hasMore) {
      console.log(
        `[CRON] ${statsAfter.pending} pages remaining, self-chaining...`
      )
      await selfChain(baseUrl)
    } else {
      console.log("[CRON] === ALL PAGES GENERATED! ===")
    }

    return NextResponse.json({
      status: hasMore ? "in_progress" : "complete",
      batch: {
        processed: batch.length,
        success: successCount,
        errors: errorCount,
        durationMs,
      },
      stats: statsAfter,
      selfChained: hasMore,
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
  // Convert GET to POST behavior for Vercel Cron compatibility
  return POST(request)
}
