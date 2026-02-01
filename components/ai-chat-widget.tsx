"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, ArrowRight, Phone } from "lucide-react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

interface AIChatWidgetProps {
  service?: string
}

const recentActivity = [
  { name: "Carlos", city: "Barcelona", service: "fontanero", time: "2 min" },
  { name: "Laura", city: "Hospitalet", service: "electricista", time: "4 min" },
  { name: "Marc", city: "Badalona", service: "desatasco", time: "7 min" },
  { name: "Ana", city: "Terrassa", service: "cerrajero", time: "11 min" },
  { name: "David", city: "Sabadell", service: "calderas", time: "15 min" },
  { name: "Nuria", city: "Mataró", service: "fontanero", time: "18 min" },
  { name: "Jordi", city: "Santa Coloma", service: "electricista", time: "23 min" },
  { name: "Marta", city: "Cornellà", service: "desatasco", time: "28 min" },
  { name: "Sergi", city: "Granollers", service: "cerrajero", time: "32 min" },
  { name: "Paula", city: "Sant Cugat", service: "fontanero", time: "35 min" },
  { name: "Alex", city: "Viladecans", service: "calderas", time: "41 min" },
  { name: "Elena", city: "El Prat", service: "electricista", time: "46 min" },
  { name: "Raul", city: "Rubí", service: "desatasco", time: "52 min" },
  { name: "Mireia", city: "Castelldefels", service: "fontanero", time: "58 min" },
  { name: "Josep", city: "Vilanova", service: "cerrajero", time: "1 hora" },
]

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

function getUTMParams() {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get("utm_source") || undefined,
    utmMedium: params.get("utm_medium") || undefined,
    utmCampaign: params.get("utm_campaign") || undefined,
  }
}

