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
    const { name, phone, city, service, problem, requested_date, service_time } = await request.json()

    if (!name || !phone || !service) {
      return NextResponse.json({ error: "Faltan campos requeridos (nombre, teléfono, servicio)" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    await sql`
      INSERT INTO leads (name, phone, city, service, problem, requested_date, service_time, status, created_at)
      VALUES (${name}, ${phone}, ${city || ""}, ${service}, ${problem || ""}, ${requested_date || null}, ${service_time || null}, 'pending', NOW())
    `

    return NextResponse.json({ success: true })
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
    const { leadId, status, partnerId, estimatedPrice } = await request.json()

    if (!leadId) {
      return NextResponse.json({ error: "Falta leadId" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    if (status) {
      await sql`
        UPDATE leads 
        SET status = ${status}
        WHERE id = ${leadId}
      `
    }

    if (partnerId !== undefined) {
      if (partnerId) {
        // Assigning a partner - set status to "assigned"
        await sql`
          UPDATE leads 
          SET partner_id = ${partnerId}, status = 'assigned'
          WHERE id = ${leadId}
        `
      } else {
        // Removing partner - set status back to "pending"
        await sql`
          UPDATE leads 
          SET partner_id = NULL, status = 'pending'
          WHERE id = ${leadId}
        `
      }
    }

    if (estimatedPrice !== undefined) {
      await sql`
        UPDATE leads 
        SET lead_price = ${estimatedPrice}
        WHERE id = ${leadId}
      `
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
    console.log("[v0] PUT request body:", body)
    const { id, service_time } = body

    if (!id) {
      return NextResponse.json({ error: "Falta id" }, { status: 400 })
    }

    const sql = neon(process.env.NEON_DATABASE_URL!)

    console.log("[v0] Updating service_time for lead:", id, "to:", service_time)

    await sql`
      UPDATE leads 
      SET service_time = ${service_time || null}
      WHERE id = ${id}
    `

    console.log("[v0] Update successful")
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error updating service_time:", error)
    return NextResponse.json({ error: "Error al actualizar hora de servicio" }, { status: 500 })
  }
}
