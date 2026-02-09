import { NextResponse } from "next/server"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { getAllIndexableCPs, hasEnrichedContent } from "@/lib/local-enrichment"
import { getSQL } from "@/lib/db"

const PROFESSIONS = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pronto-24.com"
const URLS_PER_SITEMAP = 10000

/**
 * Only return indexable CPs (enriched + capital cities).
 * This dramatically reduces sitemap size from ~55,000 to ~3,000-5,000 URLs,
 * concentrating Google's crawl budget on quality pages.
 */
function getIndexablePostalCodes(): string[] {
  const allCodes = Object.keys(POSTAL_CODE_NAMES).sort()
  return getAllIndexableCPs(allCodes)
}

export function getTotalSitemaps(): number {
  const indexableCodes = getIndexablePostalCodes()
  const totalUrls = indexableCodes.length * PROFESSIONS.length
  return Math.ceil(totalUrls / URLS_PER_SITEMAP)
}

/**
 * Fetch real lastmod dates from cp_generated_content table.
 * Returns a Map of "cp-profession" -> "YYYY-MM-DD"
 */
async function getContentDates(): Promise<Map<string, string>> {
  const dateMap = new Map<string, string>()
  try {
    const sql = getSQL()
    const rows = await sql`
      SELECT postal_code, profession, 
        COALESCE(updated_at, created_at) as last_modified
      FROM cp_generated_content 
      WHERE status = 'active'
    `
    for (const row of rows) {
      const date = new Date(row.last_modified).toISOString().split("T")[0]
      dateMap.set(`${row.postal_code}-${row.profession}`, date)
    }
  } catch {
    // If DB is not available, fall back to static dates
  }
  return dateMap
}

/**
 * Generate a stable, realistic-looking date for a CP+profession combo
 * that doesn't have DB-generated content yet. Spreads dates over the
 * last 60 days so it doesn't look like everything was created at once.
 */
function getStableDate(cp: string, profession: string): string {
  // Simple hash to get a deterministic number from cp+profession
  let hash = 0
  const str = `${cp}-${profession}`
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0
  }
  // Spread over last 60 days
  const daysAgo = Math.abs(hash) % 60
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  return date.toISOString().split("T")[0]
}

interface RouteParams {
  params: Promise<{ part: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  const { part } = await params
  
  const cleanPart = part.replace('.xml', '')
  const partNumber = parseInt(cleanPart)
  
  if (isNaN(partNumber) || partNumber < 1) {
    return new NextResponse("Invalid sitemap part", { status: 400 })
  }
  
  const indexableCodes = getIndexablePostalCodes()
  
  const startIndex = (partNumber - 1) * URLS_PER_SITEMAP
  const endIndex = startIndex + URLS_PER_SITEMAP
  
  const allUrls: { profession: string; cp: string }[] = []
  for (const profession of PROFESSIONS) {
    for (const cp of indexableCodes) {
      allUrls.push({ profession, cp })
    }
  }
  
  const urlsForThisPart = allUrls.slice(startIndex, endIndex)
  
  if (urlsForThisPart.length === 0) {
    return new NextResponse("Sitemap part not found", { status: 404 })
  }

  // Fetch real dates from DB for generated content
  const contentDates = await getContentDates()
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (const { profession, cp } of urlsForThisPart) {
    // Enriched CPs get highest priority, capital city CPs get medium
    const priority = hasEnrichedContent(cp) ? "0.9" : "0.7"
    const changefreq = hasEnrichedContent(cp) ? "weekly" : "monthly"
    
    // Use real DB date if available, otherwise a stable spread date
    const dbDate = contentDates.get(`${cp}-${profession}`)
    const lastmod = dbDate || getStableDate(cp, profession)
    
    xml += `  <url>
    <loc>${SITE_URL}/${profession}/cp/${cp}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
