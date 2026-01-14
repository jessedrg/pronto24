"use client"

import { useState, useEffect } from "react"
import { Phone, Zap, Shield, CheckCircle2, MapPin, Star, BadgeCheck, Timer, Award, ThumbsUp, Clock } from "lucide-react"
import Image from "next/image"

export function ElectricistaContent() {
  const [phoneNumber, setPhoneNumber] = useState("711267223")
  const [phoneFormatted, setPhoneFormatted] = useState("711 267 223")
  const [activeUsers, setActiveUsers] = useState(12)

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const res = await fetch("/api/config/phone")
        const data = await res.json()
        if (data.phoneNumber) {
          setPhoneNumber(data.phoneNumber)
          setPhoneFormatted(data.formatted || data.phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3"))
        }
      } catch (e) {}
    }
    fetchPhone()

    const userInterval = setInterval(() => {
      setActiveUsers((prev) => Math.max(8, Math.min(18, prev + Math.floor(Math.random() * 3) - 1)))
    }, 8000)

    return () => clearInterval(userInterval)
  }, [])

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
    }
  }

  const problems = [
    { problem: "Se me ha ido la luz", emoji: "💡", urgent: true },
    { problem: "El diferencial salta solo", emoji: "⚡", urgent: true },
    { problem: "Huele a quemado", emoji: "🔥", urgent: true },
    { problem: "Enchufes no funcionan", emoji: "🔌", urgent: false },
    { problem: "Luces parpadean", emoji: "✨", urgent: false },
    { problem: "Cuadro eléctrico", emoji: "⚙️", urgent: false },
  ]

  const guarantees = [
    { icon: Timer, title: "10 min", subtitle: "Tiempo de llegada", color: "text-[#FF6B35]" },
    { icon: Shield, title: "Garantía", subtitle: "En cada trabajo", color: "text-[#FF6B35]" },
    { icon: Award, title: "Certificados", subtitle: "Electricistas oficiales", color: "text-[#FF6B35]" },
    { icon: ThumbsUp, title: "4.9★", subtitle: "+2,800 opiniones", color: "text-[#FF6B35]" },
  ]

  const reviews = [
    {
      name: "María G.",
      city: "Barcelona",
      text: "Llegaron en 8 minutos. El electricista fue muy profesional y solucionó el problema del diferencial en media hora.",
      time: "Hace 2 horas",
    },
    {
      name: "Carlos P.",
      city: "Sabadell",
      text: "Se me fue la luz a las 11 de la noche. Vinieron enseguida y lo arreglaron. Servicio impecable.",
      time: "Hace 5 horas",
    },
    {
      name: "Ana R.",
      city: "Málaga",
      text: "Olía a quemado en un enchufe y me asusté mucho. El técnico llegó rapidísimo y detectó el problema.",
      time: "Ayer",
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/5 via-transparent to-[#FF6B35]/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>{activeUsers} electricistas disponibles ahora</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] mb-6">
                <span className="text-foreground">¿Sin luz en casa?</span>
                <span className="block text-[#FF6B35] mt-2">Llegamos en 10 min</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                Electricistas certificados disponibles{" "}
                <strong className="text-foreground">24/7 en toda Catalunya y Málaga</strong>. Solucionamos cualquier
                avería eléctrica de urgencia.
              </p>

              {/* Main CTA */}
              <div className="space-y-4 mb-10">
                <a
                  href={`tel:+34${phoneNumber}`}
                  onClick={handleCall}
                  className="group relative inline-flex items-center justify-center gap-4 w-full sm:w-auto px-8 py-5 bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold text-xl rounded-2xl shadow-lg shadow-[#FF6B35]/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#FF6B35]/30"
                >
                  <Phone className="w-6 h-6" />
                  <span>LLAMAR AHORA - {phoneFormatted}</span>
                </a>
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Sin compromiso
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Profesionales verificados
                  </span>
                </div>
              </div>

              {/* Problems Quick Access */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-medium">¿Cuál es tu problema?</p>
                <div className="flex flex-wrap gap-2">
                  {problems.map((item, i) => (
                    <a
                      key={i}
                      href={`tel:+34${phoneNumber}`}
                      onClick={handleCall}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-105 ${
                        item.urgent
                          ? "bg-red-500/10 border-red-500/30 hover:bg-red-500/20"
                          : "bg-muted/50 border-border hover:bg-muted"
                      }`}
                    >
                      <span className="text-base">{item.emoji}</span>
                      <span className={`text-sm font-medium ${item.urgent ? "text-red-500" : "text-foreground"}`}>
                        {item.problem}
                      </span>
                      {item.urgent && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">
                          URGENTE
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Main Image */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-border shadow-2xl">
                  <Image
                    src="/images/electricista-profesional.jpg"
                    alt="Electricista profesional"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/95 backdrop-blur-sm border border-border">
                      <div className="w-12 h-12 rounded-xl bg-[#FF6B35] flex items-center justify-center shrink-0">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">Electricista certificado</div>
                        <div className="text-sm text-muted-foreground">Disponible ahora mismo</div>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute -top-4 -right-4 sm:top-4 sm:right-4 z-10">
                  <div className="px-4 py-3 rounded-2xl bg-background border border-[#FF6B35]/30 shadow-xl">
                    <div className="text-center">
                      <div className="text-3xl font-black text-[#FF6B35]">10</div>
                      <div className="text-xs text-muted-foreground font-medium">min llegada</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border text-center">
                <item.icon className={`w-8 h-8 mx-auto mb-3 ${item.color}`} />
                <div className="font-bold text-foreground text-xl">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative p-8 rounded-3xl border border-[#FF6B35]/30 bg-[#FF6B35]/5 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#FF6B35]/20">
                  <MapPin className="w-8 h-8 text-[#FF6B35]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground">Catalunya + Málaga</h2>
                  <p className="text-muted-foreground">Llegamos en 10 minutos a cualquier punto</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {["Barcelona", "Girona", "Tarragona", "Lleida", "Málaga", "Marbella"].map((city) => (
                  <span
                    key={city}
                    className="px-4 py-2 rounded-full bg-background text-foreground text-sm font-medium border border-border"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 text-[#FF6B35] fill-[#FF6B35]" />
              ))}
            </div>
            <p className="text-foreground font-bold text-lg">4.9 de 5 - +2,800 valoraciones verificadas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#FF6B35] flex items-center justify-center text-white font-bold text-lg shrink-0">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{review.name}</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.city} - {review.time}
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-[#FF6B35] fill-[#FF6B35]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6B35]/10 text-[#FF6B35] text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>Electricistas listos para ayudarte 24/7</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            ¿Problema eléctrico?
            <span className="block text-[#FF6B35]">Llámanos ahora</span>
          </h2>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            No esperes más. Un electricista certificado puede estar en tu casa en menos de 10 minutos.
          </p>

          <a
            href={`tel:+34${phoneNumber}`}
            onClick={handleCall}
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#FF6B35] hover:bg-[#FF5722] text-white font-bold text-xl rounded-2xl shadow-lg transition-all hover:scale-105"
          >
            <Phone className="w-7 h-7" />
            <span>{phoneFormatted}</span>
          </a>

          <p className="mt-6 text-muted-foreground text-sm">Servicio 24h - 7 días - Festivos incluidos</p>
        </div>
      </section>
    </div>
  )
}
