export const runtime = "nodejs"

import { neon } from "@neondatabase/serverless"
import { getBotToken, getBotChatId, normalizeService } from "@/lib/telegram-bots"
import { calculateLeadPrice } from "@/lib/lead-pricing"

const databaseUrl = process.env.NEON_DATABASE_URL || process.env.NEON_POSTGRES_URL || process.env.DATABASE_URL

const leadData = new Map<string, any>()

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const MAX_REQUESTS_PER_HOUR = 50 // Aumentado de 20 a 50 para no perder leads
const RATE_LIMIT_WINDOW = 60 * 60 * 1000

const backupLeads = new Map<string, any>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return true
  }

  if (record.count >= MAX_REQUESTS_PER_HOUR) {
    return false
  }

  record.count++
  return true
}

function extractPhone(text: string): string | null {
  if (!text) return null
  // Eliminar todo excepto números
  const cleaned = text.replace(/[^\d]/g, "")
  // Teléfonos españoles: 9 dígitos empezando por 6, 7, 8, 9
  if (cleaned.length >= 9) {
    const phone = cleaned.slice(-9)
    if (/^[6789]/.test(phone)) {
      return phone
    }
  }
  return null
}

function detectService(text: string): string | null {
  if (!text) return null
  const lower = text.toLowerCase()

  if (/fontaner|agua|fuga|tubería|grifo|cañería/.test(lower)) return "fontanero"
  if (/electric|luz|enchufe|apagón|cortocircuito/.test(lower)) return "electricista"
  if (/cerrajer|puerta|llave|cerradura|cerrado/.test(lower)) return "cerrajero"
  if (/desatasc|atasco|atascad|wc|váter|fregadero/.test(lower)) return "desatascos"
  if (/caldera|calefacción|radiador|gas|calentador/.test(lower)) return "calderas"

  return null
}

function detectCity(text: string): string | null {
  if (!text) return null
  const lower = text.toLowerCase()

  const cities = [
    "barcelona",
    "badalona",
    "hospitalet",
    "terrassa",
    "sabadell",
    "mataró",
    "santa coloma",
    "cornellà",
    "sant boi",
    "sant cugat",
    "rubí",
    "vilanova",
    "viladecans",
    "castelldefels",
    "el prat",
    "gavà",
    "esplugues",
    "sant adrià",
    "montcada",
    "cerdanyola",
    "mollet",
    "granollers",
    "vic",
    "manresa",
    "igualada",
    "sitges",
    "calella",
    "pineda",
    "lloret",
    "blanes",
  ]

  for (const city of cities) {
    if (lower.includes(city)) {
      return city.charAt(0).toUpperCase() + city.slice(1)
    }
  }

  return null
}

async function savePartialLead(lead: any, sessionId: string) {
  if (!databaseUrl) return

  // Solo guardar si tiene al menos el teléfono
  if (!lead.phone) return

  try {
    const sql = neon(databaseUrl)

    // Verificar si ya existe
    const existing = await sql`
      SELECT id FROM leads WHERE phone = ${lead.phone} AND created_at > NOW() - INTERVAL '1 hour'
    `

    if (existing.length > 0) {
      console.log("[v0] Partial lead already exists for phone:", lead.phone)
      return
    }

    // Guardar como backup con status 'partial'
    await sql`
      INSERT INTO leads (service, problem, phone, city, name, status, created_at)
      VALUES (
        ${lead.service || "pendiente"},
        ${lead.problem || "Por determinar"},
        ${lead.phone},
        ${lead.city || "Barcelona"},
        ${lead.name || "Cliente"},
        'partial',
        NOW()
      )
      ON CONFLICT DO NOTHING
    `
    console.log("[v0] Partial lead saved as backup:", lead.phone)
  } catch (error) {
    console.error("[v0] Error saving partial lead:", error)
  }
}

async function trackChatInteraction(data: {
  sessionId: string
  message: string
  messageType?: "user" | "assistant"
  step?: string
  service?: string
  city?: string
  phone?: string
  completed?: boolean
  leadId?: string
  ip?: string
  userAgent?: string
  referrer?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
}) {
  if (!databaseUrl) return

  try {
    const sql = neon(databaseUrl)
    await sql`
      INSERT INTO chat_interactions (
        session_id, message, message_type, step, service, city, phone, 
        completed, lead_id, ip_address, user_agent, referrer,
        utm_source, utm_medium, utm_campaign
      ) VALUES (
        ${data.sessionId},
        ${data.message.substring(0, 1000)},
        ${data.messageType || "user"},
        ${data.step || null},
        ${data.service || null},
        ${data.city || null},
        ${data.phone || null},
        ${data.completed || false},
        ${data.leadId ? data.leadId : null},
        ${data.ip || null},
        ${data.userAgent || null},
        ${data.referrer || null},
        ${data.utmSource || null},
        ${data.utmMedium || null},
        ${data.utmCampaign || null}
      )
    `
  } catch (error) {
    console.error("[v0] Error tracking chat interaction:", error)
  }
}

