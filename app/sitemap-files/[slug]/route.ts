import { NextResponse } from "next/server"
import { VALID_PROFESSIONS, CITIES, MODIFIERS, PROBLEMS, type Profession } from "@/lib/sitemap-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const baseUrl = "https://www.pronto24.xyz"
    const date = new Date().toISOString().split("T")[0]
    const id = slug.endsWith(".xml") ? slug.slice(0, -4) : slug

    const urls: string[] = []

    if (id.endsWith("-problemas")) {
      const profession = id.replace("-problemas", "") as Profession
      const problems = PROBLEMS[profession] || []
      for (const problem of problems) {
        for (const city of CITIES) {
          urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}/`)
        }
      }
    } else if (id.startsWith("precio-") || id.startsWith("presupuesto-")) {
      const prefix = id.startsWith("precio-") ? "precio" : "presupuesto"
      const profession = id.replace(`${prefix}-`, "")
      if (VALID_PROFESSIONS.includes(profession as Profession)) {
        for (const city of CITIES) {
          urls.push(`${baseUrl}/${prefix}-${profession}/${city}/`)
        }
      }
    } else {
      let foundProfession = ""
      let foundModifier = ""

      if (VALID_PROFESSIONS.includes(id as Profession)) {
        foundProfession = id
        foundModifier = ""
      } else {
        for (const prof of VALID_PROFESSIONS) {
          for (const mod of MODIFIERS) {
            if (mod && id === `${prof}${mod}`) {
              foundProfession = prof
              foundModifier = mod
              break
            }
          }
          if (foundProfession) break
        }
      }

      if (foundProfession) {
        for (const city of CITIES) {
          if (foundModifier) {
            urls.push(`${baseUrl}/${foundProfession}${foundModifier}/${city}/`)
          } else {
            urls.push(`${baseUrl}/${foundProfession}/${city}/`)
          }
        }
      }
    }

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    for (const url of urls) {
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`
    }
    xml += "</urlset>"

    return new NextResponse(xml, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
    })
  } catch (error) {
    console.error("[v0] Sitemap error:", error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      },
    )
  }
}