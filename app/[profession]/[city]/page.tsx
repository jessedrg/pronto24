import { notFound, redirect } from "next/navigation"
import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PROFESSIONS, getCityDisplayName, getCityProvince, getKeywordModifier } from "@/lib/seo-data"
import { generateUniqueContent, generateTestimonials } from "@/lib/content-generator"

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
  const provinceName = getCityProvince(citySlug)

  if (!profession) {
    return {
      title: `Servicio en ${cityName} | pronto-24.com`,
      description: `Servicio profesional en ${cityName}. Llama: 936 946 639.`,
    }
  }

  // Common geo + date meta tags
  const geoAndDateMeta: Record<string, string> = {
    "geo.region": "ES",
    "geo.placename": cityName,
    "date": new Date().toISOString().split("T")[0],
  }

  if (modifier) {
    const { modifierText, isUrgent } = getModifierMeta(modifier)

    const urgencyText = isUrgent ? "Llegamos en 30 MIN maximo. Disponible AHORA." : "Presupuesto SIN compromiso."

    const priceText =
      modifier === "economico" || modifier === "barato"
        ? "Precios desde 39€. Sin sorpresas."
        : "Precios justos y transparentes."

    return {
      title: `${profession.name} ${modifierText} en ${cityName} | 30 Min | 936 946 639`,
      description: `${profession.name} ${modifierText.toLowerCase()} en ${cityName}. ${urgencyText} ${priceText} Profesionales certificados 24/7. Llama GRATIS: 936 946 639`,
      alternates: {
        canonical: `https://www.pronto-24.com/${rawProfession}/${citySlug}/`,
      },
      openGraph: {
        title: `${profession.name} ${modifierText} en ${cityName} - Llegamos en 30 min`,
        description: `Servicio de ${profession.name.toLowerCase()} ${modifierText.toLowerCase()} en ${cityName}. Disponibles 24/7. Llama: 936 946 639`,
        type: "website",
      },
      other: geoAndDateMeta,
    }
  }

  return {
    title: `${profession.name} Urgente en ${cityName} | 24h Hoy | 936 946 639`,
    description: `${profession.name} urgente en ${cityName}${provinceName ? `, ${provinceName}` : ""}. Llegamos en 30 minutos maximo. Servicio 24h los 365 dias. Presupuesto GRATIS sin compromiso. Llama ahora: 936 946 639`,
    alternates: {
      canonical: `https://www.pronto-24.com/${rawProfession}/${citySlug}/`,
    },
    openGraph: {
      title: `${profession.name} Urgente en ${cityName} - 24h Disponible Hoy`,
      description: `Servicio de ${profession.name.toLowerCase()} urgente en ${cityName}. Profesionales certificados, llegamos en 30 minutos. Llama: 936 946 639`,
      type: "website",
    },
    other: geoAndDateMeta,
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: rawProfession, city: citySlug } = await params

  if (RESERVED_PATHS.includes(rawProfession)) {
    notFound()
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
  const currentDate = new Date().toISOString().split("T")[0]
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `${profession.name} en ${cityName} - pronto-24.com`,
    "description": `Servicio de ${profession.name.toLowerCase()} urgente 24 horas en ${cityName}, ${uniqueContent.localInfo.province}. Llegamos en un maximo de 30 minutos. Presupuesto gratuito y garantia por escrito.`,
    "telephone": "+34936946639",
    "url": `https://www.pronto-24.com/${profession.id}/${citySlug}/`,
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59",
    "dateModified": currentDate,
    "areaServed": {
      "@type": "City",
      "name": cityName,
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": uniqueContent.localInfo.province
      }
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
  
  // Schema.org JSON-LD para HowTo (how we work steps)
  const howToSchema = uniqueContent.serviceProcess ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Como contratar un ${profession.name.toLowerCase()} urgente en ${cityName}`,
    "description": `Proceso paso a paso para tener un ${profession.name.toLowerCase()} profesional en tu casa de ${cityName} en cuestion de minutos.`,
    "totalTime": "PT15M",
    "step": uniqueContent.serviceProcess.slice(0, 4).map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": `Paso ${i + 1}`,
      "text": step
    }))
  } : null

  // Note: Review schema removed - Google penalizes fabricated reviews in structured data.
  // Testimonials are still shown visually but without schema markup.

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
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}

      
      <Breadcrumbs
        items={[
          { label: profession.name, href: `/${profession.id}/` },
          ...(modifier
            ? [{ label: modifierMeta?.modifierText || modifier, href: `/${rawProfession}/${citySlug}/` }]
            : []),
          { label: `${profession.name} en ${cityName}` },
        ]}
      />
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
    </div>
  )
}
