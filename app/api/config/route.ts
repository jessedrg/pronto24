import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = neon(process.env.NEON_DATABASE_URL!)

export async function GET() {
  try {
    const result = await sql`
      SELECT key, value FROM app_config
    `

    const config: Record<string, string> = {}
    result.forEach((row: any) => {
      config[row.key] = row.value
    })

    return NextResponse.json(config)
  } catch (error: any) {
    console.error("[v0] Error fetching config:", error)

    if (error?.code === "42P01") {
      return NextResponse.json({
        whatsapp_phone: "34711267223",
        call_phone: "34711267223",
        whatsapp_enabled: "true",
        call_enabled: "true",
        table_missing: true,
      })
    }

    return NextResponse.json({ error: "Failed to fetch config" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { whatsapp_phone, call_phone, whatsapp_enabled, call_enabled, password } = body

    if (password !== "admin123") {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    await sql`
      CREATE TABLE IF NOT EXISTS app_config (
        key VARCHAR(100) PRIMARY KEY,
        value TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `

    // Update each config value
    await sql`
      INSERT INTO app_config (key, value)
      VALUES ('whatsapp_phone', ${whatsapp_phone})
      ON CONFLICT (key) 
      DO UPDATE SET value = ${whatsapp_phone}, updated_at = NOW()
    `

    await sql`
      INSERT INTO app_config (key, value)
      VALUES ('call_phone', ${call_phone})
      ON CONFLICT (key) 
      DO UPDATE SET value = ${call_phone}, updated_at = NOW()
    `

    await sql`
      INSERT INTO app_config (key, value)
      VALUES ('whatsapp_enabled', ${whatsapp_enabled})
      ON CONFLICT (key) 
      DO UPDATE SET value = ${whatsapp_enabled}, updated_at = NOW()
    `

    await sql`
      INSERT INTO app_config (key, value)
      VALUES ('call_enabled', ${call_enabled})
      ON CONFLICT (key) 
      DO UPDATE SET value = ${call_enabled}, updated_at = NOW()
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error saving config:", error)
    return NextResponse.json({ error: "Failed to save config" }, { status: 500 })
  }
}
