import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { StaticServiceContent } from "@/components/static-service-content"

export const metadata: Metadata = {
  title: "Fontanero Urgente 24h | pronto-24.com | Llegamos en 10 Minutos",
  description:
    "Fontanero urgente 24 horas en toda España. Llegamos en 10 minutos. Fugas de agua, grifos, calderas, tuberías atascadas. Servicio 24/7. Presupuesto GRATIS. Llama: 936 946 639",
  keywords:
    "fontanero urgente, fontanero 24 horas, fuga de agua, reparación grifos, fontanero Madrid, fontanero Barcelona, fontanero cerca de mi",
  alternates: {
    canonical: "https://www.pronto-24.com/fontanero/",
  },
  openGraph: {
    title: "Fontanero Urgente 24h | Llegamos en 10 min | pronto-24.com",
    description: "Fontaneros profesionales 24/7. Llegamos en 10 minutos. Presupuesto gratis sin compromiso. Llama: 936 946 639",
    type: "website",
  },
}

const fontaneroSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Fontanero Urgente 24h",
  "description": "Servicio de fontanería urgente 24 horas en toda España. Reparación de fugas, grifos, calderas, tuberías. Llegamos en 10 minutos.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "pronto-24.com",
    "telephone": "+34936946639",
    "url": "https://www.pronto-24.com",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59"
  },
  "areaServed": {
    "@type": "Country",
    "name": "España"
  },
  "serviceType": "Fontanería urgente",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": {
      "@type": "PriceSpecification",
      "priceCurrency": "EUR",
      "price": "39",
      "minPrice": "39"
    }
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Cuánto cuesta un fontanero urgente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El precio de un fontanero urgente depende del tipo de avería. Los precios empiezan desde 39€ para servicios básicos. Ofrecemos presupuesto GRATIS y sin compromiso antes de empezar cualquier trabajo."
      }
    },
    {
      "@type": "Question",
      "name": "¿Cuánto tarda en llegar el fontanero?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nuestros fontaneros llegan en un máximo de 10 minutos en zonas urbanas. Tenemos profesionales distribuidos por toda España para garantizar una respuesta rápida."
      }
    },
    {
      "@type": "Question",
      "name": "¿Qué hago si tengo una fuga de agua urgente?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cierra la llave de paso general inmediatamente para evitar daños mayores. Luego llámanos al 936 946 639 y llegaremos en menos de 10 minutos para localizar y reparar la fuga."
      }
    },
    {
      "@type": "Question",
      "name": "¿Trabajan de noche y festivos?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos y noches. No hay recargo por servicio nocturno."
      }
    },
    {
      "@type": "Question",
      "name": "¿Las reparaciones tienen garantía?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Sí, todas nuestras reparaciones tienen garantía por escrito. Si el problema persiste, volvemos sin coste adicional. Utilizamos materiales de primera calidad."
      }
    }
  ]
}

