import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getCityDisplayName, getKeywordModifier } from "@/lib/seo-data"
import { generateUniqueContent } from "@/lib/content-generator"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

const RESERVED_PATHS = ["sitemap-files", "api", "problema", "precio", "presupuesto"]

const KNOWN_MODIFIERS = [
  // Alta urgencia (High Intent)
  "urgente", "24-horas", "ahora", "hoy", "rapido", "inmediato", "ya", "emergencia", "express", "24h",
  "urgencias", "ahora-mismo", "necesito",
  // Precio
  "economico", "barato", "low-cost", "precio", "presupuesto", "tarifa", "mejor-precio", "asequible",
  "presupuesto-gratis", "precio-justo", "cuanto-cuesta", "precios",
  // Disponibilidad
  "de-guardia", "nocturno", "festivos", "fin-de-semana", "mismo-dia", "sabados", "domingos", "madrugada",
  "abierto-hoy",
  // Ubicacion
  "cerca-de-mi", "a-domicilio", "zona", "barrio", "centro",
  // Confianza
  "profesional", "de-confianza", "con-garantia", "autorizados", "certificado", "oficial", "titulado",
  "recomendado", "mejor", "fiable",
  // Servicio
  "reparacion", "instalacion", "mantenimiento", "revision", "averias",
  // Combinaciones
  "urgente-24h", "barato-urgente", "rapido-economico", "urgente-barato", "24h-economico",
  "urgente-economico", "urgente-hoy", "rapido-barato", "profesional-barato",
  // Búsquedas naturales
  "busco", "contratar", "encontrar", "servicio",
] as const

function parseProfessionAndModifier(rawProfession: string): {
  professionId: string
  modifier?: (typeof KNOWN_MODIFIERS)[number]
} {
  if (VALID_PROFESSIONS.includes(rawProfession)) {
    return { professionId: rawProfession }
  }

  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawProfession.endsWith(suffix)) {
      const professionId = rawProfession.slice(0, -suffix.length)
      if (VALID_PROFESSIONS.includes(professionId)) {
        return { professionId, modifier: mod }
      }
    }
  }

  return { professionId: rawProfession }
}

