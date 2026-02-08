import {
  Phone,
  Shield,
  CheckCircle2,
  Star,
  BadgeCheck,
  Timer,
  Award,
  ThumbsUp,
  Clock,
  Zap,
  Droplets,
  Key,
  Waves,
  Flame,
  Moon,
  Calendar,
  Navigation,
  Home,
  Euro,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Users,
  FileCheck,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getCityDisplayName, getCityProvince, getNearbyCities, PROBLEMS, PROFESSIONS } from "@/lib/seo-data"
import { generateUniqueContent, generateTestimonials } from "@/lib/content-generator"
import { ExpertGuideSection } from "@/components/expert-guide-section"
import { ServiceDeepDive } from "@/components/service-deep-dive"
import { PricingGuideSection } from "@/components/pricing-guide-section"
import { InternalLinks } from "@/components/internal-links"
import { LiveBadge, CallButton } from "@/components/hero-client-parts"

const ICONS = {
  Zap,
  Droplets,
  Key,
  Waves,
  Flame,
}

interface ServiceLandingTemplateProps {
  professionId?: string
  profession?: (typeof PROFESSIONS)[0]
  city?: { slug: string; name: string; province?: string }
  citySlug?: string
  problemId?: string
  isUrgent?: boolean
  modifier?: string
  modifierText?: string
}

