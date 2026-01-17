import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getCityDisplayName } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, city: citySlug } = await params
  if (!VALID_PROFESSIONS.includes(professionId)) return { title: "No encontrado" }
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cityName = getCityDisplayName(citySlug)
  if (!profession) {
    return {
      title: `Servicio Cerca de Mi ${cityName} | Rapidfix`,
      description: `Servicio cerca de ti en ${cityName}. El profesional más cercano. Llama: 711 267 223.`,
    }
  }
  return {
    title: `${profession.name} Cerca de Mi en ${cityName} - El Más Cercano | Rapidfix`,
    description: `${profession.name} cerca de ti en ${cityName}. El profesional más cercano a tu ubicación. Llegamos en 10 minutos. Llama: 711 267 223.`,
    keywords: `${profession.id} cerca de mi ${cityName}, ${profession.id} cercano ${cityName}, ${profession.id} mi zona ${cityName}`,
  }
}

export default async function Page({ params }: PageProps) {
  const { profession: professionId, city: citySlug } = await params
  if (!VALID_PROFESSIONS.includes(professionId)) notFound()
  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate
          professionId={profession.id}
          citySlug={citySlug}
          modifier="cerca-de-mi"
          modifierText="Cerca de Ti"
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
