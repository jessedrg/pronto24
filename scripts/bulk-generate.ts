/**
 * BULK AI CONTENT GENERATION SCRIPT
 * 
 * Run from your local machine inside the project directory:
 *   npx tsx scripts/bulk-generate.ts
 * 
 * Make sure you have a .env.local file with:
 *   NEON_DATABASE_URL=...
 *   OPENAI_API_KEY=...
 * 
 * Options (env vars):
 *   CONCURRENCY=20        - Number of parallel requests (default 20)
 *   START_FROM=0          - Skip first N items in queue (for resuming)
 *   DRY_RUN=true          - Just count, don't generate
 *   PROFESSION=electricista - Only generate for this profession
 *   PAGE_TYPE=city         - Only "city" or "problem" pages
 */

import { config } from "dotenv"
config({ path: ".env.local" })

import { neon } from "@neondatabase/serverless"
import { generateText, Output } from "ai"
import { z } from "zod"
import {
  PROFESSIONS,
  PROBLEMS,
  getCityDisplayName,
  getCityRegion,
  getAllCities,
} from "../lib/seo-data"

// ─── Config ───────────────────────────────────────────────────────────────
const CONCURRENCY = parseInt(process.env.CONCURRENCY || "20")
const START_FROM = parseInt(process.env.START_FROM || "0")
const DRY_RUN = process.env.DRY_RUN === "true"
const ONLY_PROFESSION = process.env.PROFESSION || ""
const ONLY_PAGE_TYPE = process.env.PAGE_TYPE || ""

// ─── DB ───────────────────────────────────────────────────────────────────
const DATABASE_URL = process.env.NEON_DATABASE_URL
if (!DATABASE_URL) {
  console.error("NEON_DATABASE_URL is not set in .env.local")
  process.exit(1)
}

const OPENAI_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_KEY) {
  console.error("OPENAI_API_KEY is not set in .env.local")
  process.exit(1)
}

const sql = neon(DATABASE_URL)

// ─── Schema (same as ai-content-generator.ts) ────────────────────────────
const PageContentSchema = z.object({
  ai_intro: z.string(),
  ai_local_context: z.string(),
  ai_service_details: z.string(),
  ai_pricing_info: z.string(),
  ai_prevention_tips: z.string(),
  ai_faqs: z.array(z.object({ q: z.string(), a: z.string() })),
  ai_neighborhood_info: z.string(),
  ai_seasonal_tips: z.string(),
  ai_emergency_guide: z.string(),
})

type PageContent = z.infer<typeof PageContentSchema>

// ─── Prompt builder (exact copy from ai-content-generator.ts) ────────────
function buildPrompt(
  profession: { id: string; name: string; namePlural: string; description: string },
  cityName: string,
  region: string,
  province: string,
  pageType: "city" | "problem",
  extra?: { problemName?: string; problemDescription?: string }
): string {
  const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
  const problemList = problems.map((p) => `${p.name}: ${p.description}`).join(", ")

  const locationContext = `ciudad de ${cityName}, provincia de ${province}, comunidad autonoma de ${region}`
  let serviceContext = `servicio de ${profession.name.toLowerCase()} en la ${locationContext}`
  if (extra?.problemName) {
    serviceContext = `servicio de ${profession.name.toLowerCase()} especializado en ${extra.problemName} (${extra.problemDescription}) en la ${locationContext}`
  }

  return `Eres un experto redactor SEO para servicios de reparaciones del hogar en Espana. 
Genera contenido UNICO, DETALLADO y UTIL para una pagina web de ${serviceContext}.

CONTEXTO IMPORTANTE:
- Profesion: ${profession.name} (${profession.namePlural})
- Ubicacion: ${locationContext}
- Tipo de pagina: ${pageType === "city" ? "Pagina de ciudad" : "Pagina de problema especifico"}
- Problemas que resolvemos: ${problemList}
- Telefono de contacto: 936 946 639
- Nombre del negocio: Pronto24
- Servicio 24 horas, 365 dias al ano

INSTRUCCIONES CRITICAS:
1. El contenido DEBE ser UNICO para esta localidad. NO uses frases genericas que podrian aplicarse a cualquier ciudad.
2. Menciona el nombre "${cityName}" y la provincia "${province}" de forma natural varias veces.
3. Incluye referencias a zonas, barrios, calles o puntos de referencia conocidos de ${cityName} si los conoces.
4. Adapta los consejos al clima tipico de ${region} (mediterraneo, atlantico, continental, etc).
5. Habla de los tipos de edificaciones comunes en ${cityName} (cascos antiguos, ensanches, urbanizaciones, poligonos).
6. Incluye informacion sobre normativa local o autonomica relevante si existe.
7. El tono debe ser profesional, cercano y util. Como un vecino experto que te ayuda.
8. NUNCA inventes datos falsos ni estadisticas. Si no estas seguro, usa frases como "en muchos hogares de la zona" en vez de porcentajes inventados.
9. Cada seccion debe aportar valor real al usuario, no solo texto de relleno.
10. Usa un vocabulario rico y variado. Evita repetir las mismas frases.
${extra?.problemName ? `11. Centra el contenido en el problema especifico: ${extra.problemName} - ${extra.problemDescription}. Da detalles tecnicos sobre este problema concreto.` : ""}

Escribe en espanol de Espana (no latinoamericano). Usa "vosotros" si es necesario, no "ustedes".`
}

