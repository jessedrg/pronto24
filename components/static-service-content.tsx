"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  Shield,
  CheckCircle2,
  MapPin,
  Star,
  BadgeCheck,
  Timer,
  Award,
  ThumbsUp,
  Clock,
  Zap,
  Droplets,
  Key,
  Flame,
  Wrench,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Users,
} from "lucide-react"
import Image from "next/image"

const ICONS = {
  zap: Zap,
  droplets: Droplets,
  key: Key,
  flame: Flame,
  wrench: Wrench,
}

interface Problem {
  problem: string
  emoji: string
  urgent: boolean
}

interface Review {
  name: string
  city: string
  text: string
  time: string
}

interface FAQ {
  question: string
  answer: string
}

interface StaticServiceContentProps {
  serviceId: string
  serviceName: string
  serviceNamePlural: string
  headline: string
  subheadline: string
  description: string
  iconName: keyof typeof ICONS
  problems: Problem[]
  reviews: Review[]
  faqs: FAQ[]
  whyChooseUs: string[]
  serviceProcess: string[]
  preventionTips: string[]
  extendedDescription: string
  coverageCities: string[]
}

export function StaticServiceContent({
  serviceId,
  serviceName,
  serviceNamePlural,
  headline,
  subheadline,
  description,
  iconName,
  problems,
  reviews,
  faqs,
  whyChooseUs,
  serviceProcess,
  preventionTips,
  extendedDescription,
  coverageCities,
}: StaticServiceContentProps) {
  const phoneNumber = "936946639"
  const phoneFormatted = "936 946 639"
  const [activeUsers, setActiveUsers] = useState(12)

  const IconComponent = ICONS[iconName] || Wrench

  useEffect(() => {
    const userInterval = setInterval(() => {
      setActiveUsers((prev: number) => Math.max(8, Math.min(18, prev + Math.floor(Math.random() * 3) - 1)))
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

  const guarantees = [
    { icon: Timer, title: "10 min", subtitle: "Tiempo de llegada" },
    { icon: Shield, title: "Garantía", subtitle: "En cada trabajo" },
    { icon: Award, title: "Certificados", subtitle: "Profesionales oficiales" },
    { icon: ThumbsUp, title: "4.9★", subtitle: "+2,800 opiniones" },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00B8A9]/5 via-transparent to-[#00B8A9]/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B8A9]/10 border border-[#00B8A9]/30 text-[#00B8A9] text-sm font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>{activeUsers} {serviceNamePlural.toLowerCase()} disponibles ahora</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1]">
                <span className="text-foreground">{headline}</span>
                <span className="block text-[#00B8A9] mt-2">{subheadline}</span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                {description}
              </p>

              {/* Main CTA */}
              <div className="space-y-4">
                <a
                  href={`tel:+34${phoneNumber}`}
                  onClick={handleCall}
                  className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-[#00B8A9] hover:bg-[#009688] text-white font-bold text-lg sm:text-xl rounded-2xl shadow-lg shadow-[#00B8A9]/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-[#00B8A9]/30"
                >
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-base sm:text-xl">LLAMAR - {phoneFormatted}</span>
                </a>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Sin compromiso
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Profesionales verificados
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Presupuesto gratis
                  </span>
                </div>
              </div>

              {/* Problems Quick Access */}
              <div className="space-y-3">
                <p className="text-xs sm:text-sm text-muted-foreground font-medium">Problemas más comunes:</p>
                <div className="flex flex-wrap gap-2">
                  {problems.slice(0, 6).map((item, i) => (
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
            <div className="relative">
              <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80&auto=format&fit=crop"
                    alt={`${serviceName} profesional`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/95 backdrop-blur-sm border border-border">
                      <div className="w-12 h-12 rounded-xl bg-[#00B8A9] flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">{serviceName} certificado</div>
                        <div className="text-sm text-muted-foreground">Disponible en toda España</div>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 z-10">
                  <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-background border border-[#00B8A9]/30 shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-black text-[#00B8A9]">10</div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">min llegada</div>
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
                <item.icon className="w-8 h-8 mx-auto mb-3 text-[#00B8A9]" />
                <div className="font-bold text-foreground text-xl">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué elegirnos */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B8A9]/10 text-[#00B8A9] text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>Más de 2,800 clientes satisfechos</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir nuestro servicio de {serviceName.toLowerCase()}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Somos el servicio de {serviceName.toLowerCase()} más valorado en España. Descubre por qué miles de clientes confían en nosotros.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border hover:border-[#00B8A9]/30 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00B8A9]/10 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-[#00B8A9]" />
                  </div>
                  <p className="text-foreground font-medium">{reason}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Cómo funciona nuestro servicio de {serviceName.toLowerCase()}?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Un proceso simple y transparente para que tengas a un profesional en tu casa en cuestión de minutos.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceProcess.slice(0, 4).map((step, i) => (
              <div key={i} className="relative">
                <div className="p-6 rounded-2xl bg-muted/30 border border-border h-full">
                  <div className="w-10 h-10 rounded-full bg-[#00B8A9] text-white flex items-center justify-center font-bold text-lg mb-4">
                    {i + 1}
                  </div>
                  <p className="text-foreground">{step}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Descripción extendida SEO */}
      <section className="py-12 bg-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Tu {serviceName.toLowerCase()} de confianza en toda España
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {extendedDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Consejos de prevención */}
      <section className="py-16 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B8A9]/10 text-[#00B8A9] text-sm font-medium mb-4">
                <Lightbulb className="w-4 h-4" />
                <span>Consejos de expertos</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Consejos para prevenir problemas de {serviceName.toLowerCase()}
              </h2>
              <p className="text-muted-foreground mb-6">
                Nuestros {serviceNamePlural.toLowerCase()} comparten estos consejos prácticos para evitar averías y mantener tus instalaciones en perfecto estado.
              </p>
              <a
                href={`tel:+34${phoneNumber}`}
                onClick={handleCall}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00B8A9] hover:bg-[#009688] text-white font-bold rounded-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Consulta gratuita</span>
              </a>
            </div>
            
            <div className="space-y-4">
              {preventionTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                  <div className="w-8 h-8 rounded-lg bg-[#00B8A9]/10 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 text-[#00B8A9]" />
                  </div>
                  <p className="text-muted-foreground">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cobertura */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="relative p-8 rounded-3xl border border-[#00B8A9]/30 bg-[#00B8A9]/5 overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#00B8A9]/20">
                  <MapPin className="w-8 h-8 text-[#00B8A9]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-foreground">{serviceName} en toda España</h2>
                  <p className="text-muted-foreground">Servicio disponible en las principales ciudades:</p>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {coverageCities.map((city) => (
                  <a
                    key={city}
                    href={`/${serviceId}/${city.toLowerCase().replace(/ /g, '-')}`}
                    className="px-4 py-2 rounded-full bg-background text-foreground text-sm font-medium border border-border hover:border-[#00B8A9]/50 transition-colors"
                  >
                    {city}
                  </a>
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
                <Star key={s} className="w-6 h-6 text-[#00B8A9] fill-[#00B8A9]" />
              ))}
            </div>
            <p className="text-foreground font-bold text-lg">4.9 de 5 - +2,800 valoraciones verificadas</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-[#00B8A9] flex items-center justify-center text-white font-bold text-lg shrink-0">
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
                      <Star key={s} className="w-3.5 h-3.5 text-[#00B8A9] fill-[#00B8A9]" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">&quot;{review.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B8A9]/10 text-[#00B8A9] text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              <span>Resolvemos tus dudas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Preguntas frecuentes sobre {serviceName.toLowerCase()}
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-2xl border border-border bg-background overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                  <h3 className="text-lg font-semibold text-foreground pr-4">{faq.question}</h3>
                  <span className="text-[#00B8A9] shrink-0 transition-transform group-open:rotate-180">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B8A9]/10 text-[#00B8A9] text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>{serviceNamePlural} listos 24/7 en toda España</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-4">
            ¿Necesitas un {serviceName.toLowerCase()}?
            <span className="block text-[#00B8A9]">Llámanos ahora</span>
          </h2>

          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Un {serviceName.toLowerCase()} certificado puede estar en tu casa en menos de 10 minutos.
          </p>

          <a
            href={`tel:+34${phoneNumber}`}
            onClick={handleCall}
            className="inline-flex items-center gap-4 px-10 py-5 bg-[#00B8A9] hover:bg-[#009688] text-white font-bold text-xl rounded-2xl shadow-lg transition-all hover:scale-105"
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
