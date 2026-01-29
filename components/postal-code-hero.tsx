"use client"

import { Phone, MapPin, Clock, Shield, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PostalCodeHeroProps {
  profession: {
    id: string
    name: string
    namePlural: string
  }
  postalcode: string
  zoneName: string
  cityName: string
  description: string
}

export function PostalCodeHero({
  profession,
  postalcode,
  zoneName,
  cityName,
  description,
}: PostalCodeHeroProps) {
  const phoneNumber = "910054931"

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Main content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Postal code badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold">
              <MapPin className="h-4 w-4" />
              <span>CP {postalcode} · {zoneName}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
              {profession.name}
              <br />
              <span className="text-primary">en {zoneName}</span>
            </h1>

            <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <span>Llegamos en 30 min</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <span>Presupuesto gratis</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-primary" />
                </div>
                <span>24/7 disponible</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6"
              >
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="h-5 w-5 mr-2" />
                  Llamar Ahora
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold text-lg px-8 py-6"
              >
                <a href={`https://wa.me/34${phoneNumber}`} target="_blank" rel="noopener noreferrer">
                  WhatsApp Urgente
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4">
              <Shield className="h-4 w-4" />
              <span>Profesionales verificados en {cityName}</span>
            </div>
          </div>

          {/* Right column - Stats */}
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-card rounded-3xl p-8 lg:p-10 border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-primary/10">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <div className="flex items-end gap-2">
                    <div className="text-6xl sm:text-7xl font-bold tracking-tighter text-primary">30</div>
                    <div className="text-2xl font-bold text-muted-foreground mb-3">min</div>
                  </div>
                  <div className="text-lg text-muted-foreground font-medium">
                    Tiempo de llegada a {zoneName}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-card rounded-3xl p-6 lg:p-8 border border-border">
                <div className="flex items-center gap-3">
                  <Clock className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground">24/7</div>
                    <div className="text-sm text-muted-foreground font-medium mt-2">Siempre disponibles</div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-3xl p-6 lg:p-8 border border-border">
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <div className="text-4xl sm:text-5xl font-bold tracking-tighter text-foreground">{postalcode}</div>
                    <div className="text-sm text-muted-foreground font-medium mt-2">Tu zona cubierta</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary rounded-3xl p-6 lg:p-8 text-primary-foreground">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-primary-foreground/20 border-2 border-primary-foreground/30 flex items-center justify-center text-xs font-bold"
                      >
                        {["JM", "AL", "CP"][i - 1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">
                      {profession.namePlural} cerca de ti
                    </div>
                    <div className="text-xs opacity-80">
                      Disponibles ahora en {zoneName}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold">4.9★</div>
                  <div className="text-xs opacity-80">+2.8k reseñas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
