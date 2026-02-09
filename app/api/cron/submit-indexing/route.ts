import { NextResponse } from "next/server"
import { SignJWT, importPKCS8 } from "jose"
import { getSQL } from "@/lib/db"

const BATCH_SIZE = 200 // Google allows 200 requests/day for Indexing API
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

/**
 * Generate a Google OAuth2 access token using a service account JWT.
 */
async function getGoogleAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!email || !keyRaw) {
    throw new Error("Google service account credentials not configured")
  }

  // The key may be base64-encoded or raw PEM
  let keyPem = keyRaw
  if (!keyRaw.includes("-----BEGIN")) {
    keyPem = Buffer.from(keyRaw, "base64").toString("utf-8")
  }
  // Handle escaped newlines
  keyPem = keyPem.replace(/\\n/g, "\n")

  const privateKey = await importPKCS8(keyPem, "RS256")

  const now = Math.floor(Date.now() / 1000)
  const jwt = await new SignJWT({
    iss: email,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .sign(privateKey)

  // Exchange JWT for access token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })

  if (!tokenRes.ok) {
    const errText = await tokenRes.text()
    throw new Error(`Failed to get Google access token: ${errText}`)
  }

  const tokenData = await tokenRes.json()
  return tokenData.access_token
}

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runIndexing()
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runIndexing()
}

async function runIndexing() {
  const sql = getSQL()

  // Check if Google credentials are configured
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    // Still mark URLs as pending -- they'll be submitted when creds are added
    return NextResponse.json({
      message: "Google Indexing API credentials not configured yet. URLs remain in queue.",
      submitted: 0,
      pending: 0,
    })
  }

  try {
    // Get pending URLs from the queue
    const pending = await sql`
      SELECT id, url, postal_code, profession, retry_count
      FROM indexing_queue
      WHERE status = 'pending' AND (retry_count IS NULL OR retry_count < 3)
      ORDER BY created_at ASC
      LIMIT ${BATCH_SIZE}
    `

    if (pending.length === 0) {
      return NextResponse.json({ message: "No pending URLs to submit", submitted: 0 })
    }

    let accessToken: string
    try {
      accessToken = await getGoogleAccessToken()
    } catch (e) {
      console.error("[v0] Failed to get Google access token:", e)
      return NextResponse.json(
        { error: "Failed to authenticate with Google. Check GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_KEY." },
        { status: 500 }
      )
    }

    let submitted = 0
    let failed = 0

    for (const row of pending) {
      try {
        const res = await fetch(GOOGLE_INDEXING_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            url: row.url,
            type: "URL_UPDATED",
          }),
        })

        const resBody = await res.text()

        if (res.ok) {
          await sql`
            UPDATE indexing_queue
            SET status = 'submitted', submitted_at = NOW(), response_status = ${res.status}, response_body = ${resBody}, updated_at = NOW()
            WHERE id = ${row.id}
          `
          submitted++
        } else {
          const retryCount = (row.retry_count || 0) + 1
          await sql`
            UPDATE indexing_queue
            SET status = ${retryCount >= 3 ? "failed" : "pending"}, retry_count = ${retryCount}, response_status = ${res.status}, response_body = ${resBody}, updated_at = NOW()
            WHERE id = ${row.id}
          `
          failed++

          // If rate limited, stop early
          if (res.status === 429) {
            console.log("[v0] Google Indexing API rate limited, stopping batch")
            break
          }
        }
      } catch (e) {
        console.error(`[v0] Error submitting ${row.url}:`, e)
        const retryCount = (row.retry_count || 0) + 1
        await sql`
          UPDATE indexing_queue
          SET status = ${retryCount >= 3 ? "failed" : "pending"}, retry_count = ${retryCount}, updated_at = NOW()
          WHERE id = ${row.id}
        `
        failed++
      }
    }

    return NextResponse.json({
      message: `Submitted ${submitted} URLs to Google Indexing API`,
      submitted,
      failed,
      totalPending: pending.length - submitted - failed,
    })
  } catch (e) {
    console.error("[v0] Submit indexing cron error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    )
  }
}
