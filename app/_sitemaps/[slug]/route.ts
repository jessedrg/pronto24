import { NextResponse } from "next/server"
import { getAllCities } from "@/lib/seo-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const MAX_URLS_PER_SITEMAP = 50000

const _CITIES = [
  // Catalunya - Barcelona
  "barcelona",
  "hospitalet-llobregat",
  "badalona",
  "terrassa",
  "sabadell",
  "mataro",
  "santa-coloma-gramenet",
  "cornella-llobregat",
  "sant-boi-llobregat",
  "rubi",
  "manresa",
  "vilanova-geltru",
  "viladecans",
  "castelldefels",
  "el-prat-llobregat",
  "granollers",
  "cerdanyola-valles",
  "mollet-valles",
  "gava",
  "esplugues-llobregat",
  "sant-cugat-valles",
  "sant-feliu-llobregat",
  "vic",
  "igualada",
  "ripollet",
  "sant-adria-besos",
  "montcada-reixac",
  "sant-pere-ribes",
  "sitges",
  "martorell",
  "pineda-mar",
  "sant-joan-despi",
  "premia-mar",
  "calella",
  "el-masnou",
  "mongat",
  "malgrat-mar",
  "arenys-mar",
  "canet-mar",
  "cardedeu",
  "molins-rei",
  "sant-vicenc-dels-horts",
  "palleja",
  "barbera-valles",
  "santa-perpetua-mogoda",
  "llinars-valles",
  "la-garriga",
  "caldes-montbui",
  "parets-valles",
  "montmelo",
  "la-llagosta",
  "blanes",
  "lloret-mar",
  "sant-andreu-barca",
  "olesa-montserrat",
  "abrera",
  "esparreguera",
  "castellbisbal",
  "vilafranca-penedes",
  "el-vendrell",
  "calafell",
  "torredembarra",
  "cunit",
  "cubelles",
  // Catalunya - Girona
  "girona",
  "figueres",
  "olot",
  "salt",
  "palafrugell",
  "sant-feliu-guixols",
  "roses",
  "banyoles",
  "palamos",
  "ripoll",
  "lescala",
  "castello-empuries",
  "cadaques",
  "llanca",
  "tossa-mar",
  "begur",
  "pals",
  // Catalunya - Tarragona
  "tarragona",
  "reus",
  "tortosa",
  "cambrils",
  "salou",
  "valls",
  "amposta",
  "vila-seca",
  "miami-platja",
  // Catalunya - Lleida
  "lleida",
  "balaguer",
  "tarrega",
  "mollerussa",
  "la-seu-urgell",
  "solsona",
  "cervera",
  "tremp",
  "vielha",
  // Madrid
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
  "pozuelo-alarcon",
  "coslada",
  "rivas-vaciamadrid",
  "valdemoro",
  "majadahonda",
  "collado-villalba",
  "aranjuez",
  "arganda-rey",
  "boadilla-monte",
  "pinto",
  "colmenar-viejo",
  "tres-cantos",
  "san-sebastian-reyes",
  "san-fernando-henares",
  "el-escorial",
  "torrelodones",
  "galapagar",
  // Andalucia - Malaga
  "malaga",
  "marbella",
  "mijas",
  "fuengirola",
  "torremolinos",
  "benalmadena",
  "estepona",
  "velez-malaga",
  "rincon-victoria",
  "antequera",
  "ronda",
  "nerja",
  "alhaurin-torre",
  "coin",
  "alhaurin-grande",
  "cartama",
  "san-pedro-alcantara",
  "puerto-banus",
  "benahavis",
  "manilva",
  "casares",
  "ojen",
  "monda",
  "alora",
  "torre-mar",
  "algarrobo",
  "torrox",
  "competa",
  "frigiliana",
  // Andalucia - Sevilla
  "sevilla",
  "dos-hermanas",
  "alcala-guadaira",
  "utrera",
  "mairena-aljarafe",
  "ecija",
  "la-rinconada",
  "carmona",
  "coria-rio",
  "tomares",
  "bormujos",
  "gines",
  "camas",
  "lebrija",
  "moron-frontera",
  "osuna",
  "marchena",
  // Andalucia - Granada
  "granada",
  "motril",
  "armilla",
  "almunecar",
  "loja",
  "baza",
  "guadix",
  "santa-fe",
  "maracena",
  "las-gabias",
  "monachil",
  "salobrena",
  "la-herradura",
  "orgiva",
  "lanjaron",
  // Andalucia - Cordoba
  "cordoba",
  "lucena",
  "puente-genil",
  "montilla",
  "priego-cordoba",
  "cabra",
  "palma-rio",
  "baena",
  "pozoblanco",
  // Andalucia - Cadiz
  "cadiz",
  "jerez-frontera",
  "algeciras",
  "san-fernando",
  "el-puerto-santa-maria",
  "chiclana-frontera",
  "sanlucar-barrameda",
  "la-linea-concepcion",
  "rota",
  "puerto-real",
  "arcos-frontera",
  "tarifa",
  "conil-frontera",
  // Andalucia - Almeria
  "almeria",
  "el-ejido",
  "roquetas-mar",
  "nijar",
  "aguadulce",
  "adra",
  "vera",
  "mojacar",
  "garrucha",
  "carboneras",
  // Andalucia - Huelva
  "huelva",
  "lepe",
  "almonte",
  "isla-cristina",
  "ayamonte",
  "moguer",
  "punta-umbria",
  "matalascanas",
  // Andalucia - Jaen
  "jaen",
  "linares",
  "andujar",
  "ubeda",
  "baeza",
  "martos",
  "alcala-real",
  // Valencia
  "valencia",
  "torrent",
  "gandia",
  "paterna",
  "sagunto",
  "mislata",
  "burjassot",
  "ontinyent",
  "aldaia",
  "manises",
  "alzira",
  "xativa",
  "oliva",
  "denia",
  "javea",
  "calpe",
  "altea",
  "benidorm",
  "cullera",
  "sueca",
  // Alicante
  "alicante",
  "elche",
  "torrevieja",
  "orihuela",
  "san-vicente-raspeig",
  "el-campello",
  "santa-pola",
  "guardamar-segura",
  "pilar-horadada",
  "moraira",
  "benissa",
  "teulada",
  "alfaz-pi",
  "la-nucia",
  "villajoyosa",
  // Castellon
  "castellon-plana",
  "vila-real",
  "burriana",
  "vinaros",
  "benicarlo",
  "onda",
  "benicassim",
  "oropesa-mar",
  "peniscola",
  // Pais Vasco
  "bilbao",
  "barakaldo",
  "getxo",
  "portugalete",
  "santurtzi",
  "basauri",
  "durango",
  "ermua",
  "eibar",
  "gernika-lumo",
  "bermeo",
  "san-sebastian",
  "irun",
  "errenteria",
  "zarautz",
  "hondarribia",
  "tolosa",
  "vitoria-gasteiz",
  "llodio",
  // Galicia
  "a-coruna",
  "santiago-compostela",
  "ferrol",
  "naron",
  "oleiros",
  "arteixo",
  "carballo",
  "vigo",
  "pontevedra",
  "vilagarcia-arousa",
  "redondela",
  "cangas",
  "sanxenxo",
  "o-grove",
  "ourense",
  "lugo",
  "monforte-lemos",
  // Murcia
  "murcia",
  "cartagena",
  "lorca",
  "molina-segura",
  "alcantarilla",
  "mazarron",
  "aguilas",
  "cieza",
  "torre-pacheco",
  "san-javier",
  "san-pedro-pinatar",
  "los-alcazares",
  "la-manga",
  "archena",
  // Aragon
  "zaragoza",
  "calatayud",
  "utebo",
  "ejea-caballeros",
  "huesca",
  "monzon",
  "barbastro",
  "jaca",
  "teruel",
  "alcaniz",
  // Baleares
  "palma-mallorca",
  "calvia",
  "inca",
  "manacor",
  "llucmajor",
  "alcudia",
  "pollenca",
  "soller",
  "andratx",
  "magaluf",
  "santa-ponsa",
  "puerto-pollensa",
  "ibiza",
  "sant-antoni-portmany",
  "santa-eulalia-riu",
  "mahon",
  "ciutadella",
  // Canarias
  "las-palmas-gran-canaria",
  "telde",
  "arucas",
  "maspalomas",
  "playa-ingles",
  "puerto-rico",
  "santa-cruz-tenerife",
  "la-laguna",
  "arona",
  "adeje",
  "puerto-cruz",
  "los-cristianos",
  "playa-americas",
  "costa-adeje",
  // Castilla y Leon
  "valladolid",
  "burgos",
  "salamanca",
  "leon",
  "palencia",
  "zamora",
  "segovia",
  "avila",
  "soria",
  "ponferrada",
  // Castilla-La Mancha
  "toledo",
  "albacete",
  "ciudad-real",
  "guadalajara",
  "cuenca",
  "talavera-reina",
  "puertollano",
  "tomelloso",
  // Asturias
  "oviedo",
  "gijon",
  "aviles",
  "langreo",
  "mieres",
  "llanes",
  "ribadesella",
  "cangas-onis",
  // Cantabria
  "santander",
  "torrelavega",
  "castro-urdiales",
  "laredo",
  "santona",
  "noja",
  "comillas",
  "san-vicente-barquera",
  // Navarra
  "pamplona",
  "tudela",
  "baranain",
  "burlada",
  "estella-lizarra",
  // La Rioja
  "logrono",
  "calahorra",
  "arnedo",
  "haro",
  // Extremadura
  "badajoz",
  "caceres",
  "merida",
  "plasencia",
  "don-benito",
  "almendralejo",
]

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
    "subida-tension",
    "cable-quemado",
    "enchufe-fundido",
    "interruptor-roto",
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
    "bajante-roto",
    "arqueta-atascada",
    "presion-agua-baja",
    "sifon-atascado",
  ],
  cerrajero: [
    "puerta-bloqueada",
    "cerradura-rota",
    "llave-dentro",
    "robo",
    "cambio-cerradura",
    "copia-llaves",
    "cerradura-seguridad",
    "puerta-blindada",
    "bombin-roto",
    "apertura-urgente",
  ],
  desatascos: [
    "wc-atascado",
    "fregadero-atascado",
    "arqueta-atascada",
    "mal-olor",
    "ducha-atascada",
    "bajante-atascado",
    "limpieza-tuberias",
    "poceria",
    "fosa-septica",
    "banera-atascada",
  ],
  calderas: [
    "sin-agua-caliente",
    "caldera-no-enciende",
    "fuga-gas",
    "ruido-caldera",
    "revision-caldera",
    "cambio-caldera",
    "radiadores",
    "calefaccion-no-funciona",
    "termo-electrico",
    "presion-caldera",
  ],
}

const PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

function parseBaseIdAndPage(id: string): { baseId: string; page: number | null } {
  const match = id.match(/^(.*)--(\d+)$/)
  if (!match) return { baseId: id, page: null }
  const page = Number(match[2])
  if (!Number.isFinite(page) || page < 1) return { baseId: id, page: null }
  return { baseId: match[1], page }
}

function buildSitemapIndexXml(baseUrl: string, date: string, locs: string[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const loc of locs) {
    xml += `  <sitemap>\n    <loc>${loc}</loc>\n    <lastmod>${date}</lastmod>\n  </sitemap>\n`
  }
  xml += "</sitemapindex>"
  return xml
}

function buildUrlsetXml(date: string, urls: string[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const url of urls) {
    xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`
  }
  xml += "</urlset>"
  return xml
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const baseUrl = "https://rapidfix.es"
    const date = new Date().toISOString().split("T")[0]
    const cities = getAllCities()

    const rawId = slug.endsWith(".xml") ? slug.slice(0, -4) : slug
    const { baseId, page } = parseBaseIdAndPage(rawId)

    let totalUrls = 0

    if (baseId.endsWith("-problemas")) {
      const profession = baseId.replace("-problemas", "")
      const problems = PROBLEMS[profession] || []
      totalUrls = problems.length * cities.length
    } else if (baseId.startsWith("precio-") || baseId.startsWith("presupuesto-")) {
      const prefix = baseId.startsWith("precio-") ? "precio" : "presupuesto"
      const profession = baseId.replace(`${prefix}-`, "")
      totalUrls = PROFESSIONS.includes(profession) ? cities.length : 0
    } else {
      let foundProfession = ""

      if (PROFESSIONS.includes(baseId)) {
        foundProfession = baseId
      } else {
        for (const prof of PROFESSIONS) {
          for (const mod of MODIFIERS) {
            if (mod && baseId === `${prof}${mod}`) {
              foundProfession = prof
              break
            }
          }
          if (foundProfession) break
        }
      }

      totalUrls = foundProfession ? cities.length : 0
    }

    const totalPages = totalUrls > 0 ? Math.ceil(totalUrls / MAX_URLS_PER_SITEMAP) : 0

    if (page === null && totalPages > 1) {
      const locs = Array.from({ length: totalPages }, (_, i) => `${baseUrl}/${baseId}--${i + 1}.xml`)
      const xml = buildSitemapIndexXml(baseUrl, date, locs)
      return new NextResponse(xml, {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
      })
    }

    const effectivePage = page ?? 1
    const startIndex = (effectivePage - 1) * MAX_URLS_PER_SITEMAP
    const endIndexExclusive = Math.min(startIndex + MAX_URLS_PER_SITEMAP, totalUrls)

    const urls: string[] = []

    if (baseId.endsWith("-problemas")) {
      const profession = baseId.replace("-problemas", "")
      const problems = PROBLEMS[profession] || []
      let idx = 0
      for (const problem of problems) {
        for (const city of cities) {
          if (idx >= endIndexExclusive) break
          if (idx >= startIndex) urls.push(`${baseUrl}/problema/${profession}/${problem}/${city}`)
          idx += 1
        }
        if (idx >= endIndexExclusive) break
      }
    } else if (baseId.startsWith("precio-") || baseId.startsWith("presupuesto-")) {
      const prefix = baseId.startsWith("precio-") ? "precio" : "presupuesto"
      const profession = baseId.replace(`${prefix}-`, "")
      if (PROFESSIONS.includes(profession)) {
        const citiesSlice = cities.slice(startIndex, endIndexExclusive)
        for (const city of citiesSlice) {
          urls.push(`${baseUrl}/${prefix}-${profession}/${city}`)
        }
      }
    } else {
      let foundProfession = ""
      let foundModifier = ""

      if (PROFESSIONS.includes(baseId)) {
        foundProfession = baseId
        foundModifier = ""
      } else {
        for (const prof of PROFESSIONS) {
          for (const mod of MODIFIERS) {
            if (mod && baseId === `${prof}${mod}`) {
              foundProfession = prof
              foundModifier = mod
              break
            }
          }
          if (foundProfession) break
        }
      }

      if (foundProfession) {
        const citiesSlice = cities.slice(startIndex, endIndexExclusive)
        for (const city of citiesSlice) {
          if (foundModifier) {
            urls.push(`${baseUrl}/${foundProfession}${foundModifier}/${city}`)
          } else {
            urls.push(`${baseUrl}/${foundProfession}/${city}`)
          }
        }
      }
    }

    const xml = buildUrlsetXml(date, urls)

    return new NextResponse(xml, {
      status: 200,
      headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=86400" },
    })
  } catch (error) {
    console.error("Sitemap error:", error)
    return new NextResponse(
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>',
      {
        status: 200,
        headers: { "Content-Type": "application/xml; charset=utf-8" },
      },
    )
  }
}
