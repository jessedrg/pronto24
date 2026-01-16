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

  const title = `${profession.name} Barato en ${city.name} | Mejor Precio Garantizado`
  const description = `${profession.name} barato en ${city.name}. Los mejores precios de la zona. Presupuesto sin compromiso. Profesionales de confianza.`

  return {
    title,
    description,
    keywords: [
      `${profession.name.toLowerCase()} barato ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} economico ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} low cost ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} mejor precio ${city.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function ProfessionBaratoPage({ params }: Props) {
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
        isUrgent={false}
        modifier="barato"
        modifierText="Barato"
      />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
