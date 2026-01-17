import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]
const MODIFIERS = [
  "",
  "-urgente",
  "-24-horas",
  "-economico",
  "-barato",
  "-a-domicilio",
  "-cerca-de-mi",
  "-de-guardia",
  "-nocturno",
  "-festivos",
  "-rapido",
  "-ahora",
  "-hoy",
  "-profesional",
  "-de-confianza",
  "-con-garantia",
  "-mismo-dia",
  "-fin-de-semana",
]

export async function GET() {
  const baseUrl = "https://rapidfix.es"
  const date = new Date().toISOString().split("T")[0]

  const sitemaps: string[] = []

  // Profession + modifier sitemaps
  for (const profession of PROFESSIONS) {
    for (const modifier of MODIFIERS) {
      const id = modifier ? `${profession}${modifier}` : profession
      sitemaps.push(`${baseUrl}/xmlsitemaps/${id}.xml`)
    }
  }

  // Prefix sitemaps (precio, presupuesto)
  for (const profession of PROFESSIONS) {
    sitemaps.push(`${baseUrl}/xmlsitemaps/precio-${profession}.xml`)
    sitemaps.push(`${baseUrl}/xmlsitemaps/presupuesto-${profession}.xml`)
  }

  // Problems sitemaps
  for (const profession of PROFESSIONS) {
    sitemaps.push(`${baseUrl}/xmlsitemaps/${profession}-problemas.xml`)
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const sitemap of sitemaps) {
    xml += `  <sitemap>\n    <loc>${sitemap}</loc>\n    <lastmod>${date}</lastmod>\n  </sitemap>\n`
  }
  xml += "</sitemapindex>"

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
  })
}
