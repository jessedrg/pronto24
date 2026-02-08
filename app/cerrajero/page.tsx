import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { StaticServiceContent } from "@/components/static-service-content"

export const metadata: Metadata = {
  title: "Cerrajero Urgente 24h | pronto-24.com | Llegamos en 10 Minutos",
  description:
    "Cerrajero urgente 24 horas en toda España. Llegamos en 10 minutos. Apertura de puertas sin roturas, cambio de cerraduras, bombines. Servicio 24/7. Presupuesto GRATIS. Llama: 936 946 639",
  keywords:
    "cerrajero urgente, cerrajero 24 horas, apertura de puertas, cerrajero Madrid, cerrajero Barcelona, puerta bloqueada, cerrajero cerca de mi",
  alternates: {
    canonical: "https://www.pronto-24.com/cerrajero/",
  },
  openGraph: {
    title: "Cerrajero Urgente 24h | Llegamos en 10 min | pronto-24.com",
    description: "Cerrajeros profesionales 24/7. Apertura sin roturas. Llegamos en 10 minutos. Llama: 936 946 639",
    type: "website",
  },
}

const cerrajeroSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Cerrajero Urgente 24h",
  "description": "Servicio de cerrajería urgente 24 horas en toda España. Apertura de puertas sin roturas, cambio de cerraduras y bombines. Llegamos en 10 minutos.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "pronto-24.com",
    "telephone": "+34936946639",
    "url": "https://www.pronto-24.com",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59"
  },
  "areaServed": { "@type": "Country", "name": "España" },
  "serviceType": "Cerrajería urgente",
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
    { "@type": "Question", "name": "¿Cuánto cuesta un cerrajero urgente?", "acceptedAnswer": { "@type": "Answer", "text": "El precio de un cerrajero urgente depende del tipo de servicio. Las aperturas simples empiezan desde 39€. Ofrecemos presupuesto GRATIS antes de empezar." } },
    { "@type": "Question", "name": "¿Pueden abrir mi puerta sin romperla?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, en la gran mayoría de casos abrimos sin roturas usando técnicas profesionales. Solo en casos excepcionales puede ser necesario forzar." } },
    { "@type": "Question", "name": "¿Cuánto tarda en llegar el cerrajero?", "acceptedAnswer": { "@type": "Answer", "text": "Nuestros cerrajeros llegan en un máximo de 10 minutos en zonas urbanas. Tenemos profesionales distribuidos por toda España." } },
    { "@type": "Question", "name": "¿Trabajan de noche y festivos?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos y noches." } }
  ]
}

