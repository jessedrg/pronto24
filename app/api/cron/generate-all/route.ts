import { NextResponse } from "next/server"
import { after } from "next/server"
import { generateText, Output } from "ai"
import { z } from "zod"
import { getSQL } from "@/lib/db"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { PROFESSIONS_POSTAL } from "@/lib/postal-data"
import { getPostalCodeData, getCityFromPostalCode } from "@/lib/postal-data"

// Max duration for Vercel serverless function (Pro plan = 300s)
export const maxDuration = 300

// Bigger batch for "generate all" mode: 10 CPs x 5 professions = 50 AI calls
const BATCH_SIZE = 10
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

function getPrioritizedCPs(): string[] {
  const allCPs = Object.keys(POSTAL_CODE_NAMES)
  const prioritized: string[] = []
  const prioritySet = new Set<string>()

  for (const [min, max] of CP_PRIORITY_RANGES) {
    for (let i = min; i <= max; i++) {
      const cp = i.toString().padStart(5, "0")
      if (allCPs.includes(cp) && !prioritySet.has(cp)) {
        prioritized.push(cp)
        prioritySet.add(cp)
      }
    }
  }

  for (const cp of allCPs.sort()) {
    if (!prioritySet.has(cp)) {
      prioritized.push(cp)
    }
  }

  return prioritized
}

const contentSchema = z.object({
  municipio: z.string(),
  descripcionLocal: z.string().describe("2-4 frases con personalidad propia sobre la zona. Mencionar calles, plazas o barrios concretos. Varia entre frases cortas y largas. No usar 'destaca por' ni 'se caracteriza por'."),
  problemasLocales: z.array(z.string()).describe("3-5 problemas tecnicos MUY especificos. Incluir materiales exactos (plomo, fibrocemento, hierro galvanizado), anos concretos de construccion, y causas tecnicas reales. Cada problema debe ser diferente en estructura gramatical."),
  infraestructura: z.string().describe("2-3 frases sobre el estado real de las instalaciones. Mencionar anos de construccion, materiales, y si ha habido renovaciones recientes o no."),
  datosUnicos: z.array(z.string()).describe("2-4 datos hiperlocales verificables: dureza del agua en grados franceses, tipo de suelo, normativa municipal especifica, datos del catastro o INE sobre antiguedad de edificios."),
  clima: z.string().nullable().describe("Solo si afecta directamente al servicio. Ser especifico: humedad relativa media, heladas/ano, mm de lluvia, etc."),
  tipoZona: z.enum(["urbana", "semiurbana", "rural"]),
  consejo: z.string().describe("Un consejo tecnico MUY concreto y accionable, como lo diria un profesional con 20 anos de experiencia en la zona. Incluir una medida preventiva especifica."),
})

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization")
  return authHeader === `Bearer ${process.env.CRON_SECRET}`
}