// ─── Types ────────────────────────────────────────────────────────────────
interface QueueItem {
  professionId: string
  citySlug: string
  pageType: "city" | "problem"
  problemId?: string
}

// ─── Build queue ──────────────────────────────────────────────────────────
function buildQueue(): QueueItem[] {
  const queue: QueueItem[] = []
  const allCities = getAllCities()
  const professions = ONLY_PROFESSION
    ? PROFESSIONS.filter((p) => p.id === ONLY_PROFESSION)
    : PROFESSIONS

  if (ONLY_PAGE_TYPE !== "problem") {
    for (const prof of professions) {
      for (const city of allCities) {
        queue.push({ professionId: prof.id, citySlug: city, pageType: "city" })
      }
    }
  }

  if (ONLY_PAGE_TYPE !== "city") {
    for (const prof of professions) {
      const problems = PROBLEMS[prof.id as keyof typeof PROBLEMS] || []
      for (const problem of problems) {
        for (const city of allCities) {
          queue.push({
            professionId: prof.id,
            citySlug: city,
            pageType: "problem",
            problemId: problem.id,
          })
        }
      }
    }
  }

  return queue
}

// ─── Check which items already exist in DB ────────────────────────────────
async function getExistingKeys(): Promise<Set<string>> {
  const rows = await sql`
    SELECT profession_id, city_slug, COALESCE(problem_id, '') as problem_id 
    FROM page_content 
    WHERE ai_status = 'generated'
  `
  const keys = new Set<string>()
  for (const row of rows) {
    keys.add(`${row.profession_id}|${row.city_slug}|${row.problem_id}`)
  }
  return keys
}

function itemKey(item: QueueItem): string {
  return `${item.professionId}|${item.citySlug}|${item.problemId || ""}`
}

// ─── Generate content for one item ────────────────────────────────────────
async function generateOne(item: QueueItem): Promise<PageContent & { wordCount: number }> {
  const profession = PROFESSIONS.find((p) => p.id === item.professionId)!
  const cityName = getCityDisplayName(item.citySlug)
  const region = getCityRegion(item.citySlug) || "Espana"
  const province = region

  let problemName: string | undefined
  let problemDescription: string | undefined
  if (item.problemId) {
    const problems = PROBLEMS[item.professionId as keyof typeof PROBLEMS] || []
    const problem = problems.find((p) => p.id === item.problemId)
    if (problem) {
      problemName = problem.name
      problemDescription = problem.description
    }
  }

  const prompt = buildPrompt(profession, cityName, region, province, item.pageType, {
    problemName,
    problemDescription,
  })

  const result = await generateText({
    model: "openai/gpt-4o-mini",
    prompt,
    output: Output.object({ schema: PageContentSchema }),
    temperature: 0.8,
    maxOutputTokens: 4000,
  })

  const content = result.output
  if (!content) throw new Error("AI returned no content")

  const allText = [
    content.ai_intro,
    content.ai_local_context,
    content.ai_service_details,
    content.ai_pricing_info,
    content.ai_prevention_tips,
    content.ai_neighborhood_info,
    content.ai_seasonal_tips,
    content.ai_emergency_guide,
    ...(content.ai_faqs || []).map((f) => `${f.q} ${f.a}`),
  ].join(" ")
  const wordCount = allText.split(/\s+/).filter(Boolean).length

  return { ...content, wordCount }
}

// ─── Insert into DB ───────────────────────────────────────────────────────
async function insertContent(
  item: QueueItem,
  content: PageContent & { wordCount: number }
): Promise<void> {
  const pageUrl =
    item.pageType === "problem" && item.problemId
      ? `/problema/${item.professionId}/${item.problemId}/${item.citySlug}`
      : `/${item.professionId}/${item.citySlug}`

  await sql`
    INSERT INTO page_content (
      profession_id, city_slug, problem_id, page_url,
      ai_intro, ai_local_context, ai_service_details, ai_pricing_info,
      ai_prevention_tips, ai_faqs, ai_neighborhood_info, ai_seasonal_tips,
      ai_emergency_guide, ai_generated_at, ai_model, ai_word_count, ai_status
    ) VALUES (
      ${item.professionId}, ${item.citySlug}, ${item.problemId || null}, ${pageUrl},
      ${content.ai_intro}, ${content.ai_local_context}, ${content.ai_service_details}, 
      ${content.ai_pricing_info}, ${content.ai_prevention_tips}, ${JSON.stringify(content.ai_faqs)},
      ${content.ai_neighborhood_info}, ${content.ai_seasonal_tips}, ${content.ai_emergency_guide},
      NOW(), 'gpt-4o-mini', ${content.wordCount}, 'generated'
    )
    ON CONFLICT DO NOTHING
  `
}

