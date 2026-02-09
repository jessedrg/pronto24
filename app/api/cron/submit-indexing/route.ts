import { neon } from "@neondatabase/serverless"
import { SignJWT, importPKCS8 } from "jose"

const sql = neon(process.env.DATABASE_URL!)

const GOOGLE_INDEXING_ENDPOINT =
  "https://indexing.googleapis.com/v3/urlNotifications:publish"
const BATCH_LIMIT = 200 // Google allows 200 requests/day for new accounts, up to 600/day later
const SCOPE = "https://www.googleapis.com/auth/indexing"
const TOKEN_URL = "https://oauth2.googleapis.com/token"

/**
 * Generate a Google service account JWT for the Indexing API.
 * Requires GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_KEY env vars.
 */
async function getGoogleAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKeyRaw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY

  if (!email || !privateKeyRaw) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars"
    )
  }

  // The key comes base64-encoded or as raw PEM, handle both
  let privateKey = privateKeyRaw
  if (!privateKey.includes("-----BEGIN")) {
    privateKey = Buffer.from(privateKey, "base64").toString("utf-8")
  }
  // Also handle escaped newlines from env vars
  privateKey = privateKey.replace(/\\n/g, "\n")

  const key = await importPKCS8(privateKey, "RS256")

  const now = Math.floor(Date.now() / 1000)
  const jwt = await new SignJWT({
    iss: email,
    scope: SCOPE,
    aud: TOKEN_URL,
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuedAt(now)
    .setExpirationTime(now + 3600)
    .sign(key)

  // Exchange JWT for access token
  const tokenResponse = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  })

  if (!tokenResponse.ok) {
    const errText = await tokenResponse.text()
    throw new Error(`Failed to get Google access token: ${errText}`)
  }

  const tokenData = await tokenResponse.json()
  return tokenData.access_token
}

/**
 * Submit a single URL to the Google Indexing API.
 */
async function submitUrl(
  url: string,
  accessToken: string
): Promise<{ success: boolean; status: number; body: string }> {
  try {
    const response = await fetch(GOOGLE_INDEXING_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        url,
        type: "URL_UPDATED",
      }),
    })

    const body = await response.text()
    return {
      success: response.ok,
      status: response.status,
      body,
    }
  } catch (error) {
    return {
      success: false,
      status: 0,
      body: String(error),
    }
  }
}

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}

// POST for manual triggers from admin panel
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runIndexing()
}

// GET for Vercel cron
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runIndexing()
}

async function runIndexing() {
  // Check if we have the Google credentials configured
  if (
    !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
    !process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  ) {
    // If no Google credentials, just mark URLs as "no_credentials" and return stats
    const pending = await sql`
      SELECT COUNT(*) as count FROM indexing_queue WHERE status = 'pending'
    `
    return Response.json({
      message:
        "Google Indexing API credentials not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_KEY env vars.",
      pendingUrls: pending[0].count,
      submitted: 0,
    })
  }

  const startTime = Date.now()

  // Get pending URLs, ordered by most recently generated content first
  const pendingUrls = await sql`
    SELECT iq.id, iq.url, iq.postal_code, iq.profession
    FROM indexing_queue iq
    WHERE iq.status = 'pending'
    ORDER BY iq.created_at ASC
    LIMIT ${BATCH_LIMIT}
  `

  if (pendingUrls.length === 0) {
    return Response.json({
      message: "No pending URLs to submit",
      submitted: 0,
    })
  }

  let accessToken: string
  try {
    accessToken = await getGoogleAccessToken()
  } catch (error) {
    return Response.json(
      {
        message: `Failed to authenticate with Google: ${error}`,
        submitted: 0,
      },
      { status: 500 }
    )
  }

  let submitted = 0
  let failed = 0
  let rateLimited = false

  for (const row of pendingUrls) {
    if (rateLimited) break

    // Safety: stop near timeout
    if (Date.now() - startTime > 55000) break

    const result = await submitUrl(row.url, accessToken)

    if (result.success) {
      await sql`
        UPDATE indexing_queue 
        SET status = 'submitted', 
            submitted_at = NOW(),
            response_status = ${result.status},
            response_body = ${result.body}
        WHERE id = ${row.id}
      `
      submitted++
    } else if (result.status === 429) {
      // Rate limited - stop and try again next run
      rateLimited = true
      await sql`
        UPDATE indexing_queue 
        SET status = 'rate_limited',
            response_status = ${result.status},
            response_body = ${result.body}
        WHERE id = ${row.id}
      `
    } else {
      await sql`
        UPDATE indexing_queue 
        SET status = 'failed',
            retry_count = retry_count + 1,
            response_status = ${result.status},
            response_body = ${result.body}
        WHERE id = ${row.id}
      `
      failed++
    }

    // Small delay to avoid bursting
    await new Promise((r) => setTimeout(r, 100))
  }

  // Reset rate-limited URLs back to pending for next run
  await sql`
    UPDATE indexing_queue 
    SET status = 'pending' 
    WHERE status = 'rate_limited'
  `

  // Also retry failed URLs that haven't been retried too many times
  await sql`
    UPDATE indexing_queue 
    SET status = 'pending' 
    WHERE status = 'failed' AND retry_count < 3
  `

  const remainingPending = await sql`
    SELECT COUNT(*) as count FROM indexing_queue WHERE status = 'pending'
  `

  return Response.json({
    message: `Indexing submission complete`,
    submitted,
    failed,
    rateLimited,
    durationMs: Date.now() - startTime,
    remainingPending: remainingPending[0].count,
  })
}