/**
 * POST /api/cron/generate-all
 * 
 * Fire-and-forget that auto-chains: processes a batch, then calls itself
 * for the next batch until all CPs are done. One button press = all pages generated.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new Response("Unauthorized", { status: 401 })
  }

  // Check for stop signal
  const sql = getSQL()
  try {
    const stopFlag = await sql`
      SELECT value FROM kv_flags WHERE key = 'generate_all_stop' LIMIT 1
    `
    if (stopFlag.length > 0 && stopFlag[0].value === 'true') {
      // Clear the flag and stop
      await sql`DELETE FROM kv_flags WHERE key = 'generate_all_stop'`
      return NextResponse.json({
        status: "stopped",
        message: "Generation stopped by user request.",
      })
    }
  } catch {
    // kv_flags table might not exist yet, ignore
  }

  // Figure out what's left
  let remaining = 0
  let totalExisting = 0
  try {
    const existing = await sql`
      SELECT COUNT(DISTINCT postal_code) as count FROM cp_generated_content WHERE status = 'active'
    `
    totalExisting = Number(existing[0]?.count || 0)

    const allPrioritized = getPrioritizedCPs()
    const existingCPs = await sql`
      SELECT DISTINCT postal_code FROM cp_generated_content WHERE status = 'active'
    `
    const existingSet = new Set(existingCPs.map((r) => r.postal_code))
    remaining = allPrioritized.filter((cp) => !existingSet.has(cp)).length
  } catch {
    // continue anyway
  }

  if (remaining === 0) {
    return NextResponse.json({
      status: "done",
      message: "All CPs already have generated content!",
      totalGenerated: totalExisting,
    })
  }

  // Schedule the actual work + self-chain in background
  after(async () => {
    await runBatchAndChain()
  })

  return NextResponse.json({
    status: "accepted",
    message: `Generation chain started. ${remaining} CPs remaining. Processing batches of ${BATCH_SIZE} automatically.`,
    totalExisting,
    remaining,
    batchSize: BATCH_SIZE,
  })
}

// Also support GET for manual testing
export async function GET(request: Request) {
  return POST(request)
}

const toneVariants = [
  "Escribe como un tecnico veterano de la zona que lleva 20 anos trabajando ahi. Usa un tono directo, sin florituras.",
  "Escribe como si redactaras una ficha tecnica interna para un equipo de profesionales que van a trabajar en esta zona por primera vez.",
  "Escribe como un vecino de la zona que ademas es profesional del gremio. Conoces cada calle y cada edificio.",
  "Escribe como un perito tasador que describe las particularidades tecnicas de las viviendas de la zona para un informe.",
  "Escribe como un inspector municipal que conoce los problemas recurrentes de esta zona por las quejas vecinales.",
]
const styleVariants = [
  "Alterna entre frases cortas y frases mas desarrolladas. No empieces todas las frases igual.",
  "Usa alguna expresion coloquial tecnica entre frases formales. Varia la longitud de las frases.",
  "Se directo y concreto. Evita subordinadas largas. Mezcla datos con observaciones practicas.",
  "Combina datos tecnicos con anecdotas tipicas de la zona. No uses listas mentales, varia la estructura.",
  "Empieza por lo mas llamativo de la zona. Luego baja al detalle tecnico. Cierra con algo practico.",
]

/**
 * Process one batch, log it, then self-invoke for the next batch.
 * This creates an autonomous chain that runs until all CPs are processed.
 */
