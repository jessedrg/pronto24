import type { Metadata } from "next"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { StaticServiceContent } from "@/components/static-service-content"
import { generateAggregateRating } from "@/lib/content-generator"

export const metadata: Metadata = {
  title: "Electricista Urgente 24h | pronto-24.com | Llegamos en 30 Minutos",
  description:
    "Electricista urgente 24 horas en toda España. Llegamos en 30 minutos. Averías eléctricas, cuadros eléctricos, enchufes, cortocircuitos. Servicio 24/7. Presupuesto GRATIS. Llama: 936 946 639",
  keywords:
    "electricista urgente, electricista 24 horas, avería eléctrica, electricista Madrid, electricista Barcelona, sin luz, electricista cerca de mi",
  alternates: {
    canonical: "https://www.pronto-24.com/electricista/",
  },
  openGraph: {
    title: "Electricista Urgente 24h | Llegamos en 30 min | pronto-24.com",
    description: "Electricistas profesionales 24/7 en toda España. Llegamos en 30 minutos. Presupuesto gratis. Llama: 936 946 639",
    type: "website",
  },
}

const electricistaSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Electricista Urgente 24h",
  "description": "Servicio de electricista urgente 24 horas en toda España. Averías eléctricas, cuadros eléctricos, cortocircuitos. Llegamos en 30 minutos.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "pronto-24.com",
    "telephone": "+34936946639",
    "url": "https://www.pronto-24.com",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59"
  },
  "areaServed": { "@type": "Country", "name": "España" },
  "serviceType": "Electricista urgente",
  "aggregateRating": generateAggregateRating("electricista-espana"),
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "39", "minPrice": "39" }
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuánto cuesta un electricista urgente?", "acceptedAnswer": { "@type": "Answer", "text": "El precio depende del tipo de avería. Los servicios básicos empiezan desde 39€. Ofrecemos presupuesto GRATIS antes de empezar." } },
    { "@type": "Question", "name": "¿Cuánto tarda en llegar el electricista?", "acceptedAnswer": { "@type": "Answer", "text": "Nuestros electricistas llegan en un maximo de 30 minutos en zonas urbanas de toda España." } },
    { "@type": "Question", "name": "¿Qué hago si se va la luz en mi casa?", "acceptedAnswer": { "@type": "Answer", "text": "No toques el cuadro eléctrico y llámanos inmediatamente. Llegamos en 30 minutos para diagnosticar y solucionar el problema de forma segura." } },
    { "@type": "Question", "name": "¿Trabajan de noche y festivos?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos y noches en toda España." } }
  ]
}