const cerrajeroData = {
  serviceId: "cerrajero",
  serviceName: "Cerrajero",
  serviceNamePlural: "Cerrajeros",
  headline: "¿Te has quedado fuera de casa?",
  subheadline: "Abrimos en 10 minutos",
  description: "Cerrajeros profesionales certificados disponibles 24/7 en toda España. Apertura de puertas sin roturas, cambio de cerraduras y bombines de seguridad.",
  iconName: "key" as const,
  problems: [
    { problem: "Puerta bloqueada", emoji: "🚪", urgent: true },
    { problem: "Llave rota dentro", emoji: "🔑", urgent: true },
    { problem: "Cerradura atascada", emoji: "🔒", urgent: true },
    { problem: "Cambio de bombín", emoji: "⚙️", urgent: false },
    { problem: "Cerradura seguridad", emoji: "🛡️", urgent: false },
    { problem: "Copia de llaves", emoji: "🗝️", urgent: false },
  ],
  reviews: [
    { name: "Pedro L.", city: "Madrid", text: "Me quedé fuera de casa a las 2 AM. Llegaron en 12 minutos y abrieron la puerta sin romper nada. Increíble.", time: "Hace 2 horas" },
    { name: "María J.", city: "Barcelona", text: "Muy profesionales. Cambiaron el bombín de mi puerta en 20 minutos. Precio justo y trabajo impecable.", time: "Hace 5 horas" },
    { name: "José R.", city: "Valencia", text: "Rápidos y eficientes. Abrieron mi puerta sin daños y me dieron consejos de seguridad.", time: "Ayer" },
  ],
  faqs: [
    { question: "¿Cuánto cuesta un cerrajero urgente?", answer: "El precio depende del tipo de servicio. Las aperturas simples empiezan desde 39€. Cambios de bombín desde 60€. Ofrecemos presupuesto GRATIS y sin compromiso antes de empezar cualquier trabajo." },
    { question: "¿Pueden abrir mi puerta sin romperla?", answer: "Sí, en la gran mayoría de casos abrimos sin roturas usando técnicas profesionales: ganzúas, bumping controlado, impresioning. Solo en casos excepcionales (cerraduras de muy alta seguridad dañadas) puede ser necesario forzar." },
    { question: "¿Cuánto tarda en llegar el cerrajero?", answer: "Nuestros cerrajeros llegan en un máximo de 10 minutos en zonas urbanas. Tenemos profesionales distribuidos por toda España para garantizar respuesta rápida." },
    { question: "¿Debo cambiar la cerradura si pierdo las llaves?", answer: "Depende. Si las perdiste lejos de casa sin identificación, el riesgo es bajo. Pero si las perdiste cerca de casa o con documentos que incluyan tu dirección, recomendamos cambiar al menos el bombín por seguridad." },
    { question: "¿Qué cerradura recomiendan para más seguridad?", answer: "Recomendamos cerraduras con cilindro antibumping y antipalanca de marcas como Keso, Mul-T-Lock o Fichet. El escudo de seguridad es igual de importante. Te asesoramos según tu presupuesto." },
  ],
  whyChooseUs: [
    "Llegamos en 10 minutos de media a cualquier punto de España",
    "Apertura sin roturas en el 95% de los casos",
    "Más de 400 servicios realizados este mes en toda España",
    "98% de clientes satisfechos nos recomiendan",
    "Presupuesto cerrado y sin sorpresas antes de empezar",
    "Cerraduras de alta seguridad con garantía",
  ],
  serviceProcess: [
    "Llámanos y cuéntanos tu situación",
    "Te damos precio orientativo por teléfono",
    "Un cerrajero sale inmediatamente hacia tu ubicación",
    "Evaluamos la cerradura y te damos presupuesto cerrado",
    "Si aceptas, abrimos sin roturas en minutos",
    "Verificamos que todo funciona correctamente",
    "Te entregamos factura y garantía por escrito",
  ],
  preventionTips: [
    "Nunca dejes las llaves bajo el felpudo o en macetas: es lo primero que miran los ladrones.",
    "Lubrica las cerraduras una vez al año con grafito en polvo (no aceite, que atrae suciedad).",
    "No fuerces una llave que entra con dificultad: puede romperse dentro.",
    "Considera instalar una mirilla digital o videoportero para ver quién llama.",
    "Las cerraduras de más de 10 años pueden tener vulnerabilidades conocidas.",
    "Deja siempre una copia de llaves con alguien de confianza para emergencias.",
  ],
  extendedDescription: "Nuestro servicio de cerrajería urgente en España se ha consolidado como referencia gracias a nuestra especialización en aperturas sin roturas y cerraduras de alta seguridad. Con más de 15 años de experiencia, nuestros cerrajeros certificados dominan todas las técnicas profesionales de apertura y están formados en las últimas tecnologías de seguridad. Cada mes realizamos más de 400 servicios en toda España, manteniendo una tasa de apertura sin daños del 95%. Trabajamos con las mejores marcas de cerraduras del mercado y ofrecemos asesoramiento personalizado para mejorar la seguridad de tu hogar.",
  coverageCities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Bilbao", "Alicante", "Córdoba"],
}

export default function CerrajeroPage() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cerrajeroSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UrgencyBanner />
      <Header />
      <StaticServiceContent {...cerrajeroData} />
      <Footer />
    </main>
  )
}
