import { Mail, Clock, MapPin, Phone, Shield, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

const SERVICES = [
  { id: "desatascos", name: "Desatascos" },
  { id: "desatascos-24-horas", name: "Desatascos 24h" },
  { id: "desatascos-urgentes", name: "Desatascos Urgentes" },
]

const TOP_CITIES = [
  "madrid", "barcelona", "valencia", "sevilla", "malaga",
  "zaragoza", "murcia", "bilbao", "alicante", "cordoba",
  "valladolid", "vigo", "gijon", "granada", "oviedo",
  "santander", "pamplona", "san-sebastian", "almeria", "burgos",
]

const CITY_NAMES: Record<string, string> = {
  "madrid": "Madrid", "barcelona": "Barcelona", "valencia": "Valencia",
  "sevilla": "Sevilla", "malaga": "Malaga", "zaragoza": "Zaragoza",
  "murcia": "Murcia", "bilbao": "Bilbao", "alicante": "Alicante",
  "cordoba": "Cordoba", "valladolid": "Valladolid", "vigo": "Vigo",
  "gijon": "Gijon", "granada": "Granada", "oviedo": "Oviedo",
  "santander": "Santander", "pamplona": "Pamplona",
  "san-sebastian": "San Sebastian", "almeria": "Almeria", "burgos": "Burgos",
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3">
            <Logo variant="light" size="lg" />
            <p className="text-background/70 text-sm leading-relaxed">
              Servicio de desatascos urgente 24/7 en toda España. Camión cuba y profesionales con garantía.
            </p>
            <div className="flex items-center gap-2 text-sm text-background/70">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>Garantia 12 meses</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">Servicios</h3>
            <ul className="space-y-1.5">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/${s.id}/`}
                    className="text-sm text-background/70 hover:text-background transition-colors flex items-center gap-1"
                  >
                    <ChevronRight className="w-3 h-3 shrink-0" />
                    {s.name} urgente
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/partners/"
                  className="text-sm font-semibold text-background/90 hover:text-background transition-colors flex items-center gap-1 pt-1"
                >
                  <ChevronRight className="w-3 h-3 shrink-0" />
                  Hazte Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities - top 10 with link to primary service */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">Cobertura</h3>
            <ul className="space-y-1.5">
              {TOP_CITIES.slice(0, 10).map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/desatascos/${slug}/`}
                    className="text-sm text-background/70 hover:text-background transition-colors flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 shrink-0" />
                    Desatascos {CITY_NAMES[slug]}
                  </Link>
                </li>
              ))}
              <li className="text-xs text-background/40 pt-1">+100 ciudades en toda España</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-background/50">Contacto 24/7</h3>
            <a
              href="tel:+34936946639"
              className="flex items-center gap-2 text-background font-bold text-lg hover:text-background/80 transition-colors"
              aria-label="Llamar al 936 946 639"
            >
              <Phone className="w-4 h-4" />
              936 946 639
            </a>
            <div className="space-y-2 text-sm text-background/70">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                info@pronto-24.com
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="font-medium">24h / 365 dias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Service + City Combo Links - massive internal linking boost */}
        <div className="mt-10 pt-6 border-t border-background/10">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-background/30 mb-4">Servicios por ciudad</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-1">
            {TOP_CITIES.map((slug) => (
              <Link
                key={`desatascos-${slug}`}
                href={`/desatascos/${slug}/`}
                className="text-[11px] text-background/40 hover:text-background/70 transition-colors truncate"
              >
                Desatascos {CITY_NAMES[slug]}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-background/10 text-center space-y-2">
          <p className="text-xs text-background/50">
            {new Date().getFullYear()} pronto-24.com. Todos los derechos reservados.
          </p>
          <p className="text-[11px] text-background/30 max-w-2xl mx-auto">
            pronto-24.com actua como plataforma de conexion entre clientes y profesionales independientes.
            La responsabilidad sobre la ejecucion de los servicios recae en el profesional que realiza el trabajo.
          </p>
        </div>
      </div>
    </footer>
  )
}
