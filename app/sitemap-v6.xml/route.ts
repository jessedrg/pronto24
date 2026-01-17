import { NextResponse } from "next/server"

export const dynamic = "force-static"
export const revalidate = 86400

export async function GET() {
  const baseUrl = "https://rapidfix.es"
  const date = new Date().toISOString().split("T")[0]

  const professions = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

  const modifiers = [
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

  const prefixModifiers = ["precio-", "presupuesto-"]

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const profession of professions) {
    for (const mod of modifiers) {
      const smName = mod === "" ? profession : `${profession}${mod}`
      xml += `  <sitemap>\n`
      xml += `    <loc>${baseUrl}/xml-sitemaps/${smName}.xml</loc>\n`
      xml += `    <lastmod>${date}</lastmod>\n`
      xml += `  </sitemap>\n`
    }
  }

  for (const prefix of prefixModifiers) {
    for (const profession of professions) {
      xml += `  <sitemap>\n`
      xml += `    <loc>${baseUrl}/xml-sitemaps/${prefix}${profession}.xml</loc>\n`
      xml += `    <lastmod>${date}</lastmod>\n`
      xml += `  </sitemap>\n`
    }
  }

  for (const profession of professions) {
    xml += `  <sitemap>\n`
    xml += `    <loc>${baseUrl}/xml-sitemaps/${profession}-problemas.xml</loc>\n`
    xml += `    <lastmod>${date}</lastmod>\n`
    xml += `  </sitemap>\n`
  }

  xml += "</sitemapindex>"

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
