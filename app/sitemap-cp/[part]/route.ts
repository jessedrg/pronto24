import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { getAllIndexableCPs, hasEnrichedContent } from "@/lib/local-enrichment"

const PROFESSIONS = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pronto-24.com"
const URLS_PER_SITEMAP = 10000

/**
 * Get all indexable CPs: static enrichment + capital cities + DB-generated content.
 * This grows automatically as the cron generates more content.
 */
async function getIndexablePostalCodes(): Promise<Set<string>> {
  const allCodes = Object.keys(POSTAL_CODE_NAMES).sort()
  const staticIndexable = getAllIndexableCPs(allCodes)
  const cpSet = new Set(staticIndexable)

  // Also add CPs that have AI-generated content in the DB
  try {
    const sql = neon(process.env.DATABASE_URL!)
    const dbCPs = await sql`
      SELECT DISTINCT postal_code FROM cp_generated_content WHERE status = 'active'
    `
    for (const row of dbCPs) {
      cpSet.add(row.postal_code)
    }
  } catch {
    // DB unavailable, proceed with static only
  }

  return cpSet
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
  
  const indexableSet = await getIndexablePostalCodes()
  const indexableCodes = Array.from(indexableSet).sort()
  const today = new Date().toISOString().split("T")[0]
  
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
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (const { profession, cp } of urlsForThisPart) {
    // Enriched CPs get highest priority, capital city CPs get medium, DB-generated get high
    const priority = hasEnrichedContent(cp) ? "0.9" : "0.7"
    const changefreq = hasEnrichedContent(cp) ? "weekly" : "monthly"
    
    xml += `  <url>
    <loc>${SITE_URL}/${profession}/cp/${cp}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`
  }

  xml += `</urlset>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
