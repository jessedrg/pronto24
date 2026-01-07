"use client"

import { useEffect, useState } from "react"
import { MapPin, Clock, CheckCircle2 } from "lucide-react"

const activities = [
  {
    name: "Carlos M.",
    city: "Barcelona",
    neighborhood: "Eixample",
    service: "Desatasco urgente",
    time: "Justo ahora",
    verified: true,
  },
  {
    name: "Ana G.",
    city: "Barcelona",
    neighborhood: "Gràcia",
    service: "Electricista 24h",
    time: "Hace 1 min",
    verified: true,
  },
  {
    name: "Miguel R.",
    city: "Barcelona",
    neighborhood: "Sants",
    service: "Fontanero urgente",
    time: "Hace 3 min",
    verified: false,
  },
  {
    name: "Laura P.",
    city: "Barcelona",
    neighborhood: "Sarrià",
    service: "Cerrajero urgente",
    time: "Hace 4 min",
    verified: true,
  },
  {
    name: "David S.",
    city: "Barcelona",
    neighborhood: "Poblenou",
    service: "Reparación calderas",
    time: "Hace 6 min",
    verified: true,
  },
  {
    name: "Isabel F.",
    city: "Barcelona",
    neighborhood: "Horta",
    service: "Desatasco urgente",
    time: "Hace 8 min",
    verified: false,
  },
  {
    name: "Roberto L.",
    city: "Barcelona",
    neighborhood: "Les Corts",
    service: "Electricista 24h",
    time: "Hace 11 min",
    verified: true,
  },
  {
    name: "Carmen V.",
    city: "Barcelona",
    neighborhood: "Sant Martí",
    service: "Fontanero urgente",
    time: "Hace 13 min",
    verified: true,
  },
  {
    name: "Javier M.",
    city: "Barcelona",
    neighborhood: "Nou Barris",
    service: "Cerrajero urgente",
    time: "Hace 16 min",
    verified: false,
  },
  {
    name: "Patricia H.",
    city: "Barcelona",
    neighborhood: "Sant Andreu",
    service: "Reparación persianas",
    time: "Hace 19 min",
    verified: true,
  },
]

export function LiveActivity() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % activities.length)
        setIsVisible(true)
      }, 500)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const activity = activities[currentIndex]

  const initials = activity.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <div
      className={`hidden md:block fixed md:bottom-[200px] lg:bottom-[280px] right-4 md:right-6 z-40 max-w-[280px] md:max-w-xs bg-white border border-border rounded-lg px-3 md:px-4 py-2.5 md:py-3 shadow-xl transition-all duration-700 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
      }`}
    >
      <div className="flex items-start gap-2 md:gap-3">
        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs flex-shrink-0">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 md:mb-1">
            <span className="font-semibold text-xs md:text-sm text-foreground truncate">{activity.name}</span>
            {activity.verified && <CheckCircle2 className="w-3 h-3 md:w-3.5 md:h-3.5 text-green-600 flex-shrink-0" />}
          </div>

          <div className="text-xs text-muted-foreground mb-1 md:mb-1.5 truncate">{activity.service}</div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{activity.city}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span className="font-medium whitespace-nowrap">{activity.time}</span>
            </div>
          </div>
        </div>

        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse flex-shrink-0 mt-1" />
      </div>
    </div>
  )
}
