import { NextResponse } from "next/server"
import { VALID_PROFESSIONS, CITIES, MODIFIERS, PROBLEMS, type Profession } from "@/lib/sitemap-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

// Max 50,000 URLs per sitemap (Google limit)
const MAX_URLS_PER_SITEMAP = 45000 // Leave margin

// High-population cities get higher priority
const TOP_CITIES = new Set([
  "madrid", "barcelona", "valencia", "sevilla", "zaragoza", "malaga", "murcia",
  "palma-de-mallorca", "las-palmas-de-gran-canaria", "bilbao", "alicante",
  "cordoba", "valladolid", "vigo", "gijon", "hospitalet-de-llobregat",
  "vitoria-gasteiz", "la-coruna", "granada", "elche", "oviedo", "badalona",
  "cartagena", "terrassa", "jerez-de-la-frontera", "sabadell", "mostoles",
  "alcala-de-henares", "pamplona", "fuenlabrada", "almeria", "leganes",
  "san-sebastian", "santander", "burgos", "castellon-de-la-plana", "albacete",
  "getafe", "alcorcon", "logrono", "badajoz", "salamanca", "huelva",
  "marbella", "lleida", "tarragona", "leon", "cadiz", "jaen", "ourense",
  "lugo", "santiago-de-compostela", "caceres", "melilla", "guadalajara",
  "toledo", "pontevedra", "palencia", "ciudad-real", "zamora", "avila",
  "cuenca", "huesca", "segovia", "soria", "teruel"
])

function getCityPriority(city: string, isModifier: boolean): string {
  if (TOP_CITIES.has(city)) return isModifier ? "0.7" : "0.9"
  return isModifier ? "0.5" : "0.7"
}

function getProblemPriority(city: string): string {
  return TOP_CITIES.has(city) ? "0.8" : "0.6"
}

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params
    const baseUrl = "https://www.pronto-24.com"
    const date = new Date().toISOString().split("T")[0]
    const id = slug.endsWith(".xml") ? slug.slice(0, -4) : slug

    const urlEntries: { url: string; priority: string; changefreq: string }[] = []

    // Handle chunked problemas sitemaps: electricista-problemas-1, electricista-problemas-2, etc.
    const problemasMatch = id.match(/^(.+)-problemas-(\d+)$/)
    if (problemasMatch) {
      const profession = problemasMatch[1] as Profession
      const chunkIndex = parseInt(problemasMatch[2], 10) - 1 // 1-indexed to 0-indexed
      const problems = PROBLEMS[profession] || []
      
      // Calculate which problems go in this chunk
      const urlsPerProblem = CITIES.length
      const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem)
      const startProblem = chunkIndex * problemsPerChunk
      const endProblem = Math.min(startProblem + problemsPerChunk, problems.length)
      
      for (let i = startProblem; i < endProblem; i++) {
        const problem = problems[i]
        for (const city of CITIES) {
          urlEntries.push({
            url: `${baseUrl}/problema/${profession}/${problem}/${city}/`,
            priority: getProblemPriority(city),
            changefreq: "weekly",
          })
        }
      }
    } else if (id.endsWith("-problemas")) {
      // Legacy: if no chunk number, return first chunk only
      const profession = id.replace("-problemas", "") as Profession
      const problems = PROBLEMS[profession] || []
      const urlsPerProblem = CITIES.length
      const problemsPerChunk = Math.floor(MAX_URLS_PER_SITEMAP / urlsPerProblem)
      
      for (let i = 0; i < Math.min(problemsPerChunk, problems.length); i++) {
        const problem = problems[i]
        for (const city of CITIES) {
          urlEntries.push({
            url: `${baseUrl}/problema/${profession}/${problem}/${city}/`,
            priority: getProblemPriority(city),
            changefreq: "weekly",
          })
        }
      }
    } else if (id.startsWith("precio-") || id.startsWith("presupuesto-")) {
      const prefix = id.startsWith("precio-") ? "precio" : "presupuesto"
      const profession = id.replace(`${prefix}-`, "")
      if (VALID_PROFESSIONS.includes(profession as Profession)) {
        for (const city of CITIES) {
          urlEntries.push({
            url: `${baseUrl}/${prefix}-${profession}/${city}/`,
            priority: getCityPriority(city, true),
            changefreq: "weekly",
          })
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
        const isModifier = foundModifier !== ""
        for (const city of CITIES) {
          const url = foundModifier
            ? `${baseUrl}/${foundProfession}${foundModifier}/${city}/`
            : `${baseUrl}/${foundProfession}/${city}/`
          urlEntries.push({
            url,
            priority: getCityPriority(city, isModifier),
            changefreq: "weekly",
          })
        }
      }
    }

    // Optimized XML generation with differentiated priorities
    const xmlParts = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urlEntries.map(e => `<url><loc>${e.url}</loc><lastmod>${date}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`),
      '</urlset>'
    ]
    const xml = xmlParts.join('\n')

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
