import { MapPin, Clock, Zap } from "lucide-react"

interface ServiceDetailsProps {
  features: string[]
  benefits: string[]
  cities: string[]
}

export function ServiceDetails({ features, benefits, cities }: ServiceDetailsProps) {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6 md:p-10 border border-zinc-700/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B8A9]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00B8A9]/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-[#00B8A9]/20 text-[#00B8A9] px-3 py-1 rounded-full text-sm font-medium mb-3">
                <Zap className="h-4 w-4" />
                Cobertura Express
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Toda Catalunya y Málaga</h3>
              <p className="text-zinc-400 text-base">Servicio de urgencias disponible 24 horas, 7 días a la semana</p>
            </div>

            <div className="flex items-center gap-3 bg-[#00B8A9] text-white px-6 py-4 rounded-xl shadow-lg shadow-[#00B8A9]/25">
              <Clock className="h-8 w-8" />
              <div>
                <p className="text-3xl md:text-4xl font-bold">10 min</p>
                <p className="text-sm opacity-90">Tiempo de llegada</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features & Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Features Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Servicios incluidos</h2>
            </div>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground select-none">—</span>
                  <span className="text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ventajas</h2>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground select-none">—</span>
                  <span className="text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Cobertura en Catalunya y Málaga</h2>
              <p className="text-base text-muted-foreground">Técnicos disponibles 24/7 en todas las zonas</p>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-full text-sm font-semibold">
              <Clock className="h-4 w-4" />
              Llegamos en 10 minutos
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span>{city}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Técnicos activos ahora en Barcelona y alrededores</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span>Técnicos activos ahora en Málaga y Costa del Sol</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
