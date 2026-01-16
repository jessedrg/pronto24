import { NextResponse, type NextRequest } from "next/server"

const PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

const MODIFIERS = ["", "-urgente", "-24-horas", "-economico", "-barato", "-problemas"]

const PROBLEMS: Record<string, string[]> = {
  electricista: ["apagon", "cortocircuito", "olor-quemado", "diferencial-salta", "enchufes-no-funcionan"],
  fontanero: ["fuga-agua", "tuberia-rota", "inundacion", "atasco-grave", "grifo-gotea"],
  cerrajero: ["puerta-bloqueada", "cerradura-rota", "llave-dentro", "robo", "cambio-cerradura"],
  desatascos: ["wc-atascado", "fregadero-atascado", "arqueta-atascada", "mal-olor", "ducha-atascada"],
  calderas: ["sin-agua-caliente", "caldera-no-enciende", "fuga-gas", "ruido-caldera", "revision-caldera"],
}

// Top 100 cities only to keep sitemaps manageable
const CITIES = [
  "barcelona",
  "madrid",
  "valencia",
  "sevilla",
  "malaga",
  "bilbao",
  "zaragoza",
  "murcia",
  "hospitalet-llobregat",
  "badalona",
  "terrassa",
  "sabadell",
  "mataro",
  "santa-coloma-gramenet",
  "cornella-llobregat",
  "sant-boi-llobregat",
  "sant-cugat-valles",
  "rubi",
  "granollers",
  "mollet-valles",
  "mostoles",
  "alcala-henares",
  "fuenlabrada",
  "leganes",
  "getafe",
  "alcorcon",
  "torrejon-ardoz",
  "parla",
  "alcobendas",
  "las-rozas",
  "pozuelo-alarcon",
  "coslada",
  "rivas-vaciamadrid",
  "torrent",
  "gandia",
  "paterna",
  "sagunto",
  "alzira",
  "xativa",
  "ontinyent",
  "alicante",
  "elche",
  "torrevieja",
  "orihuela",
  "benidorm",
  "alcoy",
  "elda",
  "denia",
  "marbella",
  "fuengirola",
  "torremolinos",
  "benalmadena",
  "estepona",
  "mijas",
  "velez-malaga",
  "dos-hermanas",
  "alcala-guadaira",
  "utrera",
  "mairena-aljarafe",
  "carmona",
  "granada",
  "motril",
  "almunecar",
  "armilla",
  "maracena",
  "cordoba",
  "lucena",
  "puente-genil",
  "montilla",
  "cadiz",
  "jerez-frontera",
  "algeciras",
  "san-fernando",
  "el-puerto-santa-maria",
  "almeria",
  "el-ejido",
  "roquetas-mar",
  "nijar",
  "girona",
  "figueres",
  "blanes",
  "lloret-mar",
  "olot",
  "tarragona",
  "reus",
  "tortosa",
  "salou",
  "cambrils",
  "lleida",
  "balaguer",
  "tarrega",
  "mollerussa",
  "san-sebastian",
  "irun",
  "errenteria",
  "zarautz",
  "vitoria-gasteiz",
  "llodio",
  "vigo",
  "pontevedra",
  "santiago-compostela",
  "a-coruna",
  "ferrol",
  "valladolid",
  "burgos",
  "leon",
  "salamanca",
]

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const baseUrl = "https://rapidfix.es"
  const currentDate = new Date().toISOString().split("T")[0]

  // Remove .xml extension
  const sitemapId = id.replace(".xml", "")

  // Validate sitemap ID
  let isValid = false
  let professionId = ""
  let modifier = ""

  for (const prof of PROFESSIONS) {
    for (const mod of MODIFIERS) {
      if (sitemapId === `${prof}${mod}`) {
        isValid = true
        professionId = prof
        modifier = mod
        break
      }
    }
    if (isValid) break
  }

  if (!isValid) {
    return NextResponse.json({ error: "Sitemap not found", id: sitemapId }, { status: 404 })
  }

  const urls: string[] = []

  if (modifier === "-problemas") {
    // Problem pages
    const problems = PROBLEMS[professionId] || []
    for (const problem of problems) {
      for (const city of CITIES) {
        urls.push(`${baseUrl}/problema/${professionId}/${problem}/${city}`)
      }
    }
  } else if (modifier) {
    // Modifier pages (urgente, 24-horas, economico, barato)
    for (const city of CITIES) {
      urls.push(`${baseUrl}/${professionId}${modifier}/${city}`)
    }
  } else {
    // Base profession pages
    for (const city of CITIES) {
      urls.push(`${baseUrl}/${professionId}/${city}`)
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
