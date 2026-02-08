"use client"

import { Clock, Shield, Phone, FileText } from "lucide-react"

interface PostalCodeStatsProps {
  postalcode: string
  zoneName?: string
}

export function PostalCodeStats({ postalcode }: PostalCodeStatsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nuestro compromiso en <span className="text-muted-foreground">CP {postalcode}</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Clock className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">30 min</div>
            <div className="text-sm text-muted-foreground mt-1">Tiempo max. llegada</div>
          </div>

          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Phone className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">24/7</div>
            <div className="text-sm text-muted-foreground mt-1">Siempre disponibles</div>
          </div>

          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <Shield className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">12 meses</div>
            <div className="text-sm text-muted-foreground mt-1">Garantia por escrito</div>
          </div>

          <div className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
              <FileText className="h-6 w-6 text-foreground" />
            </div>
            <div className="text-3xl font-bold text-foreground">0 EUR</div>
            <div className="text-sm text-muted-foreground mt-1">Presupuesto gratis</div>
          </div>
        </div>
      </div>
    </section>
  )
}
