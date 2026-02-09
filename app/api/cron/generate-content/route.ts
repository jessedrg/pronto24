import { NextResponse } from "next/server"
import { generateText, Output } from "ai"
import { z } from "zod"
import { getSQL } from "@/lib/db"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { PROFESSIONS_POSTAL } from "@/lib/postal-data"
import { getPostalCodeData, getCityFromPostalCode } from "@/lib/postal-data"

const BATCH_SIZE = 80 // CPs per run (x5 professions = ~400 pages per run)
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pronto-24.com"

// Priority order: capitals first, then by population
const CP_PRIORITY_RANGES: [number, number][] = [
  [28001, 28055], // Madrid
  [8001, 8042],   // Barcelona
  [46001, 46026], // Valencia
  [41001, 41020], // Sevilla
  [50001, 50018], // Zaragoza
  [29001, 29018], // Malaga
  [48001, 48015], // Bilbao
  [30001, 30012], // Murcia
  [7001, 7015],   // Palma
  [35001, 35018], // Las Palmas
  [3001, 3016],   // Alicante
  [14001, 14014], // Cordoba
  [47001, 47014], // Valladolid
  [36201, 36214], // Vigo
  [33201, 33212], // Gijon
  [15001, 15011], // A Coruna
  [18001, 18015], // Granada
  [20001, 20018], // San Sebastian
  [39001, 39012], // Santander
  [33001, 33013], // Oviedo
  [31001, 31015], // Pamplona
  [43001, 43010], // Tarragona
  [11001, 11012], // Cadiz
  [4001, 4009],   // Almeria
  [9001, 9007],   // Burgos
  [37001, 37008], // Salamanca
  [28930, 28938], // Mostoles
  [28920, 28926], // Alcorcon
  [28901, 28906], // Getafe
  [8901, 8908],   // Hospitalet
  [38001, 38010], // Santa Cruz
  [8220, 8228],   // Terrassa
  [8201, 8208],   // Sabadell
]

/**
 * Get all CPs in priority order, capitals first.
 */
function getPrioritizedCPs(): string[] {
  const allCPs = Object.keys(POSTAL_CODE_NAMES)
  const prioritized: string[] = []
  const prioritySet = new Set<string>()

  // First: add CPs from capital city ranges in order
  for (const [min, max] of CP_PRIORITY_RANGES) {
    for (let i = min; i <= max; i++) {
      const cp = i.toString().padStart(5, "0")
      if (allCPs.includes(cp) && !prioritySet.has(cp)) {
        prioritized.push(cp)
        prioritySet.add(cp)
      }
    }
  }

  // Then: add remaining CPs
  for (const cp of allCPs.sort()) {
    if (!prioritySet.has(cp)) {
      prioritized.push(cp)
    }
  }

  return prioritized
}

const contentSchema = z.object({
  municipio: z.string(),
  descripcionLocal: z.string().describe("2-3 frases describiendo la zona, su tipo de viviendas, y particularidades. No incluir nombre de empresa."),
  problemasLocales: z.array(z.string()).describe("3-5 problemas tecnicos REALES y especificos de la zona para esta profesion"),
  infraestructura: z.string().describe("1-2 frases sobre el estado de las instalaciones en la zona"),
  datosUnicos: z.array(z.string()).describe("2-3 datos verificables y unicos sobre esta zona relevantes al servicio"),
  clima: z.string().nullable().describe("Breve descripcion del clima si afecta al servicio"),
  tipoZona: z.enum(["urbana", "semiurbana", "rural"]),
  consejo: z.string().describe("Un consejo tecnico real y util para habitantes de esta zona con este tipo de problema"),
})

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runGeneration()
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runGeneration()
}

async function runGeneration() {
  const startTime = Date.now()
  const sql = getSQL()

  try {
    // Get CPs that already have content
    const existing = await sql`
      SELECT DISTINCT postal_code FROM cp_generated_content WHERE status = 'active'
    `
    const existingSet = new Set(existing.map((r) => r.postal_code))

    // Get next batch of CPs to process (skip already generated)
    const allPrioritized = getPrioritizedCPs()
    const toProcess = allPrioritized.filter((cp) => !existingSet.has(cp)).slice(0, BATCH_SIZE)

    if (toProcess.length === 0) {
      return NextResponse.json({
        message: "All CPs already have generated content",
        totalGenerated: existingSet.size,
      })
    }

    let pagesGenerated = 0
    let errors = 0

    for (const cp of toProcess) {
      const postalData = getPostalCodeData(cp)
      const cityName = getCityFromPostalCode(cp)
      const cpName = POSTAL_CODE_NAMES[cp as keyof typeof POSTAL_CODE_NAMES] || cityName

      for (const prof of PROFESSIONS_POSTAL) {
        try {
          const { output } = await generateText({
            model: "openai/gpt-4o-mini",
            output: Output.object({ schema: contentSchema }),
            prompt: `Genera contenido LOCAL REAL y TECNICO para una pagina de servicio de ${prof.name} en el codigo postal ${cp} (${cpName}, ${cityName}).

REGLAS ESTRICTAS:
- Solo datos VERIFICABLES y REALES sobre la zona
- Problemas tecnicos ESPECIFICOS de la zona (tipo de viviendas, antiguedad, materiales, clima local)
- NO mencionar ninguna empresa ni marca
- NO inventar estadisticas de satisfaccion ni reviews
- Tono tecnico-profesional, como un experto local que conoce la zona
- El contenido debe ser UNICO para esta combinacion de CP+profesion
- Piensa en que tipo de edificios hay (antiguos, nuevos, bloques, chalets), que problemas tipicos tienen
- Considera el clima de la zona y como afecta a las instalaciones

Provincia/Region: ${postalData?.provincia || "Espana"}
Nombre de la zona: ${cpName}
Ciudad: ${cityName}`,
          })

          if (output) {
            // Insert content into DB
            await sql`
              INSERT INTO cp_generated_content (postal_code, profession, content, status)
              VALUES (${cp}, ${prof.id}, ${JSON.stringify(output)}, 'active')
              ON CONFLICT (postal_code, profession) 
              DO UPDATE SET content = ${JSON.stringify(output)}, status = 'active', updated_at = NOW()
            `

            // Add to indexing queue
            const url = `${SITE_URL}/${prof.id}/cp/${cp}/`
            await sql`
              INSERT INTO indexing_queue (postal_code, profession, url, status)
              VALUES (${cp}, ${prof.id}, ${url}, 'pending')
              ON CONFLICT (postal_code, profession) 
              DO UPDATE SET status = 'pending', updated_at = NOW()
            `

            pagesGenerated++
          }
        } catch (e) {
          console.error(`[v0] Error generating content for ${cp}/${prof.id}:`, e)
          errors++
        }
      }
    }

    const durationMs = Date.now() - startTime

    // Log the batch
    await sql`
      INSERT INTO content_generation_log (batch_size, cps_generated, pages_generated, errors, duration_ms, status, details)
      VALUES (
        ${BATCH_SIZE},
        ${toProcess.length},
        ${pagesGenerated},
        ${errors},
        ${durationMs},
        'completed',
        ${JSON.stringify({ cps: toProcess.slice(0, 10), totalExisting: existingSet.size })}
      )
    `

    return NextResponse.json({
      message: `Generated ${pagesGenerated} pages for ${toProcess.length} CPs`,
      pagesGenerated,
      cpsProcessed: toProcess.length,
      errors,
      durationMs,
      totalExisting: existingSet.size + toProcess.length,
    })
  } catch (e) {
    console.error("[v0] Content generation cron error:", e)
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Unknown error" },
      { status: 500 }
    )
  }
}
