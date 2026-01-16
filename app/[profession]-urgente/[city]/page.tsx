import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getCityDisplayName } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, city: citySlug } = await params
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cityName = getCityDisplayName(citySlug)

  if (!profession) {
    return {
      title: `Servicio URGENTE ${cityName} | Rapidfix`,
      description: `Servicio urgente en ${cityName}. Llegamos en 10 minutos. Llama: 711 267 223.`,
    }
  }

  return {
    title: `${profession.name} URGENTE ${cityName} - Llegamos en 10 min | Rapidfix`,
    description: `${profession.name} urgente en ${cityName} AHORA. Llegamos en 10 minutos. Disponible 24h. Llama: 711 267 223.`,
    keywords: `${profession.id} urgente ${cityName}, ${profession.id} emergencia ${cityName}, ${profession.id} 24h ${cityName}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { profession: professionId, city: citySlug } = await params
  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate
          professionId={profession.id}
          citySlug={citySlug}
          isUrgent
          modifier="urgente"
          modifierText="Urgente"
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
