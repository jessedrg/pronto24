"use server"

import { generateText, Output } from "ai"
import { z } from "zod"
import { getSQL, queryWithRetry } from "./db"
import { PROFESSIONS, PROBLEMS, getCityDisplayName, getCityRegion, getAllCities } from "./seo-data"
import { getPostalCodeData, getZoneName, getCityFromPostalCode, PROFESSIONS_POSTAL } from "./postal-data"

// Schema for AI-generated page content
const PageContentSchema = z.object({
  ai_intro: z.string().describe(
    "Parrafo introductorio unico de 150-200 palabras sobre el servicio en esta localidad especifica. Menciona el nombre de la ciudad/pueblo, la provincia, la comunidad autonoma, y datos locales reales como barrios, calles principales, o zonas conocidas. No uses frases genericas."
  ),
  ai_local_context: z.string().describe(
    "Parrafo de 200-300 palabras sobre el contexto local: tipo de edificaciones predominantes en la zona (edificios antiguos, urbanizaciones nuevas, casas unifamiliares), problemas habituales derivados del clima local, materiales de construccion tipicos de la region, normativa local relevante. Datos especificos y unicos para este lugar."
  ),
  ai_service_details: z.string().describe(
    "Descripcion detallada de 200-300 palabras de los servicios especificos que ofrecemos en esta zona. Menciona situaciones reales que ocurren en este tipo de localidad (problemas por humedad costera, heladas en invierno, cal en el agua, edificios historicos, etc). Incluye datos tecnicos relevantes."
  ),
  ai_pricing_info: z.string().describe(
    "Informacion de precios orientativos de 150-200 palabras para los servicios mas comunes en esta zona. Incluye rangos de precio reales (30-80 euros para reparaciones simples, 100-300 para complejas). Menciona que siempre se da presupuesto cerrado antes de empezar. No inventes precios exactos."
  ),
  ai_prevention_tips: z.string().describe(
    "Guia de prevencion de 200-250 palabras con consejos especificos adaptados al clima y caracteristicas de la zona. Si es zona costera, habla de la corrosion por sal. Si es interior, habla de heladas. Si es zona urbana densa, habla de instalaciones antiguas. Consejos practicos y utiles."
  ),
  ai_faqs: z.array(z.object({
    q: z.string().describe("Pregunta frecuente especifica para esta localidad"),
    a: z.string().describe("Respuesta detallada de 80-120 palabras con informacion util y especifica")
  })).describe("5-7 preguntas frecuentes unicas y relevantes para la localidad y el servicio"),
  ai_neighborhood_info: z.string().describe(
    "Informacion de 150-200 palabras sobre la zona/barrio/pueblo: zonas que cubrimos, tiempo de llegada estimado, referencias locales conocidas (plazas, mercados, estaciones), peculiaridades de las viviendas de la zona."
  ),
  ai_seasonal_tips: z.string().describe(
    "Consejos estacionales de 150-200 palabras adaptados al clima de la zona. Primavera: revisiones post-invierno. Verano: problemas por calor. Otono: preparacion para frio. Invierno: prevencion de heladas/humedades. Especifico para el clima local."
  ),
  ai_emergency_guide: z.string().describe(
    "Guia de emergencia de 200-250 palabras sobre que hacer mientras llega el profesional. Pasos claros y ordenados para minimizar danos. Incluye numeros de emergencia relevantes (112, bomberos locales). Especifico para el tipo de servicio."
  ),
})

type PageContent = z.infer<typeof PageContentSchema>

