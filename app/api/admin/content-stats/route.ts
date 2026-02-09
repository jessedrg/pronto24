import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!)

export async function GET(request: Request) {
  // Simple auth check
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 })
  }

  const [
    totalContent,
    contentByProfession,
    indexingStats,
    recentLogs,
    topCPs,
  ] = await Promise.all([
    sql`
      SELECT 
        COUNT(DISTINCT postal_code) as total_cps,
        COUNT(*) as total_pages
      FROM cp_generated_content 
      WHERE status = 'active'
    `,
    sql`
      SELECT profession, COUNT(*) as count 
      FROM cp_generated_content 
      WHERE status = 'active'
      GROUP BY profession 
      ORDER BY count DESC
    `,
    sql`
      SELECT status, COUNT(*) as count 
      FROM indexing_queue 
      GROUP BY status
    `,
    sql`
      SELECT * FROM content_generation_log 
      ORDER BY created_at DESC 
      LIMIT 20
    `,
    sql`
      SELECT postal_code, COUNT(*) as professions_count
      FROM cp_generated_content
      WHERE status = 'active'
      GROUP BY postal_code
      ORDER BY professions_count DESC
      LIMIT 20
    `,
  ])

  return Response.json({
    summary: {
      totalCPsWithContent: totalContent[0].total_cps,
      totalPagesGenerated: totalContent[0].total_pages,
    },
    contentByProfession,
    indexingStats,
    recentLogs,
    topCPs,
  })
}