async function isInBarcelonaAreaAI(location: string): Promise<boolean> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey || !location) return true // Default true para no perder leads

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Eres un validador de ubicaciones. Tu única tarea es determinar si una ubicación está dentro de un radio de 40km del centro de Barcelona, España.

Responde SOLO con "SI" o "NO".

- SI = La ubicación está dentro de 40km de Barcelona (incluye Barcelona ciudad, área metropolitana, Maresme, Baix Llobregat, Vallès, Garraf, etc.)
- NO = La ubicación está fuera de 40km de Barcelona o no es una ubicación válida en España`,
          },
          {
            role: "user",
            content: `¿Está "${location}" dentro de 40km del centro de Barcelona? Responde solo SI o NO.`,
          },
        ],
        temperature: 0,
        max_tokens: 10,
      }),
    })

    if (!response.ok) {
      return true // Default to true to not block leads on API error
    }

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content?.trim().toUpperCase()

    return answer === "SI"
  } catch (error) {
    console.error("[v0] Error validating location:", error)
    return true // Default to true on error
  }
}

async function saveLead(lead: any) {
  const pricing = calculateLeadPrice(lead.service, lead.problem)

  if (!databaseUrl) {
    console.log("[v0] No database URL configured, skipping save")
    return { id: `temp_${Date.now()}`, pricing }
  }

  const sql = neon(databaseUrl)

  const existingLead = await sql`
    SELECT id, lead_price, estimated_job_min, estimated_job_max, urgency, complexity, status
    FROM leads 
    WHERE phone = ${lead.phone} 
    AND created_at > NOW() - INTERVAL '1 hour'
    ORDER BY created_at DESC
    LIMIT 1
  `

  if (existingLead.length > 0) {
    if (existingLead[0].status === "partial") {
      await sql`
        UPDATE leads SET
          service = ${normalizeService(lead.service)},
          problem = ${lead.problem},
          city = ${lead.city},
          name = ${lead.name || "Cliente"},
          lead_price = ${pricing.leadPrice},
          estimated_job_min = ${pricing.estimatedJobValue.min},
          estimated_job_max = ${pricing.estimatedJobValue.max},
          urgency = ${pricing.urgency},
          complexity = ${pricing.complexity},
          status = 'pending'
        WHERE id = ${existingLead[0].id}
      `
      console.log("[v0] Updated partial lead to complete:", existingLead[0].id)
      return { id: existingLead[0].id, pricing }
    }

    console.log("[v0] Duplicate lead detected, returning existing:", existingLead[0].id)
    return {
      id: existingLead[0].id,
      pricing: {
        leadPrice: existingLead[0].lead_price || pricing.leadPrice,
        estimatedJobValue: {
          min: existingLead[0].estimated_job_min || pricing.estimatedJobValue.min,
          max: existingLead[0].estimated_job_max || pricing.estimatedJobValue.max,
        },
        urgency: existingLead[0].urgency || pricing.urgency,
        complexity: existingLead[0].complexity || pricing.complexity,
      },
      isDuplicate: true,
    }
  }

  try {
    const result = await sql`
      INSERT INTO leads (
        service, 
        problem, 
        phone, 
        city, 
        name, 
        credit_cost,
        lead_price,
        estimated_job_min,
        estimated_job_max,
        urgency,
        complexity,
        status,
        created_at
      )
      VALUES (
        ${normalizeService(lead.service)},
        ${lead.problem},
        ${lead.phone},
        ${lead.city},
        ${lead.name || "Cliente"},
        1,
        ${pricing.leadPrice},
        ${pricing.estimatedJobValue.min},
        ${pricing.estimatedJobValue.max},
        ${pricing.urgency},
        ${pricing.complexity},
        'pending',
        NOW()
      )
      RETURNING id
    `

    return { id: result[0]?.id || `temp_${Date.now()}`, pricing }
  } catch (error) {
    console.error("[v0] Error saving lead:", error)
    // Fallback con estructura básica
    try {
      const result = await sql`
        INSERT INTO leads (service, problem, phone, city, name, credit_cost, status, created_at)
        VALUES (
          ${normalizeService(lead.service)},
          ${lead.problem},
          ${lead.phone},
          ${lead.city},
          ${lead.name || "Cliente"},
          1,
          'pending',
          NOW()
        )
        RETURNING id
      `
      return { id: result[0]?.id || `temp_${Date.now()}`, pricing }
    } catch (fallbackError) {
      console.error("[v0] Fallback save also failed:", fallbackError)
      return { id: `temp_${Date.now()}`, pricing }
    }
  }
}

async function updateLeadTelegramInfo(leadId: string, messageId: string, groupId: string) {
  if (!databaseUrl || leadId.startsWith("temp_")) return

  const sql = neon(databaseUrl)

  try {
    await sql`
      UPDATE leads 
      SET telegram_message_id = ${messageId}, telegram_group_id = ${groupId}
      WHERE id = ${leadId}
    `
  } catch (error) {
    console.error("[v0] Error updating lead telegram info:", error)
  }
}

async function sendLeadToTelegram(
  lead: any,
  retryCount = 0,
): Promise<{ success: boolean; message?: string; isDuplicate?: boolean }> {
  const MAX_RETRIES = 3

  const normalizedService = normalizeService(lead.service)
  const TELEGRAM_BOT_TOKEN = getBotToken(lead.service)
  const TELEGRAM_GROUP_CHAT_ID = getBotChatId(lead.service)

  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_GROUP_CHAT_ID) {
    console.error("[v0] Missing Telegram config for service:", lead.service)
    return { success: false, message: "Telegram not configured" }
  }

  const { id: leadId, pricing, isDuplicate } = await saveLead(lead)

  if (isDuplicate) {
    console.log("[v0] Skipping Telegram send - duplicate lead:", leadId)
    return { success: true, isDuplicate: true }
  }

  const urgencyEmoji = pricing.urgency === "emergencia" ? "🚨" : pricing.urgency === "urgente" ? "⚡" : "🔔"
  const urgencyText =
    pricing.urgency === "emergencia" ? " [EMERGENCIA]" : pricing.urgency === "urgente" ? " [URGENTE]" : ""

  const baseUrl = "https://rapidfix.es"
  const buyUrl = `${baseUrl}/api/stripe/buy-lead?lead_id=${leadId}&price=${pricing.leadPrice}&service=${encodeURIComponent(normalizedService)}`

  const message = `
