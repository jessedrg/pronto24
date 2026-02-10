import { NextRequest, NextResponse } from "next/server"
import { getSQL, queryWithRetry } from "@/lib/db"

export async function POST(request: NextRequest) {
  const { action } = await request.json()

  const sql = getSQL()

  if (action === "start") {
    // Trigger the cron endpoint
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }
    const cronSecret = process.env.CRON_SECRET
    if (cronSecret) {
      headers["Authorization"] = `Bearer ${cronSecret}`
    }

    console.log("[TRIGGER] Firing cron at:", `${baseUrl}/api/cron/generate-content`)
    console.log("[TRIGGER] CRON_SECRET set:", !!cronSecret)

    // Fire the cron - do NOT await, let it run in background
    fetch(`${baseUrl}/api/cron/generate-content`, {
      method: "POST",
      headers,
      body: JSON.stringify({ chained: true }),
    }).catch((err) => {
      console.error("[TRIGGER] Failed to trigger cron:", err)
    })

    return NextResponse.json({
      status: "started",
      message: "Generation triggered. The cron is now running in the background. Refresh in a few seconds to see progress.",
      baseUrl,
      cronSecretConfigured: !!cronSecret,
    })
  }

  if (action === "retry-errors") {
    const result = await queryWithRetry(async () => {
      return await sql`
        UPDATE page_content 
        SET ai_status = 'pending', ai_error_message = NULL, updated_at = NOW()
        WHERE ai_status = 'error'
        RETURNING id
      `
    })

    // Also trigger the cron to start processing
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    const headers: Record<string, string> = { "Content-Type": "application/json" }
    if (process.env.CRON_SECRET) headers["Authorization"] = `Bearer ${process.env.CRON_SECRET}`
    fetch(`${baseUrl}/api/cron/generate-content`, { method: "POST", headers, body: JSON.stringify({ chained: true }) }).catch(() => {})

    return NextResponse.json({
      status: "reset",
      message: `Reset ${result.length} errored pages to pending and triggered generation`,
      count: result.length,
    })
  }

  if (action === "reset-all") {
    const result = await queryWithRetry(async () => {
      return await sql`
        UPDATE page_content 
        SET ai_status = 'pending', 
            ai_error_message = NULL,
            ai_intro = NULL,
            ai_local_context = NULL,
            ai_service_details = NULL,
            ai_pricing_info = NULL,
            ai_prevention_tips = NULL,
            ai_faqs = NULL,
            ai_neighborhood_info = NULL,
            ai_seasonal_tips = NULL,
            ai_emergency_guide = NULL,
            ai_word_count = NULL,
            ai_generated_at = NULL,
            updated_at = NOW()
        RETURNING id
      `
    })

    return NextResponse.json({
      status: "reset",
      message: `Reset ${result.length} pages for regeneration`,
      count: result.length,
    })
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 })
}
