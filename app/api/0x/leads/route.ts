import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

const VALID_SESSION = "rf_admin_session_2024_punk"

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { name, phone, city, service, problem, requested_date, service_time, source } = await request.json()

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Faltan campos requeridos (nombre, teléfono, servicio)" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    const result = await sql`
      INSERT INTO leads (name, phone, city, service, problem, requested_date, service_time, status, source, created_at)
      VALUES (${name}, ${phone}, ${city || ""}, ${service}, ${problem || ""}, ${requested_date || null}, ${service_time || null}, 'pending', ${source || "manual"}, NOW())
      RETURNING id, name, phone, city, service, problem, status, lead_price, partner_id, requested_date, service_time, source, created_at
    `

    return NextResponse.json({ success: true, lead: result[0] })
  } catch (error) {
    console.error("Error creating lead:", error)
    return NextResponse.json({ error: "Error al crear lead" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { leadId, status, partnerId, estimatedPrice, lead_price } = await request.json()

    if (!leadId) {
      return NextResponse.json({ error: "Falta leadId" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    if (status) {
      await sql`UPDATE leads SET status = ${status} WHERE id = ${leadId}`
      return NextResponse.json({ success: true })
    }

    if (partnerId !== undefined) {
      await sql`UPDATE leads SET partner_id = ${partnerId || null} WHERE id = ${leadId}`
      return NextResponse.json({ success: true })
    }

    const priceToUpdate = estimatedPrice ?? lead_price
    if (priceToUpdate !== undefined) {
      await sql`UPDATE leads SET lead_price = ${priceToUpdate} WHERE id = ${leadId}`
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { id, name, phone, city, service, problem, lead_price, service_time, status, partner_id } = body

    if (!id) {
      return NextResponse.json({ error: "Falta id" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    await sql`
      UPDATE leads SET 
        name = COALESCE(${name}, name),
        phone = COALESCE(${phone}, phone),
        city = COALESCE(${city}, city),
        service = COALESCE(${service}, service),
        problem = COALESCE(${problem}, problem),
        lead_price = COALESCE(${lead_price}, lead_price),
        service_time = ${service_time === undefined ? null : service_time || null},
        status = COALESCE(${status}, status),
        partner_id = ${partner_id === undefined ? null : partner_id || null}
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Error al actualizar lead" }, { status: 500 })
  }
}
