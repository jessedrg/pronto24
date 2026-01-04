import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { neon } from "@neondatabase/serverless"
import { DashboardClient } from "./dashboard-client"

const VALID_SESSION = "rf_admin_session_2024_punk"
const OWNER_TELEGRAM_ID = process.env.ADMIN_USER_IDS?.split(",")[0] || ""

async function safeQuery<T>(query: Promise<T>, fallback: T): Promise<T> {
  try {
    return await query
  } catch (e) {
    console.log("[v0] Query failed, using fallback:", e)
    return fallback
  }
}

async function getStats(dateRange?: string) {
  const sql = neon(process.env.NEON_DATABASE_URL!)

  const isToday = dateRange === "today"
  const isYesterday = dateRange === "yesterday"
  const isWeek = dateRange === "week"
  const isMonth = dateRange === "month"

  let totalLeads, soldLeads, recentLeads, byService

  // Total leads query based on date range
  if (isToday) {
    totalLeads = await safeQuery(sql`SELECT COUNT(*) as count FROM leads WHERE DATE(created_at) = CURRENT_DATE`, [
      { count: 0 },
    ])
    soldLeads = await safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid') AND DATE(created_at) = CURRENT_DATE`,
      [{ count: 0, revenue: 0 }],
    )
    recentLeads = await safeQuery(
      sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, created_at FROM leads WHERE DATE(created_at) = CURRENT_DATE ORDER BY created_at DESC LIMIT 50`,
      [],
    )
    byService = await safeQuery(
      sql`SELECT service, COUNT(*) as total, SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN 1 ELSE 0 END) as sold, COALESCE(SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN lead_price ELSE 0 END), 0) as revenue FROM leads WHERE DATE(created_at) = CURRENT_DATE GROUP BY service`,
      [],
    )
  } else if (isYesterday) {
    totalLeads = await safeQuery(sql`SELECT COUNT(*) as count FROM leads WHERE DATE(created_at) = CURRENT_DATE - 1`, [
      { count: 0 },
    ])
    soldLeads = await safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid') AND DATE(created_at) = CURRENT_DATE - 1`,
      [{ count: 0, revenue: 0 }],
    )
    recentLeads = await safeQuery(
      sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, created_at FROM leads WHERE DATE(created_at) = CURRENT_DATE - 1 ORDER BY created_at DESC LIMIT 50`,
      [],
    )
    byService = await safeQuery(
      sql`SELECT service, COUNT(*) as total, SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN 1 ELSE 0 END) as sold, COALESCE(SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN lead_price ELSE 0 END), 0) as revenue FROM leads WHERE DATE(created_at) = CURRENT_DATE - 1 GROUP BY service`,
      [],
    )
  } else if (isWeek) {
    totalLeads = await safeQuery(
      sql`SELECT COUNT(*) as count FROM leads WHERE created_at >= NOW() - INTERVAL '7 days'`,
      [{ count: 0 }],
    )
    soldLeads = await safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid') AND created_at >= NOW() - INTERVAL '7 days'`,
      [{ count: 0, revenue: 0 }],
    )
    recentLeads = await safeQuery(
      sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, created_at FROM leads WHERE created_at >= NOW() - INTERVAL '7 days' ORDER BY created_at DESC LIMIT 50`,
      [],
    )
    byService = await safeQuery(
      sql`SELECT service, COUNT(*) as total, SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN 1 ELSE 0 END) as sold, COALESCE(SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN lead_price ELSE 0 END), 0) as revenue FROM leads WHERE created_at >= NOW() - INTERVAL '7 days' GROUP BY service`,
      [],
    )
  } else if (isMonth) {
    totalLeads = await safeQuery(
      sql`SELECT COUNT(*) as count FROM leads WHERE created_at >= NOW() - INTERVAL '30 days'`,
      [{ count: 0 }],
    )
    soldLeads = await safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid') AND created_at >= NOW() - INTERVAL '30 days'`,
      [{ count: 0, revenue: 0 }],
    )
    recentLeads = await safeQuery(
      sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, created_at FROM leads WHERE created_at >= NOW() - INTERVAL '30 days' ORDER BY created_at DESC LIMIT 50`,
      [],
    )
    byService = await safeQuery(
      sql`SELECT service, COUNT(*) as total, SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN 1 ELSE 0 END) as sold, COALESCE(SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN lead_price ELSE 0 END), 0) as revenue FROM leads WHERE created_at >= NOW() - INTERVAL '30 days' GROUP BY service`,
      [],
    )
  } else {
    // All time
    totalLeads = await safeQuery(sql`SELECT COUNT(*) as count FROM leads`, [{ count: 0 }])
    soldLeads = await safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid')`,
      [{ count: 0, revenue: 0 }],
    )
    recentLeads = await safeQuery(
      sql`SELECT id, name, phone, service, city, problem, status, lead_price, partner_id, requested_date, created_at FROM leads ORDER BY created_at DESC LIMIT 50`,
      [],
    )
    byService = await safeQuery(
      sql`SELECT service, COUNT(*) as total, SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN 1 ELSE 0 END) as sold, COALESCE(SUM(CASE WHEN status = 'accepted' OR status = 'paid' THEN lead_price ELSE 0 END), 0) as revenue FROM leads GROUP BY service`,
      [],
    )
  }

  // These queries are always the same (not affected by date filter)
  const [todayLeads, todaySold, todayPotential, weekLeads, weekSold, weekPotential, partnersCount] = await Promise.all([
    safeQuery(sql`SELECT COUNT(*) as count FROM leads WHERE DATE(created_at) = CURRENT_DATE`, [{ count: 0 }]),
    safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid') AND DATE(created_at) = CURRENT_DATE`,
      [{ count: 0, revenue: 0 }],
    ),
    safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE status = 'pending' AND DATE(created_at) = CURRENT_DATE`,
      [{ count: 0, revenue: 0 }],
    ),
    safeQuery(sql`SELECT COUNT(*) as count FROM leads WHERE created_at >= NOW() - INTERVAL '7 days'`, [{ count: 0 }]),
    safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE (status = 'accepted' OR status = 'paid') AND created_at >= NOW() - INTERVAL '7 days'`,
      [{ count: 0, revenue: 0 }],
    ),
    safeQuery(
      sql`SELECT COUNT(*) as count, COALESCE(SUM(lead_price), 0) as revenue FROM leads WHERE status = 'pending' AND created_at >= NOW() - INTERVAL '7 days'`,
      [{ count: 0, revenue: 0 }],
    ),
    safeQuery(sql`SELECT COUNT(*) as count FROM partners WHERE active = true`, [{ count: 0 }]),
  ])

  const partnersList = await safeQuery(
    sql`
      SELECT 
        p.id,
        p.name,
        p.phone,
        p.telegram_chat_id,
        p.services,
        p.cities,
        p.active,
        p.created_at,
        p.total_leads_accepted,
        p.balance_euros,
        COUNT(l.id) as leads_bought,
        COALESCE(SUM(l.lead_price), 0) as total_spent
      FROM partners p
      LEFT JOIN leads l ON l.partner_id = p.id AND (l.status = 'accepted' OR l.status = 'paid')
      GROUP BY p.id, p.name, p.phone, p.telegram_chat_id, p.services, p.cities, p.active, p.created_at, p.total_leads_accepted, p.balance_euros
      ORDER BY p.created_at DESC
    `,
    [],
  )

  const funnelStats = await safeQuery(
    sql`SELECT 
      DATE(created_at) as date,
      COUNT(DISTINCT session_id) as total_sessions,
      COUNT(DISTINCT CASE WHEN service IS NOT NULL THEN session_id END) as selected_service,
      COUNT(DISTINCT CASE WHEN city IS NOT NULL THEN session_id END) as provided_city,
      COUNT(DISTINCT CASE WHEN phone IS NOT NULL THEN session_id END) as provided_phone,
      COUNT(DISTINCT CASE WHEN step = 'complete' OR completed = true THEN session_id END) as completed_leads,
      ROUND(COUNT(DISTINCT CASE WHEN step = 'complete' OR completed = true THEN session_id END)::numeric / NULLIF(COUNT(DISTINCT session_id), 0) * 100, 1) as conversion_rate
    FROM chat_interactions 
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date DESC 
    LIMIT 30`,
    [],
  )

  const incompleteChats = await safeQuery(
    sql`
      SELECT 
        session_id,
        MAX(step) as last_step,
        MAX(service) as service,
        MAX(city) as city,
        MAX(phone) as phone,
        STRING_AGG(CASE WHEN message_type = 'user' THEN message ELSE NULL END, ' | ' ORDER BY created_at) as user_messages,
        MIN(created_at) as started_at,
        MAX(created_at) as last_activity
      FROM chat_interactions 
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY session_id
      HAVING MAX(phone) IS NULL 
         AND MAX(step) != 'complete' 
         AND (BOOL_OR(completed) IS NULL OR BOOL_OR(completed) = false)
      ORDER BY last_activity DESC
      LIMIT 20
    `,
    [],
  )

  return {
    total: Number(totalLeads[0]?.count || 0),
    sold: Number(soldLeads[0]?.count || 0),
    revenue: Number(soldLeads[0]?.revenue || 0),
    todayLeads: Number(todayLeads[0]?.count || 0),
    todaySold: Number(todaySold[0]?.count || 0),
    todayRevenue: Number(todaySold[0]?.revenue || 0),
    todayPending: Number(todayPotential[0]?.count || 0),
    todayPotential: Number(todayPotential[0]?.revenue || 0),
    weekLeads: Number(weekLeads[0]?.count || 0),
    weekSold: Number(weekSold[0]?.count || 0),
    weekRevenue: Number(weekSold[0]?.revenue || 0),
    weekPending: Number(weekPotential[0]?.count || 0),
    weekPotential: Number(weekPotential[0]?.revenue || 0),
    recentLeads: recentLeads || [],
    byService: byService || [],
    funnelStats: funnelStats || [],
    partners: Number(partnersCount[0]?.count || 0),
    partnersList: (partnersList || []).map((p: any) => ({
      ...p,
      isOwner: p.telegram_chat_id === OWNER_TELEGRAM_ID,
    })),
    ownerTelegramId: OWNER_TELEGRAM_ID,
    conversionRate:
      totalLeads[0]?.count > 0 ? ((Number(soldLeads[0]?.count) / Number(totalLeads[0]?.count)) * 100).toFixed(1) : "0",
    incompleteChats: incompleteChats || [],
    dateRange: dateRange || "all",
  }
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ range?: string }>
}) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    redirect("/0x")
  }

  const params = await searchParams
  const stats = await getStats(params.range)

  return <DashboardClient initialStats={stats} />
}