${urgencyEmoji} NUEVO LEAD${urgencyText} - rapidfix.es

📋 Servicio: ${normalizedService.charAt(0).toUpperCase() + normalizedService.slice(1)}
📝 Problema: ${lead.problem || "No especificado"}
📞 Teléfono: •••••••••• (visible al comprar)
📍 Ciudad: ${lead.city || "Barcelona"}
👤 Cliente: ${lead.name || "Cliente"}

━━━━━━━━━━━━━━━━━━━━
💰 Precio lead: ${pricing.leadPrice}€
📊 Trabajo estimado: ${pricing.estimatedJobValue.min}-${pricing.estimatedJobValue.max}€
━━━━━━━━━━━━━━━━━━━━

⏰ ${new Date().toLocaleString("es-ES")}
  `.trim()

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_GROUP_CHAT_ID,
        text: message,
        reply_markup: {
          inline_keyboard: [[{ text: `💳 COMPRAR (${pricing.leadPrice}€)`, url: buyUrl }]],
        },
      }),
    })

    const result = await response.json()

    if (result.ok) {
      await updateLeadTelegramInfo(String(leadId), result.result.message_id, TELEGRAM_GROUP_CHAT_ID)
      console.log("[v0] Lead sent to Telegram successfully")
      return { success: true }
    } else {
      console.error("[v0] Telegram API error:", result)

      if (retryCount < MAX_RETRIES) {
        console.log(`[v0] Retrying Telegram send (${retryCount + 1}/${MAX_RETRIES})...`)
        await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)))
        return sendLeadToTelegram(lead, retryCount + 1)
      }

      return { success: false, message: result.description }
    }
  } catch (error) {
    console.error("[v0] Error sending to Telegram:", error)

    if (retryCount < MAX_RETRIES) {
      console.log(`[v0] Retrying after error (${retryCount + 1}/${MAX_RETRIES})...`)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)))
      return sendLeadToTelegram(lead, retryCount + 1)
    }

    return { success: false, message: "Failed to send to Telegram" }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null)

    if (!body) {
      return Response.json(
        {
          message: "Por favor, llámanos al 900 123 456 para ayudarte. 📞",
          error: "invalid_request",
        },
        { status: 400 },
      )
    }

    const { messages, service, sessionId: bodySessionId, userMessage } = body

    const validMessages = (messages || []).filter((m: any) => m?.role && m?.content)

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"
    const userAgent = req.headers.get("user-agent") || undefined
    const referrer = req.headers.get("referer") || undefined

    if (!checkRateLimit(ip)) {
      return Response.json(
        {
          message: "Por favor, llámanos al 900 123 456 para atención inmediata. 📞",
          error: "rate_limit",
        },
        { status: 429 },
      )
    }

    const conversationId = bodySessionId || Math.random().toString(36).substring(7)

    const currentLead = leadData.get(conversationId) ||
      backupLeads.get(conversationId) || {
        service: service || null,
        problem: null,
        phone: null,
        city: null,
        name: null,
        outOfArea: false,
        locationValidated: false,
      }

    if (userMessage) {
      const extractedPhone = extractPhone(userMessage)
      const extractedService = detectService(userMessage)
      const extractedCity = detectCity(userMessage)

      if (extractedPhone && !currentLead.phone) {
        currentLead.phone = extractedPhone
        console.log("[v0] Extracted phone from message:", extractedPhone)
      }
      if (extractedService && !currentLead.service) {
        currentLead.service = extractedService
        console.log("[v0] Extracted service from message:", extractedService)
      }
      if (extractedCity && !currentLead.city) {
        currentLead.city = extractedCity
        console.log("[v0] Extracted city from message:", extractedCity)
      }

      // Si el mensaje parece ser una descripción del problema
      if (!currentLead.problem && userMessage.length > 10 && !extractedPhone) {
        currentLead.problem = userMessage.substring(0, 200)
      }

      // Guardar backup inmediatamente si tenemos teléfono
      if (currentLead.phone) {
        backupLeads.set(conversationId, { ...currentLead })
        await savePartialLead(currentLead, conversationId)
      }
    }

    // Track interaction
    if (userMessage) {
      await trackChatInteraction({
        sessionId: conversationId,
        message: userMessage,
        messageType: "user",
        step: !currentLead.service
          ? "initial"
          : !currentLead.problem
            ? "problem"
            : !currentLead.city
              ? "city"
              : !currentLead.phone
                ? "phone"
                : "complete",
        service: currentLead.service || service,
        city: currentLead.city,
        phone: currentLead.phone,
        ip,
        userAgent,
        referrer,
      })
    }

    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey) {
      return Response.json({
        message: "Por favor, llámanos al 900 123 456. ¡Estamos disponibles 24/7! 📞",
        error: "api_not_configured",
      })
    }

    const systemPrompt = `Eres un asistente de rapidfix.es. Conectas clientes con profesionales urgentes en Barcelona.

