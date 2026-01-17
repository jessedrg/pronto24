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
      title: `Presupuesto Gratis ${cityName} | Rapidfix`,
      description: `Presupuesto gratis en ${cityName}. Sin compromiso. Llama: 711 267 223.`,
    }
  }
  return {
    title: `Presupuesto ${profession.name} ${cityName} - Gratis y Sin Compromiso | Rapidfix`,
    description: `Presupuesto gratis de ${profession.name.toLowerCase()} en ${cityName}. Sin compromiso. Respuesta inmediata. Llama: 711 267 223.`,
    keywords: `presupuesto ${profession.id} ${cityName}, pedir presupuesto ${profession.id} ${cityName}, presupuesto gratis ${profession.id} ${cityName}`,
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
          modifier="presupuesto"
          modifierText="Presupuesto"
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