const fontaneroData = {
  serviceId: "fontanero",
  serviceName: "Fontanero",
  serviceNamePlural: "Fontaneros",
  headline: "¿Fuga de agua urgente?",
  subheadline: "Llegamos en 10 minutos",
  description: "Fontaneros profesionales certificados disponibles 24/7 en toda España. Solucionamos cualquier problema de fontanería: fugas, grifos, calderas, tuberías atascadas.",
  iconName: "droplets" as const,
  problems: [
    { problem: "Fuga de agua", emoji: "💧", urgent: true },
    { problem: "Tubería rota", emoji: "🔧", urgent: true },
    { problem: "Sin agua caliente", emoji: "🔥", urgent: true },
    { problem: "Grifo que gotea", emoji: "🚿", urgent: false },
    { problem: "WC atascado", emoji: "🚽", urgent: false },
    { problem: "Caldera no funciona", emoji: "⚙️", urgent: false },
  ],
  reviews: [
    {
      name: "Luis M.",
      city: "Madrid",
      text: "Fuga de agua en plena madrugada. Llegaron en 15 minutos y pararon la fuga inmediatamente. Salvaron mi casa de una inundación.",
      time: "Hace 2 horas",
    },
    {
      name: "Elena C.",
      city: "Barcelona",
      text: "Muy profesionales. Arreglaron el grifo de la cocina que llevaba semanas goteando. Trabajo rápido y limpio.",
      time: "Hace 5 horas",
    },
    {
      name: "Roberto V.",
      city: "Valencia",
      text: "La caldera dejó de funcionar en invierno. Vinieron el mismo día y la repararon. Excelente servicio.",
      time: "Ayer",
    },
  ],
  faqs: [
    {
      question: "¿Cuánto cuesta un fontanero urgente?",
      answer: "El precio de un fontanero urgente depende del tipo de avería. Los precios empiezan desde 39€ para servicios básicos. Ofrecemos presupuesto GRATIS y sin compromiso antes de empezar cualquier trabajo. Sin sorpresas ni costes ocultos.",
    },
    {
      question: "¿Qué hago si tengo una fuga de agua urgente?",
      answer: "Cierra la llave de paso general inmediatamente para evitar daños mayores. Luego llámanos al 936 946 639 y llegaremos en menos de 10 minutos para localizar y reparar la fuga. Es importante actuar rápido para evitar inundaciones y daños en la vivienda.",
    },
    {
      question: "¿Reparan calderas de todas las marcas?",
      answer: "Sí, nuestros fontaneros están capacitados para reparar calderas y calentadores de todas las marcas: Vaillant, Junkers, Saunier Duval, Baxi, Roca, Ferroli, etc. Llevamos repuestos originales en nuestras furgonetas para resolver la mayoría de averías en una sola visita.",
    },
    {
      question: "¿Trabajan de noche y festivos?",
      answer: "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos y noches. No hay recargo por servicio nocturno ni en días festivos. Entendemos que las emergencias no avisan.",
    },
    {
      question: "¿Las reparaciones tienen garantía?",
      answer: "Sí, todas nuestras reparaciones tienen garantía por escrito de mínimo 12 meses. Si el problema persiste, volvemos sin coste adicional. Utilizamos materiales de primera calidad con garantía del fabricante.",
    },
  ],
  whyChooseUs: [
    "Llegamos en 10 minutos de media a cualquier punto de España",
    "Más de 15 años de experiencia nos avalan como profesionales de confianza",
    "Más de 500 servicios realizados este mes en toda España",
    "98% de clientes satisfechos nos recomiendan a familiares y amigos",
    "Presupuesto cerrado y sin sorpresas antes de empezar cualquier trabajo",
    "Garantía por escrito en todas las reparaciones e instalaciones",
  ],
  serviceProcess: [
    "Llámanos al teléfono de urgencias y cuéntanos tu problema",
    "Te damos una estimación de tiempo y precio orientativo por teléfono",
    "Un fontanero sale inmediatamente hacia tu ubicación",
    "Evaluamos el problema in situ y te damos presupuesto cerrado",
    "Si aceptas, realizamos el trabajo de forma profesional y limpia",
    "Verificamos que todo funciona correctamente antes de irnos",
    "Te entregamos factura y garantía por escrito del trabajo realizado",
  ],
  preventionTips: [
    "Cierra la llave de paso si te vas de vacaciones para evitar sorpresas a la vuelta.",
    "No viertas aceite por el fregadero: solidifica en las tuberías y causa atascos.",
    "Revisa periódicamente las gomas de los grifos y conexiones de electrodomésticos.",
    "En invierno, protege las tuberías exteriores del frío para evitar roturas por congelación.",
    "Limpia los filtros de los grifos (aireadores) cada pocos meses para mantener buen caudal.",
    "Conoce dónde está la llave de paso general de tu casa para actuar rápido en emergencias.",
  ],
  extendedDescription: "Nuestro servicio de fontanería urgente en España se ha consolidado como referencia gracias a nuestro compromiso inquebrantable con la calidad y la satisfacción del cliente. Con más de 15 años de experiencia atendiendo a miles de hogares y negocios, hemos desarrollado un profundo conocimiento de las particularidades de las instalaciones en todo el país. Nuestro equipo de fontaneros certificados recibe formación continua para estar al día de las últimas tecnologías y normativas del sector, garantizando intervenciones seguras, eficientes y duraderas. Cada mes realizamos más de 500 servicios en toda España, manteniendo una valoración media de 4.9 sobre 5 gracias a nuestra política de transparencia en precios, puntualidad y trabajo bien hecho a la primera.",
  coverageCities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Bilbao", "Alicante", "Córdoba"],
}

export default function FontaneroPage() {
  return (
    <main className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(fontaneroSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <UrgencyBanner />
      <Header />
      <StaticServiceContent {...fontaneroData} />
      <Footer />
      <AIChatWidget service="fontanero" />
    </main>
  )
}
