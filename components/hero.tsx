import { CheckCircle2, Shield, Phone, Clock, Star, Zap, Droplets, Key, Waves, Flame } from "lucide-react"
import Link from "next/link"

const SERVICES_QUICK = [
  { id: "electricista", name: "Electricista", icon: Zap, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
  { id: "fontanero", name: "Fontanero", icon: Droplets, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { id: "cerrajero", name: "Cerrajero", icon: Key, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { id: "desatascos", name: "Desatascos", icon: Waves, color: "text-teal-500", bgColor: "bg-teal-500/10" },
  { id: "calderas", name: "Calderas", icon: Flame, color: "text-red-500", bgColor: "bg-red-500/10" },
]

export function Hero() {
  return (
    <section className="relative bg-background pt-20" aria-labelledby="hero-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left column - Main content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-foreground text-background text-sm font-bold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span>Profesionales disponibles ahora en toda Espana</span>
            </div>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-balance">
              <span className="text-foreground">Electricistas, Fontaneros y Cerrajeros</span>{" "}
              <span className="text-muted-foreground">Urgentes 24h</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Profesionales certificados en tu casa en menos de 30 minutos. Presupuesto gratis, sin compromiso. Servicio 24 horas, 365 dias.
            </p>

            {/* Primary CTA - Phone Call */}
            <div className="space-y-4">
              <a
                href="tel:+34936946639"
                className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-2xl shadow-lg shadow-green-500/25 transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-green-500/30"
                aria-label="Llamar al 936 946 639"
              >
                <Phone className="w-6 h-6" />
                <span>LLAMAR - 936 946 639</span>
              </a>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Presupuesto gratis
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Sin compromiso
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  Garantia 12 meses
                </span>
              </div>
            </div>

            {/* Quick service links */}
            <nav aria-label="Servicios disponibles" className="space-y-3 pt-2">
              <p className="text-sm text-muted-foreground font-medium">Selecciona tu servicio:</p>
              <div className="flex flex-wrap gap-2">
                {SERVICES_QUICK.map((service) => (
                  <Link
                    key={service.id}
                    href={`/${service.id}/`}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background hover:border-foreground/30 hover:bg-muted/50 transition-all"
                  >
                    <service.icon className={`w-4 h-4 ${service.color}`} />
                    <span className="text-sm font-medium text-foreground">{service.name}</span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Right column - Stats + Trust */}
          <div className="space-y-6">
            <div className="bg-foreground rounded-3xl p-8 lg:p-10 text-background">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-2">30min</div>
              <div className="text-lg text-background/80 font-medium mb-6">Tiempo maximo de llegada garantizado</div>
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-background/70 font-medium">4.9/5</span>
              </div>
              <p className="text-sm text-background/60">Mas de 2.800 valoraciones verificadas</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-muted rounded-3xl p-6 lg:p-8 border border-foreground/5">
                <div className="text-4xl sm:text-5xl font-black tracking-tighter mb-2">24/7</div>
                <div className="text-sm text-muted-foreground font-medium">Siempre disponibles</div>
              </div>

              <div className="bg-muted rounded-3xl p-6 lg:p-8 border border-foreground/5">
                <div className="text-4xl sm:text-5xl font-black tracking-tighter mb-2">15k+</div>
                <div className="text-sm text-muted-foreground font-medium">Servicios realizados</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-muted/50 border border-border">
              <Shield className="w-10 h-10 text-foreground shrink-0" />
              <div>
                <div className="font-bold text-foreground">Garantia total en cada trabajo</div>
                <div className="text-sm text-muted-foreground">12 meses de garantia. Si no quedas satisfecho, volvemos gratis.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
