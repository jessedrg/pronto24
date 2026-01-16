import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { getProfessionBySlug, getCityBySlug } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

type Props = {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profession: professionSlug, city: citySlug } = await params
  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)

  if (!profession || !city) {
    return { title: "Servicio no encontrado" }
  }

  const title = `${profession.name} 24 Horas en ${city.name} | Servicio Nocturno y Festivos`
  const description = `${profession.name} disponible 24 horas en ${city.name}. Servicio nocturno, fines de semana y festivos. Llegamos en 10 minutos. Llama ahora.`

  return {
    title,
    description,
    keywords: [
      `${profession.name.toLowerCase()} 24 horas ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} nocturno ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} festivos ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} fin de semana ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} madrugada ${city.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function Profession24HorasPage({ params }: Props) {
  const { profession: professionSlug, city: citySlug } = await params
  const profession = getProfessionBySlug(professionSlug)
  const city = getCityBySlug(citySlug)

  if (!profession || !city) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <UrgencyBanner />
      <Header />
      <ServiceLandingTemplate
        profession={profession}
        city={city}
        isUrgent={true}
        modifier="24-horas"
        modifierText="24 Horas"
      />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
