import { PROFESSIONS, PROBLEMS, getAllCities } from "@/lib/seo-data"
import { NextResponse, type NextRequest } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 86400 // 24 hours

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const baseUrl = "https://rapidfix.es"
  const cities = getAllCities()
  const currentDate = new Date().toISOString().split("T")[0]

  // Remove .xml extension for parsing
  const sitemapId = id.replace(".xml", "")

  const modifiers = ["", "-urgente", "-24-horas", "-economico", "-barato", "-problemas"]
  let isValid = false

  for (const profession of PROFESSIONS) {
    for (const mod of modifiers) {
      if (sitemapId === `${profession.id}${mod}`) {
        isValid = true
        break
      }
    }
    if (isValid) break
  }

  if (!isValid) {
    return NextResponse.json({ error: "Sitemap not found" }, { status: 404 })
  }

  const urls: string[] = []

  // Check if it's a problems sitemap
  if (sitemapId.endsWith("-problemas")) {
    const professionId = sitemapId.replace("-problemas", "")
    const profession = PROFESSIONS.find((p) => p.id === professionId)

    if (profession) {
      const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
      for (const problem of problems) {
        for (const city of cities) {
          urls.push(`${baseUrl}/problema/${professionId}/${problem.id}/${city}`)
        }
      }
    }
  } else {
    // Parse profession and modifier from id
    let professionId = sitemapId
    let modifier = ""

    const mods = ["-urgente", "-24-horas", "-economico", "-barato"]
    for (const mod of mods) {
      if (sitemapId.endsWith(mod)) {
        professionId = sitemapId.replace(mod, "")
        modifier = mod
        break
      }
    }

    const profession = PROFESSIONS.find((p) => p.id === professionId)

    if (profession) {
      for (const city of cities) {
        if (modifier) {
          urls.push(`${baseUrl}/${professionId}${modifier}/${city}`)
        } else {
          urls.push(`${baseUrl}/${professionId}/${city}`)
        }
      }
    }
  }

  // Generate XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const url of urls) {
    xml += "  <url>\n"
    xml += `    <loc>${url}</loc>\n`
    xml += `    <lastmod>${currentDate}</lastmod>\n`
    xml += "    <changefreq>weekly</changefreq>\n"
    xml += "    <priority>0.8</priority>\n"
    xml += "  </url>\n"
  }

  xml += "</urlset>"

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