function getModifierMeta(modifier: (typeof KNOWN_MODIFIERS)[number]) {
  const modifierText = getKeywordModifier(modifier)?.name || modifier
  const isUrgent = modifier === "urgente" || modifier === "24-horas" || modifier === "ahora" || modifier === "hoy"
  return { modifierText, isUrgent }
}

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: rawProfession, city: citySlug } = await params
  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)

  if (!VALID_PROFESSIONS.includes(professionId)) {
    return { title: "No encontrado" }
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cityName = getCityDisplayName(citySlug)

  if (!profession) {
    return {
      title: `Servicio en ${cityName} | Rapidfix`,
      description: `Servicio profesional en ${cityName}. Llama: 936 946 639.`,
    }
  }

  if (modifier) {
    const { modifierText, isUrgent } = getModifierMeta(modifier)

    const urgencyText = isUrgent ? "Llegamos en 10 MIN. Disponible AHORA." : "Presupuesto SIN compromiso."

    const priceText =
      modifier === "economico" || modifier === "barato"
        ? "Precios desde 39€. Sin sorpresas."
        : "Precios justos y transparentes."

    return {
      title: `${profession.name} ${modifierText} en ${cityName} | 10 Min | 936 946 639`,
      description: `${profession.name} ${modifierText.toLowerCase()} en ${cityName}. ${urgencyText} ${priceText} Profesionales certificados 24/7. Llama GRATIS: 936 946 639`,
      keywords: `${profession.id} ${modifier} ${cityName}, ${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} barato ${cityName}, ${profession.id} 24 horas ${cityName}`,
      alternates: {
        canonical: `https://www.pronto-24.com/${rawProfession}/${citySlug}/`,
      },
      openGraph: {
        title: `${profession.name} ${modifierText} en ${cityName} - Llegamos en 10 min`,
        description: `Servicio de ${profession.name.toLowerCase()} ${modifierText.toLowerCase()} en ${cityName}. Disponibles 24/7. Llama: 936 946 639`,
        type: "website",
      },
    }
  }

  return {
    title: `${profession.name} en ${cityName} | Urgencias 24h | 936 946 639`,
    description: `${profession.name} profesional en ${cityName}. Llegamos en 10 MIN. Servicio 24h los 365 dias. Presupuesto GRATIS sin compromiso. Llama ahora: 936 946 639`,
    keywords: `${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} 24 horas ${cityName}, ${profession.id} economico ${cityName}, ${profession.id} barato ${cityName}`,
    alternates: {
      canonical: `https://www.pronto-24.com/${rawProfession}/${citySlug}/`,
    },
    openGraph: {
      title: `${profession.name} en ${cityName} - Servicio Urgente 24h`,
      description: `Servicio de ${profession.name.toLowerCase()} en ${cityName}. Profesionales certificados, llegamos en 10 minutos. Llama: 936 946 639`,
      type: "website",
    },
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: rawProfession, city: citySlug } = await params

  if (RESERVED_PATHS.includes(rawProfession)) {
    // Let the actual route handler process this
    redirect(`/${rawProfession}/${citySlug}`)
  }

  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)

  if (!VALID_PROFESSIONS.includes(professionId)) {
    notFound()
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]

  const modifierMeta = modifier ? getModifierMeta(modifier) : undefined

  const cityName = getCityDisplayName(citySlug)
  
  // Generar contenido único para Schema.org
  const uniqueContent = generateUniqueContent(citySlug, cityName, profession.id, profession.name)
  
  // Schema.org JSON-LD para FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": uniqueContent.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  }
  
  // Schema.org JSON-LD para LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${profession.name} en ${cityName} - pronto-24.com`,
    "description": `Servicio de ${profession.name.toLowerCase()} urgente 24 horas en ${cityName}, ${uniqueContent.localInfo.province}. Llegamos en ${uniqueContent.stats.avgResponseTime} minutos. ${uniqueContent.stats.yearsExperience} años de experiencia.`,
    "telephone": "+34936946639",
    "url": `https://www.pronto-24.com/${profession.id}/${citySlug}/`,
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59",
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": uniqueContent.localInfo.province
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": uniqueContent.stats.rating,
      "reviewCount": uniqueContent.stats.servicesThisMonth * 3,
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Servicios de ${profession.name} en ${cityName}`,
      "itemListElement": uniqueContent.issues.slice(0, 5).map((issue, index) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": issue.charAt(0).toUpperCase() + issue.slice(1),
          "description": `Servicio profesional de ${issue} en ${cityName}. Disponible 24/7.`
        }
      }))
    }
  }
  
  // Schema.org JSON-LD para Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${profession.name} ${modifierMeta?.modifierText || 'Urgente'} en ${cityName}`,
    "description": `Servicio de ${profession.name.toLowerCase()} profesional en ${cityName}. ${uniqueContent.intro}`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "pronto-24.com",
      "telephone": "+34936946639"
    },
    "areaServed": {
      "@type": "City",
      "name": cityName
    },
    "serviceType": profession.name,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `https://www.pronto-24.com/${profession.id}/${citySlug}/`,
      "servicePhone": "+34936946639",
      "availableLanguage": "Spanish"
    },
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "00:00",
      "closes": "23:59"
    }
  }
  
  // Schema.org JSON-LD para BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Inicio",
        "item": "https://www.pronto-24.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": profession.name,
        "item": `https://www.pronto-24.com/${profession.id}/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${profession.name} en ${cityName}`,
        "item": `https://www.pronto-24.com/${profession.id}/${citySlug}/`
      }
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Schema.org JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate
          professionId={profession.id}
          citySlug={citySlug}
          modifier={modifier}
          modifierText={modifierMeta?.modifierText}
          isUrgent={modifierMeta?.isUrgent}
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
