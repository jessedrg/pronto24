import { MapPin } from "lucide-react"
import Link from "next/link"

const CITIES = [
  { slug: "madrid", name: "Madrid" },
  { slug: "barcelona", name: "Barcelona" },
  { slug: "valencia", name: "Valencia" },
  { slug: "sevilla", name: "Sevilla" },
  { slug: "zaragoza", name: "Zaragoza" },
  { slug: "malaga", name: "Malaga" },
  { slug: "murcia", name: "Murcia" },
  { slug: "bilbao", name: "Bilbao" },
  { slug: "alicante", name: "Alicante" },
  { slug: "cordoba", name: "Cordoba" },
  { slug: "valladolid", name: "Valladolid" },
  { slug: "vigo", name: "Vigo" },
  { slug: "gijon", name: "Gijon" },
  { slug: "granada", name: "Granada" },
  { slug: "oviedo", name: "Oviedo" },
  { slug: "santander", name: "Santander" },
  { slug: "pamplona", name: "Pamplona" },
  { slug: "san-sebastian", name: "San Sebastian" },
  { slug: "almeria", name: "Almeria" },
  { slug: "burgos", name: "Burgos" },
  { slug: "hospitalet-llobregat", name: "Hospitalet" },
  { slug: "badalona", name: "Badalona" },
  { slug: "terrassa", name: "Terrassa" },
  { slug: "sabadell", name: "Sabadell" },
]

export function Coverage() {
  return (
    <section className="py-20 bg-muted/30" aria-labelledby="coverage-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 id="coverage-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Desatascos en toda Espana
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Servicio de desatascos urgente 24 horas en mas de 100 ciudades. Camion cuba y profesionales disponibles ahora en tu ciudad.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-12">
          {CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/desatascos/${city.slug}/`}
              className="group flex items-center gap-2 p-3 rounded-xl bg-background border border-border hover:border-foreground/30 hover:bg-muted/50 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              <span className="text-sm font-medium text-foreground truncate">Desatascos {city.name}</span>
            </Link>
          ))}
        </div>

        {/* Popular searches for SEO */}
        <div className="pt-8 border-t border-border">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Busquedas populares</h3>
          <div className="flex flex-wrap gap-2">
            {CITIES.slice(0, 12).map((city) => (
              <Link
                key={`desatascos-${city.slug}`}
                href={`/desatascos/${city.slug}/`}
                className="text-xs px-3 py-1.5 rounded-lg bg-background border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 transition-colors"
              >
                Desatascos en {city.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
