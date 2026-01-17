import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, getCityDisplayName, getKeywordModifier } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

const KNOWN_MODIFIERS = [
  "urgente",
  "24-horas",
  "economico",
  "barato",
  "a-domicilio",
  "cerca-de-mi",
  "de-guardia",
  "nocturno",
  "festivos",
  "rapido",
  "ahora",
  "hoy",
] as const

function parseProfessionAndModifier(rawProfession: string): {
  professionId: string
  modifier?: (typeof KNOWN_MODIFIERS)[number]
} {
  if (VALID_PROFESSIONS.includes(rawProfession)) {
    return { professionId: rawProfession }
  }

  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (rawProfession.endsWith(suffix)) {
      const professionId = rawProfession.slice(0, -suffix.length)
      if (VALID_PROFESSIONS.includes(professionId)) {
        return { professionId, modifier: mod }
      }
    }
  }

  return { professionId: rawProfession }
}

function getModifierMeta(modifier: (typeof KNOWN_MODIFIERS)[number]) {
  const modifierText = getKeywordModifier(modifier)?.name || modifier
  const isUrgent = modifier === "urgente" || modifier === "24-horas" || modifier === "ahora" || modifier === "hoy"
  return { modifierText, isUrgent }
}

interface PageProps {
  params: Promise<{ profession: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: rawProfession, city: citySlug } = await params
  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)

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

  if (modifier) {
    const { modifierText } = getModifierMeta(modifier)
    return {
      title: `${profession.name} ${modifierText} en ${cityName} - 24h Urgencias | Rapidfix`,
      description: `${profession.name} ${modifierText.toLowerCase()} en ${cityName}. Llegamos en 10 minutos. Servicio 24 horas, profesionales certificados. Llama ahora al 711 267 223.`,
      keywords: `${profession.id} ${modifier} ${cityName}, ${profession.id} ${cityName}, ${profession.id} urgente ${cityName}`,
    }
  }

  return {
    title: `${profession.name} en ${cityName} - 24h Urgencias | Rapidfix`,
    description: `${profession.name} urgente en ${cityName}. Llegamos en 10 minutos. Servicio 24 horas, profesionales certificados. Llama ahora al 711 267 223.`,
    keywords: `${profession.id} ${cityName}, ${profession.id} urgente ${cityName}, ${profession.id} 24 horas ${cityName}`,
  }
}

export default async function ProfessionCityPage({ params }: PageProps) {
  const { profession: rawProfession, city: citySlug } = await params
  const { professionId, modifier } = parseProfessionAndModifier(rawProfession)

  if (!VALID_PROFESSIONS.includes(professionId)) {
    notFound()
  }

  const profession = PROFESSIONS.find((p) => p.id === professionId) || PROFESSIONS[0]

  const modifierMeta = modifier ? getModifierMeta(modifier) : undefined

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate
          professionId={profession.id}
          citySlug={citySlug}
          modifier={modifier}
          modifierText={modifierMeta?.modifierText}
          isUrgent={modifierMeta?.isUrgent}
        />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}

