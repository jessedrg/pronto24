import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { UrgencyBanner } from "@/components/urgency-banner"
import { ElectricistaContentMalaga } from "@/components/electricista-content-malaga"

export const metadata: Metadata = {
  title: "Electricista Urgente 24h Málaga | Llegamos en 10 min",
  description:
    "Electricista urgente 24/7 en Málaga. Llegamos en 10 minutos. Averías eléctricas, cortes de luz, cuadros eléctricos. Profesionales certificados.",
  keywords:
    "electricista urgente málaga, electricista 24 horas málaga, avería eléctrica málaga, electricista marbella, sin luz urgente málaga",
  openGraph: {
    title: "Electricista Urgente 24h Málaga | Llegamos en 10 min",
    description: "Profesionales en 10 minutos. Toda Málaga. 24/7.",
  },
}

export default function ElectricistaMalagaPage() {
  return (
    <main className="min-h-screen bg-background">
      <UrgencyBanner />
      <Header />
      <ElectricistaContentMalaga />
      <Footer />
      <AIChatWidget service="electricista" />
    </main>
  )
}
