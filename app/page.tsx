import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { HowItWorks } from "@/components/how-it-works"
import { Coverage } from "@/components/coverage"
import { Footer } from "@/components/footer"
import { Testimonials } from "@/components/testimonials"
import { UrgencyBanner } from "@/components/urgency-banner"
import { TrustBadges } from "@/components/trust-badges"
import { SocialProof } from "@/components/social-proof"
import { AIChatWidget } from "@/components/ai-chat-widget"

export default function Home() {
  return (
    <main className="min-h-screen">
      <UrgencyBanner />
      <Hero />
      <TrustBadges />
      <Services />
      <SocialProof />
      <Testimonials />
      <HowItWorks />
      <Coverage />
      <Footer />
      <AIChatWidget />
    </main>
  )
}
