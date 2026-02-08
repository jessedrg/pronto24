import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { StaticServiceContent } from "@/components/static-service-content"

export const metadata: Metadata = {
  title: "Reparación de Calderas 24h | pronto-24.com | Llegamos en 10 Minutos",
  description:
    "Reparación de calderas urgente 24 horas en toda España. Llegamos en 10 minutos. Calderas de gas, gasoil, mantenimiento. Servicio 24/7. Presupuesto GRATIS. Llama: 936 946 639",
  keywords:
    "reparación calderas, caldera no enciende, mantenimiento calderas, calderas Madrid, calderas Barcelona, técnico calderas, caldera urgente",
  alternates: {
    canonical: "https://www.pronto-24.com/calderas/",
  },
  openGraph: {
    title: "Reparación de Calderas 24h | Llegamos en 10 min | pronto-24.com",
    description: "Técnicos de calderas profesionales 24/7. Llegamos en 10 minutos. Presupuesto gratis. Llama: 936 946 639",
    type: "website",
  },
}

const calderasSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Reparación de Calderas 24h",
  "description": "Servicio de reparación de calderas urgente 24 horas en toda España. Calderas de gas, gasoil, mantenimiento. Llegamos en 10 minutos.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "pronto-24.com",
    "telephone": "+34936946639",
    "url": "https://www.pronto-24.com",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59"
  },
  "areaServed": { "@type": "Country", "name": "España" },
  "serviceType": "Reparación de calderas",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "price": "49", "minPrice": "49" }
  }
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "¿Cuánto cuesta reparar una caldera?", "acceptedAnswer": { "@type": "Answer", "text": "El precio depende de la avería. Las reparaciones simples empiezan desde 49€. Ofrecemos presupuesto GRATIS antes de empezar." } },
    { "@type": "Question", "name": "¿Qué marcas de calderas reparan?", "acceptedAnswer": { "@type": "Answer", "text": "Reparamos todas las marcas: Vaillant, Junkers, Saunier Duval, Baxi, Roca, Ferroli, y muchas más." } },
    { "@type": "Question", "name": "¿Cuánto tarda en llegar el técnico?", "acceptedAnswer": { "@type": "Answer", "text": "Nuestros técnicos llegan en un máximo de 10 minutos en zonas urbanas." } },
    { "@type": "Question", "name": "¿Trabajan de noche y festivos?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos." } }
  ]
}

const calderasData = {
  serviceId: "calderas",
  serviceName: "Técnico de calderas",
  serviceNamePlural: "Técnicos de calderas",
  headline: "¿Caldera sin funcionar?",
  subheadline: "La reparamos en 10 minutos",
  description: "Técnicos de calderas profesionales certificados disponibles 24/7 en toda España. Reparamos todas las marcas: Vaillant, Junkers, Saunier Duval, Baxi, Roca.",
  iconName: "flame" as const,
  problems: [
    { problem: "Caldera no enciende", emoji: "🔥", urgent: true },
    { problem: "Sin agua caliente", emoji: "🚰", urgent: true },
    { problem: "Calefacción no funciona", emoji: "❄️", urgent: true },
    { problem: "Caldera pierde agua", emoji: "💧", urgent: false },
    { problem: "Ruidos extraños", emoji: "🔊", urgent: false },
    { problem: "Error en display", emoji: "⚠️", urgent: false },
  ],
  reviews: [
    { name: "Carlos M.", city: "Madrid", text: "Mi caldera dejó de funcionar en pleno invierno. Vinieron en 25 minutos y la repararon en el acto. Excelente.", time: "Hace 2 horas" },
    { name: "Laura G.", city: "Barcelona", text: "Muy profesionales. Hicieron el mantenimiento anual de mi caldera y me explicaron todo perfectamente.", time: "Hace 5 horas" },
    { name: "Miguel A.", city: "Valencia", text: "Rápidos y eficientes. La caldera volvió a funcionar perfectamente. Precio justo y sin sorpresas.", time: "Ayer" },
  ],
  faqs: [
    { question: "¿Cuánto cuesta reparar una caldera?", answer: "El precio depende de la avería. Las reparaciones simples (purgado, ajustes) empiezan desde 49€. Cambio de piezas desde 80€ según el componente. Ofrecemos presupuesto GRATIS y sin compromiso antes de empezar." },
    { question: "¿Qué marcas de calderas reparan?", answer: "Reparamos todas las marcas del mercado: Vaillant, Junkers, Saunier Duval, Baxi, Roca, Ferroli, Ariston, Beretta, Cointra, Fagor, y muchas más. Nuestros técnicos reciben formación continua de los fabricantes." },
    { question: "¿Por qué mi caldera no enciende?", answer: "Las causas más comunes son: falta de presión de agua, termostato mal configurado, electrodo de encendido sucio, válvula de gas cerrada, o fallo en la placa electrónica. Nuestros técnicos diagnostican el problema exacto." },
    { question: "¿Cada cuánto hay que hacer mantenimiento?", answer: "Se recomienda hacer una revisión anual de la caldera, preferiblemente antes del invierno. El mantenimiento preventivo alarga la vida de la caldera, mejora su eficiencia y previene averías costosas." },
    { question: "¿Tienen repuestos originales?", answer: "Sí, nuestras furgonetas llevan los repuestos más comunes de las principales marcas. Para piezas específicas, las conseguimos en 24-48 horas con garantía del fabricante." },
  ],
  whyChooseUs: [
    "Llegamos en 10 minutos de media a cualquier punto de España",
    "Técnicos certificados por los principales fabricantes",
    "Más de 350 reparaciones de calderas este mes",
    "Repuestos originales con garantía del fabricante",
    "Presupuesto cerrado y sin sorpresas antes de empezar",
    "Garantía de 12 meses en todas las reparaciones",
  ],
  serviceProcess: [
    "Llámanos y describe el problema de tu caldera",
    "Te damos precio orientativo por teléfono",
    "Un técnico sale inmediatamente hacia tu ubicación",
    "Diagnosticamos la avería con equipos profesionales",
    "Te damos presupuesto cerrado antes de reparar",
    "Reparamos con repuestos originales",
    "Verificamos que todo funciona correctamente",
  ],
  preventionTips: [
    "Haz una revisión anual de la caldera antes del invierno para evitar averías en pleno frío.",
    "Purga los radiadores al inicio de la temporada de calefacción para eliminar aire acumulado.",
    "Mantén la presión del circuito entre 1 y 1.5 bar (mira el manómetro de la caldera).",
    "No tapes las salidas de humos ni las rejillas de ventilación de la caldera.",
    "Si la caldera hace ruidos extraños o pierde agua, llámanos antes de que empeore.",
    "Las calderas de más de 15 años consumen mucho más: considera cambiarla por una de condensación.",
  ],
  extendedDescription: "Nuestro servicio de reparación de calderas en España se ha consolidado como referencia gracias a nuestra especialización y formación continua con los principales fabricantes. Nuestros técnicos están certificados por Vaillant, Junkers, Saunier Duval, Baxi y Roca, lo que nos permite diagnosticar y reparar cualquier avería con garantía. Cada mes realizamos más de 350 reparaciones de calderas en toda España, manteniendo una tasa de resolución en primera visita del 92%. Trabajamos con repuestos originales y ofrecemos 12 meses de garantía en todas las reparaciones.",
  coverageCities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Bilbao", "Alicante", "Córdoba"],
}

export default function CalderasPage() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(calderasSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UrgencyBanner />
      <Header />
      <StaticServiceContent {...calderasData} />
      <Footer />
    </main>
  )
}
