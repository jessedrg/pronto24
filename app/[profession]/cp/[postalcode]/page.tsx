import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Wrench, ArrowRight, Navigation } from "lucide-react"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { PostalCodeHero } from "@/components/postal-code-hero"
import { PostalCodeStats } from "@/components/postal-code-stats"
import { PostalCodeFAQ } from "@/components/postal-code-faq"
import { PostalCodeSchema } from "@/components/postal-code-schema"
import { GuaranteeSection } from "@/components/guarantee-section"
import { ServiceReviews } from "@/components/service-reviews"
import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  getPostalCodeData,
  getZoneName,
  getCityFromPostalCode,
  getZoneDescription,
  getTopPostalCodes,
  PROFESSIONS_POSTAL,
} from "@/lib/postal-data"

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

export const dynamicParams = true
export const revalidate = 604800 // 1 semana

// Pre-renderizar las ciudades más importantes
export async function generateStaticParams() {
  const topPostalCodes = getTopPostalCodes()
  const params: { profession: string; postalcode: string }[] = []

  for (const profession of VALID_PROFESSIONS) {
    for (const cp of topPostalCodes) {
      params.push({ profession, postalcode: cp })
    }
  }

  return params
}

interface PageProps {
  params: Promise<{ profession: string; postalcode: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession, postalcode } = await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pronto-24.com"

  if (!VALID_PROFESSIONS.includes(profession)) {
    return { title: "No encontrado" }
  }

  const professionData = PROFESSIONS_POSTAL.find((p) => p.id === profession)
  const postalData = getPostalCodeData(postalcode)
  const zoneName = getZoneName(postalcode)
  const cityName = getCityFromPostalCode(postalcode)

  if (!professionData) {
    return { title: "No encontrado" }
  }

  const title = `${professionData.name} Urgente en ${zoneName} (${postalcode}) | 10 Min | 936 946 639`
  const description = `${professionData.name} urgente en ${zoneName}, ${cityName}. Código postal ${postalcode}. Llegamos en 10 MINUTOS. Servicio 24h. Presupuesto GRATIS. Llama: 936 946 639`

