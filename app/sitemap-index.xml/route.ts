import { PROFESSIONS } from "@/lib/seo-data"

export async function GET() {
  const baseUrl = "https://rapidfix.es"
  const modifiers = ["", "-urgente", "-24-horas", "-economico", "-barato"]

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // Add main sitemap
  xml += `  <sitemap>\n`
  xml += `    <loc>${baseUrl}/sitemap.xml</loc>\n`
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
  xml += `  </sitemap>\n`

  // Add profession + city sitemaps (one per profession + modifier combination)
  for (const profession of PROFESSIONS) {
    for (const modifier of modifiers) {
      const sitemapId = modifier ? `${profession.id}${modifier}` : profession.id
      xml += `  <sitemap>\n`
      xml += `    <loc>${baseUrl}/sitemap/${sitemapId}.xml</loc>\n`
      xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
      xml += `  </sitemap>\n`
    }

    // Add problems sitemap for each profession
    xml += `  <sitemap>\n`
    xml += `    <loc>${baseUrl}/sitemap/${profession.id}-problemas.xml</loc>\n`
    xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`
    xml += `  </sitemap>\n`
  }

  xml += "</sitemapindex>"

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}