const electricistaData = {
  serviceId: "electricista",
  serviceName: "Electricista",
  serviceNamePlural: "Electricistas",
  headline: "¿Sin luz en casa?",
  subheadline: "Llegamos en 30 minutos",
  description: "Electricistas profesionales certificados disponibles 24/7 en toda España. Solucionamos cualquier avería eléctrica: cortes de luz, diferenciales, cortocircuitos, cuadros eléctricos.",
  iconName: "zap" as const,
  problems: [
    { problem: "Se me ha ido la luz", emoji: "💡", urgent: true },
    { problem: "El diferencial salta", emoji: "⚡", urgent: true },
    { problem: "Huele a quemado", emoji: "🔥", urgent: true },
    { problem: "Enchufes no funcionan", emoji: "🔌", urgent: false },
    { problem: "Luces parpadean", emoji: "✨", urgent: false },
    { problem: "Cuadro eléctrico", emoji: "⚙️", urgent: false },
  ],
  reviews: [
    { name: "Pedro F.", city: "Madrid", text: "Se fue la luz a las 11 de la noche. Llegaron en 20 minutos y solucionaron el problema del diferencial rápidamente. Muy profesional.", time: "Hace 2 horas" },
    { name: "Carmen D.", city: "Barcelona", text: "Excelente servicio. Necesitaba instalar varios enchufes y lo hicieron perfecto. Trabajo limpio y precio razonable.", time: "Hace 5 horas" },
    { name: "Antonio R.", city: "Valencia", text: "Tuve un cortocircuito y vinieron super rápido. El electricista explicó todo claramente. Muy recomendable.", time: "Ayer" },
  ],
  faqs: [
    { question: "¿Cuánto cuesta un electricista urgente?", answer: "El precio depende del tipo de avería. Los servicios básicos (reparación diferencial, enchufes) empiezan desde 39€. Trabajos más complejos (cuadro eléctrico, instalaciones) desde 80€. Ofrecemos presupuesto GRATIS y sin compromiso." },
    { question: "¿Qué hago si se va la luz en mi casa?", answer: "Primero verifica si es un problema general del edificio o solo de tu vivienda. Si solo afecta a tu casa, no toques el cuadro eléctrico y llámanos inmediatamente. Llegamos en un maximo de 30 minutos para diagnosticar y solucionar el problema de forma segura." },
    { question: "¿Son electricistas certificados?", answer: "Sí, todos nuestros electricistas están certificados y cuentan con el carnet profesional requerido. Tienen formación continua y están al día con todas las normativas de seguridad eléctrica vigentes." },
    { question: "¿Por qué salta el diferencial?", answer: "Las causas más comunes son: electrodomésticos defectuosos, humedad en enchufes, cables pelados, sobrecarga del circuito, o el propio diferencial estropeado. Nuestros electricistas diagnostican la causa exacta." },
    { question: "¿Trabajan los fines de semana y festivos?", answer: "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos y noches en toda España. Las emergencias eléctricas no esperan y nosotros tampoco." },
  ],
  whyChooseUs: [
    "Llegamos en 30 minutos de media a cualquier punto de España",
    "Electricistas certificados con carnet profesional",
    "Más de 400 servicios realizados este mes en toda España",
    "98% de clientes satisfechos nos recomiendan",
    "Presupuesto cerrado y sin sorpresas antes de empezar",
    "Garantía por escrito en todas las reparaciones",
  ],
  serviceProcess: [
    "Llámanos al teléfono de urgencias y cuéntanos tu problema eléctrico",
    "Te damos precio orientativo por teléfono",
    "Un electricista sale inmediatamente hacia tu ubicación",
    "Diagnosticamos la avería con equipos profesionales",
    "Te damos presupuesto cerrado antes de reparar",
    "Reparamos con materiales de calidad",
    "Verificamos que todo funciona correctamente",
  ],
  preventionTips: [
    "No sobrecargues los enchufes con muchos aparatos: usa regletas con protección.",
    "Si un electrodoméstico hace saltar el diferencial, no lo vuelvas a enchufar hasta revisarlo.",
    "Revisa periódicamente que los enchufes no estén ennegrecidos o calientes al tacto.",
    "No hagas reparaciones eléctricas tú mismo si no tienes conocimientos: es peligroso.",
    "Considera actualizar la instalación si tu casa tiene más de 30 años.",
    "Instala detectores de humo cerca de los cuadros eléctricos como medida de seguridad.",
  ],
  extendedDescription: "Nuestro servicio de electricista urgente en España se ha consolidado como referencia gracias a nuestro equipo de profesionales certificados y nuestra respuesta inmediata. Todos nuestros electricistas cuentan con el carnet profesional y reciben formación continua en las últimas normativas y tecnologías. Cada mes realizamos más de 400 servicios en toda España, desde Madrid y Barcelona hasta Valencia, Sevilla y todas las provincias. Mantenemos una valoración de 4.9/5 gracias a nuestra política de transparencia, puntualidad y trabajo bien hecho a la primera.",
  coverageCities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Bilbao", "Alicante", "Córdoba"],
}

export default function ElectricistaPage() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(electricistaSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UrgencyBanner />
      <StaticServiceContent {...electricistaData} />
      <Footer />
    </main>
  )
}
