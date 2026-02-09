import { Card } from "@/components/ui/card"
import { ShieldCheck, Clock, Phone, CheckCircle } from "lucide-react"

const commitments = [
  {
    icon: Clock,
    title: "Llegada en 30 minutos",
    description: "Nos comprometemos a estar en tu domicilio en un maximo de 30 minutos desde tu llamada, en cualquier punto de Espana.",
  },
  {
    icon: ShieldCheck,
    title: "Presupuesto sin compromiso",
    description: "Te damos un presupuesto cerrado antes de empezar cualquier trabajo. Sin sorpresas, sin costes ocultos, sin letras pequenas.",
  },
  {
    icon: CheckCircle,
    title: "Garantia por escrito",
    description: "Todos nuestros trabajos incluyen 12 meses de garantia en mano de obra y materiales. Si hay algun problema, volvemos sin coste.",
  },
]

export function Testimonials() {
  return (
    <section className="py-32 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-bold shadow-lg mb-4">
            <ShieldCheck className="h-4 w-4 fill-background" />
            <span>Nuestro compromiso contigo</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-balance leading-tight">Garantias reales, no promesas</h2>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty leading-relaxed">
            Compromisos verificables que respaldamos con hechos en cada servicio
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {commitments.map((item, index) => (
            <Card key={index} className="p-8 space-y-6 hover:shadow-2xl transition-shadow border-2">
              <div className="w-14 h-14 rounded-2xl bg-foreground/10 flex items-center justify-center">
                <item.icon className="h-7 w-7 text-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
              <p className="text-lg text-pretty leading-relaxed text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="tel:936946639"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-foreground text-background font-bold text-lg hover:bg-foreground/90 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Llama ahora: 936 946 639
          </a>
        </div>
      </div>
    </section>
  )
}
