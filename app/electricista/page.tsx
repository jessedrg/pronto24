import type { Metadata } from "next"
import { ElectricistaHero } from "@/components/electricista-hero"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"

export const metadata: Metadata = {
  title: "Electricista Urgente 24h | Llegamos en 10 min | Catalunya y Málaga",
  description:
    "Electricista urgente 24/7. Llegamos en 10 minutos a toda Catalunya y Málaga. Averías eléctricas, cortes de luz, cuadros eléctricos. Profesionales certificados.",
  keywords:
    "electricista urgente, electricista 24 horas, avería eléctrica, electricista Barcelona, electricista Málaga, sin luz urgente",
  openGraph: {
    title: "Electricista Urgente 24h | Llegamos en 10 min",
    description: "Profesionales en 10 minutos. Toda Catalunya y Málaga. 24/7.",
  },
}

export default function ElectricistaPage() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <ElectricistaHero />
      <Footer />
      <AIChatWidget service="electricista" />
    </main>
  )
}
