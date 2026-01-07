import { Shield, Award, Clock, ThumbsUp } from "lucide-react"

export function TrustBadges() {
  const badges = [
    {
      icon: Shield,
      title: "Profesionales Verificados",
      description: "Todos nuestros técnicos están certificados",
    },
    {
      icon: Award,
      title: "Garantía de Calidad",
      description: "100% satisfacción garantizada",
    },
    {
      icon: Clock,
      title: "Respuesta Inmediata",
      description: "En tu ubicación en menos de 30 minutos",
    },
    {
      icon: ThumbsUp,
      title: "4.9/5 Valoración",
      description: "Más de 1.200 opiniones verificadas",
    },
  ]

  return (
    <section className="py-24 px-4 bg-muted/20 border-y border-foreground/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-5 p-6 rounded-2xl hover:bg-background transition-colors duration-300"
            >
              <div className="h-16 w-16 rounded-2xl bg-foreground text-background flex items-center justify-center shadow-lg">
                <badge.icon className="h-7 w-7" />
              </div>
              <h3 className="font-bold text-xl leading-tight">{badge.title}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
