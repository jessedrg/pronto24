import { NextResponse } from "next/server"

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
]

const PREFIX_MODIFIERS = ["precio-", "presupuesto-"]

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

const CITIES = [
  "barcelona",
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
  "vilanova-geltru",
  "viladecans",
  "prat-llobregat",
  "castelldefels",
  "granollers",
  "cerdanyola-valles",
  "mollet-valles",
  "gava",
  "esplugues-llobregat",
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
  "madrid",
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
  "san-sebastian-reyes",
  "pozuelo-alarcon",
  "coslada",
  "rivas-vaciamadrid",
  "malaga",
  "marbella",
  "mijas",
  "velez-malaga",
  "fuengirola",
  "torremolinos",
  "benalmadena",
  "estepona",
  "sevilla",
  "dos-hermanas",
  "alcala-guadaira",
  "utrera",
  "mairena-aljarafe",
  "ecija",
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
  "valencia",
  "torrent",
  "gandia",
  "paterna",
  "sagunto",
  "mislata",
  "burjassot",
  "alicante",
  "elche",
  "torrevieja",
  "orihuela",
  "benidorm",
  "alcoy",
  "castellon-plana",
  "vila-real",
  "burriana",
  "vinaros",
  "bilbao",
  "barakaldo",
  "getxo",
  "portugalete",
  "santurtzi",
  "san-sebastian",
  "irun",
  "errenteria",
  "donostia",
  "vitoria-gasteiz",
  "llodio",
  "amurrio",
  "a-coruna",
  "santiago-compostela",
  "ferrol",
  "naron",
  "vigo",
  "pontevedra",
  "vilagarcia-arousa",
  "redondela",
  "ourense",
  "verin",
  "o-barco-valdeorras",
  "lugo",
  "monforte-lemos",
  "viveiro",
  "valladolid",
  "laguna-duero",
  "medina-campo",
  "burgos",
  "aranda-duero",
  "miranda-ebro",
  "salamanca",
  "bejar",
  "ciudad-rodrigo",
  "leon",
  "ponferrada",
  "san-andres-rabanedo",
  "zaragoza",
  "calatayud",
  "utebo",
  "ejea-caballeros",
  "huesca",
  "monzon",
  "barbastro",
  "murcia",
  "cartagena",
  "lorca",
  "molina-segura",
  "palma-mallorca",
  "inca",
  "manacor",
  "llucmajor",
  "las-palmas-gran-canaria",
  "telde",
  "santa-lucia-tirajana",
  "santa-cruz-tenerife",
  "san-cristobal-laguna",
  "arona",
  "oviedo",
  "gijon",
  "aviles",
  "siero",
  "santander",
  "torrelavega",
  "castro-urdiales",
  "pamplona",
  "tudela",
  "barañain",
  "burlada",
  "logroño",
  "calahorra",
  "arnedo",
  "badajoz",
  "caceres",
  "merida",
  "don-benito",
  "toledo",
  "talavera-reina",
  "illescas",
  "ciudad-real",
  "puertollano",
  "tomelloso",
  "albacete",
  "hellin",
  "villarrobledo",
]

export const dynamic = "force-static"
export const revalidate = 86400

export async function generateStaticParams() {
  const params: { id: string }[] = []

  for (const profession of PROFESSIONS) {
    for (const mod of MODIFIERS) {
      const name = mod === "" ? profession : `${profession}${mod}`
      params.push({ id: `${name}.xml` })
    }
  }

  for (const prefix of PREFIX_MODIFIERS) {
    for (const profession of PROFESSIONS) {
      params.push({ id: `${prefix}${profession}.xml` })
    }
  }

  for (const profession of PROFESSIONS) {
    params.push({ id: `${profession}-problemas.xml` })
  }

  return params
}

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: rawId } = await params
  const baseUrl = "https://www.rapidfix.es"
  const date = new Date().toISOString().split("T")[0]

  const id = rawId.endsWith(".xml") ? rawId.slice(0, -4) : rawId

  const urls: string[] = []

  if (id.endsWith("-problemas")) {
    const profession = id.replace("-problemas", "")
    const problems = PROBLEMS[profession] || []
    for (const problem of problems) {
      for (const city of CITIES) {
        urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}`)
      }
    }
  } else if (id.startsWith("precio-") || id.startsWith("presupuesto-")) {
    const prefix = id.startsWith("precio-") ? "precio-" : "presupuesto-"
    const profession = id.replace(prefix, "")
    for (const city of CITIES) {
      urls.push(`${baseUrl}/${prefix}${profession}/${city}`)
    }
  } else {
    let profession = ""
    let modifier = ""

    for (const p of PROFESSIONS) {
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
      for (const city of CITIES) {
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