// Build a rich prompt with real local context
function buildPrompt(
  profession: { id: string; name: string; namePlural: string; description: string },
  cityName: string,
  citySlug: string,
  region: string,
  province: string,
  pageType: "city" | "postalcode" | "problem",
  extra?: { postalCode?: string; zoneName?: string; problemName?: string; problemDescription?: string }
): string {
  const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
  const problemList = problems.map(p => `${p.name}: ${p.description}`).join(", ")

  let locationContext = `ciudad de ${cityName}, provincia de ${province}, comunidad autonoma de ${region}`
  if (extra?.postalCode) {
    locationContext = `codigo postal ${extra.postalCode} (${extra.zoneName || cityName}), provincia de ${province}`
  }

  let serviceContext = `servicio de ${profession.name.toLowerCase()} en la ${locationContext}`
  if (extra?.problemName) {
    serviceContext = `servicio de ${profession.name.toLowerCase()} especializado en ${extra.problemName} (${extra.problemDescription}) en la ${locationContext}`
  }

  return `Eres un experto redactor SEO para servicios de reparaciones del hogar en Espana. 
Genera contenido UNICO, DETALLADO y UTIL para una pagina web de ${serviceContext}.

CONTEXTO IMPORTANTE:
- Profesion: ${profession.name} (${profession.namePlural})
- Ubicacion: ${locationContext}
- Tipo de pagina: ${pageType === "city" ? "Pagina de ciudad" : pageType === "postalcode" ? "Pagina de codigo postal" : "Pagina de problema especifico"}
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

// Generate unique content for a single page
export async function generatePageContent(
  professionId: string,
  citySlug: string,
  pageType: "city" | "postalcode" | "problem",
  extra?: { postalCode?: string; problemId?: string }
): Promise<PageContent & { wordCount: number }> {
  const profession = PROFESSIONS.find(p => p.id === professionId)
  if (!profession) throw new Error(`Profession not found: ${professionId}`)

  const cityName = pageType === "postalcode" && extra?.postalCode
    ? getCityFromPostalCode(extra.postalCode) || getCityDisplayName(citySlug)
    : getCityDisplayName(citySlug)
  
  const region = getCityRegion(citySlug) || "Espana"
  const province = region // simplified, region maps closely to province in our data

  let zoneName: string | undefined
  if (extra?.postalCode) {
    zoneName = getZoneName(extra.postalCode)
  }

  let problemName: string | undefined
  let problemDescription: string | undefined
  if (extra?.problemId) {
    const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
    const problem = problems.find(p => p.id === extra.problemId)
    if (problem) {
      problemName = problem.name
      problemDescription = problem.description
    }
  }

  const prompt = buildPrompt(
    profession,
    cityName,
    citySlug,
    region,
    province,
    pageType,
    { postalCode: extra?.postalCode, zoneName, problemName, problemDescription }
  )

  const result = await generateText({
    model: "openai/gpt-4o-mini",
    prompt,
    output: Output.object({ schema: PageContentSchema }),
    temperature: 0.8,
    maxOutputTokens: 4000,
  })

  const content = result.object
  if (!content) throw new Error("AI returned no content")

  // Calculate word count
  const allText = [
    content.ai_intro,
    content.ai_local_context,
    content.ai_service_details,
    content.ai_pricing_info,
    content.ai_prevention_tips,
    content.ai_neighborhood_info,
    content.ai_seasonal_tips,
    content.ai_emergency_guide,
    ...(content.ai_faqs || []).map(f => `${f.q} ${f.a}`),
  ].join(" ")
  const wordCount = allText.split(/\s+/).filter(Boolean).length

  return { ...content, wordCount }
}

// Save generated content to the database
export async function saveGeneratedContent(
  professionId: string,
  citySlug: string,
  content: PageContent & { wordCount: number },
  pageType: "city" | "postalcode" | "problem",
  extra?: { postalCode?: string; problemId?: string; modifier?: string }
): Promise<void> {
  const sql = getSQL()
  
  const pageUrl = pageType === "postalcode" && extra?.postalCode
    ? `/${professionId}/cp/${extra.postalCode}`
    : pageType === "problem" && extra?.problemId
    ? `/problema/${professionId}/${extra.problemId}/${citySlug}`
    : `/${professionId}/${citySlug}`

  await queryWithRetry(async () => {
    // Check if record exists
    const existing = await sql`
      SELECT id FROM page_content 
      WHERE profession_id = ${professionId} 
        AND city_slug = ${citySlug}
        AND COALESCE(problem_id, '') = ${extra?.problemId || ''}
        AND COALESCE(modifier, '') = ${extra?.modifier || ''}
      LIMIT 1
    `

    if (existing.length > 0) {
      // Update existing
      await sql`
        UPDATE page_content SET
          ai_intro = ${content.ai_intro},
          ai_local_context = ${content.ai_local_context},
          ai_service_details = ${content.ai_service_details},
          ai_pricing_info = ${content.ai_pricing_info},
          ai_prevention_tips = ${content.ai_prevention_tips},
          ai_faqs = ${JSON.stringify(content.ai_faqs)},
          ai_neighborhood_info = ${content.ai_neighborhood_info},
          ai_seasonal_tips = ${content.ai_seasonal_tips},
          ai_emergency_guide = ${content.ai_emergency_guide},
          ai_generated_at = NOW(),
          ai_model = 'gpt-4o-mini',
          ai_word_count = ${content.wordCount},
          ai_status = 'generated',
          updated_at = NOW()
        WHERE id = ${existing[0].id}
      `
    } else {
      // Insert new
      await sql`
        INSERT INTO page_content (
          profession_id, city_slug, problem_id, modifier, page_url,
          ai_intro, ai_local_context, ai_service_details, ai_pricing_info,
          ai_prevention_tips, ai_faqs, ai_neighborhood_info, ai_seasonal_tips,
          ai_emergency_guide, ai_generated_at, ai_model, ai_word_count, ai_status
        ) VALUES (
          ${professionId}, ${citySlug}, ${extra?.problemId || null}, ${extra?.modifier || null}, ${pageUrl},
          ${content.ai_intro}, ${content.ai_local_context}, ${content.ai_service_details}, 
          ${content.ai_pricing_info}, ${content.ai_prevention_tips}, ${JSON.stringify(content.ai_faqs)},
          ${content.ai_neighborhood_info}, ${content.ai_seasonal_tips}, ${content.ai_emergency_guide},
          NOW(), 'gpt-4o-mini', ${content.wordCount}, 'generated'
        )
      `
    }
  })
}

// Fetch AI content for a page
export async function getAIContent(
  professionId: string,
  citySlug: string,
  problemId?: string
): Promise<PageContent | null> {
  const sql = getSQL()
  
  try {
    const rows = await queryWithRetry(async () => {
      return await sql`
        SELECT ai_intro, ai_local_context, ai_service_details, ai_pricing_info,
               ai_prevention_tips, ai_faqs, ai_neighborhood_info, ai_seasonal_tips,
               ai_emergency_guide, ai_word_count
        FROM page_content
        WHERE profession_id = ${professionId}
          AND city_slug = ${citySlug}
          AND COALESCE(problem_id, '') = ${problemId || ''}
          AND ai_status = 'generated'
        LIMIT 1
      `
    })

    if (rows.length === 0) return null

    const row = rows[0]
    return {
      ai_intro: row.ai_intro,
      ai_local_context: row.ai_local_context,
      ai_service_details: row.ai_service_details,
      ai_pricing_info: row.ai_pricing_info,
      ai_prevention_tips: row.ai_prevention_tips,
      ai_faqs: typeof row.ai_faqs === "string" ? JSON.parse(row.ai_faqs) : row.ai_faqs,
      ai_neighborhood_info: row.ai_neighborhood_info,
      ai_seasonal_tips: row.ai_seasonal_tips,
      ai_emergency_guide: row.ai_emergency_guide,
    }
  } catch {
    return null
  }
}

// Build the full queue of pages to generate (pure computation, no async needed)
export function buildGenerationQueue(): Array<{
  professionId: string
  citySlug: string
  pageType: "city" | "problem"
  problemId?: string
}> {
  const queue: Array<{
    professionId: string
    citySlug: string
    pageType: "city" | "problem"
    problemId?: string
  }> = []

  const allCities = getAllCities()
  const professions = PROFESSIONS.map(p => p.id)

  // 1. City pages: each profession x each city
  for (const profId of professions) {
    for (const city of allCities) {
      queue.push({ professionId: profId, citySlug: city, pageType: "city" })
    }
  }

  // 2. Problem pages: each profession x each problem x each city
  for (const profId of professions) {
    const problems = PROBLEMS[profId as keyof typeof PROBLEMS] || []
    for (const problem of problems) {
      for (const city of allCities) {
        queue.push({
          professionId: profId,
          citySlug: city,
          pageType: "problem",
          problemId: problem.id,
        })
      }
    }
  }

  return queue
}

// Get generation progress stats
export async function getGenerationStats(): Promise<{
  total: number
  generated: number
  pending: number
  errored: number
  percentage: number
}> {
  const sql = getSQL()
  
  try {
    const stats = await sql`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE ai_status = 'generated') as generated,
        COUNT(*) FILTER (WHERE ai_status = 'pending' OR ai_status IS NULL) as pending,
        COUNT(*) FILTER (WHERE ai_status = 'error') as errored
      FROM page_content
    `

    const total = parseInt(stats[0].total) || 0
    const generated = parseInt(stats[0].generated) || 0
    const pending = parseInt(stats[0].pending) || 0
    const errored = parseInt(stats[0].errored) || 0

    return {
      total,
      generated,
      pending,
      errored,
      percentage: total > 0 ? Math.round((generated / total) * 100) : 0,
    }
  } catch {
    return { total: 0, generated: 0, pending: 0, errored: 0, percentage: 0 }
  }
}
