"use client"

import { 
  Euro, 
  Info, 
  CheckCircle2, 
  AlertCircle,
  Phone,
  Clock,
  TrendingUp,
  Shield
} from "lucide-react"

interface PriceRange {
  service: string
  description: string
  minPrice: number
  maxPrice: number
  factors: string[]
  included: string[]
  urgentSurcharge?: string
}

// Guias de precios reales y transparentes por profesion
const PRICING_GUIDES: Record<string, {
  introduction: string
  priceRanges: PriceRange[]
  pricingFactors: string[]
  whatAffectsPrice: string[]
  transparencyCommitment: string
  noHiddenCosts: string[]
}> = {
  electricista: {
    introduction: "Los precios de un electricista varian segun el tipo de trabajo, la complejidad, los materiales necesarios y la hora del servicio. Aqui te presentamos una guia orientativa de precios basada en miles de servicios realizados. Recuerda que siempre damos presupuesto cerrado antes de empezar cualquier trabajo.",
    priceRanges: [
      {
        service: "Reparacion de enchufe o interruptor",
        description: "Sustitucion de mecanismo danado o que no funciona correctamente",
        minPrice: 40,
        maxPrice: 80,
        factors: ["Tipo de mecanismo (basico o de diseno)", "Accesibilidad del punto"],
        included: ["Mano de obra", "Mecanismo estandar", "Comprobacion de funcionamiento"]
      },
      {
        service: "Localizacion y reparacion de averia",
        description: "Diagnostico de problema electrico y solucion del mismo",
        minPrice: 60,
        maxPrice: 150,
        factors: ["Tiempo de diagnostico", "Complejidad de la averia", "Materiales necesarios"],
        included: ["Diagnostico profesional", "Reparacion", "Verificacion del sistema"]
      },
      {
        service: "Sustitucion de diferencial",
        description: "Cambio del interruptor diferencial del cuadro electrico",
        minPrice: 90,
        maxPrice: 160,
        factors: ["Amperaje del diferencial", "Tipo (estandar o superinmunizado)"],
        included: ["Diferencial nuevo", "Instalacion", "Pruebas de funcionamiento"]
      },
      {
        service: "Instalacion de punto de luz nuevo",
        description: "Cableado e instalacion de un nuevo punto de iluminacion",
        minPrice: 80,
        maxPrice: 200,
        factors: ["Distancia al cuadro", "Instalacion vista o empotrada", "Tipo de luminaria"],
        included: ["Cableado", "Caja de mecanismo", "Interruptor basico"],
        urgentSurcharge: "Recargo del 25-50% en horario nocturno o festivo"
      },
      {
        service: "Revision de instalacion electrica",
        description: "Inspeccion completa del estado de la instalacion",
        minPrice: 100,
        maxPrice: 200,
        factors: ["Tamano de la vivienda", "Antiguedad de la instalacion"],
        included: ["Informe detallado", "Mediciones de aislamiento", "Recomendaciones"]
      },
      {
        service: "Boletin electrico (CIE)",
        description: "Certificado de Instalacion Electrica oficial",
        minPrice: 150,
        maxPrice: 300,
        factors: ["Necesidad de adaptaciones previas", "Complejidad de la instalacion"],
        included: ["Inspeccion oficial", "Certificado tramitado", "Sello de instalador autorizado"]
      }
    ],
    pricingFactors: [
      "Horario del servicio: laborable (sin recargo), nocturno (25-50%), festivo (25-50%)",
      "Urgencia: servicio programado vs emergencia inmediata",
      "Materiales: calidad estandar vs premium, cantidad necesaria",
      "Accesibilidad: instalacion vista y accesible vs empotrada o de dificil acceso",
      "Zona geografica: urbana vs rural o de dificil acceso"
    ],
    whatAffectsPrice: [
      "El diagnostico puede revelar problemas adicionales que afectan al presupuesto inicial",
      "Las instalaciones antiguas suelen requerir mas tiempo y materiales",
      "Los trabajos en altura o espacios reducidos pueden tener recargo",
      "La necesidad de materiales especiales o de importacion aumenta el coste"
    ],
    transparencyCommitment: "Siempre damos presupuesto cerrado ANTES de comenzar cualquier trabajo. El presupuesto detalla mano de obra, materiales y cualquier otro coste. Si durante el trabajo descubrimos algo que cambie significativamente el presupuesto, paramos y te consultamos. Nunca cobramos mas de lo presupuestado sin tu autorizacion expresa.",
    noHiddenCosts: [
      "No cobramos desplazamiento en zona urbana",
      "No hay coste extra por materiales basicos (cables, regletas, etc.)",
      "El IVA siempre esta incluido en el presupuesto final",
      "No hay recargos sorpresa al finalizar el trabajo"
    ]
  },
  fontanero: {
    introduction: "El coste de un servicio de fontaneria depende del tipo de trabajo, la urgencia, los materiales y la hora del servicio. A continuacion te mostramos precios orientativos basados en nuestra experiencia. Recuerda: siempre presupuestamos antes de empezar.",
    priceRanges: [
      {
        service: "Reparacion de grifo que gotea",
        description: "Cambio de juntas o cartucho interior",
        minPrice: 35,
        maxPrice: 70,
        factors: ["Tipo de grifo (monomando, bimando, termostatico)", "Marca y disponibilidad de recambios"],
        included: ["Mano de obra", "Juntas o cartucho estandar", "Verificacion"]
      },
      {
        service: "Desatasco basico",
        description: "Desatasco de lavabo, ducha o fregadero",
        minPrice: 50,
        maxPrice: 100,
        factors: ["Gravedad del atasco", "Accesibilidad del desague"],
        included: ["Desatasco mecanico", "Limpieza de sifon si necesario", "Comprobacion de flujo"]
      },
      {
        service: "Reparacion de cisterna",
        description: "Sustitucion de mecanismo de cisterna WC",
        minPrice: 60,
        maxPrice: 120,
        factors: ["Tipo de cisterna (empotrada o exterior)", "Mecanismo completo o parcial"],
        included: ["Mecanismo nuevo", "Instalacion", "Ajuste de flotador y descarga"]
      },
      {
        service: "Localizacion de fuga",
        description: "Deteccion de fuga oculta con equipos especializados",
        minPrice: 80,
        maxPrice: 200,
        factors: ["Complejidad de la instalacion", "Necesidad de equipos especiales"],
        included: ["Diagnostico", "Localizacion precisa", "Informe para seguro si necesario"],
        urgentSurcharge: "Recargo del 30-50% en urgencias nocturnas"
      },
      {
        service: "Sustitucion de grifo completo",
        description: "Desmontaje de grifo antiguo e instalacion de nuevo",
        minPrice: 60,
        maxPrice: 100,
        factors: ["Tipo de instalacion", "Accesibilidad"],
        included: ["Desmontaje", "Instalacion", "Conexiones y sellado"],
        urgentSurcharge: "Grifo no incluido en el precio"
      },
      {
        service: "Revision de calentador de gas",
        description: "Mantenimiento anual obligatorio",
        minPrice: 70,
        maxPrice: 120,
        factors: ["Marca y modelo", "Estado general del equipo"],
        included: ["Limpieza de quemadores", "Verificacion de llama", "Certificado"]
      }
    ],
    pricingFactors: [
      "Urgencia: emergencias de agua tienen recargo por disponibilidad inmediata",
      "Hora del servicio: nocturno y festivos con recargo del 30-50%",
      "Tipo de trabajo: visible y accesible vs empotrado (requiere romper y reparar)",
      "Materiales: tuberia estandar vs especial, griferia basica vs de diseno",
      "Necesidad de equipos especiales: camara termografica, detector de fugas, etc."
    ],
    whatAffectsPrice: [
      "Fugas ocultas pueden requerir romper para acceder, lo que aumenta el coste",
      "Instalaciones antiguas con tuberias de plomo requieren sustitucion completa",
      "Calentadores muy antiguos pueden no tener repuestos disponibles",
      "Trabajos en banos completos son mas economicos por unidad que puntuales"
    ],
    transparencyCommitment: "El presupuesto que te damos es cerrado y definitivo. Solo cambia si al abrir encontramos algo completamente imprevisto, y en ese caso paramos y te consultamos. Nunca continuamos sin tu autorizacion.",
    noHiddenCosts: [
      "Desplazamiento gratuito en zona de cobertura",
      "Material basico (juntas, teflon, selladores) incluido",
      "IVA siempre incluido en precio final",
      "Sin recargos sorpresa por limpieza de zona de trabajo"
    ]
  },
  cerrajero: {
    introduction: "Los precios de cerrajeria dependen principalmente del tipo de cerradura, el metodo de apertura necesario y la hora del servicio. Siempre informamos del precio antes de intervenir. Desconfia de precios extremadamente bajos por telefono: suelen aumentar al llegar.",
    priceRanges: [
      {
        service: "Apertura de puerta estandar",
        description: "Apertura sin danos de cerradura convencional",
        minPrice: 60,
        maxPrice: 120,
        factors: ["Tipo de cerradura", "Hora del servicio"],
        included: ["Apertura no destructiva", "Sin danos en puerta ni cerradura"]
      },
      {
        service: "Apertura de puerta blindada",
        description: "Apertura de puerta blindada o de seguridad",
        minPrice: 100,
        maxPrice: 200,
        factors: ["Nivel de seguridad de la cerradura", "Numero de puntos de anclaje"],
        included: ["Tecnicas especializadas", "Sin danos si es posible"]
      },
      {
        service: "Cambio de bombin estandar",
        description: "Sustitucion del cilindro de la cerradura",
        minPrice: 60,
        maxPrice: 100,
        factors: ["Longitud del bombin", "Marca"],
        included: ["Bombin nuevo de calidad media", "3 llaves", "Instalacion"]
      },
      {
        service: "Cambio de bombin de seguridad",
        description: "Instalacion de cilindro antibumping de alta seguridad",
        minPrice: 100,
        maxPrice: 200,
        factors: ["Marca (Keso, Mul-T-Lock, etc.)", "Nivel de seguridad"],
        included: ["Bombin certificado", "Llaves de seguridad", "Tarjeta de propiedad"],
        urgentSurcharge: "Disponible para instalacion inmediata"
      },
      {
        service: "Instalacion de cerradura multipunto",
        description: "Cerradura con varios puntos de anclaje",
        minPrice: 200,
        maxPrice: 400,
        factors: ["Numero de puntos", "Marca y modelo", "Tipo de puerta"],
        included: ["Cerradura", "Instalacion completa", "Ajustes"]
      },
      {
        service: "Apertura de caja fuerte",
        description: "Apertura de caja fuerte bloqueada",
        minPrice: 150,
        maxPrice: 350,
        factors: ["Tipo de caja fuerte", "Sistema de cierre", "Tamano"],
        included: ["Apertura", "Dejarla operativa si es posible"]
      }
    ],
    pricingFactors: [
      "Hora del servicio: diurno laborable, nocturno (recargo 30-50%), festivo (recargo 30-50%)",
      "Tipo de cerradura: estandar, seguridad media, alta seguridad",
      "Metodo de apertura: no destructivo (mas tiempo) vs destructivo (mas rapido pero requiere sustitucion)",
      "Tipo de puerta: estandar, blindada, acorazada",
      "Necesidad de material posterior: cambio de cerradura tras apertura"
    ],
    whatAffectsPrice: [
      "Cerraduras de alta seguridad requieren mas tiempo y tecnicas especiales",
      "Puertas muy antiguas pueden tener cerraduras sin repuestos disponibles",
      "Intentos previos de apertura pueden haber danado el mecanismo",
      "Ubicacion: emergencias en zonas rurales o de dificil acceso"
    ],
    transparencyCommitment: "Te informamos del precio ANTES de tocar la cerradura. El precio incluye todo: apertura, bombin nuevo si es necesario, y garantia. Si hay algun imprevisto (cerradura danada, puerta especial), te lo comunicamos antes de continuar.",
    noHiddenCosts: [
      "El precio que damos por telefono es orientativo pero realista",
      "No cobramos 'tasa de urgencia' oculta al llegar",
      "Desplazamiento incluido en el precio final",
      "No hay extra por trabajar de noche o festivos no anunciado previamente"
    ]
  },
  desatascos: {
    introduction: "El precio de un desatasco depende de la ubicacion del atasco, su gravedad y el metodo necesario para solucionarlo. Los atascos simples tienen precios muy asequibles, mientras que atascos severos que requieren camion cuba son mas costosos pero definitivos.",
    priceRanges: [
      {
        service: "Desatasco de lavabo o ducha",
        description: "Atasco simple en punto individual",
        minPrice: 50,
        maxPrice: 80,
        factors: ["Gravedad del atasco", "Accesibilidad"],
        included: ["Desatasco mecanico", "Limpieza de sifon", "Verificacion de flujo"]
      },
      {
        service: "Desatasco de WC",
        description: "Atasco en inodoro",
        minPrice: 60,
        maxPrice: 120,
        factors: ["Causa del atasco", "Ubicacion de la obstruccion"],
        included: ["Desatasco", "Limpieza de zona", "Comprobacion"]
      },
      {
        service: "Desatasco de bajante",
        description: "Atasco en tuberia vertical de edificio",
        minPrice: 120,
        maxPrice: 250,
        factors: ["Longitud del bajante", "Gravedad del atasco"],
        included: ["Desatasco con equipo mecanico o agua a presion", "Comprobacion"],
        urgentSurcharge: "Urgencias con recargo del 30-50%"
      },
      {
        service: "Desatasco con camion cuba",
        description: "Limpieza con agua a alta presion y succion",
        minPrice: 200,
        maxPrice: 400,
        factors: ["Duracion de la intervencion", "Volumen de residuos", "Accesibilidad"],
        included: ["Desplazamiento de camion", "Limpieza completa", "Succion de residuos"]
      },
      {
        service: "Limpieza de arqueta",
        description: "Vaciado y limpieza de arqueta de aguas residuales",
        minPrice: 150,
        maxPrice: 300,
        factors: ["Tamano de la arqueta", "Cantidad de residuos"],
        included: ["Vaciado", "Limpieza con agua a presion", "Comprobacion de flujo"]
      },
      {
        service: "Inspeccion con camara",
        description: "Diagnostico visual del interior de las tuberias",
        minPrice: 100,
        maxPrice: 200,
        factors: ["Longitud de tuberia a inspeccionar", "Accesibilidad"],
        included: ["Inspeccion completa", "Video del estado", "Informe"]
      }
    ],
    pricingFactors: [
      "Ubicacion del atasco: accesible (lavabo) vs inaccesible (bajante, arqueta)",
      "Gravedad: parcial vs total, reciente vs cronificado",
      "Metodo: manual, mecanico, agua a presion, camion cuba",
      "Urgencia: programado vs emergencia (WC unico atascado = urgente)",
      "Acceso: vivienda individual vs comunidad de vecinos"
    ],
    whatAffectsPrice: [
      "Atascos cronicos requieren limpieza mas exhaustiva",
      "Tuberias antiguas o en mal estado pueden complicar la intervencion",
      "Atascos por objetos solidos (juguetes, toallitas) son mas dificiles",
      "Necesidad de reparar tuberias danadas por el atasco"
    ],
    transparencyCommitment: "Evaluamos el atasco antes de presupuestar. El precio incluye resolver el problema, no 'intentar' resolverlo. Si vemos que el trabajo es mas complejo de lo esperado, te informamos antes de continuar con el nuevo presupuesto.",
    noHiddenCosts: [
      "Desplazamiento incluido en zona de cobertura",
      "El precio del camion cuba es por servicio, no por tiempo",
      "Material de limpieza y desinfeccion incluido",
      "IVA siempre incluido en precio final"
    ]
  },
  calderas: {
    introduction: "Los precios de servicios de calderas varian segun el tipo de intervencion (revision, reparacion o instalacion), la marca y modelo, y los repuestos necesarios. La revision anual obligatoria tiene precio cerrado. Las reparaciones se presupuestan tras el diagnostico.",
    priceRanges: [
      {
        service: "Revision anual obligatoria",
        description: "Mantenimiento preventivo con certificado oficial",
        minPrice: 80,
        maxPrice: 120,
        factors: ["Marca y modelo de caldera", "Accesibilidad"],
        included: ["Limpieza de quemadores", "Analisis de combustion", "Verificacion de seguridades", "Certificado oficial"]
      },
      {
        service: "Reparacion basica",
        description: "Averias simples: valvulas, presostatos, sensores",
        minPrice: 80,
        maxPrice: 180,
        factors: ["Tipo de pieza", "Disponibilidad de repuesto"],
        included: ["Diagnostico", "Pieza nueva", "Mano de obra", "Pruebas"]
      },
      {
        service: "Sustitucion de intercambiador",
        description: "Cambio del intercambiador de calor",
        minPrice: 250,
        maxPrice: 500,
        factors: ["Marca y modelo", "Tipo de intercambiador"],
        included: ["Pieza nueva original o compatible", "Instalacion", "Puesta en marcha"],
        urgentSurcharge: "Pieza puede requerir pedido de 24-48h"
      },
      {
        service: "Sustitucion de placa electronica",
        description: "Cambio de la placa de control de la caldera",
        minPrice: 200,
        maxPrice: 450,
        factors: ["Marca", "Disponibilidad (algunas requieren programacion)"],
        included: ["Placa nueva", "Programacion si necesaria", "Puesta en marcha"]
      },
      {
        service: "Cambio de caldera completo",
        description: "Sustitucion de caldera antigua por una nueva",
        minPrice: 1800,
        maxPrice: 3500,
        factors: ["Tipo de caldera (convencional, condensacion)", "Potencia", "Marca"],
        included: ["Caldera nueva", "Desmontaje de antigua", "Instalacion", "Puesta en marcha", "Tramites"]
      },
      {
        service: "Purgado y equilibrado de radiadores",
        description: "Optimizacion del sistema de calefaccion",
        minPrice: 60,
        maxPrice: 150,
        factors: ["Numero de radiadores", "Estado del circuito"],
        included: ["Purgado de todos los radiadores", "Equilibrado", "Ajuste de presion"]
      }
    ],
    pricingFactors: [
      "Marca de caldera: algunas marcas tienen repuestos mas caros o dificiles de conseguir",
      "Antiguedad: calderas de mas de 15 anos pueden no tener repuestos",
      "Urgencia: sin calefaccion en invierno = servicio prioritario",
      "Accesibilidad: calderas en ubicaciones complicadas requieren mas tiempo",
      "Necesidad de desplazamientos multiples si hay que pedir piezas"
    ],
    whatAffectsPrice: [
      "El diagnostico puede revelar multiples piezas danadas",
      "Calderas muy antiguas pueden necesitar adaptaciones",
      "La epoca del ano afecta a la disponibilidad (invierno = mayor demanda)",
      "Circuitos de calefaccion con lodos requieren limpieza adicional"
    ],
    transparencyCommitment: "La revision tiene precio cerrado. Para reparaciones, primero diagnosticamos y luego presupuestamos. Si la reparacion no es viable economicamente (coste superior al 50% de una caldera nueva), te lo decimos claramente y asesoramos sobre sustitucion.",
    noHiddenCosts: [
      "Revision anual: precio cerrado todo incluido",
      "Diagnostico: se descuenta del precio si aceptas la reparacion",
      "Repuestos: precio de catalogo sin sobreprecios",
      "Instalacion de caldera nueva: precio cerrado con todo incluido"
    ]
  }
}

