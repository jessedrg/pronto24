import { Mail, Clock, MapPin, Phone, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

const MAIN_CITIES = [
  { slug: "barcelona", name: "Barcelona" },
  { slug: "madrid", name: "Madrid" },
  { slug: "valencia", name: "Valencia" },
  { slug: "sevilla", name: "Sevilla" },
  { slug: "malaga", name: "Malaga" },
  { slug: "zaragoza", name: "Zaragoza" },
  { slug: "bilbao", name: "Bilbao" },
  { slug: "alicante", name: "Alicante" },
]

const SERVICES = [
  { id: "electricista", name: "Electricista", problems: ["apagon", "cortocircuito", "diferencial-salta"] },
  { id: "fontanero", name: "Fontanero", problems: ["fuga-agua", "tuberia-rota", "grifo-gotea"] },
  { id: "cerrajero", name: "Cerrajero", problems: ["puerta-bloqueada", "cerradura-rota", "llave-dentro"] },
  { id: "desatascos", name: "Desatascos", problems: ["wc-atascado", "fregadero-atascado", "mal-olor"] },
  { id: "calderas", name: "Calderas", problems: ["caldera-no-enciende", "sin-agua-caliente", "fuga-gas"] },
]

const PROBLEM_NAMES: Record<string, string> = {
  "apagon": "Apagon",
  "cortocircuito": "Cortocircuito",
  "diferencial-salta": "Diferencial salta",
  "fuga-agua": "Fuga de agua",
  "tuberia-rota": "Tuberia rota",
  "grifo-gotea": "Grifo gotea",
  "puerta-bloqueada": "Puerta bloqueada",
  "cerradura-rota": "Cerradura rota",
  "llave-dentro": "Llave dentro",
  "wc-atascado": "WC atascado",
  "fregadero-atascado": "Fregadero atascado",
  "mal-olor": "Mal olor",
  "caldera-no-enciende": "Caldera no enciende",
  "sin-agua-caliente": "Sin agua caliente",
  "fuga-gas": "Fuga de gas",
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Top section: City + Service links grid */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-lg font-bold mb-6">Servicios por ciudad</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {MAIN_CITIES.map((city) => (
              <div key={city.slug} className="space-y-1.5">
                <h3 className="text-sm font-semibold text-background">{city.name}</h3>
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    href={`/${service.id}/${city.slug}/`}
                    className="block text-xs text-background/60 hover:text-background transition-colors"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Problem-specific links */}
      <div className="border-b border-background/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <h2 className="text-lg font-bold mb-4">Problemas mas comunes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="space-y-1.5">
                <h3 className="text-sm font-semibold text-background flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" />
                  {service.name}
                </h3>
                {service.problems.map((problemId) => (
                  <Link
                    key={problemId}
                    href={`/problema/${service.id}/${problemId}/barcelona/`}
                    className="block text-xs text-background/60 hover:text-background transition-colors"
                  >
                    {PROBLEM_NAMES[problemId] || problemId}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-background/80 leading-relaxed text-sm">
              Tu solucion inmediata para emergencias del hogar y negocio en toda Espana. Profesionales verificados
              disponibles 24/7 con garantia en todos los trabajos.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-background/60" />
              <span className="text-background/80">Garantia de 12 meses en todos los trabajos</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios Urgentes</h4>
            <ul className="space-y-2.5 text-background/80">
              <li>
                <Link href="/desatascos/" className="hover:text-background transition-colors text-sm flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" /> Desatascos 24/7
                </Link>
              </li>
              <li>
                <Link href="/electricista/" className="hover:text-background transition-colors text-sm flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" /> Electricista urgente
                </Link>
              </li>
              <li>
                <Link href="/fontanero/" className="hover:text-background transition-colors text-sm flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" /> Fontanero express
                </Link>
              </li>
              <li>
                <Link href="/cerrajero/" className="hover:text-background transition-colors text-sm flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" /> Cerrajero inmediato
                </Link>
              </li>
              <li>
                <Link href="/calderas/" className="hover:text-background transition-colors text-sm flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" /> Reparacion calderas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Para Profesionales</h4>
            <ul className="space-y-2.5 text-background/80">
              <li>
                <Link href="/partners/" className="hover:text-background transition-colors text-sm font-semibold flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3" /> Hazte Partner
                </Link>
              </li>
              <li className="text-sm pt-1">Unete a nuestra red y recibe leads cualificados todos los dias</li>
            </ul>
            <div className="pt-4">
              <h4 className="text-base font-semibold mb-2">Cobertura</h4>
              <ul className="space-y-1 text-background/80 text-sm">
                {MAIN_CITIES.slice(0, 4).map((city) => (
                  <li key={city.slug}>
                    <Link href={`/electricista/${city.slug}/`} className="hover:text-background transition-colors">
                      {city.name}
                    </Link>
                  </li>
                ))}
                <li className="text-xs text-background/50 pt-1">+8.000 municipios en toda Espana</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto 24/7</h4>
            <div className="space-y-3 text-background/80">
              <a
                href="tel:+34936946639"
                className="flex items-center gap-2 text-background font-bold text-lg hover:text-background/90 transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>936 946 639</span>
              </a>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <span>info@pronto-24.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">Disponible 24 horas, 365 dias</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Toda Espana</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 space-y-3">
          <div className="text-center text-background/60 text-sm">
            <p className="font-semibold">2025 pronto-24.com. Todos los derechos reservados.</p>
            <p className="mt-2">
              Servicio profesional de emergencias disponible en toda Espana. Electricistas, fontaneros, cerrajeros, desatascos y calderas.
            </p>
          </div>
          <div className="text-center text-background/40 text-xs pt-4 max-w-3xl mx-auto">
            <p>
              pronto-24.com actua como plataforma de conexion entre clientes y profesionales independientes. Toda la
              responsabilidad sobre la calidad, garantias y ejecucion de los servicios recae exclusivamente en el
              profesional que realiza el trabajo. Los profesionales son autonomos y no empleados de pronto-24.com.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