// ─── Worker that processes items from the shared queue ─────────────────────
async function worker(
  id: number,
  items: QueueItem[],
  cursor: { index: number },
  stats: { ok: number; err: number; skip: number; start: number }
): Promise<void> {
  while (true) {
    const idx = cursor.index++
    if (idx >= items.length) break

    const item = items[idx]
    const label = `[W${id}] ${item.professionId}/${item.citySlug}${item.problemId ? `/${item.problemId}` : ""}`

    try {
      const content = await generateOne(item)
      await insertContent(item, content)
      stats.ok++

      const elapsed = ((Date.now() - stats.start) / 1000).toFixed(0)
      const total = items.length
      const done = stats.ok + stats.err
      const rate = (done / (Date.now() - stats.start)) * 1000 * 60
      const eta = ((total - done) / rate).toFixed(0)
      console.log(
        `${label} OK (${content.wordCount}w) | ${done}/${total} (${((done / total) * 100).toFixed(1)}%) | ${elapsed}s | ~${eta}min left`
      )
    } catch (err: unknown) {
      stats.err++
      const msg = err instanceof Error ? err.message : String(err)

      // Rate limit: back off
      if (msg.includes("429") || msg.includes("Rate limit") || msg.includes("Too Many")) {
        console.warn(`${label} RATE LIMITED - backing off 30s...`)
        cursor.index-- // re-queue this item
        await sleep(30000)
        continue
      }

      console.error(`${label} ERR: ${msg.substring(0, 120)}`)

      // Insert error marker so we don't retry forever
      try {
        await sql`
          INSERT INTO page_content (profession_id, city_slug, problem_id, ai_status, page_url)
          VALUES (
            ${item.professionId}, ${item.citySlug}, ${item.problemId || null}, 'error',
            ${item.pageType === "problem" ? `/problema/${item.professionId}/${item.problemId}/${item.citySlug}` : `/${item.professionId}/${item.citySlug}`}
          )
          ON CONFLICT DO NOTHING
        `
      } catch {
        // ignore
      }
    }
  }
}

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// ─── Main ─────────────────────────────────────────────────────────────────
async function main() {
  console.log("=== BULK AI CONTENT GENERATION ===")
  console.log(`Concurrency: ${CONCURRENCY}`)
  console.log(`Start from: ${START_FROM}`)
  console.log(`Dry run: ${DRY_RUN}`)
  if (ONLY_PROFESSION) console.log(`Profession filter: ${ONLY_PROFESSION}`)
  if (ONLY_PAGE_TYPE) console.log(`Page type filter: ${ONLY_PAGE_TYPE}`)
  console.log("")

  // Build full queue
  const fullQueue = buildQueue()
  console.log(`Full queue: ${fullQueue.length} pages`)

  // Get already generated
  console.log("Checking existing content in DB...")
  const existing = await getExistingKeys()
  console.log(`Already generated: ${existing.size} pages`)

  // Filter out existing
  const pending = fullQueue.filter((item) => !existing.has(itemKey(item)))
  console.log(`Pending: ${pending.length} pages`)

  // Apply START_FROM
  const queue = pending.slice(START_FROM)
  console.log(`After START_FROM=${START_FROM}: ${queue.length} pages to generate`)
  console.log("")

  if (DRY_RUN) {
    console.log("DRY RUN - not generating anything.")
    // Show breakdown
    const byProf: Record<string, number> = {}
    const byType: Record<string, number> = {}
    for (const item of queue) {
      byProf[item.professionId] = (byProf[item.professionId] || 0) + 1
      byType[item.pageType] = (byType[item.pageType] || 0) + 1
    }
    console.log("\nBy profession:", byProf)
    console.log("By page type:", byType)

    const estimatedMinutes = (queue.length / CONCURRENCY / 4) // ~4 per minute per worker
    console.log(`\nEstimated time at ${CONCURRENCY} concurrency: ~${Math.round(estimatedMinutes)} minutes (~${(estimatedMinutes / 60).toFixed(1)} hours)`)
    return
  }

  if (queue.length === 0) {
    console.log("Nothing to generate. All done!")
    return
  }

  // Confirm
  console.log(`Starting generation of ${queue.length} pages with ${CONCURRENCY} workers...`)
  console.log("Press Ctrl+C to stop at any time (progress is saved).\n")

  // Small delay to allow reading
  await sleep(3000)

  const cursor = { index: 0 }
  const stats = { ok: 0, err: 0, skip: 0, start: Date.now() }

  // Launch workers
  const workers = []
  for (let i = 0; i < CONCURRENCY; i++) {
    workers.push(worker(i, queue, cursor, stats))
  }

  await Promise.all(workers)

  const elapsed = ((Date.now() - stats.start) / 1000 / 60).toFixed(1)
  console.log("\n=== DONE ===")
  console.log(`Generated: ${stats.ok}`)
  console.log(`Errors: ${stats.err}`)
  console.log(`Time: ${elapsed} minutes`)
  console.log(`Rate: ${((stats.ok / (Date.now() - stats.start)) * 1000 * 60).toFixed(0)} pages/min`)
}

main().catch((err) => {
  console.error("Fatal error:", err)
  process.exit(1)
})