interface PricingGuideSectionProps {
  professionId: string
  professionName: string
  cityName: string
}

export function PricingGuideSection({ professionId, professionName, cityName }: PricingGuideSectionProps) {
  const guide = PRICING_GUIDES[professionId] || PRICING_GUIDES.electricista
  const phoneNumber = "936946639"

  const handleCall = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      ;(window as any).gtag("event", "conversion", {
        send_to: "AW-16741652529/YiAVCI7M1NkbELGwha8-",
        value: 20.0,
        currency: "EUR",
      })
    }
  }

  return (
    <section className="py-16 bg-muted/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
            <Euro className="w-4 h-4" />
            <span>Guia de precios orientativos</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Cuanto cuesta un {professionName.toLowerCase()} en {cityName}?
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            {guide.introduction}
          </p>
        </div>

        {/* Price Table */}
        <div className="mb-12 overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-foreground text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Servicio</th>
                  <th className="px-6 py-4 text-left font-semibold hidden md:table-cell">Descripcion</th>
                  <th className="px-6 py-4 text-center font-semibold">Precio orientativo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {guide.priceRanges.map((item, index) => (
                  <tr key={index} className="bg-background hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-foreground">{item.service}</div>
                      <div className="text-sm text-muted-foreground md:hidden mt-1">{item.description}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground hidden md:table-cell">
                      {item.description}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="font-bold text-foreground text-lg">
                        {item.minPrice} - {item.maxPrice} EUR
                      </div>
                      {item.urgentSurcharge && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.urgentSurcharge}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Price Info */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* What Affects Price */}
          <div className="p-6 rounded-2xl border border-border bg-background">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground">Factores que afectan al precio</h3>
            </div>
            <ul className="space-y-3">
              {guide.pricingFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Info className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Consider */}
          <div className="p-6 rounded-2xl border border-border bg-background">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="font-bold text-foreground">Ten en cuenta que...</h3>
            </div>
            <ul className="space-y-3">
              {guide.whatAffectsPrice.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Transparency Section */}
        <div className="p-8 rounded-2xl bg-foreground text-white mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8" />
                <h3 className="text-xl font-bold">Nuestro compromiso de transparencia</h3>
              </div>
              <p className="text-white/80 leading-relaxed mb-6">
                {guide.transparencyCommitment}
              </p>
              <a
                href={`tel:+34${phoneNumber}`}
                onClick={handleCall}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-foreground font-bold rounded-xl hover:bg-white/90 transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Pide presupuesto gratis</span>
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Sin costes ocultos</h4>
              <ul className="space-y-3">
                {guide.noHiddenCosts.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-white/90">
                    <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            * Precios orientativos basados en miles de servicios realizados. El precio final depende de las 
            caracteristicas especificas de cada trabajo. Siempre damos presupuesto cerrado antes de comenzar.
          </p>
        </div>
      </div>
    </section>
  )
}
