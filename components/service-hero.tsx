"use client"
import { Clock, Flame, Key, Blinds, Wrench, Droplet, Zap } from "lucide-react"

interface ServiceHeroProps {
  iconName?: string
  title: string
  subtitle: string
  description: string
}

const iconMap = {
  flame: Flame,
  key: Key,
  blinds: Blinds,
  wrench: Wrench,
  droplet: Droplet,
  zap: Zap,
}

export function ServiceHero({ iconName = "wrench", title, subtitle, description }: ServiceHeroProps) {
  const Icon = iconMap[iconName as keyof typeof iconMap] || Wrench

  return (
    <section className="relative bg-background px-4 py-20 sm:py-28 md:py-32 lg:py-40">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-8 md:space-y-10">
          {/* Large icon with background */}
          <div className="relative">
            <div className="absolute inset-0 bg-foreground/5 rounded-full blur-3xl scale-150"></div>
            <div className="relative inline-flex items-center justify-center h-28 w-28 md:h-32 md:w-32 rounded-full bg-foreground text-background shadow-2xl">
              <Icon className="h-14 w-14 md:h-16 md:w-16" />
            </div>
          </div>

          {/* Urgency badge */}
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-foreground text-background text-sm font-bold shadow-lg">
            <Clock className="h-4 w-4" />
            <span>Disponible ahora • Respuesta en 30 min</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-[0.95] max-w-5xl">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-muted-foreground max-w-4xl leading-tight">
            {subtitle}
          </p>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            {description}
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 pt-4 text-sm sm:text-base text-muted-foreground">
            <span>Presupuesto gratis</span>
            <span className="hidden sm:inline">•</span>
            <span>Sin compromiso</span>
            <span className="hidden sm:inline">•</span>
            <span>Profesionales verificados</span>
          </div>
        </div>
      </div>
    </section>
  )
}
