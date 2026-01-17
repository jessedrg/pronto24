import { ServiceLandingTemplate } from "@/components/service-landing-template"

export default function TestTemplatePage() {
  return (
    <ServiceLandingTemplate
      professionId="electricista"
      citySlug="barcelona"
      modifier="urgente"
      modifierText="Urgente"
    />
  )
}
