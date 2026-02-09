import { NextResponse, after } from "next/server"
import { SignJWT, importPKCS8 } from "jose"
import { getSQL } from "@/lib/db"

// Allow up to 300s for background indexing work
export const maxDuration = 300

const BATCH_SIZE = 200 // Google allows 200 requests/day for Indexing API
const GOOGLE_INDEXING_ENDPOINT = "https://indexing.googleapis.com/v3/urlNotifications:publish"

/**
 * Generate a Google OAuth2 access token using a service account JWT.
 * 
 * Supports 3 formats for credentials:
 * 1. GOOGLE_SERVICE_ACCOUNT_JSON - Full JSON file content (easiest - just paste the whole JSON)
 * 2. GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_KEY (PEM string)
 * 3. GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_KEY (base64-encoded PEM)
 */
async function getGoogleAccessToken(): Promise<string> {
  let email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  let keyPem = ""

  // Option 1: Full JSON (recommended - just paste the whole downloaded JSON)
  const jsonRaw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (jsonRaw) {
    try {
      const parsed = JSON.parse(jsonRaw)
      email = parsed.client_email
      keyPem = parsed.private_key
    } catch {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON")
    }
  } else {
    // Option 2/3: Separate email + key
    const keyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
    if (!email || !keyRaw) {
      throw new Error("Google service account credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON (full JSON) or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_KEY")
    }

    keyPem = keyRaw
    // The key may be base64-encoded
    if (!keyRaw.includes("-----BEGIN")) {
      keyPem = Buffer.from(keyRaw, "base64").toString("utf-8")
    }
  }

  // Handle escaped newlines (common when pasting into env vars)
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
  return fireAndForget()
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return fireAndForget()
}

async function fireAndForget() {
  // Check if Google credentials are configured (either JSON or email+key)
  const hasJsonCreds = !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  const hasSeparateCreds = !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!hasJsonCreds && !hasSeparateCreds) {
    return NextResponse.json({
      status: "skipped",
      message: "Google Indexing API credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_JSON or GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_KEY.",
    })
  }

  const sql = getSQL()
  let pendingCount = 0
  try {
    const result = await sql`
      SELECT COUNT(*) as count FROM indexing_queue
      WHERE status = 'pending' AND (retry_count IS NULL OR retry_count < 3)
    `
    pendingCount = Number(result[0]?.count || 0)
  } catch {
    // DB might not be ready
  }

  if (pendingCount === 0) {
    return NextResponse.json({ status: "done", message: "No pending URLs to submit", pending: 0 })
  }

  // Schedule background work AFTER response is sent
  after(async () => {
    await runIndexing()
  })

  return NextResponse.json({
    status: "accepted",
    message: `Indexing started in background. ${pendingCount} URLs pending, processing up to ${BATCH_SIZE}.`,
    pending: pendingCount,
  })
}

async function runIndexing() {
  const sql = getSQL()

  try {
    // Get pending URLs from the queue
    const pending = await sql`
      SELECT id, url, postal_code, profession, retry_count
      FROM indexing_queue
      WHERE status = 'pending' AND (retry_count IS NULL OR retry_count < 3)
      ORDER BY created_at ASC
      LIMIT ${BATCH_SIZE}
    `

    if (pending.length === 0) return

    let accessToken: string
    try {
      accessToken = await getGoogleAccessToken()
    } catch (e) {
      console.error("Failed to get Google access token:", e)
      return
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
            console.log("Google Indexing API rate limited, stopping batch")
            break
          }
        }
      } catch (e) {
        console.error(`Error submitting ${row.url}:`, e)
        const retryCount = (row.retry_count || 0) + 1
        await sql`
          UPDATE indexing_queue
          SET status = ${retryCount >= 3 ? "failed" : "pending"}, retry_count = ${retryCount}, updated_at = NOW()
          WHERE id = ${row.id}
        `
        failed++
      }
    }

    console.log(`Indexing complete: ${submitted} submitted, ${failed} failed`)
  } catch (e) {
    console.error("Submit indexing cron error:", e)
  }
}