export function AIChatWidget({ service }: AIChatWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)
  const [hasTrackedConversion, setHasTrackedConversion] = useState(false)
  const [hasTrackedWhatsApp, setHasTrackedWhatsApp] = useState(false)
  const [progress, setProgress] = useState(0)
  const [availabilityTime, setAvailabilityTime] = useState(15)
  const [currentActivity, setCurrentActivity] = useState(recentActivity[0])
  const [sessionId] = useState(() => generateSessionId())
  const phoneNumber = "931501817"
  const phoneFormatted = "931 501 817"

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen === null) {
      const isMobile = window.innerWidth < 768
      setIsOpen(!isMobile)
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setInterval(() => {
      setAvailabilityTime((prev) => (prev > 1 ? prev - 1 : 15))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity(recentActivity[Math.floor(Math.random() * recentActivity.length)])
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const userMessages = messages.filter((m) => m.role === "user").length
    if (userMessages === 0) setProgress(0)
    else if (userMessages === 1) setProgress(25)
    else if (userMessages === 2) setProgress(50)
    else if (userMessages === 3) setProgress(75)
    else setProgress(100)
  }, [messages])

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.height = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.height = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
      document.body.style.height = ""
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true)
      }
    }, 3000)
    return () => clearTimeout(timer)
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent, quickMessage?: string) => {
    e.preventDefault()
    const messageText = quickMessage || input
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    const utmParams = getUTMParams()

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-conversation-id": sessionId,
          "x-utm-source": utmParams.utmSource || "",
          "x-utm-medium": utmParams.utmMedium || "",
          "x-utm-campaign": utmParams.utmCampaign || "",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          service: service,
          sessionId: sessionId,
          userMessage: messageText,
        }),
      })

      const data = await response.json()

      if (!response.ok || data.error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.message || "Lo siento, hubo un error. Por favor, intenta de nuevo o llámanos al 900 123 456.",
        }
        setMessages((prev) => [...prev, errorMessage])
        setIsLoading(false)
        return
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message || data.content || "Lo siento, hubo un error. ¿Puedes intentarlo de nuevo?",
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("[v0] Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Lo siento, hubo un error de conexión. Por favor, llámanos al 900 123 456 para ayudarte de inmediato.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (message: string) => {
    const event = { preventDefault: () => {} } as React.FormEvent
    handleSubmit(event, message)
  }

  const handleOpenChat = () => {
    setIsOpen(true)
    setShowTeaser(false)

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "chat_open", {
        event_category: "engagement",
        event_label: service || "general",
      })
    }
  }

  const isLeadComplete = messages.some(
    (m) => m.role === "user" && /(\+34|0034)?[\s.-]?[6-9]\d{2}[\s.-]?\d{3}[\s.-]?\d{3}/.test(m.content),
  )

  useEffect(() => {
    if (isLeadComplete && !hasTrackedConversion) {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", {
          send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
          value: 20.0,
          currency: "EUR",
        })

        window.gtag("event", "lead_completed", {
          event_category: "conversion",
          event_label: service || "general",
        })
      }
      setHasTrackedConversion(true)
    }
  }, [isLeadComplete, hasTrackedConversion, service])

  const getServiceFromMessages = () => {
    const serviceMessage = messages.find(
      (m) =>
        m.role === "user" &&
        (m.content.toLowerCase().includes("fontanero") ||
          m.content.toLowerCase().includes("electricista") ||
          m.content.toLowerCase().includes("cerrajero") ||
          m.content.toLowerCase().includes("desatasco") ||
          m.content.toLowerCase().includes("caldera")),
    )
    if (serviceMessage) {
      if (serviceMessage.content.toLowerCase().includes("fontanero")) return "fontanero"
      if (serviceMessage.content.toLowerCase().includes("electricista")) return "electricista"
      if (serviceMessage.content.toLowerCase().includes("cerrajero")) return "cerrajero"
      if (serviceMessage.content.toLowerCase().includes("desatasco")) return "desatasco"
      if (serviceMessage.content.toLowerCase().includes("caldera")) return "calderas"
    }
    return service || "urgente"
  }

  const sendWhatsAppLead = async () => {
    if (hasTrackedWhatsApp) return

    try {
      await fetch("/api/leads/whatsapp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: getServiceFromMessages(),
          messages: messages,
          sessionId: sessionId,
        }),
      })
      setHasTrackedWhatsApp(true)
    } catch (error) {
      console.error("[v0] Error sending WhatsApp lead:", error)
    }
  }

  const handleWhatsAppClick = () => {
    sendWhatsAppLead()

    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })

      window.gtag("event", "whatsapp_click", {
        event_category: "conversion",
        event_label: service || getServiceFromMessages() || "general",
      })
    }
  }

  const handleCallClick = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 25.0,
        currency: "EUR",
      })
      window.gtag("event", "phone_call_click", {
        event_category: "conversion",
        event_label: service || "general",
        value: 25.0,
      })
      window.gtag("event", "generate_lead", {
        event_category: "engagement",
        event_label: "phone_call",
        value: 25.0,
        currency: "EUR",
      })
    }
  }

  if (isOpen === null) {
    return null
  }

  return (
    <>
      <div
        className={`fixed z-50 flex items-center gap-3 transition-all duration-300 ${
          isOpen ? "bottom-4 right-4 md:bottom-6 md:right-[460px]" : "bottom-4 right-4 md:bottom-6 md:right-6"
        }`}
      >
        <a
          href={`tel:+34${phoneNumber}`}
          className="group flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white pl-3 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          onClick={handleCallClick}
        >
          <div className="relative">
            <Phone className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-bold text-sm">Llamar</span>
            <span className="text-[10px] text-green-100">{phoneFormatted}</span>
          </div>
        </a>

        {/* Chat Button - only show when chat is closed */}
        {!isOpen && (
          <button
            onClick={handleOpenChat}
            className="group relative flex items-center gap-2 bg-foreground hover:bg-foreground/90 text-background pl-3 pr-4 py-2.5 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            {/* WhatsApp style icon */}
            <div className="relative">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-[#00B8A9] text-white text-[8px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center">
                3
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-sm">Chat</span>
              <span className="text-[10px] text-background/70">Online</span>
            </div>
          </button>
        )}
      </div>

      {/* Teaser notification - repositioned */}
      {!isOpen && showTeaser && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 bg-foreground text-background px-4 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[260px] animate-in slide-in-from-bottom-4 fade-in duration-500">
          <p className="text-sm font-medium">3 profesionales disponibles ahora</p>
          <button
            onClick={() => setShowTeaser(false)}
            className="absolute -top-2 -right-2 bg-background text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:scale-110 transition-transform"
          >
            ×
          </button>
        </div>
      )}

      {isOpen && (
        <Card className="fixed z-50 flex flex-col shadow-2xl border-0 animate-in slide-in-from-bottom-4 fade-in duration-300 overflow-hidden p-0 inset-0 md:inset-auto md:bottom-6 md:right-6 md:w-[400px] md:h-[600px] md:rounded-2xl bg-neutral-50">
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-50 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-foreground text-background flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M13 3L4 14h7l-2 7 9-11h-7l2-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-sm">pronto-24.com</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="text-xs text-neutral-500">Online ahora</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="h-8 w-8 rounded-full hover:bg-neutral-200 flex items-center justify-center transition-colors"
            >
              <X className="h-4 w-4 text-neutral-400" />
            </button>
          </div>

          {messages.length === 0 && (
            <div className="px-4 py-2 bg-neutral-50 border-b border-neutral-100 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-neutral-200 flex items-center justify-center text-[9px] font-medium">
                    {currentActivity.name.charAt(0)}
                  </div>
                  <p className="text-xs text-neutral-500">
                    {currentActivity.name} de {currentActivity.city} · {currentActivity.time}
                  </p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-xs text-neutral-500">{availabilityTime} min</span>
                </div>
              </div>
            </div>
          )}

          {messages.length > 0 && (
            <div className="px-4 py-2 bg-neutral-50 shrink-0">
              <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
                <span>Completando solicitud</span>
                <span className="font-medium text-foreground">{progress}%</span>
              </div>
              <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-foreground rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          <div
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-neutral-50"
            style={{
              WebkitOverflowScrolling: "touch",
              minHeight: 0,
            }}
          >
            <a
              href={`https://wa.me/34${phoneNumber}?text=${encodeURIComponent(`Hola! Necesito ayuda con un servicio ${getServiceFromMessages()}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 bg-green-50 hover:bg-green-100 border border-green-200 rounded-2xl p-3 transition-colors group"
            >
              <img src="/images/whatsapp-logo.png" alt="WhatsApp" className="w-10 h-10 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-green-800">Escríbenos por WhatsApp</p>
                <p className="text-xs text-green-600">Respuesta directa e inmediata</p>
              </div>
              <svg
                className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {messages.length === 0 && (
              <div className="space-y-3 animate-in fade-in duration-500">
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Cuéntame tu problema y en segundos te conecto con el profesional más cercano.
                  </p>

                  <div className="flex gap-2 mt-3 pt-3 border-t border-neutral-100">
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                      Consulta gratis
                    </span>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">
                      Sin compromiso
                    </span>
                    <span className="text-xs text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full">24h</span>
                  </div>
                </div>

                {!service && (
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-sm font-medium text-neutral-700 mb-2">¿Qué necesitas?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: "🚰", label: "Desatasco", msg: "Tengo una urgencia de desatasco" },
                        { icon: "⚡", label: "Electricista", msg: "Necesito un electricista urgente" },
                        { icon: "🔧", label: "Fontanero", msg: "Necesito un fontanero urgente" },
                        { icon: "🔑", label: "Cerrajero", msg: "Necesito un cerrajero urgente" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          onClick={() => handleQuickReply(item.msg)}
                          className="flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200 hover:border-foreground hover:bg-foreground/5 transition-all text-left"
                        >
                          <span className="text-lg">{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-white shadow-sm text-neutral-700 rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white shadow-sm rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce" />
                    <span
                      className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <span
                      className="w-2 h-2 bg-neutral-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}

            {isLeadComplete && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="font-semibold text-green-800 text-sm">¡Solicitud completada!</p>
                </div>
                <p className="text-xs text-green-700">Te contactaremos en menos de 5 minutos</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-neutral-50 border-t border-neutral-100 shrink-0 safe-area-inset-bottom">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe tu problema..."
                className="flex-1 bg-white border border-neutral-200 rounded-full px-4 py-2.5 text-base focus:outline-none focus:border-foreground focus:ring-1 focus:ring-foreground transition-colors"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!input.trim() || isLoading}
                className="h-10 w-10 rounded-full bg-foreground hover:bg-foreground/90 text-background"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  )
}
