import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]
const MODIFIERS = [
  "", // base
  // Alta urgencia (High Intent)
  "-urgente", "-24-horas", "-ahora", "-hoy", "-rapido", "-inmediato", "-ya", "-emergencia", "-express", "-24h",
  // Precio (High Commercial)
  "-economico", "-barato", "-low-cost", "-precio", "-presupuesto", "-tarifa", "-mejor-precio",
  // Disponibilidad
  "-de-guardia", "-nocturno", "-festivos", "-fin-de-semana", "-mismo-dia", "-sabados", "-domingos",
  // Ubicacion
  "-cerca-de-mi", "-a-domicilio", "-zona", "-centro",
  // Confianza
  "-profesional", "-de-confianza", "-con-garantia", "-autorizados", "-certificado", "-oficial",
  // Servicio
  "-reparacion", "-instalacion", "-mantenimiento", "-revision", "-averias",
  // Combinaciones alta conversion
  "-urgente-24h", "-barato-urgente", "-rapido-economico",
]

export async function GET() {
  const baseUrl = "https://www.pronto-24.com"
  const date = new Date().toISOString().split("T")[0]

  const sitemaps: string[] = []

  for (const prof of PROFESSIONS) {
    for (const mod of MODIFIERS) {
      const id = mod ? `${prof}${mod}` : prof
      sitemaps.push(`${baseUrl}/sitemap-files/${id}.xml`)
    }
  }

  for (const prof of PROFESSIONS) {
    sitemaps.push(`${baseUrl}/sitemap-files/precio-${prof}.xml`)
    sitemaps.push(`${baseUrl}/sitemap-files/presupuesto-${prof}.xml`)
  }

  for (const prof of PROFESSIONS) {
    sitemaps.push(`${baseUrl}/sitemap-files/${prof}-problemas.xml`)
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const sitemap of sitemaps) {
    xml += `  <sitemap>\n    <loc>${sitemap}</loc>\n    <lastmod>${date}</lastmod>\n  </sitemap>\n`
  }
  xml += "</sitemapindex>"

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  })
}
