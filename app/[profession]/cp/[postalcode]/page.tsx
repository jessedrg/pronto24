import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, Wrench, ArrowRight, Navigation, AlertTriangle } from "lucide-react"
import { Footer } from "@/components/footer"
import { PostalCodeHero } from "@/components/postal-code-hero"
import { PostalCodeStats } from "@/components/postal-code-stats"
import { PostalCodeFAQ } from "@/components/postal-code-faq"
import { PostalCodeSchema } from "@/components/postal-code-schema"
import { GuaranteeSection } from "@/components/guarantee-section"
import { ServiceTrust } from "@/components/service-reviews"
import { generateUniqueContent } from "@/lib/content-generator"
import { ThumbsUp } from "lucide-react"
import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  getPostalCodeData,
  getZoneName,
  getCityFromPostalCode,
  getZoneDescription,
  getTopPostalCodes,
  PROFESSIONS_POSTAL,
} from "@/lib/postal-data"
import { PROBLEMS } from "@/lib/seo-data"
import { getLocalEnrichment } from "@/lib/local-enrichment"
import { getEnrichedContent } from "@/lib/content-db"
import { LocalContent } from "@/components/local-content"

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
  const enrichment = getLocalEnrichment(postalcode)

  if (!professionData) {
    return { title: "No encontrado" }
  }

  // Enrich title and description if we have local data
  const localProblems = enrichment?.problemasLocales[profession]
  const problemSnippet = localProblems && localProblems.length > 0
    ? ` ${localProblems[0].split(" ").slice(0, 6).join(" ")}...`
    : ""

  const title = enrichment
    ? `${professionData.name} en ${enrichment.municipio} (${postalcode}) | 30 Min | 936 946 639`
    : `${professionData.name} Urgente en ${zoneName} (${postalcode}) | 30 Min | 936 946 639`

  const description = enrichment
    ? `${professionData.name} urgente en ${enrichment.municipio}, ${enrichment.provincia}. CP ${postalcode}. Conocemos la zona: ${enrichment.tipoZona === "urbana" ? "zona urbana" : enrichment.tipoZona === "rural" ? "zona rural" : "zona semiurbana"}.${problemSnippet} Llegamos en 30 min. Llama: 936 946 639`
    : `${professionData.name} urgente en ${zoneName}, ${cityName}. Codigo postal ${postalcode}. Llegamos en 30 minutos maximo. Servicio 24h. Presupuesto GRATIS. Llama: 936 946 639`

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${profession}/cp/${postalcode}/`,
    },
    openGraph: {
      title: `${professionData.name} en ${zoneName} (${postalcode}) - Llegamos en 30 min`,
      description: `Servicio de ${professionData.name.toLowerCase()} urgente en código postal ${postalcode}. Disponibles 24/7. Llama: 936 946 639`,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
  }
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
  
  // DB content (AI-generated, profession-specific) with fallback to static enrichment
  const enrichment = await getEnrichedContent(postalcode, profession)

  // Use enriched description if available, otherwise generic
  const description = enrichment
    ? `${professionData.name} urgente en ${enrichment.municipio} (${postalcode}). ${enrichment.descripcionLocal.split('.')[0]}. Llegamos en 30 minutos.`
    : getZoneDescription(postalcode, profession)

  // Generate nearby postal codes for interlinking (cross-prefix, up to 10)
  const postalNum = parseInt(postalcode)
  const nearbyPostalCodes = Array.from({ length: 20 }, (_, i) => {
    const offset = i < 10 ? -(i + 1) : i - 9
    return String(postalNum + offset).padStart(5, '0')
  }).filter(cp => cp !== postalcode && /^\d{5}$/.test(cp) && parseInt(cp) >= 1000 && parseInt(cp) <= 52999)
    .slice(0, 10)

  // Get problems for this profession
  const profProblems = PROBLEMS[profession as keyof typeof PROBLEMS] || []

  // Key modifiers for interlinking
  const keyModifiers = [
    { id: "urgente", name: "Urgente" },
    { id: "24-horas", name: "24 Horas" },
    { id: "economico", name: "Economico" },
    { id: "cerca-de-mi", name: "Cerca de mi" },
  ]

  // Other professions for interlinking
  const otherProfessions = PROFESSIONS_POSTAL.filter(p => p.id !== profession)

  // Generate testimonials for this CP
  const cpContent = generateUniqueContent(postalcode, professionData.name, zoneName)

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
          
          <ServiceTrust
            service={professionData.name}
            zoneName={zoneName}
            postalcode={postalcode}
          />

          {/* Enriched local content for high-opportunity postal codes */}
          {enrichment && (
            <LocalContent
              enrichment={enrichment}
              professionId={profession}
              professionName={professionData.name}
            />
          )}
          
          <GuaranteeSection />

          {/* Valoraciones de clientes */}
          {cpContent.testimonials.length > 0 && (
            <section className="py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Clientes satisfechos en {zoneName}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-balance">
                    Lo que dicen nuestros clientes en {zoneName}
                  </h2>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-lg font-bold text-foreground">{cpContent.stats.rating}</span>
                    <span className="text-sm text-muted-foreground">- Valoracion media</span>
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {cpContent.testimonials.map((review, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-background border border-border">
                      <div className="flex mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">"{review.text}"</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-foreground">{review.name}</div>
                          <div className="text-sm text-muted-foreground">{review.city}</div>
                        </div>
                        <span className="text-xs text-muted-foreground">{review.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          <PostalCodeFAQ
            profession={professionData}
            postalcode={postalcode}
            zoneName={zoneName}
            cityName={cityName}
            enrichment={enrichment}
          />

          {/* Interlinking: Common problems for this profession in this city */}
          {profProblems.length > 0 && (
            <section className="py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Problemas comunes de {professionData.name.toLowerCase()} en {zoneName}
                    </h2>
                    <p className="text-sm text-muted-foreground">Selecciona tu problema para mas informacion y precios orientativos.</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {profProblems.slice(0, 8).map((problem) => (
                    <Link
                      key={problem.id}
                      href={`/problema/${profession}/${problem.id}/${citySlug}/`}
                      className={`group flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                        problem.urgent
                          ? "bg-destructive/5 border-destructive/20 hover:border-destructive/50"
                          : "bg-background border-border hover:border-foreground/30"
                      }`}
                    >
                      <span className="text-lg">{problem.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground block truncate">{problem.name}</span>
                        {problem.urgent && <span className="text-[10px] font-bold text-destructive uppercase">Urgente</span>}
                      </div>
                      <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-foreground" />
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

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

          {/* Interlinking: Modifier pages (urgente, 24h, economico, etc.) */}
          <section className="py-12 bg-muted/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Wrench className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">
                    Busquedas relacionadas en {cityName}
                  </h2>
                  <p className="text-sm text-muted-foreground">Encuentra exactamente lo que necesitas.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {keyModifiers.map((mod) => (
                  <Link
                    key={mod.id}
                    href={`/${profession}-${mod.id}/${citySlug}/`}
                    className="px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-muted/50 transition-all"
                  >
                    {professionData.name} {mod.name} en {cityName}
                  </Link>
                ))}
              </div>
              {/* Cross-profession modifiers */}
              <div className="flex flex-wrap gap-2 mt-4">
                {otherProfessions.slice(0, 3).map((prof) => (
                  <Link
                    key={prof.id}
                    href={`/${prof.id}-urgente/${citySlug}/`}
                    className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    {prof.name} Urgente en {cityName}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
