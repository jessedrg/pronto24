import { Waves, Droplets, ArrowRight, Clock, Shield, Phone, Camera, Truck, Wrench, ThermometerSun } from "lucide-react"
import Link from "next/link"

const services = [
  {
    id: "desatascos",
    name: "Desatasco de WC e Inodoros",
    icon: Waves,
    color: "text-teal-500",
    bgColor: "bg-teal-500/10",
    description: "El WC atascado es la emergencia de desatascos mas comun. Utilizamos equipos de presion profesional y sondas mecanicas para eliminar la obstruccion sin danar la ceramica ni las tuberias. En la mayoria de casos se resuelve en 30-60 minutos sin necesidad de obra.",
    features: [
      "Desatasco sin romper ni desmontar el inodoro",
      "Equipos de presion hasta 200 bares",
      "Sonda mecanica para objetos solidos atrapados",
      "Inspeccion con camara si el atasco es recurrente",
    ],
    priceRange: "Desde 80€ (IVA incluido)",
    cities: ["madrid", "barcelona", "valencia", "sevilla", "malaga"],
  },
  {
    id: "desatascos",
    name: "Desatasco de Fregaderos y Bajantes",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    description: "Los fregaderos se atascan por acumulacion de grasa, restos de comida y jabon. Los bajantes de edificios pueden bloquearse afectando a multiples viviendas. Nuestros equipos de alta presion eliminan la obstruccion y limpian las paredes internas de la tuberia para prevenir futuros atascos.",
    features: [
      "Limpieza de grasa acumulada en tuberias",
      "Desatasco de bajantes comunitarios",
      "Eliminacion de incrustaciones de cal",
      "Tratamiento preventivo anti-atascos",
    ],
    priceRange: "Desde 70€ (IVA incluido)",
    cities: ["zaragoza", "bilbao", "murcia", "alicante", "granada"],
  },
  {
    id: "desatascos",
    name: "Limpieza de Arquetas y Fosas Septicas",
    icon: Truck,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    description: "Las arquetas bloqueadas y las fosas septicas llenas requieren equipos especializados. Disponemos de camion cuba con bomba de succion de gran capacidad para vaciar, limpiar y dejar operativa cualquier arqueta, fosa septica o pozo de saneamiento. Gestionamos el transporte y vertido legal de residuos.",
    features: [
      "Camion cuba con bomba de succion industrial",
      "Vaciado completo de fosas septicas",
      "Limpieza de arquetas y colectores",
      "Gestion legal de residuos (certificado incluido)",
    ],
    priceRange: "Desde 200€ (IVA incluido)",
    cities: ["madrid", "barcelona", "valencia", "sevilla", "malaga"],
  },
  {
    id: "desatascos",
    name: "Inspeccion con Camara CCTV de Tuberias",
    icon: Camera,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Cuando un atasco es recurrente o no se localiza facilmente, utilizamos camaras de inspeccion CCTV que recorren el interior de la tuberia grabando en video. Esto nos permite ver exactamente donde esta el problema: raices, roturas, deformaciones o acumulaciones. Diagnostico preciso sin romper nada.",
    features: [
      "Camara robotizada para tuberias desde 50mm",
      "Video en tiempo real y grabacion para el cliente",
      "Localizacion GPS del punto exacto del problema",
      "Informe tecnico con imagenes y recomendaciones",
    ],
    priceRange: "Desde 120€ (IVA incluido)",
    cities: ["madrid", "barcelona", "bilbao", "zaragoza", "alicante"],
  },
  {
    id: "desatascos",
    name: "Reparacion y Sustitucion de Tuberias",
    icon: Wrench,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Si la inspeccion revela tuberias rotas, colapsadas o con raices, realizamos la reparacion o sustitucion. Ofrecemos tecnicas sin zanja (relining) cuando es posible, que permiten reparar la tuberia desde dentro sin necesidad de abrir suelos ni paredes. Menos obra, menos tiempo, menos coste.",
    features: [
      "Reparacion sin zanja (relining/camisado)",
      "Sustitucion parcial o total de tuberias",
      "Eliminacion de raices con fresadora mecanica",
      "Garantia de 5 anos en sustituciones completas",
    ],
    priceRange: "Desde 300€ segun alcance",
    cities: ["madrid", "barcelona", "valencia", "sevilla", "murcia"],
  },
]

export function ServicesOverview() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Servicios de desatascos profesionales
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Solucionamos cualquier problema de atascos y saneamiento con equipos profesionales. 
            Desde un WC atascado hasta la limpieza completa de la red de saneamiento con camion cuba.
          </p>
        </div>

        <div className="space-y-12">
          {services.map((service, idx) => (
            <div
              key={idx}
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
                      <h3 className="text-2xl font-bold text-foreground">{service.name}</h3>
                      <p className="text-muted-foreground">Servicio urgente 24 horas</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/10 text-foreground text-sm">
                      <Clock className="w-4 h-4" />
                      Llegada en 30 min
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-foreground/10 text-foreground text-sm">
                      <Shield className="w-4 h-4" />
                      {service.priceRange}
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
                
                {/* Right: Features and cities */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Que incluye este servicio:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Disponible en:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.cities.map((city) => (
                        <Link
                          key={city}
                          href={`/desatascos/${city}`}
                          className="px-3 py-1.5 rounded-full bg-background border border-border text-sm text-foreground hover:border-foreground/50 transition-colors"
                        >
                          {city.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                        </Link>
                      ))}
                      <Link
                        href="/desatascos"
                        className="px-3 py-1.5 rounded-full bg-foreground/10 text-foreground text-sm font-medium hover:bg-foreground/20 transition-colors inline-flex items-center gap-1"
                      >
                        +100 ciudades
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
