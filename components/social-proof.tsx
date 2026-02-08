"use client"

import { useEffect, useState, useCallback } from "react"
import { CheckCircle } from "lucide-react"

const ALL_SERVICES = [
  { city: "Madrid", service: "Electricista urgente", time: "hace 2 min" },
  { city: "Barcelona", service: "Desatasco urgente", time: "hace 5 min" },
  { city: "Valencia", service: "Fontanero 24h", time: "hace 8 min" },
  { city: "Sevilla", service: "Cerrajero express", time: "hace 11 min" },
  { city: "Malaga", service: "Reparacion caldera", time: "hace 15 min" },
  { city: "Zaragoza", service: "Electricista nocturno", time: "hace 19 min" },
  { city: "Bilbao", service: "Fontanero urgente", time: "hace 22 min" },
  { city: "Murcia", service: "Desatasco WC", time: "hace 27 min" },
  { city: "Alicante", service: "Cerrajero 24h", time: "hace 31 min" },
  { city: "Granada", service: "Electricista urgente", time: "hace 35 min" },
]

export function SocialProof() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ALL_SERVICES.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const current = ALL_SERVICES[currentIndex]

  return (
    <section className="py-12 px-4 bg-muted/20" aria-label="Servicios recientes">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Servicios en tiempo real</h2>
          <p className="text-muted-foreground">Clientes atendidos recientemente en toda Espana</p>

          <div className="bg-background border-2 border-foreground rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4" key={currentIndex}>
              <div className="h-12 w-12 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold text-foreground">{current.service}</p>
                <p className="text-sm text-muted-foreground">
                  {current.city} - {current.time}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-center gap-6">
            <div className="text-center">
              <span className="text-3xl font-black text-foreground">347</span>
              <p className="text-sm text-muted-foreground">servicios esta semana</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <span className="text-3xl font-black text-foreground">98%</span>
              <p className="text-sm text-muted-foreground">clientes satisfechos</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-center">
              <span className="text-3xl font-black text-foreground">12min</span>
              <p className="text-sm text-muted-foreground">tiempo medio llegada</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
