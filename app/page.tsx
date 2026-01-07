"use client"

import { Phone, MessageCircle, Star, Clock, Shield, CheckCircle, Zap } from "lucide-react"
import { useEffect, useState } from "react"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const services = [
  { name: "Fontaneros", icon: "🔧" },
  { name: "Electricistas", icon: "⚡" },
  { name: "Cerrajeros", icon: "🔑" },
  { name: "Desatascos", icon: "🚿" },
  { name: "Calderas", icon: "🔥" },
]

export default function Home() {
  const [config, setConfig] = useState({
    whatsapp_phone: "34711267223",
    call_phone: "+34711267223",
    whatsapp_enabled: "true",
    call_enabled: "true",
  })

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch((err) => console.error("[v0] Error loading config:", err))
  }, [])

  const handleCallConversion = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
      window.gtag("event", "phone_call_click", {
        event_category: "conversion",
        event_label: "landing_page",
      })
    }
  }

  const handleWhatsAppConversion = () => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
      window.gtag("event", "whatsapp_click", {
        event_category: "conversion",
        event_label: "landing_page",
      })
    }
  }

  const isCallEnabled = config.call_enabled === "true"
  const isWhatsAppEnabled = config.whatsapp_enabled === "true"

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-bold text-lg">rapidfix</span>
          </div>
          {isCallEnabled && (
            <a
              href={`tel:${config.call_phone}`}
              className="flex items-center gap-2 bg-white text-black font-semibold px-4 py-2 rounded-full text-sm hover:bg-white/90 transition-colors"
              onClick={handleCallConversion}
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">{config.call_phone.replace("+34", "")}</span>
              <span className="sm:hidden">Llamar</span>
            </a>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-6 sm:pt-32 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left - Content */}
            <div className="order-1">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                <div className="flex -space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </div>
                <span className="text-sm font-medium">4.9</span>
                <span className="text-white/40 text-sm">|</span>
                <span className="text-white/60 text-sm">15.847 servicios</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5">
                Técnico en tu casa
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  en 30 minutos
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/50 mb-8 max-w-md">
                Urgencias del hogar 24/7. Profesionales verificados. Solo pagas si solucionamos.
              </p>

              <div className="flex items-center gap-3 mb-8">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-green-400 font-medium">12 técnicos disponibles ahora en tu zona</span>
              </div>

              {(isCallEnabled || isWhatsAppEnabled) && (
                <div className="hidden sm:flex gap-4 mb-10">
                  {isCallEnabled && (
                    <a
                      href={`tel:${config.call_phone}`}
                      className="flex items-center justify-center gap-3 bg-white text-black font-bold py-4 px-8 rounded-2xl text-lg hover:bg-white/90 transition-all hover:scale-[1.02]"
                      onClick={handleCallConversion}
                    >
                      <Phone className="w-5 h-5" />
                      <span>Llamar Ahora</span>
                    </a>
                  )}
                  {isWhatsAppEnabled && (
                    <a
                      href={`https://wa.me/${config.whatsapp_phone}?text=${encodeURIComponent("Hola! Necesito ayuda urgente")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 px-8 rounded-2xl text-lg hover:bg-[#22c55e] transition-all hover:scale-[1.02]"
                      onClick={handleWhatsAppConversion}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/50">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Sin desplazamiento</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Precio cerrado</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Garantía 1 año</span>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="order-2 relative md:pl-4 lg:pl-0">
              <div className="relative aspect-[4/3] md:aspect-[4/5] rounded-3xl overflow-hidden max-w-sm md:max-w-none mx-auto">
                <img
                  src="/professional-plumber-technician-working-fixing-pip.jpg"
                  alt="Técnico profesional"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>

                {/* Floating Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Respuesta inmediata</p>
                      <p className="text-white/60 text-sm">Técnico en camino en 10 minutos</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-sm font-semibold text-white/40 uppercase tracking-wider mb-6">Servicios de urgencia</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-5 transition-all cursor-pointer"
              >
                <span className="text-3xl mb-3 block">{service.icon}</span>
                <span className="font-semibold text-white group-hover:text-white transition-colors">
                  {service.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-6 sm:gap-12">
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-white mb-1">30</p>
              <p className="text-xs sm:text-sm text-white/40">min. llegada</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-white mb-1">24/7</p>
              <p className="text-xs sm:text-sm text-white/40">disponibilidad</p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-5xl font-black text-white mb-1">15k+</p>
              <p className="text-xs sm:text-sm text-white/40">clientes felices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-10 sm:py-16 mb-24 sm:mb-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 sm:p-10 border border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-7 h-7 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Solo pagas si solucionamos</h3>
                <p className="text-white/50">
                  Si no arreglamos tu problema, no te cobramos. Sin preguntas. Garantía de satisfacción total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {(isCallEnabled || isWhatsAppEnabled) && (
        <div className="fixed bottom-0 left-0 right-0 p-4 pb-6 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent pt-8 sm:hidden z-50">
          <div className="flex gap-3 max-w-lg mx-auto">
            {isCallEnabled && (
              <a
                href={`tel:${config.call_phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black font-bold py-4 rounded-2xl text-base"
                onClick={handleCallConversion}
              >
                <Phone className="w-5 h-5" />
                <span>Llamar</span>
              </a>
            )}
            {isWhatsAppEnabled && (
              <a
                href={`https://wa.me/${config.whatsapp_phone}?text=${encodeURIComponent("Hola! Necesito ayuda urgente")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-2xl text-base"
                onClick={handleWhatsAppConversion}
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  )
}