SERVICIOS: fontanero, electricista, cerrajero, desatascos, calderas

FLUJO DE CONVERSACIÓN (seguir este orden estricto):
1. PRIMERO pregunta: "¿Cuál es el problema que tienes?" (describe la urgencia)
2. SEGUNDO pregunta: "¿En qué zona/ciudad estás?" 
3. TERCERO pregunta: "¿Tu número de teléfono para que te llame el profesional?"

NO PIDAS EL NOMBRE - no es necesario.

Cuando tengas servicio + problema + ciudad + teléfono, el lead está COMPLETO.

TIEMPO DE RESPUESTA:
- Un profesional verificado te llamará o escribirá por WhatsApp en 30 minutos a 1 hora máximo
- En casos muy urgentes, la respuesta puede ser en menos de 15 minutos
- El profesional contactará para confirmar detalles, precio exacto y hora de llegada

PRECIOS APROXIMADOS DE REFERENCIA (para informar al cliente si pregunta):
- Fontanero urgente: 80€-200€ (fugas simples 80-120€, tuberías rotas 150-300€, instalaciones 200-500€)
- Electricista urgente: 70€-180€ (apagones 70-120€, cortocircuitos 100-200€, instalaciones 150-400€)
- Cerrajero urgente: 80€-150€ (apertura puerta 80-120€, cambio cerradura 100-200€, cerraduras seguridad 150-300€)
- Desatascos: 80€-250€ (fregadero/WC 80-120€, tuberías principales 150-300€, con máquina 200-400€)
- Calderas: 90€-300€ (revisión/reparación 90-180€, piezas 150-350€, instalación nueva 800-2000€)

NOTAS SOBRE PRECIOS:
- Estos son precios orientativos que pueden variar según la urgencia, hora (nocturno +30-50%), complejidad y materiales necesarios
- El precio final lo acordará directamente con el profesional asignado
- La consulta y el envío del profesional es GRATIS para el cliente

