import { Zap, Droplets, Key, Waves, Flame, ArrowRight, Clock, Shield, Phone } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "electricista",
    name: "Electricista",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    description: "Servicio de electricista urgente 24 horas. Solucionamos apagones, cortocircuitos, problemas con el diferencial, instalaciones electricas y certificados. Profesionales certificados con experiencia.",
    problems: [
      "Apagones y cortes de luz",
      "Cortocircuitos y chispazos",
      "Diferencial que salta",
      "Enchufes que no funcionan",
      "Instalaciones eléctricas",
      "Boletín eléctrico",
    ],
    cities: ["madrid", "barcelona", "valencia", "sevilla", "malaga"],
  },
  {
    id: "fontanero",
    name: "Fontanero",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Fontaneros profesionales disponibles las 24 horas. Reparamos fugas de agua, tuberias rotas, problemas con calentadores, grifos y cisternas. Llegamos en minutos a tu domicilio.",
    problems: [
      "Fugas de agua urgentes",
      "Tuberias rotas o atascadas",
      "Calentadores y termos",
      "Grifos que gotean",
      "Cisternas que no funcionan",
      "Humedades",
    ],
    cities: ["madrid", "barcelona", "valencia", "bilbao", "zaragoza"],
  },
  {
    id: "cerrajero",
    name: "Cerrajero",
    icon: Key,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Cerrajeros de urgencia 24/7. Abrimos puertas sin danos, cambiamos cerraduras y bombines, instalamos cerraduras de seguridad. Servicio rapido y profesional.",
    problems: [
      "Puertas bloqueadas",
      "Llaves rotas en cerradura",
      "Cambio de bombin",
      "Cerraduras de seguridad",
      "Puertas acorazadas",
      "Aperturas de emergencia",
    ],
    cities: ["madrid", "barcelona", "sevilla", "murcia", "alicante"],
  },
  {
    id: "desatascos",
    name: "Desatascos",
    icon: Waves,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Servicio de desatascos urgente con camion cuba. Desatascamos WC, fregaderos, bajantes y arquetas. Limpieza de tuberias con agua a presion. Sin olores, sin complicaciones.",
    problems: [
      "WC atascado",
      "Fregadero obstruido",
      "Bajantes atascados",
      "Malos olores",
      "Arquetas bloqueadas",
      "Limpieza de tuberias",
    ],
    cities: ["madrid", "barcelona", "valencia", "malaga", "granada"],
  },
  {
    id: "calderas",
    name: "Calderas",
    icon: Flame,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Tecnicos de calderas certificados. Reparamos calderas de todas las marcas, revisiones obligatorias, problemas de calefaccion y agua caliente. Servicio urgente 24 horas.",
    problems: [
      "Caldera no enciende",
      "Sin agua caliente",
      "Caldera pierde presion",
      "Ruidos extranos",
      "Revision obligatoria",
      "Radiadores frios",
    ],
    cities: ["madrid", "barcelona", "bilbao", "zaragoza", "valladolid"],
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Servicios de urgencias para el hogar
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Profesionales certificados disponibles 24 horas al día, 7 días a la semana. 
            Llegamos en menos de 10 minutos a cualquier punto de España.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-3xl border border-border bg-muted/20 hover:bg-muted/30 transition-colors"
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Left: Service info */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl ${service.bgColor} flex items-center justify-center`}>
                      <service.icon className={`w-7 h-7 ${service.color}`} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{service.name} Urgente 24h</h3>
                      <p className="text-muted-foreground">Servicio disponible ahora</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/10 text-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      Llegada en 10-30 min
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/10 text-foreground text-sm">
                      <Shield className="w-4 h-4" />
                      Garantía incluida
                    </span>
                  </div>
                  
                  <a
                    href="tel:+34936946639"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02]"
                  >
                    <Phone className="w-5 h-5" />
                    Llamar ahora - 936 946 639
                  </a>
                </div>
                
                {/* Right: Problems and cities */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Problemas que solucionamos:</h4>
                    <ul className="grid grid-cols-2 gap-2">
                      {service.problems.map((problem, i) => (
                        <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground shrink-0" />
                          {problem}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Ciudades con servicio:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.cities.map((city) => (
                        <Link
                          key={city}
                          href={`/${service.id}/${city}`}
                          className="px-3 py-1.5 rounded-full bg-background border border-border text-sm text-foreground hover:border-foreground/50 transition-colors"
                        >
                          {city.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </Link>
                      ))}
                      <Link
                        href={`/${service.id}`}
                        className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground text-sm font-medium hover:bg-foreground/20 transition-colors inline-flex items-center gap-1"
                      >
                        Ver más
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
