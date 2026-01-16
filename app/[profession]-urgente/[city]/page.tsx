import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getAllCities, getCityDisplayName } from "@/lib/seo-data"

interface PageProps {
  params: Promise<{ "profession-urgente": string; city: string }>
}

function extractProfessionFromUrgent(slug: string): string | null {
  // Handle URLs like "electricista-urgente" -> "electricista"
  const match = slug.match(/^(.+)-urgente$/)
  return match ? match[1] : null
}

export async function generateStaticParams() {
  const params: { "profession-urgente": string; city: string }[] = []
  const cities = getAllCities()

  for (const profession of PROFESSIONS) {
    for (const city of cities) {
      params.push({ "profession-urgente": `${profession.id}-urgente`, city })
    }
  }

  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const professionId = extractProfessionFromUrgent(resolvedParams["profession-urgente"])
  const citySlug = resolvedParams.city

  if (!professionId) return {}

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) return {}

  const cityName = getCityDisplayName(citySlug)

  return {
    title: `${profession.name} URGENTE ${cityName} - Llegamos en 10 min | Rapidfix`,
    description: `${profession.name} urgente en ${cityName} AHORA. Llegamos en 10 minutos. Disponible 24h. Llama: 711 267 223.`,
    keywords: `${profession.id} urgente ${cityName}, ${profession.id} emergencia ${cityName}, ${profession.id} 24h ${cityName}`,
  }
}

export default async function UrgentProfessionCityPage({ params }: PageProps) {
  const resolvedParams = await params
  const professionId = extractProfessionFromUrgent(resolvedParams["profession-urgente"])
  const citySlug = resolvedParams.city

  if (!professionId) notFound()

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
        <ServiceLandingTemplate professionId={professionId} citySlug={citySlug} isUrgent />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
