import { NextResponse } from "next/server"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { getAllIndexableCPs, hasEnrichedContent } from "@/lib/local-enrichment"

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
    // Enriched CPs get highest priority, capital city CPs get medium
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
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
