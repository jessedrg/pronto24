import { generateText, Output } from "ai"
import { neon } from "@neondatabase/serverless"
import { z } from "zod"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import {
  getZoneName,
  getCityFromPostalCode,
  getPostalCodeData,
  PROFESSIONS_POSTAL,
} from "@/lib/postal-data"

const sql = neon(process.env.DATABASE_URL!)

const BATCH_SIZE = 80 // CPs per run (x5 professions = ~400 pages per run)

/**
 * Schema for AI-generated local content.
 * Matches the LocalEnrichment interface so the CP page can use it seamlessly.
 */
const contentSchema = z.object({
  municipio: z.string().describe("Nombre del municipio o barrio"),
  poblacionAprox: z.string().describe("Poblacion aproximada, ej: ~25.000 habitantes"),
  tipoZona: z.enum(["urbana", "semiurbana", "rural"]),
  clima: z.string().describe("Tipo de clima de la zona"),
  descripcionLocal: z
    .string()
    .describe(
      "Descripcion unica de 2-3 frases sobre la zona, mencionando tipo de edificios, antiguedad, peculiaridades locales"
    ),
  problemasLocales: z
    .array(z.string())
    .describe(
      "3-4 problemas especificos y reales de la profesion en esta zona, detallados con datos tecnicos"
    ),
  infraestructura: z
    .string()
    .describe(
      "Descripcion de la infraestructura de vivienda/edificios de la zona, antiguedad, materiales"
    ),
  barriosZonas: z
    .array(z.string())
    .describe("2-4 barrios o zonas dentro de este codigo postal"),
  datosUnicos: z
    .array(z.string())
    .describe("2-3 datos unicos y verificables sobre la zona que la diferencian"),
})

/**
 * Get the next batch of CPs that need content generated.
 * Prioritizes CPs that don't have any content yet.
 */
async function getNextBatch(): Promise<string[]> {
  const allCPs = Object.keys(POSTAL_CODE_NAMES)

  // Get CPs that already have content for ALL 5 professions
  const existing = await sql`
    SELECT postal_code 
    FROM cp_generated_content 
    GROUP BY postal_code 
    HAVING COUNT(DISTINCT profession) = 5
  `
  const existingSet = new Set(existing.map((r: { postal_code: string }) => r.postal_code))

  // Filter to CPs that still need content
  const pending = allCPs.filter((cp) => !existingSet.has(cp))

  // Prioritize: capital/large city CPs first, then by CP number
  const prioritized = pending.sort((a, b) => {
    const aScore = getCPPriorityScore(a)
    const bScore = getCPPriorityScore(b)
    return bScore - aScore // Higher score = higher priority
  })

  return prioritized.slice(0, BATCH_SIZE)
}

/**
 * Score a CP for generation priority.
 * Capital cities and major metro areas get higher scores.
 */
function getCPPriorityScore(cp: string): number {
  const cpNum = parseInt(cp, 10)
  let score = 0

  // Madrid capital (28001-28055)
  if (cpNum >= 28001 && cpNum <= 28055) score += 100
  // Barcelona capital (08001-08042)
  if (cpNum >= 8001 && cpNum <= 8042) score += 100
  // Valencia capital
  if (cpNum >= 46001 && cpNum <= 46026) score += 90
  // Sevilla capital
  if (cpNum >= 41001 && cpNum <= 41020) score += 90
  // Malaga capital
  if (cpNum >= 29001 && cpNum <= 29018) score += 85
  // Zaragoza
  if (cpNum >= 50001 && cpNum <= 50018) score += 85
  // Bilbao
  if (cpNum >= 48001 && cpNum <= 48015) score += 80
  // Murcia
  if (cpNum >= 30001 && cpNum <= 30012) score += 80
  // Palma
  if (cpNum >= 7001 && cpNum <= 7015) score += 80
  // Major metro areas (high population prefixes)
  const prefix2 = cp.substring(0, 2)
  if (["28", "08", "46", "41", "29", "50", "48", "30", "07", "35", "03", "15", "36", "33", "11", "18"].includes(prefix2)) {
    score += 50
  }
  // All other provincial capitals (first CPs tend to be capitals)
  if (cpNum % 1000 <= 20) score += 30

  return score
}

/**
 * Generate content for a single CP + profession combination using AI.
 */
