"use client"

import { 
  Clock, 
  MapPin, 
  Shield, 
  Award,
  CheckCircle2,
  Phone,
  Star,
  Wrench,
  AlertCircle,
  Lightbulb,
  Users,
  TrendingUp
} from "lucide-react"

interface ServiceDeepDiveProps {
  professionId: string
  professionName: string
  cityName: string
  provinceName: string
  regionName: string
}

// Contenido profundo por profesion con datos reales y utiles
const DEEP_DIVE_CONTENT: Record<string, {
  whatWeDo: string
  howWeWork: string
  qualityStandards: string[]
  certifications: string[]
  equipmentUsed: string[]
  serviceAreas: string[]
  responseCommitment: string
  priceTransparency: string
  afterService: string
  localExpertise: string
}> = {
  electricista: {
    whatWeDo: "Nuestro servicio de electricistas cubre todas las necesidades electricas de tu hogar o negocio en la zona. Desde reparaciones urgentes como apagones y cortocircuitos, hasta instalaciones completas, reformas electricas y obtención del boletin electrico. Trabajamos con instalaciones de baja tension para viviendas, locales comerciales, oficinas y pequenas industrias. Realizamos diagnosticos precisos utilizando equipos de medicion profesionales como pinzas amperimetricas, comprobadores de aislamiento, detectores de tension y analizadores de redes.",
    howWeWork: "Cuando recibes nuestra llamada, un tecnico disponible en tu zona se pone en camino inmediatamente, equipado con una furgoneta taller que incluye material para la mayoria de reparaciones habituales. Al llegar, realizamos un diagnostico completo del problema antes de presupuestar. Te explicamos que ocurre, que opciones tienes y cuanto costara cada una. Solo empezamos cuando das tu aprobacion. Trabajamos de forma limpia, protegiendo suelos y muebles, y recogemos todo antes de irnos.",
    qualityStandards: [
      "Todo el cableado instalado cumple normativa UNE y lleva marcado CE",
      "Utilizamos mecanismos de primeras marcas: Simon, Legrand, Schneider, Hager",
      "Las conexiones se realizan con regletas de calidad o empalmes termoretractiles",
      "Comprobamos la instalacion con mediciones de aislamiento y continuidad",
      "Documentamos el trabajo realizado con fotos y descripcion tecnica"
    ],
    certifications: [
      "Electricistas con carnet profesional de instalador autorizado",
      "Certificacion en baja tension categoria basica y especialista",
      "Formacion actualizada en REBT (Reglamento Electrotecnico Baja Tension)",
      "Capacitacion en prevencion de riesgos laborales especifica"
    ],
    equipmentUsed: [
      "Multimetros digitales de precision",
      "Comprobadores de aislamiento (megohmetros)",
      "Pinzas amperimetricas para medicion sin contacto",
      "Detectores de tension y buscapolos",
      "Camaras termograficas para detectar puntos calientes",
      "Equipos de localizacion de cables empotrados"
    ],
    serviceAreas: [
      "Reparacion de averias electricas urgentes",
      "Instalacion y reforma de cuadros electricos",
      "Puntos de luz y enchufes adicionales",
      "Instalacion de aire acondicionado (parte electrica)",
      "Cargadores para vehiculos electricos",
      "Boletines y certificados de instalacion"
    ],
    responseCommitment: "Nuestro compromiso es llegar en menos de 30 minutos en zonas urbanas y menos de 60 minutos en zonas perifericas. Mantenemos tecnicos de guardia las 24 horas del dia, los 365 dias del ano, para atender emergencias electricas que no pueden esperar.",
    priceTransparency: "Damos presupuesto cerrado antes de empezar cualquier trabajo. El presupuesto incluye mano de obra, materiales y garantia. No hay costes ocultos ni sorpresas. Si durante el trabajo descubrimos algo que cambia significativamente el presupuesto, paramos y te consultamos antes de continuar.",
    afterService: "Todos los trabajos incluyen garantia minima de 12 meses en mano de obra. Los materiales tienen ademas la garantia del fabricante. Si surge cualquier problema relacionado con nuestra intervencion, volvemos sin coste adicional. Guardamos registro de cada servicio para futuras consultas.",
    localExpertise: "Conocemos las particularidades de las instalaciones electricas de la zona, desde los edificios historicos con instalaciones antiguas que requieren especial cuidado, hasta las nuevas promociones con instalaciones modernas. Esta experiencia local nos permite diagnosticar y resolver problemas con mayor rapidez."
  },
  fontanero: {
    whatWeDo: "Ofrecemos servicio completo de fontaneria que abarca desde la reparacion de fugas y atascos hasta la instalacion de sanitarios, griferias y sistemas de agua caliente. Trabajamos con todo tipo de tuberias: cobre, PVC, polietileno, multicapa y plomo (para sustitucion). Realizamos deteccion de fugas ocultas con equipos especializados, evitando romper innecesariamente. Instalamos y reparamos calentadores de gas y termos electricos de todas las marcas.",
    howWeWork: "Al recibir tu llamada, evaluamos la urgencia y enviamos al tecnico mas cercano con disponibilidad. Nuestras furgonetas llevan un stock completo de materiales habituales: tuberias, racores, griferias, mecanismos de cisterna, etc. Llegamos, evaluamos el problema, y te damos presupuesto antes de empezar. Trabajamos de forma limpia y ordenada, con especial atencion a no causar danos colaterales ni dejar rastro de nuestra intervencion.",
    qualityStandards: [
      "Tuberias y conexiones homologadas que cumplen normativa sanitaria",
      "Griferias y sanitarios de marcas reconocidas: Roca, Grohe, Hansgrohe, Tres",
      "Sellados con materiales profesionales de larga duracion",
      "Pruebas de presion en todas las reparaciones de tuberias",
      "Verificacion de funcionamiento completo antes de dar por terminado"
    ],
    certifications: [
      "Fontaneros con formacion profesional en instalaciones sanitarias",
      "Certificacion en instalaciones de gas (para trabajos relacionados)",
      "Formacion en deteccion de fugas con equipos especializados",
      "Capacitacion continua en nuevas tecnologias y materiales"
    ],
    equipmentUsed: [
      "Detectores de fugas por ultrasonidos",
      "Camaras termograficas para localizar humedades",
      "Camaras endoscopicas para inspeccion de tuberias",
      "Equipos de congelacion para reparaciones sin cortar agua",
      "Desatascadores mecanicos y electricos",
      "Bombas de prueba de presion"
    ],
    serviceAreas: [
      "Reparacion de fugas visibles y ocultas",
      "Desatascos de todo tipo de desagues",
      "Instalacion y reparacion de sanitarios",
      "Sustitucion de tuberias antiguas",
      "Instalacion de griferias y accesorios",
      "Reparacion de calentadores y termos"
    ],
    responseCommitment: "Las emergencias de agua (fugas, inundaciones) tienen prioridad absoluta. En estos casos, un tecnico sale inmediatamente hacia tu ubicacion. Para servicios programados, ofrecemos cita en 24-48 horas con franjas horarias de 2 horas para que no tengas que esperar todo el dia.",
    priceTransparency: "Presupuesto cerrado y por escrito antes de comenzar. Si durante la reparacion encontramos algo inesperado que afecte al precio, te informamos inmediatamente y decidimos juntos como proceder. Nunca continuamos un trabajo sin tu aprobacion expresa.",
    afterService: "Garantia de 12 meses en mano de obra y funcionamiento correcto. Materiales con garantia del fabricante. Seguimiento post-servicio a las 48 horas para confirmar que todo funciona perfectamente. Atencion para cualquier duda o incidencia posterior.",
    localExpertise: "Conocemos los problemas tipicos de fontaneria en la zona: desde la dureza del agua que afecta a tuberias y electrodomesticos, hasta las caracteristicas de las instalaciones segun la epoca de construccion de los edificios. Este conocimiento local nos permite anticipar problemas y ofrecer soluciones adaptadas."
  },
  cerrajero: {
    whatWeDo: "Servicio integral de cerrajeria que incluye aperturas de emergencia (puertas, vehiculos, cajas fuertes), cambio e instalacion de cerraduras y bombines, reparacion de cerraduras danadas, y mejora de seguridad en puertas y ventanas. Trabajamos con todo tipo de puertas: estandar, blindadas, acorazadas, de seguridad, de garaje y de comercio. Tambien abrimos vehiculos y programamos mandos y llaves.",
    howWeWork: "En emergencias de cierre, salimos inmediatamente hacia tu ubicacion. Siempre intentamos primero metodos de apertura no destructivos, que en la mayoria de casos consiguen abrir sin danar la cerradura ni la puerta. Si es necesario forzar (casos excepcionales), te informamos antes y procedemos solo con tu autorizacion. Tras la apertura, podemos cambiar la cerradura en el momento si lo deseas.",
    qualityStandards: [
      "Cilindros y cerraduras de alta seguridad con certificacion europea",
      "Trabajamos con marcas lideres: Keso, Mul-T-Lock, Fichet, Ezcurra, Tesa",
      "Instalacion profesional que garantiza el correcto funcionamiento",
      "Escudos de seguridad que protegen el cilindro de ataques",
      "Bombines antibumping, antitaladro y antiganzua"
    ],
    certifications: [
      "Cerrajeros con formacion profesional especifica",
      "Capacitacion en tecnicas de apertura no destructiva",
      "Formacion continua en nuevas cerraduras y metodos de seguridad",
      "Conocimiento actualizado de tecnicas de robo para mejor proteccion"
    ],
    equipmentUsed: [
      "Juegos de ganzuas profesionales",
      "Herramientas de impresioning",
      "Extractores de cilindros",
      "Cerrojos de instalacion",
      "Decodificadores para cerraduras especiales",
      "Herramientas para puertas acorazadas"
    ],
    serviceAreas: [
      "Aperturas de emergencia sin danos",
      "Cambio de bombines y cerraduras",
      "Instalacion de cerraduras de seguridad",
      "Reparacion de cerraduras danadas",
      "Cerrojos y pestillos adicionales",
      "Apertura de vehiculos y programacion de llaves"
    ],
    responseCommitment: "Para emergencias de cierre (quedarte fuera de casa), respuesta inmediata con llegada en menos de 20 minutos en zona urbana. Entendemos la urgencia y el estres de estas situaciones y actuamos con la maxima rapidez posible.",
    priceTransparency: "Te informamos del precio antes de empezar. El presupuesto incluye la apertura y, si es necesario, el cambio de cerradura. Sin costes ocultos. Si la situacion es mas compleja de lo esperado, te consultamos antes de continuar.",
    afterService: "Garantia en todas las cerraduras instaladas. Si el trabajo de instalacion presenta algun defecto, lo corregimos sin coste. Asesoramiento gratuito sobre seguridad de tu hogar.",
    localExpertise: "Conocemos los tipos de puertas y cerraduras mas habituales en la zona, los problemas de seguridad especificos de diferentes barrios, y las mejores soluciones para cada tipo de vivienda, desde pisos en edificios antiguos hasta chalets."
  },
  desatascos: {
    whatWeDo: "Servicio profesional de desatascos para todo tipo de obstrucciones: WC, lavabos, duchas, fregaderos, bañeras, bajantes, arquetas y fosas septicas. Utilizamos diferentes tecnicas segun la gravedad y ubicacion del atasco: desatascadores mecanicos, agua a alta presion, y camion cuba para casos severos. Tambien realizamos limpieza preventiva de tuberias y vaciado de fosas septicas.",
    howWeWork: "Evaluamos el atasco para determinar su ubicacion y gravedad. Empezamos siempre con el metodo menos invasivo que pueda funcionar. Para atascos simples usamos desatascadores mecanicos. Para atascos mas severos o en tuberias de dificil acceso, utilizamos agua a presion. El camion cuba se reserva para casos que requieren succion o limpieza a gran escala. Siempre dejamos la zona limpia y comprobamos el correcto funcionamiento.",
    qualityStandards: [
      "Equipos profesionales de alta presion hasta 200 bares",
      "Camiones cuba con bomba de succion de alta capacidad",
      "Camaras de inspeccion para diagnostico visual",
      "Productos biologicos para mantenimiento que no danan tuberias",
      "Tecnicas que respetan la integridad de las instalaciones"
    ],
    certifications: [
      "Tecnicos formados en sistemas de saneamiento",
      "Capacitacion en manejo de equipos de alta presion",
      "Conocimiento de normativa de vertidos y residuos",
      "Formacion en prevencion de riesgos en espacios confinados"
    ],
    equipmentUsed: [
      "Desatascadores mecanicos de diferentes longitudes",
      "Equipos de agua a alta presion con boquillas especializadas",
      "Camion cuba con bomba de succion",
      "Camaras de inspeccion CCTV para tuberias",
      "Detectores de localizacion de tuberias",
      "Equipos de ventilacion para espacios confinados"
    ],
    serviceAreas: [
      "Desatascos de WC, lavabos, duchas y bañeras",
      "Desatascos de fregaderos y electrodomesticos",
      "Limpieza de bajantes de comunidades",
      "Desatasco y limpieza de arquetas",
      "Vaciado de fosas septicas",
      "Inspeccion de tuberias con camara"
    ],
    responseCommitment: "Los atascos de WC tienen prioridad por su impacto en la habitabilidad. Respuesta inmediata con llegada rapida. Para atascos menos urgentes, cita en 24 horas.",
    priceTransparency: "Presupuesto segun tipo y ubicacion del atasco. Los trabajos con camion cuba se presupuestan por unidad de trabajo, no por tiempo. Sin costes ocultos ni extras por material utilizado.",
    afterService: "Garantia de que el atasco queda solucionado. Si vuelve a atascarse en los proximos 30 dias por la misma causa, intervenimos sin coste adicional. Recomendaciones para evitar futuros atascos.",
    localExpertise: "Conocemos las caracteristicas de las redes de saneamiento de la zona, los problemas habituales segun el tipo de edificacion, y las mejores soluciones para cada caso."
  },
  calderas: {
    whatWeDo: "Servicio completo de calderas que incluye la revision obligatoria anual, reparacion de todo tipo de averias, instalacion de calderas nuevas y mantenimiento preventivo. Trabajamos con todas las marcas del mercado: Vaillant, Junkers, Saunier Duval, Baxi, Ferroli, Ariston, Roca y muchas mas. Tambien reparamos termos electricos y sistemas de calefaccion por radiadores.",
    howWeWork: "Para revisiones, acordamos cita en franja horaria comoda para ti. Para averias, evaluamos por telefono la urgencia (sin agua caliente en invierno es prioritario). Al llegar, realizamos diagnostico completo con equipos de medicion profesionales antes de presupuestar. Te explicamos que falla, por que, y cuales son las opciones de reparacion.",
    qualityStandards: [
      "Repuestos originales o de calidad equivalente homologada",
      "Analisis de combustion con valores dentro de normativa",
      "Verificacion de estanqueidad en circuito de gas",
      "Comprobacion de seguridades y elementos de proteccion",
      "Pruebas de funcionamiento completas antes de terminar"
    ],
    certifications: [
      "Tecnicos con carnet de instalador de gas IG-A e IG-B",
      "Certificacion para todas las categorias de gas",
      "Formacion especifica de fabricantes (Vaillant, Junkers, etc.)",
      "Actualizacion continua en nuevas tecnologias de calderas"
    ],
    equipmentUsed: [
      "Analizadores de combustion para control de emisiones",
      "Manometros digitales para verificacion de presiones",
      "Detectores de fugas de gas electronico",
      "Multimetros para comprobaciones electricas",
      "Juegos de llaves y herramientas especificas por marca",
      "Equipos de vacio para trabajos en circuitos"
    ],
    serviceAreas: [
      "Revision anual obligatoria con certificado",
      "Reparacion de averias de calderas de gas",
      "Sustitucion de calderas antiguas",
      "Instalacion de calderas nuevas de condensacion",
      "Reparacion de termos electricos",
      "Mantenimiento de sistemas de calefaccion"
    ],
    responseCommitment: "Para averias con afectacion de seguridad (olor a gas) o habitabilidad (sin agua caliente en invierno), respuesta prioritaria. Para revisiones, cita en menos de una semana. Epoca de invierno puede tener mas demanda.",
    priceTransparency: "Revision anual con precio cerrado que incluye certificado. Reparaciones presupuestadas antes de ejecutar. Si la reparacion no es viable economicamente, te asesoramos sobre sustitucion.",
    afterService: "Garantia de 12 meses en reparaciones. Seguimiento tras la intervencion. Recordatorio de proxima revision. Atencion para cualquier duda sobre el funcionamiento.",
    localExpertise: "Conocemos las marcas y modelos mas habituales en la zona, las particularidades de las instalaciones de gas segun epoca de construccion, y las soluciones mas adecuadas para el clima local."
  }
}

