"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MessageCircle, X, ArrowRight } from "lucide-react"

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
  const [progress, setProgress] = useState(0)
  const [availabilityTime, setAvailabilityTime] = useState(15)
  const [currentActivity, setCurrentActivity] = useState(recentActivity[0])
  const [sessionId] = useState(() => generateSessionId())

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen === null) {
      const isMobile = window.innerWidth < 768
      setIsOpen(!isMobile) // Open on desktop, closed on mobile
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
    if (isOpen) {
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

  if (isOpen === null) {
    return null
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3">
          {showTeaser && (
            <div className="bg-foreground text-background px-4 py-3 rounded-2xl rounded-br-sm shadow-lg max-w-[260px] animate-in slide-in-from-bottom-4 fade-in duration-500 relative">
              <p className="text-sm font-medium">3 profesionales disponibles ahora</p>
              <button
                onClick={() => setShowTeaser(false)}
                className="absolute -top-2 -right-2 bg-background text-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs shadow-md hover:scale-110 transition-transform"
              >
                ×
              </button>
            </div>
          )}

          <Button
            onClick={handleOpenChat}
            size="lg"
            className="h-14 w-14 rounded-full shadow-xl hover:scale-105 transition-transform"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </Button>
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
                <h3 className="font-semibold text-sm">rapidfix.es</h3>
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
                          className="flex items-center gap-2 p-2.5 rounded-xl border border-neutral-200 hover:border-foreground hover:bg-foreground hover:text-background transition-all text-left group"
                        >
                          <span className="text-base">{item.icon}</span>
                          <span className="text-sm font-medium">{item.label}</span>
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => handleQuickReply("Tengo un problema con la caldera")}
                      className="w-full flex items-center justify-center gap-2 p-2.5 mt-2 rounded-xl border border-neutral-200 hover:border-foreground hover:bg-foreground hover:text-background transition-all text-sm font-medium"
                    >
                      <span>🔥</span>
                      <span>Calderas</span>
                    </button>
                  </div>
                )}

                {service && (
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <p className="text-sm text-neutral-700">
                      Veo que necesitas un servicio de <strong>{service}</strong>.
                    </p>
                    <p className="text-sm text-neutral-500 mt-1">¿Qué ha pasado exactamente?</p>
                  </div>
                )}
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-200`}
              >
                <div
                  className={`rounded-2xl px-4 py-2.5 max-w-[85%] ${
                    message.role === "user"
                      ? "bg-foreground text-background rounded-br-sm"
                      : "bg-white shadow-sm rounded-bl-sm"
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start animate-in fade-in duration-200">
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-sm">
                  <div className="flex gap-1">
                    <span
                      className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 bg-neutral-300 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div
            className="bg-neutral-50 px-4 py-3 shrink-0"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
          >
            {messages.length > 0 && messages.length < 4 && (
              <p className="text-[11px] text-neutral-400 text-center mb-2">Completa ahora para prioridad</p>
            )}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:border-foreground text-sm transition-colors bg-white"
                disabled={isLoading}
                style={{ fontSize: "16px" }}
                autoComplete="off"
              />
              <Button
                type="submit"
                size="icon"
                className="rounded-xl h-[42px] w-[42px] shrink-0"
                disabled={isLoading || !input.trim()}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  )
}
