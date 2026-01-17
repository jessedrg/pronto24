import { NextResponse } from "next/server"
import { getAllCities } from "@/lib/seo-data"

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
]

const PROBLEMS: Record<string, string[]> = {
  electricista: [
    "apagon",
    "cortocircuito",
    "olor-quemado",
    "diferencial-salta",
    "enchufes-no-funcionan",
    "luces-parpadean",
    "cuadro-electrico",
    "instalacion-electrica",
    "boletin-electrico",
  ],
  fontanero: [
    "fuga-agua",
    "tuberia-rota",
    "inundacion",
    "atasco-grave",
    "grifo-gotea",
    "cisterna-no-funciona",
    "calentador",
    "humedad",
  ],
  cerrajero: [
    "puerta-bloqueada",
    "cerradura-rota",
    "llave-dentro",
    "robo",
    "cambio-cerradura",
    "copia-llaves",
    "cerradura-seguridad",
  ],
  desatascos: [
    "wc-atascado",
    "fregadero-atascado",
    "arqueta-atascada",
    "mal-olor",
    "ducha-atascada",
    "bajante-atascado",
    "limpieza-tuberias",
  ],
  calderas: [
    "sin-agua-caliente",
    "caldera-no-enciende",
    "fuga-gas",
    "ruido-caldera",
    "revision-caldera",
    "cambio-caldera",
    "radiadores",
  ],
}

export const dynamic = "force-dynamic"
export const revalidate = 86400

const PROFESSION_SLUGS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

export async function GET(request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params
  const baseUrl = "https://rapidfix.es"
  const date = new Date().toISOString().split("T")[0]

  // Join all slug segments and remove .xml extension
  const rawId = slug.join("/")
  const id = rawId.endsWith(".xml") ? rawId.slice(0, -4) : rawId

  let citySlugs: string[] = []
  try {
    citySlugs = getAllCities()
  } catch (error) {
    // Fallback to a few cities if seo-data fails
    citySlugs = ["barcelona", "madrid", "sevilla", "valencia", "malaga"]
  }

  const urls: string[] = []

  if (id.endsWith("-problemas")) {
    const profession = id.replace("-problemas", "")
    const problems = PROBLEMS[profession] || []
    for (const problem of problems) {
      for (const city of citySlugs) {
        urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}`)
      }
    }
  } else if (id.startsWith("precio-") || id.startsWith("presupuesto-")) {
    const prefix = id.startsWith("precio-") ? "precio-" : "presupuesto-"
    const profession = id.replace(prefix, "")
    for (const city of citySlugs) {
      urls.push(`${baseUrl}/${prefix}${profession}/${city}`)
    }
  } else {
    let profession = ""
    let modifier = ""

    for (const p of PROFESSION_SLUGS) {
      if (id === p) {
        profession = p
        break
      }
      for (const mod of MODIFIERS) {
        if (mod && id === `${p}${mod}`) {
          profession = p
          modifier = mod
          break
        }
      }
      if (profession) break
    }

    if (profession) {
      for (const city of citySlugs) {
        if (modifier) {
          urls.push(`${baseUrl}/${profession}${modifier}/${city}`)
        } else {
          urls.push(`${baseUrl}/${profession}/${city}`)
        }
      }
    }
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const url of urls) {
    xml += `  <url>\n`
    xml += `    <loc>${url}</loc>\n`
    xml += `    <lastmod>${date}</lastmod>\n`
    xml += `    <changefreq>weekly</changefreq>\n`
    xml += `    <priority>0.8</priority>\n`
    xml += `  </url>\n`
  }

  xml += "</urlset>"

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
