import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getAllCities, getCityDisplayName } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, city: citySlug } = await params
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) return {}
  const cityName = getCityDisplayName(citySlug)
  return {
    title: `${profession.name} a Domicilio ${cityName} - Servicio en tu Casa | Rapidfix`,
    description: `${profession.name} a domicilio en ${cityName}. Vamos a tu casa. Llegamos en 10 minutos. Disponible 24h. Llama: 711 267 223.`,
    keywords: `${profession.id} a domicilio ${cityName}, ${profession.id} en casa ${cityName}, ${profession.id} servicio domicilio ${cityName}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { profession: professionId, city: citySlug } = await params
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cities = getAllCities()
  if (!profession || !cities.includes(citySlug)) notFound()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate
          professionId={professionId}
          citySlug={citySlug}
          modifier="a-domicilio"
          modifierText="a Domicilio"
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
