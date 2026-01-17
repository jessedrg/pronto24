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
  console.log("[v0] generateMetadata - professionId:", professionId, "citySlug:", citySlug)
  if (!VALID_PROFESSIONS.includes(professionId)) {
    console.log("[v0] generateMetadata - INVALID profession, returning not found metadata")
    return { title: "No encontrado" }
  }
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  console.log("[v0] generateMetadata - profession found:", profession?.id)
  const cityName = getCityDisplayName(citySlug)
  console.log("[v0] generateMetadata - cityName:", cityName)
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
  console.log("[v0] Page - params:", params)
  const { profession: professionId, city: citySlug } = await params
  console.log("[v0] Page - professionId:", professionId, "citySlug:", citySlug)
  console.log("[v0] Page - VALID_PROFESSIONS:", VALID_PROFESSIONS)
  console.log("[v0] Page - includes result:", VALID_PROFESSIONS.includes(professionId))

  if (!VALID_PROFESSIONS.includes(professionId)) {
    console.log("[v0] Page - calling notFound() because profession is invalid")
    notFound()
  }

  console.log("[v0] Page - profession is valid, continuing...")
  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]
  console.log("[v0] Page - profession found:", profession?.id)

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
