"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LocalEnrichment } from "@/lib/local-enrichment"

interface PostalCodeFAQProps {
  profession: {
    id: string
    name: string
    namePlural: string
  }
  postalcode: string
  zoneName: string
  cityName: string
  enrichment?: LocalEnrichment | null
}

export function PostalCodeFAQ({
  profession,
  postalcode,
  zoneName,
  cityName,
  enrichment,
}: PostalCodeFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const localProblems = enrichment?.problemasLocales[profession.id]
  const municipioName = enrichment?.municipio || zoneName

  // Base FAQs - always shown
  const baseFaqs = [
    {
      question: `¿Cuánto cuesta un ${profession.name.toLowerCase()} en ${municipioName} (${postalcode})?`,
      answer: `El precio de un ${profession.name.toLowerCase()} en ${municipioName} depende del tipo de servicio. Los precios empiezan desde 39€ para servicios básicos. Ofrecemos presupuesto GRATIS y sin compromiso para el código postal ${postalcode}. Llámanos al 936 946 639 para un presupuesto personalizado.`,
    },
    {
      question: `¿Cuánto tarda en llegar un ${profession.name.toLowerCase()} al ${postalcode}?`,
      answer: enrichment
        ? `Nuestros ${profession.namePlural.toLowerCase()} llegan en un maximo de 30 minutos a cualquier punto del codigo postal ${postalcode} en ${municipioName}. ${enrichment.tipoZona === "urbana" ? "Al ser zona urbana, la cobertura es optima y normalmente llegamos en menos de 20 minutos." : enrichment.tipoZona === "rural" ? "Aunque es una zona rural, tenemos tecnicos distribuidos estrategicamente para llegar rapido." : "Tenemos profesionales distribuidos por toda la zona para garantizar una respuesta rapida."}`
        : `Nuestros ${profession.namePlural.toLowerCase()} llegan en un maximo de 30 minutos a cualquier punto del codigo postal ${postalcode} (${zoneName}). Tenemos profesionales distribuidos por toda la zona de ${cityName} para garantizar una respuesta rapida.`,
    },
    {
      question: `¿Hay ${profession.namePlural.toLowerCase()} 24 horas en ${municipioName}?`,
      answer: `Sí, tenemos ${profession.namePlural.toLowerCase()} disponibles las 24 horas del día, los 7 días de la semana en ${municipioName} y todo el código postal ${postalcode}. Trabajamos noches, fines de semana y festivos sin recargo adicional.`,
    },
    {
      question: `¿Los ${profession.namePlural.toLowerCase()} del ${postalcode} están certificados?`,
      answer: `Sí, todos nuestros ${profession.namePlural.toLowerCase()} que trabajan en ${municipioName} (${postalcode}) están certificados y cuentan con años de experiencia. Además, ofrecemos garantía en todos nuestros trabajos realizados en ${cityName}.`,
    },
  ]

  // Local-specific FAQs - only shown when we have enrichment data
  const localFaqs: { question: string; answer: string }[] = []

  if (enrichment) {
    // FAQ about local problems
    if (localProblems && localProblems.length > 0) {
      localFaqs.push({
        question: `¿Cuáles son los problemas mas comunes de ${profession.name.toLowerCase()} en ${municipioName}?`,
        answer: `En ${municipioName} (${postalcode}), los problemas más frecuentes que atendemos son: ${localProblems.slice(0, 3).map(p => p.charAt(0).toLowerCase() + p.slice(1).replace(/\.$/, '')).join('; ')}. Nuestros técnicos conocen estas problemáticas específicas de la zona y llegan preparados con el material adecuado.`,
      })
    }

    // FAQ about infrastructure
    localFaqs.push({
      question: `¿Qué tipo de edificios hay en la zona ${postalcode} de ${municipioName}?`,
      answer: enrichment.infraestructura,
    })

    // FAQ about coverage/barrios
    if (enrichment.barriosZonas && enrichment.barriosZonas.length > 0) {
      localFaqs.push({
        question: `¿Qué barrios cubren en el código postal ${postalcode}?`,
        answer: `Cubrimos todas las zonas del código postal ${postalcode} en ${municipioName}: ${enrichment.barriosZonas.join(", ")}. Nuestros ${profession.namePlural.toLowerCase()} están estratégicamente ubicados para llegar en un máximo de 30 minutos a cualquier punto de estas zonas.`,
      })
    }

    // FAQ about climate impact
    if (enrichment.clima) {
      localFaqs.push({
        question: `¿El clima de ${municipioName} afecta a las instalaciones?`,
        answer: `Si. ${municipioName} tiene un clima ${enrichment.clima.toLowerCase()}. Esto influye directamente en el tipo de averias que atendemos. ${enrichment.datosUnicos[0] || ""} Nuestros tecnicos conocen estas condiciones y llegan preparados con el material especifico para la zona.`,
      })
    }
  }

  // Always add generic contact FAQ at the end
  const contactFaq = {
    question: `¿Cómo contactar con un ${profession.name.toLowerCase()} urgente en ${postalcode}?`,
    answer: `Para contactar con un ${profession.name.toLowerCase()} urgente en el codigo postal ${postalcode}, llama al 936 946 639. Estamos disponibles 24/7 y un profesional estara en tu domicilio de ${municipioName} en un maximo de 30 minutos.`,
  }

  const faqs = [...baseFaqs, ...localFaqs, contactFaq]

  return (
    <section className="py-16 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Preguntas frecuentes sobre {profession.namePlural.toLowerCase()}
            <span className="text-emerald-600"> en {postalcode}</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Todo lo que necesitas saber sobre nuestro servicio en {zoneName}
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden bg-background hover:border-emerald-500/50 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
              >
                <span className="font-medium text-sm sm:text-base">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
