import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { PROFESSIONS, PROBLEMS, getAllCities, getCityDisplayName } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800 // 1 week in seconds

interface PageProps {
  params: Promise<{ profession: string; problem: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, problem: problemId, city: citySlug } = await params

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) return {}

  const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
  const problem = problems.find((p) => p.id === problemId)
  if (!problem) return {}

  const cityName = getCityDisplayName(citySlug)

  return {
    title: `${problem.name} en ${cityName} - ${profession.name} Urgente | Rapidfix`,
    description: `${problem.description} en ${cityName}? Solucionamos ${problem.name.toLowerCase()} en 10 minutos. ${profession.namePlural} 24h. Llama: 711 267 223.`,
    keywords: `${problem.name.toLowerCase()} ${cityName}, ${profession.id} ${problem.id} ${cityName}, ${problem.id} urgente ${cityName}`,
  }
}

export default async function ProblemCityPage({ params }: PageProps) {
  const { profession: professionId, problem: problemId, city: citySlug } = await params

  const profession = PROFESSIONS.find((p) => p.id === professionId)
  const cities = getAllCities()

  if (!profession || !cities.includes(citySlug)) {
    notFound()
  }

  const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
  const problem = problems.find((p) => p.id === problemId)

  if (!problem) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <UrgencyBanner />
      <Header />
      <main className="flex-1">
        <ServiceLandingTemplate professionId={professionId} citySlug={citySlug} problemId={problemId} />
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
