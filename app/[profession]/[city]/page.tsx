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

  if (!VALID_PROFESSIONS.includes(professionId)) {
    return { title: "No encontrado" }
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cityName = getCityDisplayName(citySlug)

  if (!profession) {
    return {
      title: `Servicio en ${cityName} | Rapidfix`,
      description: `Servicio profesional en ${cityName}. Llama: 711 267 223.`,
    }
  }

  return {
    title: `${profession.name} en ${cityName} - 24h Urgencias | Rapidfix`,
    description: `${profession.name} urgente en ${cityName}. Llegamos en 10 minutos. Servicio 24 horas, profesionales certificados. Llama ahora al 711 267 223.`,
    keywords: `${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} 24 horas ${cityName}`,
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: professionId, city: citySlug } = await params

  if (!VALID_PROFESSIONS.includes(professionId)) {
    notFound()
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate professionId={profession.id} citySlug={citySlug} />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
