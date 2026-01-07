"use client"

import { AlertCircle } from "lucide-react"

export function UrgencyBanner() {
  return (
    <div className="bg-foreground text-background py-4 px-4 border-b-2 border-background/10">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-bold">
        <div className="h-2 w-2 rounded-full bg-background animate-pulse"></div>
        <AlertCircle className="h-5 w-5" />
        <span>Emergencia 24/7 • Respuesta garantizada en 30 minutos</span>
        <div className="h-2 w-2 rounded-full bg-background animate-pulse"></div>
      </div>
    </div>
  )
}
