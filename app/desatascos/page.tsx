import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { StaticServiceContent } from "@/components/static-service-content"

export const metadata: Metadata = {
  title: "Desatascos Urgentes 24h | pronto-24.com | Llegamos en 10 Minutos",
  description:
    "Desatascos urgentes 24 horas en toda España. Llegamos en 10 minutos. Desatasco de tuberías, fregaderos, inodoros, bajantes. Servicio 24/7. Presupuesto GRATIS. Llama: 936 946 639",
  keywords:
    "desatascos urgentes, desatascar tuberías, desatasco inodoro, desatascos madrid, desatascos barcelona, desatasco fregadero, desatasco bajantes, desatascos cerca de mi",
  alternates: {
    canonical: "https://www.pronto-24.com/desatascos/",
  },
  openGraph: {
    title: "Desatascos Urgentes 24h | Llegamos en 10 min | pronto-24.com",
    description: "Desatascos profesionales 24/7. Llegamos en 10 minutos. Presupuesto gratis. Llama: 936 946 639",
    type: "website",
  },
}

const desatascosSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Desatascos Urgentes 24h",
  "description": "Servicio de desatascos urgente 24 horas en toda España. Desatasco de tuberías, fregaderos, inodoros, bajantes. Llegamos en 10 minutos.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "pronto-24.com",
    "telephone": "+34936946639",
    "url": "https://www.pronto-24.com",
    "priceRange": "€€",
    "openingHours": "Mo-Su 00:00-23:59"
  },
  "areaServed": { "@type": "Country", "name": "España" },
  "serviceType": "Desatascos urgentes",
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
    { "@type": "Question", "name": "¿Cuánto cuesta un desatasco urgente?", "acceptedAnswer": { "@type": "Answer", "text": "El precio depende del tipo de atasco. Los desatascos simples empiezan desde 39€. Ofrecemos presupuesto GRATIS antes de empezar." } },
    { "@type": "Question", "name": "¿Cuánto tarda en llegar el técnico?", "acceptedAnswer": { "@type": "Answer", "text": "Nuestros técnicos llegan en un máximo de 10 minutos en zonas urbanas. Tenemos profesionales distribuidos por toda España." } },
    { "@type": "Question", "name": "¿Qué tipos de atascos solucionan?", "acceptedAnswer": { "@type": "Answer", "text": "Solucionamos todo tipo de atascos: inodoros, fregaderos, duchas, bañeras, bajantes, arquetas y tuberías principales." } },
    { "@type": "Question", "name": "¿Trabajan de noche y festivos?", "acceptedAnswer": { "@type": "Answer", "text": "Sí, estamos disponibles 24 horas al día, 7 días a la semana, incluidos festivos y noches." } }
  ]
}