CÓMO RESPONDER SOBRE PRECIOS:
- Si preguntan precio, da el rango aproximado del servicio
- Siempre aclara que es orientativo y que el profesional confirmará el precio exacto
- Menciona que el profesional llamará en 30min-1h para acordar todo
- Sigue pidiendo los datos que falten después de dar la info de precio

CUANDO EL LEAD ESTÁ COMPLETO responde:
"¡Perfecto! Un profesional verificado te contactará en los próximos 30 minutos a 1 hora por llamada o WhatsApp para confirmar el precio exacto y coordinar la visita. ¡Gracias por confiar en RapidFix!"

IMPORTANTE:
- Sé breve, amigable y profesional
- No prometas precios exactos, solo rangos orientativos
- Transmite confianza: profesionales verificados, respuesta rápida en 30min-1h, sin compromiso hasta acordar precio
- SIEMPRE empieza preguntando por el problema si no lo sabemos aún

SIEMPRE incluye al final: LEAD_DATA: {"service": "...", "problem": "...", "phone": "...", "city": "..."}

ESTADO ACTUAL: ${JSON.stringify(currentLead)}`

    const openaiMessages = [
      { role: "system", content: systemPrompt },
      ...validMessages.slice(-10).map((m: any) => ({ role: m.role, content: String(m.content) })),
    ]

    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: openaiMessages,
          temperature: 0.7,
          max_tokens: 250,
        }),
      })

      if (!openaiResponse.ok) {
        if (currentLead.phone && currentLead.service) {
          currentLead.problem = currentLead.problem || "Urgencia - contactar cliente"
          currentLead.city = currentLead.city || "Barcelona"
          await sendLeadToTelegram(currentLead)
        }

        return Response.json({
          message: "Gracias por tu información. Un profesional te contactará muy pronto. 📞",
          leadStatus: currentLead,
        })
      }

      const completion = await openaiResponse.json()
      const responseText = completion.choices?.[0]?.message?.content || ""

      // Extraer LEAD_DATA de la respuesta
      const leadDataMatch = responseText.match(/LEAD_DATA:\s*(\{[\s\S]*?\})/i)
      if (leadDataMatch) {
        try {
          const extractedData = JSON.parse(leadDataMatch[1])

          if (extractedData.service) currentLead.service = extractedData.service
          if (extractedData.problem) currentLead.problem = extractedData.problem
          if (extractedData.phone) currentLead.phone = extractedData.phone
          if (extractedData.city) currentLead.city = extractedData.city

          leadData.set(conversationId, currentLead)

          if (currentLead.phone) {
            backupLeads.set(conversationId, { ...currentLead })
            await savePartialLead(currentLead, conversationId)
          }
        } catch (error) {
          console.error("[v0] Failed to parse LEAD_DATA:", error)
        }
      }

      const cleanResponse = responseText.replace(/LEAD_DATA:\s*\{[\s\S]*?\}/i, "").trim()

      const isLeadComplete = currentLead.service && currentLead.problem && currentLead.phone && currentLead.city

      if (isLeadComplete) {
        console.log("[v0] LEAD COMPLETE - sending to Telegram:", currentLead)

        currentLead.name = "Cliente" // Nombre por defecto

        const telegramResult = await sendLeadToTelegram(currentLead)

        if (telegramResult.success) {
          console.log("[v0] Lead sent successfully!")
          leadData.delete(conversationId)
          backupLeads.delete(conversationId)

          return Response.json({
            message:
              "¡Perfecto! Un profesional verificado te contactará en los próximos 30 minutos a 1 hora por llamada o WhatsApp para confirmar el precio exacto y coordinar la visita. ¡Gracias por confiar en RapidFix!",
            leadStatus: currentLead,
            leadComplete: true,
          })
        }
      }

      return Response.json({
        message: cleanResponse,
        leadStatus: currentLead,
      })
    } catch (openaiError: any) {
      console.error("[v0] OpenAI error:", openaiError?.message)

      if (currentLead.phone && currentLead.service) {
        currentLead.problem = currentLead.problem || "Urgencia"
        currentLead.city = currentLead.city || "Barcelona"
        await sendLeadToTelegram(currentLead)

        return Response.json({
          message: "¡Recibido! Un profesional te contactará muy pronto. 📞",
          leadStatus: currentLead,
        })
      }

      return Response.json({
        message: "Por favor, llámanos al 900 123 456 para ayudarte. 📞",
        error: "openai_error",
      })
    }
  } catch (error: any) {
    console.error("[v0] Chat API error:", error?.message)

    return Response.json(
      {
        message: "Llámanos al 900 123 456 para ayudarte ahora mismo. 🙏",
        error: "server_error",
      },
      { status: 500 },
    )
  }
}