  return {
    title,
    description,
    keywords: `${profession} ${postalcode}, ${profession} urgente ${zoneName}, ${profession} 24 horas ${cityName}, ${profession} cerca de mi ${postalcode}`,
    alternates: {
      canonical: `${siteUrl}/${profession}/cp/${postalcode}/`,
    },
    openGraph: {
      title: `${professionData.name} en ${zoneName} (${postalcode}) - Llegamos en 10 min`,
      description: `Servicio de ${professionData.name.toLowerCase()} urgente en código postal ${postalcode}. Disponibles 24/7. Llama: 936 946 639`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// Reviews dinámicas por zona
function generateReviews(profession: string, zoneName: string, postalcode: string) {
  const seed = parseInt(postalcode.slice(-3))
  const names = [
    "María García", "Carlos Pérez", "Ana Martínez", "José López", "Laura Sánchez",
    "Miguel Fernández", "Carmen Ruiz", "David González", "Isabel Torres", "Pablo Díaz"
  ]
  const services: Record<string, string[]> = {
    fontanero: ["Fuga de agua", "Atasco tubería", "Reparación cisterna", "Cambio grifería"],
    electricista: ["Avería eléctrica", "Cuadro eléctrico", "Sin luz", "Cortocircuito"],
    cerrajero: ["Apertura puerta", "Cambio cerradura", "Cerradura atascada", "Bombín roto"],
    desatascos: ["Atasco WC", "Desatasco fregadero", "Arqueta atascada", "Limpieza tuberías"],
    calderas: ["Caldera no enciende", "Sin agua caliente", "Revisión caldera", "Fuga caldera"],
  }

  const profServices = services[profession] || services.fontanero

  return [
    {
      name: names[seed % names.length],
      location: zoneName,
      rating: 5 as const,
      date: "Hace 1 día",
      text: `Excelente servicio en ${zoneName}. Llegaron en menos de 10 minutos y solucionaron el problema rápidamente. Muy profesionales y precio justo.`,
      service: profServices[seed % profServices.length],
      verified: true,
    },
    {
      name: names[(seed + 3) % names.length],
      location: zoneName,
      rating: 5 as const,
      date: "Hace 3 días",
      text: `Llamé a las 11 de la noche y vinieron enseguida. El técnico era muy profesional y explicó todo claramente. 100% recomendado para ${zoneName}.`,
      service: profServices[(seed + 1) % profServices.length],
      verified: true,
    },
    {
      name: names[(seed + 5) % names.length],
      location: zoneName,
      rating: 5 as const,
      date: "Hace 1 semana",
      text: `Servicio impecable. Presupuesto sin sorpresas y trabajo de calidad. Ya los he recomendado a mis vecinos del ${postalcode}.`,
      service: profServices[(seed + 2) % profServices.length],
      verified: true,
    },
  ]
}

export default async function PostalCodePage({ params }: PageProps) {
  const { profession, postalcode } = await params

  // Validar profesión
  if (!VALID_PROFESSIONS.includes(profession)) {
    notFound()
  }

  // Validar formato código postal (5 dígitos)
  if (!/^\d{5}$/.test(postalcode)) {
    notFound()
  }

  const professionData = PROFESSIONS_POSTAL.find((p) => p.id === profession)
  if (!professionData) {
    notFound()
  }

  const postalData = getPostalCodeData(postalcode)
  const zoneName = getZoneName(postalcode)
  const cityName = getCityFromPostalCode(postalcode)
  const description = getZoneDescription(postalcode, profession)
  const reviews = generateReviews(profession, zoneName, postalcode)

  // Generate nearby postal codes for interlinking
  const postalPrefix = postalcode.substring(0, 3)
  const postalNum = parseInt(postalcode)
  const nearbyPostalCodes = Array.from({ length: 6 }, (_, i) => {
    const offset = i < 3 ? -(i + 1) : i - 2
    return String(postalNum + offset).padStart(5, '0')
  }).filter(cp => cp !== postalcode && /^\d{5}$/.test(cp) && cp.startsWith(postalPrefix))

  // Other professions for interlinking
  const otherProfessions = PROFESSIONS_POSTAL.filter(p => p.id !== profession)

  // City slug for linking to city pages
  const citySlug = cityName.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")

  return (
    <>
      <PostalCodeSchema
        profession={professionData}
        postalcode={postalcode}
        zoneName={zoneName}
        cityName={cityName}
      />
      <div className="min-h-screen flex flex-col bg-background">
        <UrgencyBanner />
        <Header />
        <Breadcrumbs
          items={[
            { label: professionData.name, href: `/${profession}/` },
            { label: cityName, href: `/${profession}/${citySlug}/` },
            { label: `CP ${postalcode} - ${zoneName}` },
          ]}
        />
        <main className="flex-1">
          <PostalCodeHero
            profession={professionData}
            postalcode={postalcode}
            zoneName={zoneName}
            cityName={cityName}
            description={description}
          />
          
          <PostalCodeStats postalcode={postalcode} />
          
          <ServiceReviews 
            service={professionData.name} 
            reviews={reviews} 
          />
          
          <GuaranteeSection />
          
          <PostalCodeFAQ
            profession={professionData}
            postalcode={postalcode}
            zoneName={zoneName}
            cityName={cityName}
          />

          {/* Interlinking: Other professions in this postal code */}
          <section className="py-12 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Otros servicios urgentes en {zoneName} ({postalcode})
                  </h2>
                  <p className="text-sm text-muted-foreground">Disponibles 24 horas en tu codigo postal.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {otherProfessions.map((prof) => (
                  <Link
                    key={prof.id}
                    href={`/${prof.id}/cp/${postalcode}/`}
                    className="group p-5 rounded-2xl border border-border bg-background hover:border-foreground/30 hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold text-foreground mb-2">{prof.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {prof.namePlural} en CP {postalcode}. Llegamos en 30 min.
                    </p>
                    <span className="flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                      Ver servicio <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Interlinking: Nearby postal codes */}
          {nearbyPostalCodes.length > 0 && (
            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                    <Navigation className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {professionData.name} en codigos postales cercanos
                    </h2>
                    <p className="text-sm text-muted-foreground">Tambien damos servicio en estas zonas cercanas a {zoneName}.</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {nearbyPostalCodes.map((cp) => (
                    <Link
                      key={cp}
                      href={`/${profession}/cp/${cp}/`}
                      className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-background transition-all"
                    >
                      <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span>CP {cp}</span>
                    </Link>
                  ))}
                </div>
                
                {/* Link back to city page */}
                <div className="mt-8 pt-6 border-t border-border">
                  <Link
                    href={`/${profession}/${citySlug}/`}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Ver {professionData.name} en todo {cityName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </section>
          )}
        </main>
        <Footer />
        <AIChatWidget service={profession} />
      </div>
    </>
  )
}
