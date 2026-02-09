import { Clock, MapPin, Phone, Calendar } from "lucide-react"

interface PostalCodeStatsProps {
  postalcode: string
}

const SERVICE_HIGHLIGHTS = [
  {
    icon: Clock,
    value: "30 min",
    label: "Tiempo maximo de llegada",
  },
  {
    icon: Calendar,
    value: "24/7",
    label: "Disponible todos los dias",
  },
  {
    icon: MapPin,
    value: "Local",
    label: "Tecnicos de la zona",
  },
  {
    icon: Phone,
    value: "Gratis",
    label: "Presupuesto sin compromiso",
  },
]

export function PostalCodeStats({ postalcode }: PostalCodeStatsProps) {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SERVICE_HIGHLIGHTS.map((item) => (
            <div
              key={item.label}
              className="bg-muted rounded-2xl p-6 text-center border border-foreground/5 hover:border-foreground/10 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-foreground/10 mb-4">
                <item.icon className="h-6 w-6 text-foreground" />
              </div>
              <div className="text-2xl font-bold text-foreground">{item.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
