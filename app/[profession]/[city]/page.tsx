import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getAllCities, getCityDisplayName } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800 // 1 week in seconds

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, city: citySlug } = await params
  const profession = PROFESSIONS.find((p) => p.id === professionId)

  if (!profession) return {}

  const cityName = getCityDisplayName(citySlug)

  return {
    title: `${profession.name} en ${cityName} - 24h Urgencias | Rapidfix`,
    description: `${profession.name} urgente en ${cityName}. Llegamos en 10 minutos. Servicio 24 horas, profesionales certificados. Llama ahora al 711 267 223.`,
    keywords: `${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} 24 horas ${cityName}, ${profession.id} barato ${cityName}`,
    openGraph: {
      title: `${profession.name} Urgente en ${cityName} - Llegamos en 10 min`,
      description: `Servicio de ${profession.id} 24 horas en ${cityName}. Profesionales certificados. Sin compromiso.`,
    },
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: professionId, city: citySlug } = await params

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cities = getAllCities()

  if (!profession || !cities.includes(citySlug)) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate professionId={professionId} citySlug={citySlug} />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
