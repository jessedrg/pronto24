import { PROFESSIONS, PROBLEMS, getAllCities } from "@/lib/seo-data"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const baseUrl = "https://rapidfix.es"
  const cities = getAllCities()
  const currentDate = new Date().toISOString()

  const urls: string[] = []

  // Check if it's a problems sitemap
  if (id.endsWith("-problemas")) {
    const professionId = id.replace("-problemas", "")
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
    // e.g., "electricista", "electricista-urgente", "electricista-24-horas"
    let professionId = id
    let modifier = ""

    const modifiers = ["-urgente", "-24-horas", "-economico", "-barato"]
    for (const mod of modifiers) {
      if (id.endsWith(mod)) {
        professionId = id.replace(mod, "")
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
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
