import {
  MapPin,
  Shield,
  Euro,
  Lightbulb,
  HelpCircle,
  Navigation,
  Calendar,
  AlertTriangle,
  Building2,
  Wrench,
} from "lucide-react"

interface FAQ {
  q: string
  a: string
}

interface AIContentProps {
  aiIntro: string | null
  aiLocalContext: string | null
  aiServiceDetails: string | null
  aiPricingInfo: string | null
  aiPreventionTips: string | null
  aiFaqs: FAQ[] | null
  aiNeighborhoodInfo: string | null
  aiSeasonalTips: string | null
  aiEmergencyGuide: string | null
  cityName: string
  professionName: string
}

function ContentSection({
  icon: Icon,
  title,
  content,
  bgClass = "bg-background",
}: {
  icon: React.ElementType
  title: string
  content: string
  bgClass?: string
}) {
  return (
    <section className={`py-10 ${bgClass}`}>
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div className="prose prose-neutral max-w-none text-muted-foreground leading-relaxed">
          {content.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQSection({ faqs, cityName, professionName }: { faqs: FAQ[]; cityName: string; professionName: string }) {
  return (
    <section className="py-10 bg-muted/30">
      <div className="mx-auto max-w-4xl px-4">
        <div className="flex items-start gap-3 mb-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
            <HelpCircle className="h-5 w-5 text-accent" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Preguntas Frecuentes sobre {professionName} en {cityName}
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-lg border border-border bg-card p-4"
            >
              <summary className="flex cursor-pointer items-center justify-between font-medium text-foreground">
                <span>{faq.q}</span>
                <span className="ml-2 shrink-0 text-muted-foreground transition-transform group-open:rotate-180">
                  {"▼"}
                </span>
              </summary>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>

        {/* FAQ Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.a,
                },
              })),
            }),
          }}
        />
      </div>
    </section>
  )
}

export function AIContentSections({
  aiIntro,
  aiLocalContext,
  aiServiceDetails,
  aiPricingInfo,
  aiPreventionTips,
  aiFaqs,
  aiNeighborhoodInfo,
  aiSeasonalTips,
  aiEmergencyGuide,
  cityName,
  professionName,
}: AIContentProps) {
  // If no AI content is available, return nothing
  const hasAnyContent = aiIntro || aiLocalContext || aiServiceDetails || aiPricingInfo || 
    aiPreventionTips || aiFaqs || aiNeighborhoodInfo || aiSeasonalTips || aiEmergencyGuide

  if (!hasAnyContent) return null

  return (
    <div className="w-full">
      {aiIntro && (
        <ContentSection
          icon={MapPin}
          title={`${professionName} en ${cityName}: Servicio Local de Confianza`}
          content={aiIntro}
          bgClass="bg-muted/20"
        />
      )}

      {aiLocalContext && (
        <ContentSection
          icon={Building2}
          title={`Conocemos ${cityName} y sus Particularidades`}
          content={aiLocalContext}
        />
      )}

      {aiServiceDetails && (
        <ContentSection
          icon={Wrench}
          title={`Nuestros Servicios de ${professionName} en ${cityName}`}
          content={aiServiceDetails}
          bgClass="bg-muted/20"
        />
      )}

      {aiPricingInfo && (
        <ContentSection
          icon={Euro}
          title={`Precios de ${professionName} en ${cityName}`}
          content={aiPricingInfo}
        />
      )}

      {aiFaqs && aiFaqs.length > 0 && (
        <FAQSection faqs={aiFaqs} cityName={cityName} professionName={professionName} />
      )}

      {aiNeighborhoodInfo && (
        <ContentSection
          icon={Navigation}
          title={`Cobertura en ${cityName} y Alrededores`}
          content={aiNeighborhoodInfo}
          bgClass="bg-muted/20"
        />
      )}

      {aiPreventionTips && (
        <ContentSection
          icon={Lightbulb}
          title={`Consejos de Prevencion para Hogares en ${cityName}`}
          content={aiPreventionTips}
        />
      )}

      {aiSeasonalTips && (
        <ContentSection
          icon={Calendar}
          title={`Mantenimiento Estacional en ${cityName}`}
          content={aiSeasonalTips}
          bgClass="bg-muted/20"
        />
      )}

      {aiEmergencyGuide && (
        <ContentSection
          icon={AlertTriangle}
          title={`Guia de Emergencia: Que Hacer Mientras Llega el ${professionName}`}
          content={aiEmergencyGuide}
        />
      )}

      {/* Security/Trust badge */}
      <section className="py-8 bg-accent/5">
        <div className="mx-auto max-w-4xl px-4">
          <div className="flex items-center gap-3 rounded-lg border border-accent/20 bg-card p-4">
            <Shield className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <p className="font-semibold text-foreground">
                Contenido verificado por profesionales
              </p>
              <p className="text-sm text-muted-foreground">
                Esta informacion ha sido revisada y validada por nuestro equipo de {professionName.toLowerCase()}s
                profesionales con experiencia en {cityName} y su zona.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
