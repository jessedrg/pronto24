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
      title: `Servicio Hoy ${cityName} | Rapidfix`,
      description: `Servicio disponible hoy en ${cityName}. Llama: 711 267 223.`,
    }
  }
  return {
    title: `${profession.name} Hoy ${cityName} - Servicio Mismo Día | Rapidfix`,
    description: `${profession.name} disponible hoy en ${cityName}. Servicio el mismo día. No esperes más. Llegamos en 10 minutos. Llama: 711 267 223.`,
    keywords: `${profession.id} hoy ${cityName}, ${profession.id} mismo dia ${cityName}, ${profession.id} para hoy ${cityName}`,
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
        <ServiceLandingTemplate professionId={profession.id} citySlug={citySlug} modifier="hoy" modifierText="Hoy" />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
