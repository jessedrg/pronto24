"use client"

import { useEffect, useState } from "react"
import { CheckCircle } from "lucide-react"

export function SocialProof() {
  const [recentServices, setRecentServices] = useState([
    { city: "Barcelona", service: "Desatasco urgente", time: "hace 3 minutos" },
    { city: "Barcelona", service: "Electricista 24h", time: "hace 7 minutos" },
    { city: "Barcelona", service: "Fontanero urgente", time: "hace 12 minutos" },
    { city: "Barcelona", service: "Cerrajero express", time: "hace 18 minutos" },
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % recentServices.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [recentServices.length])

  return (
    <section className="py-12 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Servicios en tiempo real</h2>
          <p className="text-muted-foreground">Clientes atendidos recientemente en Barcelona</p>

          <div className="bg-background border-2 border-foreground rounded-lg p-6 max-w-md mx-auto">
            <div className="flex items-center gap-4 animate-in fade-in slide-in-from-bottom-3" key={currentIndex}>
              <div className="h-12 w-12 rounded-full bg-foreground text-background flex items-center justify-center flex-shrink-0">
                <CheckCircle className="h-6 w-6" />
              </div>
              <div className="text-left flex-1">
                <p className="font-bold">{recentServices[currentIndex].service}</p>
                <p className="text-sm text-muted-foreground">
                  {recentServices[currentIndex].city} • {recentServices[currentIndex].time}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <p className="text-sm font-bold">
              <span className="text-2xl">247</span> personas solicitaron servicio esta semana
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
