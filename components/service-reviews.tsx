import { Phone, ShieldCheck, Clock, Zap, CheckCircle2 } from "lucide-react"

interface ServiceTrustProps {
  service: string
  zoneName: string
  postalcode: string
}

const COMMITMENTS = [
  {
    icon: Clock,
    title: "Llegada en 30 minutos",
    description: "Nos comprometemos a estar en tu domicilio en un maximo de 30 minutos desde tu llamada.",
  },
  {
    icon: ShieldCheck,
    title: "Presupuesto sin compromiso",
    description: "Te damos un presupuesto cerrado antes de empezar. Sin sorpresas ni costes ocultos.",
  },
  {
    icon: Zap,
    title: "Disponible 24 horas",
    description: "Servicio operativo los 365 dias del ano, incluyendo festivos y fines de semana.",
  },
]

export function ServiceTrust({ service, zoneName, postalcode }: ServiceTrustProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            Nuestro compromiso en {zoneName}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Servicio de {service.toLowerCase()} profesional con garantias reales para el codigo postal {postalcode}.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {COMMITMENTS.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-border bg-background"
            >
              <div className="w-12 h-12 rounded-full bg-foreground/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto bg-background border border-border rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg mb-2">
                Necesitas {service.toLowerCase()} en {zoneName}?
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                  <span>Tecnicos cualificados y asegurados</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                  <span>Garantia por escrito en todos los trabajos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-foreground shrink-0" />
                  <span>Pago despues del servicio, no antes</span>
                </li>
              </ul>
            </div>
            <a
              href="tel:936946639"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-colors shrink-0"
            >
              <Phone className="w-5 h-5" />
              936 946 639
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