export function ServiceLandingTemplate({
  professionId,
  profession: professionProp,
  city: cityProp,
  citySlug,
  problemId,
  isUrgent,
  modifier,
  modifierText,
}: ServiceLandingTemplateProps) {
  const phoneNumber = "936946639"
  const phoneFormatted = "936 946 639"

  const profession = professionProp || PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]
  const cityName = cityProp?.name || (citySlug ? getCityDisplayName(citySlug) : "Espana")
  const actualCitySlug = cityProp?.slug || citySlug
  const provinceName = cityProp?.province || (actualCitySlug ? getCityProvince(actualCitySlug) : "")
  const nearbyCities = actualCitySlug ? getNearbyCities(actualCitySlug) : []
  const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
  const currentProblem = problemId ? problems.find((p) => p.id === problemId) : null

  const IconComponent = profession?.icon ? ICONS[profession.icon as keyof typeof ICONS] || Zap : Zap

  const getTitle = () => {
    if (currentProblem) {
      return `${currentProblem.name} en ${cityName}`
    }
    switch (modifier) {
      case "24-horas":
        return `${profession.name} 24 Horas en ${cityName}`
      case "economico":
        return `${profession.name} Economico en ${cityName}`
      case "barato":
        return `${profession.name} Barato en ${cityName}`
      case "a-domicilio":
        return `${profession.name} a Domicilio en ${cityName}`
      case "cerca-de-mi":
        return `${profession.name} Cerca de Ti en ${cityName}`
      case "de-guardia":
        return `${profession.name} de Guardia en ${cityName}`
      case "nocturno":
        return `${profession.name} Nocturno en ${cityName}`
      case "festivos":
        return `${profession.name} Festivos en ${cityName}`
      case "rapido":
        return `${profession.name} Rapido en ${cityName}`
      case "ahora":
        return `${profession.name} Ahora en ${cityName}`
      case "hoy":
        return `${profession.name} Hoy en ${cityName}`
      case "precio":
        return `Precio ${profession.name} en ${cityName}`
      case "presupuesto":
        return `Presupuesto ${profession.name} en ${cityName}`
      default:
        if (isUrgent) {
          return `${profession.name} Urgente en ${cityName}`
        }
        return `${profession.name} en ${cityName}`
    }
  }

  const getSubtitle = () => {
    if (currentProblem) {
      return `Solucionamos ${currentProblem.description.toLowerCase()} en ${cityName}. Llegamos en 10 minutos.`
    }
    switch (modifier) {
      case "24-horas":
        return `Servicio de ${profession.namePlural.toLowerCase()} disponible las 24 horas del dia, 7 dias a la semana en ${cityName}. Noches, fines de semana y festivos.`
      case "economico":
      case "barato":
        return `${profession.namePlural} con los mejores precios en ${cityName}. Presupuesto sin compromiso. Calidad garantizada al mejor precio.`
      case "a-domicilio":
        return `${profession.namePlural} que van a tu casa en ${cityName}. Servicio a domicilio profesional. Llegamos en 10 minutos.`
      case "cerca-de-mi":
        return `El ${profession.name.toLowerCase()} mas cercano a tu ubicacion en ${cityName}. Profesionales en tu zona disponibles ahora.`
      case "de-guardia":
        return `${profession.name} de guardia disponible ahora mismo en ${cityName}. Servicio de emergencias 24/7.`
      case "nocturno":
        return `Servicio de ${profession.name.toLowerCase()} nocturno en ${cityName}. Trabajamos de noche sin recargo extra. De 22h a 8h.`
      case "festivos":
        return `${profession.namePlural} trabajando festivos, domingos y dias especiales en ${cityName}. Todos los dias del ano.`
      case "rapido":
        return `El servicio de ${profession.name.toLowerCase()} mas rapido de ${cityName}. Llegamos en 10 minutos garantizados.`
      case "ahora":
        return `${profession.namePlural} disponibles ahora mismo en ${cityName}. No esperes mas, llamanos ya.`
      case "hoy":
        return `${profession.name} disponible hoy en ${cityName}. Servicio el mismo dia garantizado.`
      case "precio":
        return `Consulta el precio de ${profession.name.toLowerCase()} en ${cityName}. Tarifas claras sin sorpresas. Presupuesto gratis.`
      case "presupuesto":
        return `Pide presupuesto gratis de ${profession.name.toLowerCase()} en ${cityName}. Sin compromiso y respuesta inmediata.`
      default:
        if (isUrgent) {
          return `${profession.namePlural} de urgencias disponibles ahora en ${cityName}. Llegamos en 10 minutos. Llama ya.`
        }
        return `${profession.namePlural} profesionales disponibles 24/7 en ${cityName}. Llegamos en 10 minutos.`
    }
  }

  const getGuarantees = () => {
    switch (modifier) {
      case "economico":
      case "barato":
      case "precio":
      case "presupuesto":
        return [
          { icon: Euro, title: "Mejor Precio", subtitle: "Garantizado" },
          { icon: Shield, title: "Sin Sorpresas", subtitle: "Precio cerrado" },
          { icon: Award, title: "Calidad", subtitle: "Profesionales" },
          { icon: Timer, title: "Gratis", subtitle: "Presupuesto" },
        ]
      case "24-horas":
      case "nocturno":
      case "festivos":
        return [
          { icon: Clock, title: "24/7", subtitle: "Siempre disponibles" },
          { icon: Moon, title: "Noches", subtitle: "Sin recargo" },
          { icon: Calendar, title: "Festivos", subtitle: "Trabajamos" },
          { icon: ThumbsUp, title: "4.9★", subtitle: "+2.800 opiniones" },
        ]
      case "cerca-de-mi":
      case "a-domicilio":
        return [
          { icon: Navigation, title: "Cercano", subtitle: "En tu zona" },
          { icon: Home, title: "A domicilio", subtitle: "Vamos a tu casa" },
          { icon: Timer, title: "10 min", subtitle: "Tiempo llegada" },
          { icon: ThumbsUp, title: "4.9★", subtitle: "+2.800 opiniones" },
        ]
      case "de-guardia":
      case "rapido":
      case "ahora":
      case "hoy":
        return [
          { icon: Zap, title: "Express", subtitle: "Super rapido" },
          { icon: Timer, title: "10 min", subtitle: "Garantizado" },
          { icon: Shield, title: "Garantia", subtitle: "Total" },
          { icon: ThumbsUp, title: "4.9★", subtitle: "+2.800 opiniones" },
        ]
      default:
        return [
          { icon: Timer, title: "10 min", subtitle: "Tiempo llegada" },
          { icon: Shield, title: "Garantia", subtitle: "En cada trabajo" },
          { icon: Award, title: "Certificados", subtitle: "Profesionales" },
          { icon: ThumbsUp, title: "4.9★", subtitle: "+2.800 opiniones" },
        ]
    }
  }

  const title = getTitle()
  const subtitle = getSubtitle()
  const guarantees = getGuarantees()

  const uniqueContent = actualCitySlug
    ? generateUniqueContent(actualCitySlug, cityName, profession.id, profession.name)
    : null

  const reviews = actualCitySlug
    ? generateTestimonials(actualCitySlug, cityName, profession.name)
    : [
        { name: "Maria G.", text: "Excelente servicio. Muy profesionales.", time: "Hace 2 horas", city: cityName },
        { name: "Carlos P.", text: "Servicio 10. Muy recomendable.", time: "Hace 5 horas", city: cityName },
        { name: "Ana R.", text: "Rapidos, limpios y profesionales.", time: "Ayer", city: cityName },
      ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 overflow-hidden" aria-labelledby="hero-title">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-transparent to-foreground/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Live Badge - Client Component */}
              <LiveBadge
                profession={profession}
                cityName={cityName}
                modifier={modifier}
                isUrgent={isUrgent}
              />

              {/* Main Headline */}
              <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.1] text-balance">
                <span className="text-foreground">{title}</span>
                <span className="block text-foreground/80 mt-2">
                  {modifier === "economico" || modifier === "barato" ? "Mejor Precio" : "Llegamos en 10 min"}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">{subtitle}</p>

              {/* Main CTA - Client Component */}
              <CallButton phoneNumber={phoneNumber} phoneFormatted={phoneFormatted} modifier={modifier} />

              {/* Problems Quick Access - NOW LINKING TO PROBLEM PAGES */}
              {actualCitySlug && problems.length > 0 && (
                <nav aria-label="Problemas comunes" className="space-y-3">
                  <p className="text-xs sm:text-sm text-muted-foreground font-medium">Problemas mas comunes:</p>
                  <div className="flex flex-wrap gap-2">
                    {problems.slice(0, 6).map((item, i) => (
                      <Link
                        key={i}
                        href={`/problema/${profession.id}/${item.id}/${actualCitySlug}/`}
                        className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all hover:scale-105 ${
                          item.urgent
                            ? "bg-destructive/5 border-destructive/20 hover:bg-destructive/10 hover:border-destructive/40"
                            : "bg-muted/50 border-border hover:bg-muted hover:border-foreground/20"
                        }`}
                      >
                        <span className="text-base">{item.emoji}</span>
                        <span className={`text-sm font-medium ${item.urgent ? "text-destructive" : "text-foreground"}`}>
                          {item.name}
                        </span>
                        {item.urgent && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-destructive text-background">
                            URGENTE
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </nav>
              )}
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative max-w-sm sm:max-w-md mx-auto lg:max-w-none">
                <div className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-border shadow-2xl">
                  <Image
                    src="/professional-service-technician-worker-with-tools-.jpg"
                    alt={`${profession.name} profesional en ${cityName} - Servicio urgente 24 horas`}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Floating Badge */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/95 backdrop-blur-sm border border-border">
                      <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center shrink-0">
                        <IconComponent className="w-6 h-6 text-background" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-foreground">
                          {profession.name} {modifierText ? modifierText.toLowerCase() : "certificado"}
                        </div>
                        <div className="text-sm text-muted-foreground">Disponible en {cityName}</div>
                      </div>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute -top-3 -right-3 sm:top-4 sm:right-4 z-10">
                  <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl bg-background border border-foreground/20 shadow-xl">
                    <div className="text-center">
                      {modifier === "economico" || modifier === "barato" ? (
                        <>
                          <div className="text-2xl sm:text-3xl font-black text-foreground">-20%</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">vs competencia</div>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl sm:text-3xl font-black text-foreground">10</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground font-medium">min llegada</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-12 bg-muted/30" aria-label="Garantias del servicio">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {guarantees.map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3 text-foreground" />
                <div className="font-bold text-foreground text-xl">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Table of Contents - SEO Anchor Navigation */}
      {actualCitySlug && (
        <nav className="py-8 border-b border-border" aria-label="Contenido de la pagina">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">En esta pagina</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "servicio", label: `${profession.name} en ${cityName}` },
                { id: "problemas", label: "Problemas que solucionamos" },
                { id: "precios", label: "Guia de precios" },
                { id: "como-trabajamos", label: "Como trabajamos" },
                { id: "faqs", label: "Preguntas frecuentes" },
                { id: "opiniones", label: "Opiniones verificadas" },
                { id: "otros-servicios", label: `Otros servicios en ${cityName}` },
                { id: "ciudades-cercanas", label: "Ciudades cercanas" },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-transparent hover:border-border transition-all"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Unique SEO Content Section */}
      {uniqueContent && (
        <article id="servicio" className="py-12 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground text-balance">
                  {profession.name} en {cityName}, {uniqueContent.localInfo.region}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {uniqueContent.intro}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="text-2xl font-bold text-foreground">{uniqueContent.stats.servicesThisMonth}+</div>
                    <div className="text-sm text-muted-foreground">servicios este mes</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="text-2xl font-bold text-foreground">{uniqueContent.stats.yearsExperience}</div>
                    <div className="text-sm text-muted-foreground">anos de experiencia</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="text-2xl font-bold text-foreground">{uniqueContent.stats.avgResponseTime} min</div>
                    <div className="text-sm text-muted-foreground">tiempo respuesta</div>
                  </div>
                  <div className="p-4 rounded-xl bg-muted/50 border border-border">
                    <div className="text-2xl font-bold text-foreground">{uniqueContent.stats.satisfactionRate}%</div>
                    <div className="text-sm text-muted-foreground">clientes satisfechos</div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-foreground">
                  Problemas que solucionamos en {cityName}
                </h3>
                <ul className="space-y-3">
                  {uniqueContent.issues.map((issue, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span className="text-muted-foreground capitalize">{issue}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                  <p className="text-sm text-foreground font-medium">
                    Zona de servicio: {cityName} ({uniqueContent.localInfo.postalCodeExample}) y alrededores en {uniqueContent.localInfo.province}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground italic">
                  {uniqueContent.guarantee}
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-muted/30 border border-border">
              <p className="text-muted-foreground leading-relaxed">
                {uniqueContent.seoText}
              </p>
            </div>
          </div>
        </article>
      )}

      {/* Why Choose Us */}
      {uniqueContent && uniqueContent.whyChooseUs && (
        <section className="py-16 bg-muted/20" aria-labelledby="why-choose-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                <span>Mas de {uniqueContent.stats.servicesThisMonth} clientes este mes</span>
              </div>
              <h2 id="why-choose-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Por que elegir nuestro servicio de {profession.name.toLowerCase()} en {cityName}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Somos el servicio de {profession.name.toLowerCase()} mas valorado en {cityName} y alrededores.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uniqueContent.whyChooseUs.map((reason, i) => (
                <div key={i} className="p-6 rounded-2xl bg-background border border-border hover:border-foreground/20 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-foreground" />
                    </div>
                    <p className="text-foreground font-medium">{reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How We Work */}
      {uniqueContent && uniqueContent.serviceProcess && (
        <section id="como-trabajamos" className="py-16 scroll-mt-20" aria-labelledby="process-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 id="process-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Como funciona nuestro servicio de {profession.name.toLowerCase()}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Un proceso simple y transparente para que tengas a un profesional en tu casa de {cityName} en cuestion de minutos.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {uniqueContent.serviceProcess.slice(0, 4).map((step, i) => (
                <div key={i} className="relative">
                  <div className="p-6 rounded-2xl bg-muted/30 border border-border h-full">
                    <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg mb-4">
                      {i + 1}
                    </div>
                    <p className="text-foreground">{step}</p>
                  </div>
                  {i < 3 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {uniqueContent.serviceProcess.length > 4 && (
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                {uniqueContent.serviceProcess.slice(4).map((step, i) => (
                  <div key={i + 4} className="p-6 rounded-2xl bg-muted/30 border border-border">
                    <div className="w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-lg mb-4">
                      {i + 5}
                    </div>
                    <p className="text-foreground">{step}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Extended SEO Description */}
      {uniqueContent && uniqueContent.extendedDescription && (
        <section className="py-12 bg-muted/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <article className="prose prose-lg max-w-none">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-balance">
                Tu {profession.name.toLowerCase()} de confianza en {cityName}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {uniqueContent.extendedDescription}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {uniqueContent.cta}
              </p>
            </article>
          </div>
        </section>
      )}

      {/* Expert Guide */}
      <ExpertGuideSection
        professionId={profession.id}
        cityName={cityName}
        professionName={profession.name}
      />

      {/* Deep Dive */}
      <ServiceDeepDive
        professionId={profession.id}
        professionName={profession.name}
        cityName={cityName}
        provinceName={uniqueContent?.localInfo.province || provinceName}
        regionName={uniqueContent?.localInfo.region || "Espana"}
      />

      {/* Pricing Guide */}
      <div id="precios" className="scroll-mt-20">
        <PricingGuideSection
          professionId={profession.id}
          professionName={profession.name}
          cityName={cityName}
        />
      </div>

      {/* FAQs */}
      {uniqueContent && uniqueContent.faqs && uniqueContent.faqs.length > 0 && (
        <section id="faqs" className="py-16 scroll-mt-20" aria-labelledby="faq-heading">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
                <HelpCircle className="w-4 h-4" />
                <span>Resolvemos tus dudas</span>
              </div>
              <h2 id="faq-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                Preguntas frecuentes sobre {profession.name.toLowerCase()} en {cityName}
              </h2>
              <p className="text-muted-foreground">
                Las dudas mas comunes que nos hacen nuestros clientes de {cityName} y alrededores.
              </p>
            </div>

            <div className="space-y-4">
              {uniqueContent.faqs.map((faq, i) => (
                <details key={i} className="group rounded-2xl border border-border bg-background overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                    <h3 className="text-lg font-semibold text-foreground pr-4">{faq.q}</h3>
                    <span className="text-foreground shrink-0 transition-transform group-open:rotate-180">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prevention Tips */}
      {uniqueContent && uniqueContent.preventionTips && uniqueContent.preventionTips.length > 0 && (
        <section className="py-16 bg-muted/20" aria-labelledby="tips-heading">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
                  <Lightbulb className="w-4 h-4" />
                  <span>Consejos de expertos</span>
                </div>
                <h2 id="tips-heading" className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
                  Consejos para prevenir problemas de {profession.name.toLowerCase()}
                </h2>
                <p className="text-muted-foreground mb-6">
                  Nuestros {profession.namePlural.toLowerCase()} en {cityName} comparten estos consejos practicos para evitar averias y mantener tus instalaciones en perfecto estado.
                </p>
                <CallButton phoneNumber={phoneNumber} phoneFormatted={phoneFormatted} />
              </div>

              <div className="space-y-4">
                {uniqueContent.preventionTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border">
                    <div className="w-8 h-8 rounded-lg bg-foreground/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-4 h-4 text-foreground" />
                    </div>
                    <p className="text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Internal Links */}
      {actualCitySlug && (
        <div id="problemas" className="scroll-mt-20">
          <InternalLinks
            currentProfessionId={profession.id}
            currentCitySlug={actualCitySlug}
            currentProblemId={problemId}
            showProblems={true}
            showOtherServices={true}
            showNearbyCities={true}
            maxCities={12}
          />
        </div>
      )}

      {/* Reviews */}
      <section id="opiniones" className="py-12 bg-muted/30 scroll-mt-20" aria-labelledby="reviews-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-6 h-6 text-foreground fill-foreground" />
              ))}
            </div>
            <h2 id="reviews-heading" className="text-foreground font-bold text-lg">4.9 de 5 - +2.800 valoraciones verificadas</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-foreground flex items-center justify-center text-background font-bold text-lg shrink-0">
                    {review.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground">{review.name}</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    </div>
                    <time className="text-xs text-muted-foreground" dateTime={new Date().toISOString().split("T")[0]}>
                      {review.city} - {review.time}
                    </time>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 text-foreground fill-foreground" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{`"${review.text}"`}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            <span>
              {profession.namePlural} {modifierText ? modifierText.toLowerCase() : ""} listos 24/7 en {cityName}
            </span>
          </div>

          <h2 id="cta-heading" className="text-3xl md:text-4xl font-black text-foreground mb-4 text-balance">
            Necesitas un {profession.name.toLowerCase()} {modifierText ? modifierText.toLowerCase() : ""} en {cityName}?
            <span className="block text-foreground">Llamanos ahora mismo</span>
          </h2>

          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            Un {profession.name.toLowerCase()} {modifierText ? modifierText.toLowerCase() : "certificado"} puede estar
            en tu casa en {cityName} en menos de {uniqueContent?.stats.avgResponseTime || 10} minutos. Sin compromiso, sin esperas, sin sorpresas.
          </p>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-sm">
            Llevamos {uniqueContent?.stats.yearsExperience || 10} anos atendiendo a los vecinos de {cityName} y {uniqueContent?.localInfo.region || "alrededores"}.
            Mas de {uniqueContent?.stats.servicesThisMonth || 200} servicios realizados este mes con un {uniqueContent?.stats.satisfactionRate || 97}% de clientes satisfechos.
          </p>

          <CallButton phoneNumber={phoneNumber} phoneFormatted={phoneFormatted} size="large" />

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Servicio 24h
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              7 dias a la semana
            </span>
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Garantia incluida
            </span>
            <span className="flex items-center gap-2">
              <FileCheck className="w-4 h-4" />
              Presupuesto gratis
            </span>
          </div>

          <p className="mt-6 text-muted-foreground text-xs">
            Servicio de {profession.name.toLowerCase()} urgente en {cityName}, {uniqueContent?.localInfo.province || ""}, {uniqueContent?.localInfo.region || ""}.
            Atendemos urgencias las 24 horas del dia, los 365 dias del ano, incluidos festivos y fines de semana.
          </p>
        </div>
      </section>
    </div>
  )
}

export default ServiceLandingTemplate