export function ServiceDeepDive({ 
  professionId, 
  professionName, 
  cityName,
  provinceName,
  regionName 
}: ServiceDeepDiveProps) {
  const content = DEEP_DIVE_CONTENT[professionId] || DEEP_DIVE_CONTENT.electricista
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
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Servicio de {professionName} en {cityName}: Todo lo que Necesitas Saber
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Conoce en detalle como trabajamos, nuestros estandares de calidad y por que somos la opcion 
            de confianza para miles de clientes en {provinceName}, {regionName}.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column - What We Do & How We Work */}
          <div className="lg:col-span-2 space-y-8">
            {/* What We Do */}
            <div className="p-6 rounded-2xl border border-border bg-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Que hacemos</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {content.whatWeDo}
              </p>
            </div>

            {/* How We Work */}
            <div className="p-6 rounded-2xl border border-border bg-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Como trabajamos</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {content.howWeWork}
              </p>
            </div>

            {/* Quality Standards */}
            <div className="p-6 rounded-2xl border border-border bg-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Award className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Estandares de calidad</h3>
              </div>
              <ul className="space-y-3">
                {content.qualityStandards.map((standard, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{standard}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipment Used */}
            <div className="p-6 rounded-2xl border border-border bg-muted/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Equipamiento profesional</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {content.equipmentUsed.map((equipment, index) => (
                  <div key={index} className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-foreground shrink-0" />
                    <span className="text-sm">{equipment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar Info */}
          <div className="space-y-6">
            {/* Service Areas */}
            <div className="p-6 rounded-2xl border border-border bg-foreground/5">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Servicios que ofrecemos
              </h3>
              <ul className="space-y-2">
                {content.serviceAreas.map((area, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certifications */}
            <div className="p-6 rounded-2xl border border-border bg-foreground/5">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Certificaciones
              </h3>
              <ul className="space-y-2">
                {content.certifications.map((cert, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 text-foreground mt-0.5 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Response Commitment */}
            <div className="p-6 rounded-2xl bg-foreground text-white">
              <Clock className="w-8 h-8 mb-3" />
              <h3 className="font-bold mb-2">Compromiso de respuesta</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {content.responseCommitment}
              </p>
            </div>

            {/* CTA */}
            <a
              href={`tel:+34${phoneNumber}`}
              onClick={handleCall}
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-foreground hover:bg-foreground/90 text-white font-bold rounded-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Llamar - 936 946 639</span>
            </a>
          </div>
        </div>

        {/* Bottom Section - Commitments */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Price Transparency */}
          <div className="p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-bold text-foreground">Transparencia en precios</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {content.priceTransparency}
            </p>
          </div>

          {/* After Service */}
          <div className="p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground">Garantia y servicio post-venta</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {content.afterService}
            </p>
          </div>

          {/* Local Expertise */}
          <div className="p-6 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-foreground" />
              </div>
              <h3 className="font-bold text-foreground">Experiencia local en {cityName}</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {content.localExpertise}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
