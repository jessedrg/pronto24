import { Hero } from "@/components/hero"
import { Footer } from "@/components/footer"
import { UrgencyBanner } from "@/components/urgency-banner"
import { TrustBadges } from "@/components/trust-badges"
import { SocialProof } from "@/components/social-proof"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { GuaranteeSection } from "@/components/guarantee-section"
import { Coverage } from "@/components/coverage"

export default function Home() {
  return (
    <main className="min-h-screen">
      <UrgencyBanner />
      <Hero />
      <TrustBadges />
      <SocialProof />
      <GuaranteeSection />
      <Coverage />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
