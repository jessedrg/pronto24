import { MapPin } from "lucide-react"

interface ServiceDetailsProps {
  features: string[]
  benefits: string[]
  cities: string[]
}

export function ServiceDetails({ features, benefits, cities }: ServiceDetailsProps) {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
        {/* Features & Benefits Section */}
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16">
          {/* Features Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Servicios incluidos</h2>
            </div>

            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground select-none">—</span>
                  <span className="text-base leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ventajas</h2>
            </div>

            <ul className="space-y-3">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-muted-foreground select-none">—</span>
                  <span className="text-base leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities Section */}
        <div className="space-y-8 pt-8 border-t">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Servicio en toda España</h2>
            <p className="text-base text-muted-foreground">Disponibles 24/7 en las principales ciudades</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {cities.map((city, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span>{city}</span>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground pt-4 border-t">+ Más de 100 ciudades en toda España</p>
        </div>
      </div>
    </section>
  )
}
