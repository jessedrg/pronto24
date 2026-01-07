"use client"

import { useState } from "react"
import { Wrench, Zap, Droplet, Key, Flame, CheckCircle, Star, ChevronDown, ChevronUp, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const services = [
  {
    id: "fontanero",
    icon: Wrench,
    title: "Fontanero Urgente 24h",
    subtitle: "Solución inmediata para fugas, grifos, calderas y problemas de fontanería",
    description:
      "Fontaneros profesionales en toda España. Llegamos en menos de 30 minutos para solucionar fugas, averías y cualquier problema de fontanería.",
    color: "from-blue-500 to-blue-600",
    features: [
      "Reparación de fugas de agua",
      "Grifos y cisternas",
      "Calderas y calentadores",
      "Tuberías y desagües",
      "Instalación de sanitarios",
      "Servicio 24 horas todos los días",
    ],
    benefits: [
      "Respuesta en menos de 30 minutos",
      "Fontaneros certificados",
      "Reparaciones garantizadas",
      "Presupuesto sin compromiso",
    ],
    reviews: [
      {
        name: "Luis M.",
        location: "Madrid",
        rating: 5,
        text: "Fuga de agua en plena madrugada. Llegaron en 20 minutos y pararon la fuga inmediatamente.",
        service: "Fuga urgente",
      },
      {
        name: "Elena C.",
        location: "Barcelona",
        rating: 5,
        text: "Muy profesionales. Arreglaron el grifo de la cocina que llevaba semanas goteando.",
        service: "Reparación grifo",
      },
      {
        name: "Roberto V.",
        location: "Valencia",
        rating: 5,
        text: "La caldera dejó de funcionar en invierno. Vinieron el mismo día y la repararon.",
        service: "Reparación caldera",
      },
    ],
    faqs: [
      {
        q: "¿Qué hago si tengo una fuga de agua?",
        a: "Cierra la llave de paso general inmediatamente. Luego llámanos y llegaremos en menos de 30 minutos.",
      },
      {
        q: "¿Reparan calderas de todas las marcas?",
        a: "Sí, reparamos Vaillant, Junkers, Saunier Duval, Baxi, Roca, etc. Llevamos repuestos originales.",
      },
      {
        q: "¿Tienen garantía las reparaciones?",
        a: "Sí, todas nuestras reparaciones tienen garantía. Si el problema persiste, volvemos sin coste.",
      },
    ],
  },
  {
    id: "electricista",
    icon: Zap,
    title: "Electricista Urgente 24h",
    subtitle: "Solución rápida para averías eléctricas, cortes de luz y problemas eléctricos",
    description:
      "Electricistas profesionales en toda España. Llegamos en menos de 30 minutos para solucionar cualquier problema eléctrico de forma segura.",
    color: "from-yellow-500 to-orange-500",
    features: [
      "Reparación de averías eléctricas",
      "Cuadros eléctricos y diferenciales",
      "Instalación de enchufes e interruptores",
      "Reparación de cortocircuitos",
      "Iluminación y lámparas",
      "Servicio 24 horas todos los días",
    ],
    benefits: [
      "Respuesta en menos de 30 minutos",
      "Electricistas certificados",
      "Trabajo seguro y garantizado",
      "Presupuesto sin compromiso",
    ],
    reviews: [
      {
        name: "Pedro F.",
        location: "Madrid",
        rating: 5,
        text: "Se fue la luz en toda la casa a las 11 de la noche. Llegaron en 25 minutos y solucionaron el problema.",
        service: "Avería eléctrica",
      },
      {
        name: "Carmen D.",
        location: "Barcelona",
        rating: 5,
        text: "Excelente servicio. Necesitaba instalar varios enchufes y lo hicieron perfecto.",
        service: "Instalación enchufes",
      },
      {
        name: "Antonio R.",
        location: "Valencia",
        rating: 5,
        text: "Tuve un cortocircuito y vinieron super rápido. Muy profesional.",
        service: "Reparación cortocircuito",
      },
    ],
    faqs: [
      {
        q: "¿Qué hago si se va la luz en mi casa?",
        a: "Verifica si es un problema general. Si solo afecta a tu casa, llámanos. Llegamos en menos de 30 minutos.",
      },
      {
        q: "¿Son electricistas certificados?",
        a: "Sí, todos nuestros electricistas están certificados con más de 10 años de experiencia.",
      },
      { q: "¿Trabajan los fines de semana?", a: "Sí, estamos disponibles 24/7, incluidos festivos." },
    ],
  },
  {
    id: "desatascos",
    icon: Droplet,
    title: "Desatascos Urgentes 24h",
    subtitle: "Solución inmediata para atascos de tuberías, fregaderos, inodoros y bajantes",
    description:
      "Servicio profesional de desatascos en toda España. Llegamos en menos de 30 minutos con equipos especializados.",
    color: "from-cyan-500 to-blue-500",
    features: [
      "Desatasco de tuberías y bajantes",
      "Desatasco de inodoros y fregaderos",
      "Limpieza de arquetas",
      "Inspección con cámara",
      "Desatasco con camión cuba",
      "Servicio 24 horas todos los días",
    ],
    benefits: [
      "Respuesta en menos de 30 minutos",
      "Profesionales certificados",
      "Equipos de última generación",
      "Presupuesto sin compromiso",
    ],
    reviews: [
      {
        name: "Carlos M.",
        location: "Madrid",
        rating: 5,
        text: "Llegaron en 20 minutos y solucionaron el atasco del inodoro en menos de una hora.",
        service: "Desatasco urgente",
      },
      {
        name: "Ana G.",
        location: "Barcelona",
        rating: 5,
        text: "Tuve un atasco grave un domingo por la noche. Vinieron rapidísimo.",
        service: "Desatasco fregadero",
      },
      {
        name: "Miguel R.",
        location: "Valencia",
        rating: 5,
        text: "El técnico explicó todo el proceso y dejó todo limpio.",
        service: "Desatasco bajantes",
      },
    ],
    faqs: [
      {
        q: "¿Cuánto tiempo tardan en llegar?",
        a: "Nuestro compromiso es llegar en menos de 30 minutos en zonas urbanas.",
      },
      {
        q: "¿Qué tipos de atascos solucionan?",
        a: "Todos: inodoros, fregaderos, duchas, bañeras, bajantes, arquetas y tuberías principales.",
      },
      { q: "¿El presupuesto es gratis?", a: "Sí, totalmente gratis y sin compromiso." },
    ],
  },
  {
    id: "cerrajero",
    icon: Key,
    title: "Cerrajero Urgente 24h",
    subtitle: "Apertura de puertas sin roturas en 15 minutos",
    description:
      "Cerrajeros profesionales en toda España. Llegamos en menos de 15 minutos para abrir tu puerta sin daños.",
    color: "from-purple-500 to-pink-500",
    features: [
      "Apertura de puertas sin roturas",
      "Cambio de cerraduras y bombines",
      "Puertas acorazadas",
      "Cerraduras de seguridad",
      "Duplicado de llaves",
      "Servicio 24 horas todos los días",
    ],
    benefits: [
      "Respuesta en menos de 15 minutos",
      "Cerrajeros certificados",
      "Apertura sin daños",
      "Precios transparentes",
    ],
    reviews: [
      {
        name: "Pedro L.",
        location: "Madrid",
        rating: 5,
        text: "Me quedé fuera de casa a las 2 AM. Llegaron en 12 minutos y abrieron sin romper nada.",
        service: "Apertura urgente",
      },
      {
        name: "María J.",
        location: "Barcelona",
        rating: 5,
        text: "Cambiaron el bombín de mi puerta en 20 minutos. Precio justo.",
        service: "Cambio de bombín",
      },
      {
        name: "José R.",
        location: "Valencia",
        rating: 5,
        text: "Rápidos y eficientes. Abrieron mi puerta sin daños.",
        service: "Apertura de puerta",
      },
    ],
    faqs: [
      { q: "¿Cuánto tarda en llegar el cerrajero?", a: "En emergencias urbanas llegamos en menos de 15 minutos." },
      { q: "¿Rompen la puerta al abrirla?", a: "No, utilizamos técnicas profesionales de apertura sin roturas." },
      { q: "¿Trabajan de noche y festivos?", a: "Sí, estamos disponibles 24/7, incluidos festivos." },
    ],
  },
  {
    id: "calderas",
    icon: Flame,
    title: "Reparación de Calderas 24h",
    subtitle: "Técnicos especializados para reparación y mantenimiento de calderas",
    description:
      "Técnicos certificados en calderas en toda España. Llegamos en menos de 30 minutos para reparar tu caldera.",
    color: "from-red-500 to-orange-500",
    features: [
      "Reparación de calderas de gas",
      "Calderas de gasoil",
      "Mantenimiento preventivo",
      "Revisión oficial",
      "Instalación de calderas nuevas",
      "Servicio 24 horas todos los días",
    ],
    benefits: ["Respuesta en menos de 30 minutos", "Técnicos certificados", "Todas las marcas", "Repuestos originales"],
    reviews: [
      {
        name: "Carlos M.",
        location: "Madrid",
        rating: 5,
        text: "Mi caldera dejó de funcionar en pleno invierno. Vinieron en 25 minutos y la repararon.",
        service: "Reparación caldera",
      },
      {
        name: "Laura G.",
        location: "Barcelona",
        rating: 5,
        text: "Muy profesionales. Hicieron el mantenimiento anual perfectamente.",
        service: "Mantenimiento",
      },
      {
        name: "Miguel A.",
        location: "Valencia",
        rating: 5,
        text: "Rápidos y eficientes. La caldera volvió a funcionar perfectamente.",
        service: "Reparación urgente",
      },
    ],
    faqs: [
      {
        q: "¿Qué marcas de calderas reparan?",
        a: "Reparamos todas: Vaillant, Junkers, Saunier Duval, Baxi, Roca, Ferroli, y más.",
      },
      {
        q: "¿Tienen repuestos disponibles?",
        a: "Sí, nuestros técnicos llevan los repuestos más comunes. Piezas específicas en 24-48h.",
      },
      { q: "¿El presupuesto es gratis?", a: "Sí, el presupuesto es completamente gratuito y sin compromiso." },
    ],
  },
]

export function AllServices() {
  const [expandedService, setExpandedService] = useState<string | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id)
    setExpandedFaq(null)
  }

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 md:space-y-6 mb-12 md:mb-20">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight tracking-tight">
            Todos nuestros servicios
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Profesionales cualificados 24/7 para cualquier emergencia en tu hogar
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className={`overflow-hidden transition-all duration-300 border-2 ${
                expandedService === service.id
                  ? "border-foreground/20 shadow-xl"
                  : "border-transparent hover:border-foreground/10"
              }`}
            >
              {/* Service Header - Always visible */}
              <div className="p-6 md:p-8 cursor-pointer" onClick={() => toggleService(service.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div
                      className={`h-14 w-14 md:h-16 md:w-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center text-white shadow-lg`}
                    >
                      <service.icon className="h-7 w-7 md:h-8 md:w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{service.title}</h3>
                      <p className="text-sm md:text-base text-muted-foreground mt-1">{service.subtitle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <a
                      href="tel:+34711267223"
                      className="hidden md:flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone className="h-4 w-4" />
                      Llamar ahora
                    </a>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
                      {expandedService === service.id ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedService === service.id && (
                <div className="px-6 md:px-8 pb-8 space-y-8 animate-in slide-in-from-top-2 duration-300">
                  <div className="h-px bg-border" />

                  {/* Description */}
                  <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>

                  {/* Features & Benefits Grid */}
                  <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                    {/* Features */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Servicios incluidos</h4>
                      <div className="grid gap-3">
                        {service.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-sm md:text-base">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Benefits */}
                    <div className="space-y-4">
                      <h4 className="font-bold text-lg">Por qué elegirnos</h4>
                      <div className="grid gap-3">
                        {service.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${service.color}`} />
                            <span className="text-sm md:text-base">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Lo que dicen nuestros clientes</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {service.reviews.map((review, i) => (
                        <div key={i} className="bg-muted/50 rounded-xl p-4 space-y-3">
                          <div className="flex items-center gap-1">
                            {[...Array(review.rating)].map((_, j) => (
                              <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">"{review.text}"</p>
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold">{review.name}</span>
                            <span className="text-muted-foreground">{review.location}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQs */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg">Preguntas frecuentes</h4>
                    <div className="space-y-2">
                      {service.faqs.map((faq, i) => {
                        const faqId = `${service.id}-faq-${i}`
                        return (
                          <div key={i} className="border border-border rounded-xl overflow-hidden">
                            <button
                              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleFaq(faqId)
                              }}
                            >
                              <span className="font-medium text-sm md:text-base pr-4">{faq.q}</span>
                              {expandedFaq === faqId ? (
                                <ChevronUp className="h-4 w-4 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-4 w-4 flex-shrink-0" />
                              )}
                            </button>
                            {expandedFaq === faqId && (
                              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed animate-in slide-in-from-top-1 duration-200">
                                {faq.a}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <a
                      href="tel:+34711267223"
                      className="flex-1 flex items-center justify-center gap-2 bg-foreground text-background px-6 py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity"
                    >
                      <Phone className="h-5 w-5" />
                      Llamar ahora
                    </a>
                    <a
                      href="https://wa.me/34711267223?text=Hola!%20Necesito%20ayuda%20urgente"
                      target="_blank"
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors"
                      rel="noreferrer"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
