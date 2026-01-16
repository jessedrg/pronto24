const PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]
const MODIFIERS = ["", "-urgente", "-24-horas", "-economico", "-barato", "-problemas"]

export const dynamic = "force-dynamic"

export async function GET() {
  const baseUrl = "https://rapidfix.es"
  const currentDate = new Date().toISOString().split("T")[0]

  const sitemaps: string[] = []

  // Add main sitemap
  sitemaps.push(`${baseUrl}/sitemap.xml`)

  // Add sitemaps for each profession and modifier
  for (const profession of PROFESSIONS) {
    for (const mod of MODIFIERS) {
      sitemaps.push(`${baseUrl}/sitemaps/${profession}${mod}.xml`)
    }
  }

  // Generate sitemap index XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const sitemap of sitemaps) {
    xml += "  <sitemap>\n"
    xml += `    <loc>${sitemap}</loc>\n`
    xml += `    <lastmod>${currentDate}</lastmod>\n`
    xml += "  </sitemap>\n"
  }

  xml += "</sitemapindex>"

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
