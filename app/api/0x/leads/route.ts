import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { neon } from "@neondatabase/serverless"

const VALID_SESSION = "rf_admin_session_2024_punk"

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies()
  const session = cookieStore.get("rf_admin_session")

  if (session?.value !== VALID_SESSION) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 })
  }

  try {
    const { leadId, status, partnerId } = await request.json()

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

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating lead:", error)
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 })
  }
}
