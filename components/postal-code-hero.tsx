"use client"

import { Phone, MapPin, Clock, Shield, CheckCircle, ArrowRight } from "lucide-react"
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
  const phoneNumber = "931501817"

  return (
    <section className="relative min-h-screen flex items-center bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column - Main content */}
          <div className="space-y-8 lg:space-y-10">
            {/* Postal code badge */}
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-bold shadow-lg">
              <MapPin className="h-4 w-4" />
              <span>CP {postalcode} · {zoneName}</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9]">
              {profession.name}
              <br />
              <span className="text-muted-foreground">en {zoneName}</span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground leading-relaxed max-w-2xl">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-3 text-base font-medium">
                <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0" />
                <span>Llegamos en 30 min</span>
              </div>
              <div className="flex items-center gap-3 text-base font-medium">
                <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0" />
                <span>Presupuesto gratis</span>
              </div>
              <div className="flex items-center gap-3 text-base font-medium">
                <CheckCircle className="h-5 w-5 text-foreground flex-shrink-0" />
                <span>24/7 disponible</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-foreground hover:bg-foreground/90 text-background font-semibold text-lg px-8 py-6"
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

            <div className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground pt-4">
              <Shield className="h-4 w-4" />
              <span>Profesionales verificados en {cityName}</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Right column - Stats */}
          <div className="grid grid-cols-1 gap-8 lg:gap-10">
            <div className="bg-muted rounded-3xl p-8 lg:p-10 border border-foreground/5 hover:border-foreground/10 transition-colors">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter mb-4">30min</div>
              <div className="text-lg text-muted-foreground font-medium">Tiempo de llegada a {zoneName}</div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-muted rounded-3xl p-6 lg:p-8 border border-foreground/5 hover:border-foreground/10 transition-colors">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-3">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">Siempre disponibles</div>
              </div>

              <div className="bg-muted rounded-3xl p-6 lg:p-8 border border-foreground/5 hover:border-foreground/10 transition-colors">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter mb-3">{postalcode}</div>
                <div className="text-sm text-muted-foreground font-medium">Tu zona cubierta</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