const desatascosData = {
  serviceId: "desatascos",
  serviceName: "Desatascos",
  serviceNamePlural: "Técnicos de desatascos",
  headline: "¿Tubería atascada?",
  subheadline: "Desatascamos en 10 minutos",
  description: "Técnicos de desatascos profesionales disponibles 24/7 en toda España. Solucionamos cualquier atasco: fregaderos, inodoros, bajantes, arquetas.",
  iconName: "droplets" as const,
  problems: [
    { problem: "WC atascado", emoji: "🚽", urgent: true },
    { problem: "Fregadero no traga", emoji: "🚰", urgent: true },
    { problem: "Bajante obstruido", emoji: "🚨", urgent: true },
    { problem: "Ducha atascada", emoji: "🚿", urgent: false },
    { problem: "Arqueta llena", emoji: "🚧", urgent: false },
    { problem: "Mal olor desagües", emoji: "👃", urgent: false },
  ],
  reviews: [
    { name: "Carlos M.", city: "Madrid", text: "Increíble servicio. Llegaron en 20 minutos y solucionaron el atasco del inodoro en menos de una hora. Muy profesionales.", time: "Hace 2 horas" },
    { name: "Ana G.", city: "Barcelona", text: "Tuve un atasco grave en la cocina un domingo por la noche. Vinieron rapidísimo y lo arreglaron todo.", time: "Hace 5 horas" },
    { name: "Miguel R.", city: "Valencia", text: "Excelente atención. El técnico explicó todo el proceso y dejó todo limpio. Muy satisfecho.", time: "Ayer" },
  ],
  faqs: [
    { question: "¿Cuánto cuesta un desatasco urgente?", answer: "El precio depende del tipo y gravedad del atasco. Los desatascos simples (fregadero, ducha) empiezan desde 39€. Atascos más complejos (bajantes, arquetas) desde 80€. Ofrecemos presupuesto GRATIS antes de empezar." },
    { question: "¿Qué tipos de atascos solucionan?", answer: "Solucionamos todo tipo de atascos: inodoros, fregaderos, duchas, bañeras, bajantes, arquetas y tuberías principales. Contamos con equipos especializados incluyendo cámaras de inspección y camiones cuba para los casos más graves." },
    { question: "¿Cómo desatascan sin romper?", answer: "Utilizamos métodos profesionales no invasivos: máquinas de cable rotativo, hidrolimpiadoras de alta presión, y cámaras de inspección para localizar el problema exacto. Solo en casos extremos es necesario acceder a la tubería." },
    { question: "¿Por qué se atascan las tuberías?", answer: "Las causas más comunes son: acumulación de grasa y restos de comida, pelos y jabón en baños, objetos caídos accidentalmente, raíces de árboles en tuberías exteriores, y cal en zonas de agua dura." },
    { question: "¿Tienen garantía los desatascos?", answer: "Sí, todos nuestros servicios tienen garantía por escrito. Si el atasco reaparece en los primeros 30 días, volvemos sin coste adicional. Nuestros técnicos están certificados." },
  ],
  whyChooseUs: [
    "Llegamos en 10 minutos de media a cualquier punto de España",
    "Equipos profesionales: cámaras, hidrolimpiadoras, camión cuba",
    "Más de 450 servicios realizados este mes en toda España",
    "97% de atascos resueltos en la primera visita",
    "Presupuesto cerrado y sin sorpresas antes de empezar",
    "Garantía de 30 días en todos los desatascos",
  ],
  serviceProcess: [
    "Llámanos y describe el problema de atasco",
    "Te damos precio orientativo por teléfono",
    "Un técnico sale inmediatamente hacia tu ubicación",
    "Inspeccionamos y localizamos el atasco exacto",
    "Te damos presupuesto cerrado antes de actuar",
    "Desatascamos con el método más adecuado",
    "Verificamos que el agua fluye correctamente",
  ],
  preventionTips: [
    "Nunca viertas aceite por el fregadero: solidifica y causa atascos. Guárdalo en un bote y tíralo a la basura.",
    "Usa rejillas en los desagües de ducha y bañera para atrapar pelos antes de que entren.",
    "Una vez al mes, vierte agua hirviendo por los desagües para disolver acumulaciones de jabón.",
    "No tires toallitas húmedas por el WC aunque digan 'biodegradables': no se deshacen y atascan.",
    "Limpia el sifón del fregadero cada pocos meses para evitar acumulaciones.",
    "Si notas que el agua tarda más en irse, actúa antes de que sea un atasco total.",
  ],
  extendedDescription: "Nuestro servicio de desatascos urgente en España se ha consolidado como referencia gracias a nuestra inversión en equipos profesionales y formación continua. Contamos con cámaras de inspección de tuberías, máquinas de cable rotativo de distintos calibres, hidrolimpiadoras de alta presión y camiones cuba para los casos más graves. Con más de 15 años de experiencia, hemos desarrollado protocolos eficientes que nos permiten resolver el 97% de los atascos en una sola visita. Cada mes realizamos más de 450 servicios en toda España, manteniendo una valoración de 4.9/5 gracias a nuestra política de transparencia y trabajo bien hecho.",
  coverageCities: ["Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga", "Murcia", "Bilbao", "Alicante", "Córdoba"],
}

export default function DesatascosPage() {
  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(desatascosSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <UrgencyBanner />
      <Header />
      <StaticServiceContent {...desatascosData} />
      <Footer />
      <AIChatWidget service="desatasco" />
    </main>
  )
}
