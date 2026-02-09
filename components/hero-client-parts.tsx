"use client"

import { Phone, CheckCircle2 } from "lucide-react"

interface LiveBadgeProps {
  profession: { namePlural: string }
  cityName: string
  modifier?: string
  isUrgent?: boolean
}

export function LiveBadge({ profession, cityName, modifier, isUrgent }: LiveBadgeProps) {
  const getBadgeText = () => {
    switch (modifier) {
      case "24-horas":
        return `Servicio 24h disponible en ${cityName}`
      case "economico":
      case "barato":
        return `Mejores precios garantizados en ${cityName}`
      case "a-domicilio":
        return `Vamos a tu casa en ${cityName}`
      case "cerca-de-mi":
        return `El mas cercano a ti en ${cityName}`
      case "de-guardia":
        return `${profession.namePlural} de guardia 24h`
      case "nocturno":
        return `Servicio nocturno sin recargo`
      case "festivos":
        return `Trabajamos todos los festivos`
      case "rapido":
        return `Llegada express en 30 minutos`
      case "ahora":
        return `${profession.namePlural} disponibles ahora en ${cityName}`
      case "hoy":
        return `Servicio garantizado para hoy`
      case "precio":
        return `Presupuesto gratis sin compromiso`
      case "presupuesto":
        return `Respuesta inmediata garantizada`
      default:
        if (isUrgent) {
          return `${profession.namePlural} de urgencias disponibles 24h`
        }
        return `${profession.namePlural} disponibles 24h en ${cityName}`
    }
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 border border-foreground/20 text-foreground text-sm font-semibold">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
      </span>
      <span>{getBadgeText()}</span>
    </div>
  )
}

interface CallButtonProps {
  phoneNumber: string
  phoneFormatted: string
  modifier?: string
  className?: string
  size?: "default" | "large"
}

export function CallButton({ phoneNumber, phoneFormatted, modifier, className, size = "default" }: CallButtonProps) {
  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
    }
  }

  if (size === "large") {
    return (
      <a
        href={`tel:+34${phoneNumber}`}
        onClick={handleCall}
        className={`inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-lg shadow-green-500/25 transition-all hover:scale-105 ${className || ""}`}
        aria-label={`Llamar al ${phoneFormatted}`}
      >
        <Phone className="w-7 h-7" />
        <span>{phoneFormatted}</span>
      </a>
    )
  }

  return (
    <div className="space-y-4">
      <a
        href={`tel:+34${phoneNumber}`}
        onClick={handleCall}
        className={`group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 sm:px-8 py-4 sm:py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg sm:text-xl rounded-2xl shadow-lg shadow-green-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30 ${className || ""}`}
        aria-label={`Llamar al ${phoneFormatted}`}
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
        <span className="text-base sm:text-xl">LLAMAR - {phoneFormatted}</span>
      </a>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          Sin compromiso
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          Profesionales verificados
        </span>
        {(modifier === "economico" || modifier === "barato") && (
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Presupuesto gratis
          </span>
        )}
      </div>
    </div>
  )
}
