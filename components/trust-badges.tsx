import { Shield, Award, Clock, Star } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: Clock,
      stat: "30 min",
      title: "Tiempo de llegada",
      description: "Profesional en tu casa en menos de 30 minutos",
    },
    {
      icon: Shield,
      stat: "12 meses",
      title: "Garantia incluida",
      description: "Todos los trabajos con garantia por escrito",
    },
    {
      icon: Star,
      stat: "4.9/5",
      title: "Valoracion media",
      description: "Valoracion media de nuestros clientes en toda Espana",
    },
    {
      icon: Award,
      stat: "500+",
      title: "Ciudades cubiertas",
      description: "Red de profesionales certificados en toda Espana",
    },
  ]

  return (
    <section className="py-16 bg-muted/20 border-y border-foreground/5" aria-label="Datos clave del servicio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-background border border-border"
            >
              <badge.icon className="h-6 w-6 text-foreground mb-3" />
              <div className="text-3xl sm:text-4xl font-black text-foreground mb-1">{badge.stat}</div>
              <h3 className="font-bold text-sm text-foreground mb-1">{badge.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
