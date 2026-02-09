import { NextResponse } from "next/server"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { getAllIndexableCPs } from "@/lib/local-enrichment"

const PROFESSIONS = ["fontanero", "electricista", "cerrajero", "desatascos", "calderas"]
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pronto-24.com"
const URLS_PER_SITEMAP = 10000

export async function GET() {
  // Only include indexable CPs in sitemap (enriched + capital cities)
  const allCodes = Object.keys(POSTAL_CODE_NAMES)
  const indexableCodes = getAllIndexableCPs(allCodes)
  const totalUrls = indexableCodes.length * PROFESSIONS.length
  const totalSitemaps = Math.ceil(totalUrls / URLS_PER_SITEMAP)
  
  const today = new Date().toISOString().split("T")[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (let i = 1; i <= totalSitemaps; i++) {
    xml += `  <sitemap>
    <loc>${SITE_URL}/sitemap-cp/${i}.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`
  }

  xml += `</sitemapindex>`

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