async function runBatchAndChain() {
  const startTime = Date.now()
  const sql = getSQL()

  try {
    // Get CPs that already have content
    const existing = await sql`
      SELECT DISTINCT postal_code FROM cp_generated_content WHERE status = 'active'
    `
    const existingSet = new Set(existing.map((r) => r.postal_code))

    const allPrioritized = getPrioritizedCPs()
    const toProcess = allPrioritized.filter((cp) => !existingSet.has(cp)).slice(0, BATCH_SIZE)

    if (toProcess.length === 0) {
      console.log("[generate-all] No more CPs to process. Chain complete!")
      return
    }

    let pagesGenerated = 0
    let errors = 0

    for (const cp of toProcess) {
      const postalData = getPostalCodeData(cp)
      const cityName = getCityFromPostalCode(cp)
      const cpName = POSTAL_CODE_NAMES[cp as keyof typeof POSTAL_CODE_NAMES] || cityName

      for (const prof of PROFESSIONS_POSTAL) {
        try {
          const selectedTone = toneVariants[Math.floor(Math.random() * toneVariants.length)]
          const selectedStyle = styleVariants[Math.floor(Math.random() * styleVariants.length)]

          const { output } = await generateText({
            model: "openai/gpt-4o-mini",
            output: Output.object({ schema: contentSchema }),
            system: `Eres un redactor tecnico especializado en servicios para el hogar en Espana. Tu trabajo es crear contenido hiperlocal que parece escrito por alguien que VIVE en la zona.

REGLAS ANTI-DETECCION IA (CRITICO):
- NUNCA uses estas palabras/frases: "destaca por", "se caracteriza", "es importante destacar", "cabe mencionar", "sin duda", "en definitiva", "a lo largo de", "en este sentido", "juega un papel", "es fundamental"
- NUNCA empieces 2 frases seguidas con la misma estructura gramatical
- VARIA la longitud de las frases: mezcla frases de 5 palabras con frases de 25
- USA contracciones y expresiones naturales del espanol: "no suele", "lo tipico es", "lo que pasa es que", "ojo con", "lo normal aqui"
- INCLUYE alguna imperfeccion natural: una frase que empiece con "Y" o "Pero", alguna aclaracion entre guiones
- EVITA listas donde cada item empieza con la misma estructura (articulo + sustantivo + adjetivo)
- Cada problema tecnico debe tener una estructura gramatical DIFERENTE: uno puede empezar con el material, otro con la ubicacion, otro con la consecuencia

${selectedTone}
${selectedStyle}

REGLAS DE CONTENIDO:
- Solo datos que un profesional local podria saber: materiales de construccion por decada, normativa local, dureza del agua, tipo de suelo
- Problemas tecnicos con CAUSA RAIZ: no "tuberias antiguas" sino "tuberias de hierro galvanizado de los 70 con corrosion interna que reduce el caudal un 40%"
- Datos del catastro, INE, o ayuntamiento cuando sea posible
- NO mencionar ninguna empresa, marca ni Pronto24
- NO inventar porcentajes de satisfaccion ni numero de clientes`,
            prompt: `Codigo postal: ${cp}
Zona: ${cpName}
Ciudad: ${cityName}
Provincia: ${postalData?.provincia || "Espana"}
Profesion: ${prof.name} (${prof.id})

Genera contenido LOCAL para una pagina de servicio de ${prof.name} en ${cpName} (${cp}).

CONTEXTO TECNICO QUE DEBES CONSIDERAR:
- Decada de construccion predominante en esta zona (busca en tu conocimiento sobre urbanismo espanol)
- Material de tuberias segun la epoca: plomo (pre-1970), hierro galvanizado (1960-1985), cobre (1975-2000), PEX/multicapa (2000+)
- Material electrico segun epoca: aluminio (pre-1975), cobre con aislamiento PVC fino (1970-1990), cobre con aislamiento moderno (1990+)
- Dureza del agua de la zona (varia mucho por provincia)
- Clima local y como afecta: heladas, humedad costera, calor extremo, lluvias torrenciales
- Si hay gas natural en la zona o se usa butano/propano
- Tipo de edificacion: bloques, chalets, adosados, casas de pueblo, edificios historicos

IMPORTANTE: Cada campo debe sonar como si lo hubiera escrito una persona diferente. No repitas patrones.`,
          })

          if (output) {
            await sql`
              INSERT INTO cp_generated_content (postal_code, profession, content, status)
              VALUES (${cp}, ${prof.id}, ${JSON.stringify(output)}, 'active')
              ON CONFLICT (postal_code, profession) 
              DO UPDATE SET content = ${JSON.stringify(output)}, status = 'active', updated_at = NOW()
            `

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
          console.error(`[generate-all] Error for ${cp}/${prof.id}:`, e)
          errors++
        }
      }
    }

    const durationMs = Date.now() - startTime

    // Log this batch
    await sql`
      INSERT INTO content_generation_log (batch_size, cps_generated, pages_generated, errors, duration_ms, status, details)
      VALUES (
        ${BATCH_SIZE},
        ${toProcess.length},
        ${pagesGenerated},
        ${errors},
        ${durationMs},
        'completed',
        ${JSON.stringify({ mode: "generate-all", cps: toProcess, totalExisting: existingSet.size })}
      )
    `

    console.log(`[generate-all] Batch done: ${pagesGenerated} pages, ${errors} errors, ${durationMs}ms. Chaining next batch...`)

    // Check stop flag before chaining
    let shouldStop = false
    try {
      const stopFlag = await sql`
        SELECT value FROM kv_flags WHERE key = 'generate_all_stop' LIMIT 1
      `
      if (stopFlag.length > 0 && stopFlag[0].value === 'true') {
        shouldStop = true
        await sql`DELETE FROM kv_flags WHERE key = 'generate_all_stop'`
        console.log("[generate-all] Stop flag detected. Stopping chain.")
      }
    } catch {
      // ignore
    }

    // Check if there are more CPs to process
    const remainingAfter = allPrioritized.filter((cp) => !existingSet.has(cp)).length - toProcess.length
    
    if (remainingAfter > 0 && !shouldStop) {
      // Self-chain: call ourselves to process the next batch
      try {
        await fetch(`${SITE_URL}/api/cron/generate-all`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CRON_SECRET}`,
          },
        })
        console.log(`[generate-all] Chained next batch. ~${remainingAfter} CPs remaining.`)
      } catch (e) {
        console.error("[generate-all] Failed to chain next batch:", e)
        // The chain breaks here, but existing content is safe.
        // User can restart from admin panel.
      }
    } else {
      console.log("[generate-all] All CPs processed or stopped! Chain complete.")
    }
  } catch (e) {
    console.error("[generate-all] Fatal error:", e)
    try {
      await sql`
        INSERT INTO content_generation_log (batch_size, cps_generated, pages_generated, errors, duration_ms, status, details)
        VALUES (${BATCH_SIZE}, 0, 0, 1, ${Date.now() - startTime}, 'failed', ${JSON.stringify({ mode: "generate-all", error: e instanceof Error ? e.message : "Unknown error" })})
      `
    } catch {
      // nothing we can do
    }
  }
}
