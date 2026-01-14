"use client"

import { useState, useEffect } from "react"
import { Phone, Zap, Clock, Shield, CheckCircle2, MapPin, Star, BadgeCheck, Timer, Sparkles } from "lucide-react"

export function ElectricistaHero() {
  const [phoneNumber, setPhoneNumber] = useState("711267223")
  const [phoneFormatted, setPhoneFormatted] = useState("711 267 223")
  const [activeUsers, setActiveUsers] = useState(12)
  const [currentTime, setCurrentTime] = useState("")

  useEffect(() => {
    // Fetch dynamic phone
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

    // Update time
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }))
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)

    // Simulate active users
    const userInterval = setInterval(() => {
      setActiveUsers((prev) => Math.max(8, Math.min(18, prev + Math.floor(Math.random() * 3) - 1)))
    }, 5000)

    return () => {
      clearInterval(interval)
      clearInterval(userInterval)
    }
  }, [])

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-XXXXX/XXXXX",
        event_category: "engagement",
        event_label: "electricista_call",
      })
    }
  }

  const services = [
    { name: "Cortes de luz", icon: "⚡" },
    { name: "Cuadros eléctricos", icon: "🔌" },
    { name: "Cortocircuitos", icon: "💥" },
    { name: "Enchufes", icon: "🔧" },
    { name: "Diferenciales", icon: "⚙️" },
    { name: "Iluminación", icon: "💡" },
  ]

  const stats = [
    { value: "10", label: "min llegada", suffix: "" },
    { value: "24", label: "horas", suffix: "/7" },
    { value: "4.9", label: "valoración", suffix: "★" },
    { value: "+2.8K", label: "servicios", suffix: "" },
  ]

  const reviews = [
    { name: "María G.", city: "Barcelona", text: "Vinieron en 8 minutos. Increíble servicio.", rating: 5 },
    { name: "Carlos P.", city: "Sabadell", text: "Profesionales y rápidos. Muy recomendable.", rating: 5 },
    { name: "Ana R.", city: "Málaga", text: "Me salvaron a las 3am. Gracias!", rating: 5 },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-amber-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px]" />

      {/* Animated electricity lines */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-px h-40 bg-gradient-to-b from-amber-400 to-transparent animate-pulse" />
        <div className="absolute top-40 right-20 w-px h-32 bg-gradient-to-b from-amber-400 to-transparent animate-pulse delay-300" />
        <div className="absolute bottom-40 left-1/4 w-px h-24 bg-gradient-to-b from-amber-400 to-transparent animate-pulse delay-500" />
      </div>

      <div className="relative z-10">
        {/* Top Bar - Live Status */}
        <div className="bg-amber-500/10 border-b border-amber-500/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-green-400 font-medium">{activeUsers} electricistas activos ahora</span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-zinc-400">
              <Clock className="w-4 h-4" />
              <span>{currentTime} • Servicio 24h activo</span>
            </div>
          </div>
        </div>

        {/* Main Hero */}
        <div className="max-w-6xl mx-auto px-4 pt-8 pb-16 md:pt-16 md:pb-24">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-medium">
              <Zap className="w-4 h-4" />
              <span>Electricistas certificados • Catalunya y Málaga</span>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight mb-4 leading-[1.1]">
              Electricista Urgente
              <span className="block text-amber-400">en 10 Minutos</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
              Solucionamos cualquier avería eléctrica. Profesionales certificados disponibles ahora mismo.
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-2xl mx-auto mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-3 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {stat.value}
                  <span className="text-amber-400">{stat.suffix}</span>
                </div>
                <div className="text-xs sm:text-sm text-zinc-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href={`tel:+34${phoneNumber}`}
              onClick={handleCall}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-lg rounded-2xl shadow-2xl shadow-amber-500/30 transition-all hover:scale-105 hover:shadow-amber-500/50"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
              <Phone className="relative w-6 h-6 animate-pulse" />
              <span className="relative">Llamar Ahora</span>
              <span className="relative text-amber-900">{phoneFormatted}</span>
            </a>
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <span>Llamada gratuita</span>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-16">
            <h2 className="text-center text-zinc-500 text-sm font-medium uppercase tracking-wider mb-4">
              Servicios más solicitados
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 max-w-3xl mx-auto">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="group flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all cursor-pointer"
                >
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-xs text-zinc-400 text-center group-hover:text-white transition-colors">
                    {service.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Coverage Banner */}
          <div className="relative mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10 rounded-2xl" />
            <div className="relative p-6 sm:p-8 rounded-2xl border border-amber-500/30 bg-zinc-900/50 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-500/20">
                    <MapPin className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">Toda Catalunya y Málaga</h3>
                    <p className="text-zinc-400">Cobertura completa • Llegamos en 10 minutos</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Barcelona", "Girona", "Tarragona", "Lleida", "Málaga"].map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-sm border border-zinc-700"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Section */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Timer className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-white">Respuesta Inmediata</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Electricista en tu puerta en menos de 10 minutos. Sin esperas innecesarias.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <BadgeCheck className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white">Profesionales Certificados</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Todos nuestros electricistas tienen carnet oficial y más de 10 años de experiencia.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-bold text-white">Garantía Total</h3>
              </div>
              <p className="text-sm text-zinc-400">
                Trabajo garantizado. Si no quedas satisfecho, te devolvemos el dinero.
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-16">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <span className="text-white font-bold">4.9</span>
              <span className="text-zinc-500">• +2,800 valoraciones</span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {reviews.map((review, i) => (
                <div key={i} className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-black font-bold">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-white">{review.name}</div>
                      <div className="text-xs text-zinc-500">{review.city}</div>
                    </div>
                    <div className="ml-auto flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-zinc-300">"{review.text}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-3xl bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span className="text-amber-400 font-medium">¿Necesitas un electricista ahora?</span>
              </div>
              <a
                href={`tel:+34${phoneNumber}`}
                onClick={handleCall}
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-bold text-xl rounded-2xl shadow-2xl shadow-amber-500/30 transition-all hover:scale-105"
              >
                <Phone className="w-7 h-7" />
                <span>Llamar: {phoneFormatted}</span>
              </a>
              <p className="text-zinc-500 text-sm">Atendemos las 24 horas, todos los días</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
