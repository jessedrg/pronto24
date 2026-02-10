import { NextResponse } from "next/server"
import { getSQL, queryWithRetry } from "@/lib/db"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const sql = getSQL()

    // Overall stats
    const overallStats = await queryWithRetry(async () => {
      return await sql`
        SELECT 
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE ai_status = 'generated') as generated,
          COUNT(*) FILTER (WHERE ai_status = 'pending' OR ai_status IS NULL) as pending,
          COUNT(*) FILTER (WHERE ai_status = 'generating') as generating,
          COUNT(*) FILTER (WHERE ai_status = 'error') as errored,
          COALESCE(SUM(ai_word_count) FILTER (WHERE ai_status = 'generated'), 0) as total_words,
          COALESCE(AVG(ai_word_count) FILTER (WHERE ai_status = 'generated'), 0) as avg_words
        FROM page_content
      `
    })

    // Stats by profession
    const byProfession = await queryWithRetry(async () => {
      return await sql`
        SELECT 
          profession_id,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE ai_status = 'generated') as generated,
          COUNT(*) FILTER (WHERE ai_status = 'pending' OR ai_status IS NULL) as pending,
          COUNT(*) FILTER (WHERE ai_status = 'error') as errored
        FROM page_content
        GROUP BY profession_id
        ORDER BY profession_id
      `
    })

    // Stats by page type
    const byPageType = await queryWithRetry(async () => {
      return await sql`
        SELECT 
          CASE 
            WHEN problem_id IS NOT NULL THEN 'problem'
            WHEN modifier IS NOT NULL THEN 'modifier'
            ELSE 'city'
          END as page_type,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE ai_status = 'generated') as generated,
          COUNT(*) FILTER (WHERE ai_status = 'pending' OR ai_status IS NULL) as pending,
          COUNT(*) FILTER (WHERE ai_status = 'error') as errored
        FROM page_content
        GROUP BY page_type
        ORDER BY page_type
      `
    })

    // Recent runs
    const recentRuns = await queryWithRetry(async () => {
      return await sql`
        SELECT id, batch_size, pages_processed, pages_success, pages_error,
               duration_ms, status, created_at
        FROM ai_generation_runs
        ORDER BY created_at DESC
        LIMIT 20
      `
    })

    // Recent errors
    const recentErrors = await queryWithRetry(async () => {
      return await sql`
        SELECT profession_id, city_slug, problem_id, page_url, 
               ai_error_message, updated_at
        FROM page_content
        WHERE ai_status = 'error'
        ORDER BY updated_at DESC
        LIMIT 20
      `
    })

    // Recently generated (latest 10)
    const recentGenerated = await queryWithRetry(async () => {
      return await sql`
        SELECT profession_id, city_slug, problem_id, page_url, 
               ai_word_count, ai_generated_at
        FROM page_content
        WHERE ai_status = 'generated'
        ORDER BY ai_generated_at DESC
        LIMIT 10
      `
    })

    const stats = overallStats[0]
    const total = parseInt(stats.total) || 0
    const generated = parseInt(stats.generated) || 0

    return NextResponse.json({
      overall: {
        total,
        generated,
        pending: parseInt(stats.pending) || 0,
        generating: parseInt(stats.generating) || 0,
        errored: parseInt(stats.errored) || 0,
        percentage: total > 0 ? Math.round((generated / total) * 100) : 0,
        totalWords: parseInt(stats.total_words) || 0,
        avgWords: Math.round(parseFloat(stats.avg_words) || 0),
      },
      byProfession,
      byPageType,
      recentRuns,
      recentErrors,
      recentGenerated,
    })
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error"
    return NextResponse.json(
      { error: "Failed to get stats", details: errorMsg },
      { status: 500 }
    )
  }
}
