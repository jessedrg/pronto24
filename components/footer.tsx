import { Mail, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-background/80 leading-relaxed">
              Tu solución inmediata para emergencias del hogar y negocio en toda España. Profesionales verificados
              disponibles 24/7.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Servicios Urgentes</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/desatascos" className="hover:text-background transition-colors">
                  Desatascos 24/7
                </Link>
              </li>
              <li>
                <Link href="/electricista" className="hover:text-background transition-colors">
                  Electricista urgente
                </Link>
              </li>
              <li>
                <Link href="/fontanero" className="hover:text-background transition-colors">
                  Fontanero express
                </Link>
              </li>
              <li>
                <Link href="/cerrajero" className="hover:text-background transition-colors">
                  Cerrajero inmediato
                </Link>
              </li>
              <li>
                <Link href="/calderas" className="hover:text-background transition-colors">
                  Reparación calderas
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Para Profesionales</h4>
            <ul className="space-y-2 text-background/80">
              <li>
                <Link href="/partners" className="hover:text-background transition-colors font-semibold">
                  🚀 Hazte Partner
                </Link>
              </li>
              <li className="text-sm pt-2">Únete a nuestra red y recibe leads cualificados todos los días</li>
            </ul>
            <div className="pt-4">
              <h4 className="text-lg font-semibold mb-2">Cobertura Actual</h4>
              <ul className="space-y-2 text-background/80 text-sm">
                <li className="font-semibold">✓ Barcelona</li>
                <li className="text-xs">Próximamente: Madrid, Valencia, Sevilla y más</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contacto 24/7</h4>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>info@rapidfix.es</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">Disponible 24 horas</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Toda España</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 space-y-3">
          <div className="text-center text-background/60 text-sm">
            <p className="font-semibold">© 2025 rapidfix.es. Todos los derechos reservados.</p>
            <p className="mt-2">
              Servicio profesional de emergencias disponible actualmente en Barcelona. Próximamente en más ciudades de
              España.
            </p>
          </div>
          <div className="text-center text-background/50 text-xs pt-2">
            <p>
              Desatascos urgentes • Electricista 24h • Fontanero urgente • Cerrajero express • Reparaciones inmediatas
            </p>
          </div>
          <div className="text-center text-background/40 text-xs pt-4 max-w-3xl mx-auto">
            <p>
              rapidfix.es actúa como plataforma de conexión entre clientes y profesionales independientes. Toda la
              responsabilidad sobre la calidad, garantías y ejecución de los servicios recae exclusivamente en el
              profesional que realiza el trabajo. Los profesionales son autónomos y no empleados de rapidfix.es.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
