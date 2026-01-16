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
      title: `Servicio Ahora ${cityName} | Rapidfix`,
      description: `Servicio disponible ahora en ${cityName}. Llama: 711 267 223.`,
    }
  }
  return {
    title: `${profession.name} Ahora ${cityName} - Disponible en Este Momento | Rapidfix`,
    description: `Necesitas ${profession.name.toLowerCase()} ahora en ${cityName}? Tenemos profesionales disponibles en este momento. Llegamos en 10 min. Llama: 711 267 223.`,
    keywords: `${profession.id} ahora ${cityName}, ${profession.id} ya ${cityName}, ${profession.id} disponible ahora ${cityName}`,
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
          modifier="ahora"
          modifierText="Ahora"
          isUrgent
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