async function generateContentForCP(
  cp: string,
  professionId: string,
  professionName: string,
  zoneName: string,
  cityName: string,
  provincia: string
): Promise<z.infer<typeof contentSchema> | null> {
  try {
    const result = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({ schema: contentSchema }),
      prompt: `Eres un experto en servicios de hogar en Espana. Genera contenido LOCAL, REAL y ESPECIFICO para un servicio de ${professionName.toLowerCase()} en la zona del codigo postal ${cp}.

DATOS DE LA ZONA:
- Codigo postal: ${cp}
- Zona/Barrio: ${zoneName}
- Ciudad: ${cityName}
- Provincia: ${provincia}

INSTRUCCIONES CRITICAS:
1. El contenido debe ser REAL y VERIFICABLE. No inventes datos falsos.
2. Menciona problemas TECNICOS reales y especificos de la profesion de ${professionName.toLowerCase()}:
   - Para fontaneros: dureza del agua, tipo de tuberias segun la epoca del edificio, problemas de presion
   - Para electricistas: tipo de instalaciones segun la epoca, problemas de potencia, normativa REBT
   - Para cerrajeros: tipos de cerraduras comunes en la zona, seguridad de portales
   - Para desatascos: tipo de red de saneamiento, problemas estacionales, diametros de bajantes
   - Para calderas: tipo de calefaccion predominante, marcas comunes, eficiencia energetica
3. Menciona el tipo de EDIFICIOS reales de la zona (epoca de construccion, alturas, materiales)
4. Incluye datos sobre el CLIMA de la zona y como afecta a las instalaciones
5. Menciona BARRIOS o zonas reales dentro del codigo postal
6. Los problemas deben ser DETALLADOS con datos tecnicos (diametros, materiales, temperaturas, etc.)
7. NO uses lenguaje comercial ni publicitario. Solo datos tecnicos y locales.
8. Escribe en espanol SIN acentos para mejor compatibilidad.`,
    })

    return result.output
  } catch (error) {
    console.error(`Error generating content for ${cp}/${professionId}:`, error)
    return null
  }
}

/**
 * Save generated content to DB and queue for indexing.
 */
async function saveContent(
  cp: string,
  professionId: string,
  content: z.infer<typeof contentSchema>
) {
  const contentJson = {
    municipio: content.municipio,
    provincia: "", // filled from postal data
    comunidadAutonoma: "",
    poblacionAprox: content.poblacionAprox,
    tipoZona: content.tipoZona,
    clima: content.clima,
    descripcionLocal: content.descripcionLocal,
    problemasLocales: content.problemasLocales,
    infraestructura: content.infraestructura,
    barriosZonas: content.barriosZonas,
    datosUnicos: content.datosUnicos,
  }

  // Upsert content
  await sql`
    INSERT INTO cp_generated_content (postal_code, profession, content, status)
    VALUES (${cp}, ${professionId}, ${JSON.stringify(contentJson)}, 'active')
    ON CONFLICT (postal_code, profession) 
    DO UPDATE SET 
      content = ${JSON.stringify(contentJson)},
      status = 'active',
      updated_at = NOW()
  `

  // Queue for Google indexing
  const url = `https://www.pronto-24.com/${professionId}/cp/${cp}/`
  await sql`
    INSERT INTO indexing_queue (url, postal_code, profession, status)
    VALUES (${url}, ${cp}, ${professionId}, 'pending')
    ON CONFLICT (url) 
    DO UPDATE SET 
      status = 'pending',
      updated_at = NOW(),
      submitted_at = NULL
  `
}

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}

// POST for manual triggers from admin panel
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runGeneration()
}

// GET for Vercel cron
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }
  return runGeneration()
}

async function runGeneration() {

  const startTime = Date.now()
  const batch = await getNextBatch()

  if (batch.length === 0) {
    return Response.json({
      message: "No pending CPs to generate content for",
      totalGenerated: 0,
    })
  }

  // Log the batch start
  await sql`
    INSERT INTO content_generation_log (batch_size, status, details)
    VALUES (${batch.length}, 'running', ${JSON.stringify({ cps: batch.slice(0, 10) })})
  `

  let generated = 0
  let errors = 0

  for (const cp of batch) {
    const postalData = getPostalCodeData(cp)
    const zoneName = getZoneName(cp)
    const cityName = getCityFromPostalCode(cp)
    const provincia = postalData?.provincia || "Espana"

    // Generate content for each profession in parallel (5 at a time per CP)
    const results = await Promise.allSettled(
      PROFESSIONS_POSTAL.map(async (prof) => {
        // Check if content already exists for this CP+profession
        const existing = await sql`
          SELECT id FROM cp_generated_content 
          WHERE postal_code = ${cp} AND profession = ${prof.id}
        `
        if (existing.length > 0) return null

        const content = await generateContentForCP(
          cp,
          prof.id,
          prof.name,
          zoneName,
          cityName,
          provincia
        )

        if (content) {
          await saveContent(cp, prof.id, content)
          return true
        }
        return null
      })
    )

    for (const r of results) {
      if (r.status === "fulfilled" && r.value === true) generated++
      if (r.status === "rejected") errors++
    }

    // Safety: stop if we're approaching the 60s timeout
    if (Date.now() - startTime > 55000) {
      break
    }
  }

  const duration = Date.now() - startTime

  // Log completion
  await sql`
    INSERT INTO content_generation_log (batch_size, cps_generated, pages_generated, errors, duration_ms, status)
    VALUES (${batch.length}, ${Math.ceil(generated / 5)}, ${generated}, ${errors}, ${duration}, 'completed')
  `

  return Response.json({
    message: `Content generation complete`,
    batchSize: batch.length,
    pagesGenerated: generated,
    errors,
    durationMs: duration,
    nextPending: (await getNextBatch()).length,
  })
}
