import { generateText } from 'ai'
import { redis, getPostalContentKey } from '@/lib/redis'
import { NextRequest } from 'next/server'

const VALID_PROFESSIONS = ['electricista', 'fontanero', 'cerrajero', 'desatascos', 'calderas']

const PROFESSION_CONTEXT: Record<string, string> = {
  electricista: 'electricidad, instalaciones electricas, averias electricas, cuadros electricos, REBT (RD 842/2002)',
  fontanero: 'fontaneria, tuberias, fugas de agua, atascos, CTE DB-HS4 y DB-HS5',
  cerrajero: 'cerrajeria, cerraduras, aperturas de puertas, bombines, normas UNE-EN 1303',
  desatascos: 'desatascos, limpieza de tuberias, alcantarillado, maquinaria de alta presion',
  calderas: 'calderas, calefaccion, agua caliente, RITE (RD 1027/2007)',
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const profession = searchParams.get('profession')
  const postalcode = searchParams.get('postalcode')
  const zoneName = searchParams.get('zoneName')
  const cityName = searchParams.get('cityName')
  const provincia = searchParams.get('provincia')

  if (!profession || !postalcode || !zoneName || !cityName) {
    return Response.json({ error: 'Missing params' }, { status: 400 })
  }

  if (!VALID_PROFESSIONS.includes(profession)) {
    return Response.json({ error: 'Invalid profession' }, { status: 400 })
  }

  // Check Redis cache first
  const cacheKey = getPostalContentKey(profession, postalcode)
  try {
    const cached = await redis.get<string>(cacheKey)
    if (cached) {
      return Response.json({ content: cached, fromCache: true })
    }
  } catch {
    // Redis unavailable, continue to generate
  }

  // Generate unique content with AI
  const profContext = PROFESSION_CONTEXT[profession] || ''
  const professionName = profession.charAt(0).toUpperCase() + profession.slice(1)

  try {
    const { text } = await generateText({
      model: 'anthropic/claude-sonnet-4-20250514',
      prompt: `Escribe un parrafo informativo de 4-6 frases sobre el servicio de ${profession} en la zona de ${zoneName} (codigo postal ${postalcode}), que pertenece a ${cityName}${provincia ? `, provincia de ${provincia}` : ''}. 

El contexto tecnico del servicio es: ${profContext}.

REGLAS ESTRICTAS:
- Habla sobre las particularidades REALES de la zona: tipo de edificaciones (si es casco antiguo, zona residencial nueva, zona industrial, etc), problemas tipicos de la zona, clima si es relevante
- NO inventes datos numericos (no digas "X% de edificios" ni "X anos de experiencia")
- NO uses superlativos falsos ("el mejor", "el mas rapido", "lider")
- Puedes mencionar normativa real si es relevante (REBT, RITE, CTE)
- Escribe en espanol de Espana, sin acentos (para evitar problemas de encoding)
- Tono profesional pero cercano
- NO uses markdown, solo texto plano
- NO incluyas numeros de telefono ni precios

Escribe SOLO el parrafo, sin introduccion ni titulo.`,
    })

    // Cache in Redis for 30 days (2592000 seconds)
    try {
      await redis.set(cacheKey, text, { ex: 2592000 })
    } catch {
      // Cache write failed, content still returned
    }

    return Response.json({ content: text, fromCache: false })
  } catch (error) {
    return Response.json({ error: 'Generation failed' }, { status: 500 })
  }
}
