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
  
  // Use a recent but not "always today" date for the index
  // This updates weekly to reflect content generation cadence
  const now = new Date()
  // Round down to the most recent Monday for a stable, weekly-updating date
  const dayOfWeek = now.getDay()
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const lastMonday = new Date(now)
  lastMonday.setDate(now.getDate() - daysSinceMonday)
  const indexDate = lastMonday.toISOString().split("T")[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (let i = 1; i <= totalSitemaps; i++) {
    // Stagger sub-sitemap dates slightly so they don't all match
    const staggered = new Date(lastMonday)
    staggered.setDate(lastMonday.getDate() - (i % 3))
    const subDate = staggered.toISOString().split("T")[0]
    
    xml += `  <sitemap>
    <loc>${SITE_URL}/sitemap-cp/${i}.xml</loc>
    <lastmod>${subDate}</lastmod>
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
