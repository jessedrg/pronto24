"use client"

import { Activity, Clock, Users, Star } from "lucide-react"
import { getZoneStats } from "@/lib/postal-data"

interface PostalCodeStatsProps {
  postalcode: string
  zoneName: string
}

export function PostalCodeStats({ postalcode, zoneName }: PostalCodeStatsProps) {
  const stats = getZoneStats(postalcode)

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Actividad en tiempo real en <span className="text-muted-foreground">{zoneName}</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Activity className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.serviciosHoy}</div>
            <div className="text-sm text-muted-foreground mt-1">Servicios hoy</div>
          </div>

          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Clock className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.tiempoMedio} min</div>
            <div className="text-sm text-muted-foreground mt-1">Tiempo medio llegada</div>
          </div>

          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Users className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.tecnicos}</div>
            <div className="text-sm text-muted-foreground mt-1">Técnicos disponibles</div>
          </div>

          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Star className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">{stats.satisfaccion}</div>
            <div className="text-sm text-muted-foreground mt-1">Satisfacción media</div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
          </span>
          <span>Datos actualizados en tiempo real</span>
        </div>
      </div>
    </section>
  )
}
