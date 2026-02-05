import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { TrustBadges } from "@/components/trust-badges"
import { SocialProof } from "@/components/social-proof"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { GuaranteeSection } from "@/components/guarantee-section"
import { Coverage } from "@/components/coverage"
import { ServicesOverview } from "@/components/services-overview"
import { HomeFAQ } from "@/components/home-faq"
import { AboutSection } from "@/components/about-section"
import { HomeServiceArticles } from "@/components/home-service-articles"

// Schema.org JSON-LD para la página principal
const homeSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "pronto-24.com - Servicios Urgentes 24h",
  "description": "Servicios de emergencia 24/7 en toda España. Electricistas, fontaneros, cerrajeros, desatascos y calderas. Llegamos en 30 minutos. Presupuesto gratis.",
  "url": "https://www.pronto-24.com",
  "telephone": "+34936946639",
  "priceRange": "€€",
  "openingHours": "Mo-Su 00:00-23:59",
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2847",
    "bestRating": "5",
    "worstRating": "1"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de Emergencia para el Hogar",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Electricista Urgente 24h",
          "description": "Servicio de electricista urgente disponible 24/7. Apagones, cortocircuitos, instalaciones."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fontanero Urgente 24h",
          "description": "Fontaneros profesionales para emergencias. Fugas, tuberías, calentadores."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Cerrajero Urgente 24h",
          "description": "Cerrajeros de urgencia. Aperturas sin daños, cambio de cerraduras."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Desatascos Urgentes 24h",
          "description": "Servicio de desatascos con camión cuba. WC, fregaderos, bajantes."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Reparación de Calderas 24h",
          "description": "Técnicos de calderas certificados. Todas las marcas, revisiones."
        }
      }
    ]
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto tarda en llegar un profesional a mi casa?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestro tiempo medio de llegada es de 10 a 30 minutos, dependiendo de tu ubicación y la disponibilidad de técnicos en tu zona."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan de noche, fines de semana y festivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, estamos disponibles las 24 horas del día, los 7 días de la semana, los 365 días del año, incluyendo noches y festivos."
      }
    },
    {
      "@type": "Question",
      "name": "¿Los profesionales están certificados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos nuestros técnicos son profesionales certificados con años de experiencia en su especialidad."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué garantía tienen los trabajos realizados?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Todos nuestros trabajos incluyen garantía por escrito de mínimo 12 meses en mano de obra."
      }
    }
  ]
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Schema.org JSON-LD para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <UrgencyBanner />
      <Hero />
      <TrustBadges />
      <ServicesOverview />
      <SocialProof />
      <GuaranteeSection />
      <AboutSection />
      <HomeServiceArticles />
      <HomeFAQ />
      <Coverage />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
