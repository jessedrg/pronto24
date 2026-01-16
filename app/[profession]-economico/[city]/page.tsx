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

  const title = `${profession.name} Económico en ${city.name} | Precios Baratos Sin Sorpresas`
  const description = `${profession.name} económico en ${city.name}. Precios competitivos y presupuesto gratis. Sin desplazamiento. Calidad garantizada al mejor precio.`

  return {
    title,
    description,
    keywords: [
      `${profession.name.toLowerCase()} economico ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} barato ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} precio ${city.name.toLowerCase()}`,
      `${profession.name.toLowerCase()} presupuesto ${city.name.toLowerCase()}`,
      `cuanto cuesta ${profession.name.toLowerCase()} ${city.name.toLowerCase()}`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
  }
}

export default async function ProfessionEconomicoPage({ params }: Props) {
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
        modifier="economico"
        modifierText="Económico"
      />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
