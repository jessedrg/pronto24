"use client"

import { 
  Zap, 
  Droplets, 
  Key, 
  Waves, 
  Flame,
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
  Star,
  AlertTriangle,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

interface ServiceArticle {
  id: string
  name: string
  icon: React.ElementType
  color: string
  bgColor: string
  introduction: string
  whyChooseUs: string[]
  commonProblems: { name: string; description: string; urgent: boolean }[]
  expertTips: string[]
  serviceProcess: string[]
  coverage: string
  priceRange: string
}

const serviceArticles: ServiceArticle[] = [
  {
    id: "electricista",
    name: "Electricista",
    icon: Zap,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    introduction: "El servicio de electricista urgente de pronto-24.com esta disponible las 24 horas del dia, los 7 dias de la semana, para resolver cualquier emergencia electrica en tu hogar o negocio. Nuestros electricistas certificados cuentan con años de experiencia y las herramientas mas avanzadas para diagnosticar y reparar cualquier averia de forma rapida y segura. Desde apagones totales hasta problemas con el diferencial, pasando por instalaciones nuevas y certificados electricos, cubrimos todas las necesidades electricas con profesionalidad y garantia.",
    whyChooseUs: [
      "Electricistas con carnet oficial de instalador autorizado",
      "Equipados con herramientas de diagnostico profesional (megohmetros, pinzas amperimetricas)",
      "Conocemos la normativa REBT vigente y trabajamos segun sus especificaciones",
      "Emitimos boletines electricos oficiales cuando es necesario",
      "Llegada garantizada en menos de 30 minutos en zonas urbanas",
      "Presupuesto cerrado antes de empezar cualquier trabajo"
    ],
    commonProblems: [
      { name: "Apagon total o parcial", description: "Cuando parte o toda la vivienda se queda sin luz. Puede deberse a problemas en el cuadro, en la instalacion o en la red general.", urgent: true },
      { name: "Diferencial que salta", description: "El diferencial salta para protegerte de fugas de corriente. Si salta repetidamente, hay un problema que debe localizarse.", urgent: true },
      { name: "Cortocircuitos y chispazos", description: "Cables danados, conexiones sueltas o enchufes defectuosos pueden causar cortocircuitos peligrosos.", urgent: true },
      { name: "Enchufes sin corriente", description: "Uno o varios enchufes dejan de funcionar mientras el resto de la instalacion funciona normalmente.", urgent: false },
      { name: "Cuadro electrico antiguo", description: "Instalaciones de mas de 25 años con fusibles en lugar de magnetotermicos necesitan actualizacion.", urgent: false },
      { name: "Necesidad de boletin electrico", description: "Documento oficial necesario para dar de alta la luz, aumentar potencia o vender/alquilar.", urgent: false }
    ],
    expertTips: [
      "Nunca intentes reparaciones electricas sin conocimientos: el riesgo de electrocucion es real",
      "Prueba el boton de test del diferencial una vez al mes para verificar que funciona",
      "No sobrecargues regletas con muchos aparatos de alto consumo simultaneamente",
      "Si hueles a quemado o ves humo en algun punto electrico, corta la luz y llama urgentemente"
    ],
    serviceProcess: [
      "Recibimos tu llamada y evaluamos la urgencia de la averia",
      "El electricista mas cercano sale hacia tu ubicacion inmediatamente",
      "Realizamos un diagnostico completo con equipos profesionales",
      "Te explicamos el problema y te damos presupuesto cerrado",
      "Procedemos con la reparacion tras tu aprobacion",
      "Verificamos el funcionamiento y te entregamos garantia por escrito"
    ],
    coverage: "Servicio disponible en toda España: Madrid, Barcelona, Valencia, Sevilla, Zaragoza, Malaga, Murcia, Bilbao, Alicante, Cordoba y mas de 500 ciudades.",
    priceRange: "Desde 40€ para reparaciones simples hasta 300€+ para trabajos complejos o boletines. Siempre presupuesto cerrado antes de empezar."
  },
  {
    id: "fontanero",
    name: "Fontanero",
    icon: Droplets,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    introduction: "Nuestro servicio de fontaneria urgente atiende cualquier emergencia relacionada con el agua las 24 horas. Una fuga de agua puede causar danos graves en pocas horas, por eso respondemos con la maxima rapidez. Nuestros fontaneros profesionales solucionan fugas, atascos, problemas con calentadores, instalacion de sanitarios y cualquier otra necesidad de fontaneria. Utilizamos equipos avanzados de deteccion de fugas para localizar problemas ocultos sin necesidad de romper innecesariamente.",
    whyChooseUs: [
      "Fontaneros con formacion profesional y años de experiencia",
      "Equipos de deteccion de fugas por ultrasonidos y termografia",
      "Furgonetas equipadas con material para resolver la mayoria de averias en una visita",
      "Trabajamos con todas las marcas de sanitarios y griferias",
      "Servicio de urgencias de agua prioritario por el riesgo de danos",
      "Garantia de 12 meses en todas las reparaciones"
    ],
    commonProblems: [
      { name: "Fuga de agua visible u oculta", description: "Goteos, charcos o humedades que indican una perdida de agua que debe localizarse y repararse.", urgent: true },
      { name: "Tuberia rota o reventada", description: "Rotura de tuberia por presion, helada o antiguedad que causa una salida masiva de agua.", urgent: true },
      { name: "Atasco grave en WC o fregadero", description: "Obstruccion que impide el uso normal del sanitario o desague.", urgent: true },
      { name: "Sin agua caliente", description: "El calentador o termo no funciona correctamente y no produce agua caliente.", urgent: false },
      { name: "Grifo que gotea", description: "Goteo constante que desperdicia agua y puede indicar desgaste de componentes.", urgent: false },
      { name: "Humedad en paredes o techos", description: "Manchas de humedad que pueden indicar fugas ocultas en tuberias empotradas.", urgent: false }
    ],
    expertTips: [
      "Conoce donde esta la llave de paso general de tu casa y comprueba que funciona",
      "Nunca viertas aceite de cocina por el fregadero: solidifica y causa atascos graves",
      "Cierra la llave de paso si te vas de vacaciones para evitar inundaciones",
      "Revisa periodicamente bajo los muebles del bano y cocina en busca de humedades"
    ],
    serviceProcess: [
      "Llamada de emergencia atendida de inmediato",
      "Te damos indicaciones para minimizar danos mientras llega el fontanero",
      "El tecnico llega con equipamiento completo para diagnostico y reparacion",
      "Localizamos el problema y te damos presupuesto detallado",
      "Reparamos con materiales de calidad y probamos el funcionamiento",
      "Dejamos la zona limpia y te entregamos garantia del trabajo"
    ],
    coverage: "Cobertura en toda España con especial presencia en areas metropolitanas. Llegamos en menos de 30 minutos a tu domicilio.",
    priceRange: "Reparaciones desde 35€. Deteccion de fugas desde 80€. Instalaciones segun complejidad. Presupuesto siempre antes de empezar."
  },
  {
    id: "cerrajero",
    name: "Cerrajero",
    icon: Key,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    introduction: "El servicio de cerrajeria urgente de pronto-24.com te ayuda cuando mas lo necesitas: cuando te quedas fuera de casa, pierdes las llaves o sufres un intento de robo. Nuestros cerrajeros profesionales utilizan tecnicas de apertura no destructivas siempre que es posible, respetando tu puerta y cerradura. Tambien instalamos cerraduras de seguridad, bombines antibumping y sistemas de proteccion para mejorar la seguridad de tu hogar.",
    whyChooseUs: [
      "Cerrajeros con formacion en tecnicas de apertura no destructiva",
      "Priorizamos abrir sin daños: solo forzamos como ultimo recurso",
      "Trabajamos con las mejores marcas de cerraduras de seguridad",
      "Transparencia total en precios: te informamos antes de intervenir",
      "Respuesta inmediata para emergencias de cierre",
      "Asesoramiento en seguridad para prevenir futuros problemas"
    ],
    commonProblems: [
      { name: "Puerta bloqueada o cerrada", description: "Te has quedado fuera de casa con las llaves dentro o la cerradura no abre.", urgent: true },
      { name: "Llave rota en la cerradura", description: "La llave se ha partido dentro del bombin y no puedes extraerla ni abrir.", urgent: true },
      { name: "Intento de robo con danos", description: "Han intentado forzar tu puerta y la cerradura esta danada.", urgent: true },
      { name: "Cerradura rigida o atascada", description: "La cerradura funciona con dificultad, la llave gira con esfuerzo.", urgent: false },
      { name: "Cambio de cerraduras preventivo", description: "Acabas de mudarte o quieres mejorar la seguridad de tu puerta.", urgent: false },
      { name: "Perdida de llaves", description: "Has perdido las llaves y quieres cambiar el bombin por seguridad.", urgent: false }
    ],
    expertTips: [
      "Deja siempre una copia de llaves con alguien de absoluta confianza",
      "Nunca dejes llaves bajo el felpudo, en macetas o lugares obvios",
      "Lubrica las cerraduras una vez al ano con grafito en polvo (no aceite)",
      "Desconfia de precios muy bajos por telefono: suelen aumentar al llegar"
    ],
    serviceProcess: [
      "Recibimos tu llamada y te informamos del precio orientativo",
      "Un cerrajero sale inmediatamente hacia tu ubicacion",
      "Evaluamos la cerradura y te confirmamos el precio final antes de tocar nada",
      "Procedemos con la apertura usando tecnicas no destructivas",
      "Si es necesario cambiar el bombin, te damos opciones de seguridad",
      "Te entregamos las nuevas llaves y verificamos el correcto funcionamiento"
    ],
    coverage: "Servicio en toda España con tiempos de llegada de 15-30 minutos en zonas urbanas.",
    priceRange: "Aperturas desde 60€. Cambios de bombin desde 60€. Cerraduras de seguridad desde 100€. Precio confirmado antes de intervenir."
  },
  {
    id: "desatascos",
    name: "Desatascos",
    icon: Waves,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    introduction: "El servicio de desatascos urgente de pronto-24.com resuelve cualquier obstruccion en tuberias, desde un simple atasco de lavabo hasta la limpieza completa de bajantes y arquetas con camion cuba. Un WC atascado o un fregadero que no desagua afectan directamente a la habitabilidad de tu hogar, por eso respondemos con la maxima urgencia. Utilizamos diferentes tecnicas segun la gravedad: desatasco mecanico, agua a alta presion y succion con camion cuba.",
    whyChooseUs: [
      "Tecnicos especializados en sistemas de saneamiento",
      "Equipos de agua a alta presion hasta 200 bares",
      "Camion cuba propio para atascos severos y limpieza de fosas",
      "Camaras de inspeccion para ver el interior de las tuberias",
      "Resolvemos el problema, no solo lo aliviamos temporalmente",
      "Limpieza de la zona de trabajo incluida"
    ],
    commonProblems: [
      { name: "WC atascado que no desagua", description: "El inodoro no traga o el agua sube peligrosamente al tirar de la cadena.", urgent: true },
      { name: "Fregadero o lavabo obstruido", description: "El agua se acumula y no baja o lo hace muy lentamente.", urgent: true },
      { name: "Malos olores persistentes", description: "Olor desagradable que sale de los desagues aunque no esten atascados.", urgent: false },
      { name: "Bajante de edificio atascado", description: "Varios vecinos afectados o el agua sale por otros desagues.", urgent: true },
      { name: "Arqueta bloqueada", description: "La arqueta del patio o garaje esta llena y no evacua.", urgent: true },
      { name: "Atasco por raices", description: "Raices de arboles que han penetrado en las tuberias.", urgent: false }
    ],
    expertTips: [
      "Nunca tires toallitas humedas por el WC, aunque digan ser desechables",
      "Usa rejillas en todos los desagues para retener pelos y residuos solidos",
      "Vierte agua caliente por los desagues semanalmente para disolver grasa",
      "No abuses de productos quimicos desatascadores: pueden danar tuberias"
    ],
    serviceProcess: [
      "Evaluamos el atasco por telefono para enviar el equipo adecuado",
      "El tecnico llega con material para desatasco mecanico y/o hidraulico",
      "Diagnosticamos ubicacion y gravedad del atasco",
      "Aplicamos el metodo mas efectivo y menos invasivo",
      "Comprobamos que el flujo es correcto en todos los puntos",
      "Limpiamos la zona y damos recomendaciones de mantenimiento"
    ],
    coverage: "Servicio con camion cuba en principales ciudades. Desatascos puntuales en toda España.",
    priceRange: "Desatascos simples desde 50€. Camion cuba desde 200€. Inspeccion con camara desde 100€."
  },
  {
    id: "calderas",
    name: "Calderas",
    icon: Flame,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    introduction: "El servicio de reparacion de calderas de pronto-24.com mantiene tu hogar con agua caliente y calefaccion durante todo el año. Nuestros tecnicos estan certificados para trabajar con todas las marcas del mercado: Vaillant, Junkers, Saunier Duval, Baxi, Ferroli y muchas mas. Realizamos la revision anual obligatoria, reparaciones de todo tipo y sustitucion de calderas antiguas por modernas calderas de condensacion mas eficientes.",
    whyChooseUs: [
      "Tecnicos con carnet de instalador de gas (categorias A y B)",
      "Formacion especifica de los principales fabricantes",
      "Stock de repuestos originales para las marcas mas comunes",
      "Emitimos el certificado oficial de la revision anual",
      "Asesoramiento honesto sobre reparar vs sustituir",
      "Servicio prioritario para hogares sin calefaccion en invierno"
    ],
    commonProblems: [
      { name: "Caldera que no enciende", description: "La caldera no arranca o se apaga inmediatamente despues de encender.", urgent: true },
      { name: "Sin agua caliente", description: "La caldera funciona pero no produce agua caliente sanitaria.", urgent: true },
      { name: "Olor a gas", description: "Se percibe olor a gas cerca de la caldera o en la cocina.", urgent: true },
      { name: "Ruidos extraños en la caldera", description: "Golpeteos, silbidos o burbujeos anormales durante el funcionamiento.", urgent: false },
      { name: "Caldera que pierde presion", description: "El manometro baja constantemente y hay que rellenar el circuito.", urgent: false },
      { name: "Radiadores que no calientan", description: "Uno o varios radiadores no alcanzan la temperatura adecuada.", urgent: false }
    ],
    expertTips: [
      "Programa la revision anual obligatoria ANTES de que llegue el frio",
      "Purga los radiadores al inicio de cada temporada de calefaccion",
      "Mantén la presion del circuito entre 1 y 1.5 bares",
      "Si hueles a gas, ventila, sal de casa y llama desde fuera"
    ],
    serviceProcess: [
      "Recibimos tu llamada y evaluamos la urgencia de la averia",
      "El tecnico mas cercano con conocimiento de tu marca se desplaza",
      "Realizamos diagnostico completo con equipos de medicion",
      "Te explicamos el problema y las opciones de reparacion",
      "Procedemos con la reparacion usando repuestos de calidad",
      "Verificamos el funcionamiento y seguridad antes de irnos"
    ],
    coverage: "Servicio en toda España. Revision anual y reparaciones en todas las provincias.",
    priceRange: "Revision anual desde 80€. Reparaciones desde 80€ segun pieza. Instalacion de caldera nueva desde 1.800€."
  }
]

export function HomeServiceArticles() {
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
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Servicios de urgencias para el hogar: guias completas
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Informacion detallada sobre cada uno de nuestros servicios de emergencia. 
            Aprende cuando llamar a un profesional, que esperar del servicio y como prevenir problemas futuros.
          </p>
        </div>

        <div className="space-y-16">
          {serviceArticles.map((service, index) => (
            <article 
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              <div className="p-8 lg:p-10 rounded-3xl border border-border bg-muted/10">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
                  <div className={`w-16 h-16 rounded-2xl ${service.bgColor} flex items-center justify-center shrink-0`}>
                    <service.icon className={`w-8 h-8 ${service.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                      {service.name} Urgente 24 Horas: Servicio Profesional
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/10 text-foreground">
                        <Clock className="w-4 h-4" />
                        Disponible 24/7
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/10 text-foreground">
                        <Shield className="w-4 h-4" />
                        Garantia incluida
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-foreground/10 text-foreground">
                        <Star className="w-4 h-4" />
                        4.9/5 valoracion
                      </span>
                    </div>
                  </div>
                  <a
                    href={`tel:+34${phoneNumber}`}
                    onClick={handleCall}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground hover:bg-foreground/90 text-white font-bold rounded-xl transition-all shrink-0"
                  >
                    <Phone className="w-5 h-5" />
                    Llamar ahora
                  </a>
                </div>

                {/* Introduction */}
                <div className="prose max-w-none mb-8">
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {service.introduction}
                  </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                  {/* Left: Why Choose Us */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Por que elegir nuestro servicio de {service.name.toLowerCase()}
                    </h4>
                    <ul className="space-y-3">
                      {service.whyChooseUs.map((reason, i) => (
                        <li key={i} className="flex items-start gap-3 text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-foreground mt-2 shrink-0" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Expert Tips */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-foreground" />
                      Consejos de nuestros expertos
                    </h4>
                    <div className="space-y-3">
                      {service.expertTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
                          <span className="text-foreground font-bold">{i + 1}.</span>
                          <span className="text-muted-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Common Problems */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Problemas mas comunes que solucionamos
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.commonProblems.map((problem, i) => (
                      <div 
                        key={i} 
                        className={`p-4 rounded-xl border ${
                          problem.urgent 
                            ? 'bg-red-500/5 border-red-500/20' 
                            : 'bg-background border-border'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground">{problem.name}</span>
                          {problem.urgent && (
                            <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-500 text-white">
                              URGENTE
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{problem.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Process */}
                <div className="mb-8">
                  <h4 className="text-lg font-bold text-foreground mb-4">
                    Como funciona nuestro servicio de {service.name.toLowerCase()}
                  </h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {service.serviceProcess.map((step, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                        <div className="w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center font-bold shrink-0">
                          {i + 1}
                        </div>
                        <span className="text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Info */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Cobertura</h5>
                    <p className="text-sm text-muted-foreground">{service.coverage}</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">Precios orientativos</h5>
                    <p className="text-sm text-muted-foreground">{service.priceRange}</p>
                  </div>
                </div>

                {/* CTA Link */}
                <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-4 items-center justify-between">
                  <Link
                    href={`/${service.id}`}
                    className="inline-flex items-center gap-2 text-foreground font-medium hover:underline"
                  >
                    Ver servicio completo de {service.name.toLowerCase()}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:+34${phoneNumber}`}
                    onClick={handleCall}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground hover:bg-foreground/90 text-white font-bold rounded-xl transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    936 946 639
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
