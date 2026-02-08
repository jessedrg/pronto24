import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { MapPin, ArrowRight, Wrench, AlertTriangle } from "lucide-react"
import { Header } from "@/components/header"
import { UrgencyBanner } from "@/components/urgency-banner"
import { Footer } from "@/components/footer"
import { AIChatWidget } from "@/components/ai-chat-widget"
import { ServiceLandingTemplate } from "@/components/service-landing-template"
import { Breadcrumbs } from "@/components/breadcrumbs"
import { PROFESSIONS, PROBLEMS, getCityDisplayName, getNearbyCities } from "@/lib/seo-data"

export const dynamicParams = true
export const revalidate = 604800

const VALID_PROFESSIONS = ["electricista", "fontanero", "cerrajero", "desatascos", "calderas"]

// Detailed problem descriptions for unique SEO content
const PROBLEM_DETAILS: Record<string, Record<string, { longDescription: string; causes: string[]; solutions: string[]; urgencyLevel: string; estimatedTime: string; priceRange: string }>> = {
  electricista: {
    "apagon": {
      longDescription: "Un apagon total o parcial puede deberse a multiples causas, desde un simple salto del magnetotermico hasta un fallo grave en la instalacion electrica. Es fundamental actuar con rapidez ya que quedarse sin electricidad afecta a la seguridad del hogar, la conservacion de alimentos en el frigorifico y el funcionamiento de sistemas esenciales como alarmas o equipos medicos.",
      causes: ["Sobrecarga en el circuito electrico", "Cortocircuito en algun punto de la instalacion", "Fallo del diferencial o magnetotermico", "Averia en la acometida o contador", "Corte del suministro por la compania electrica"],
      solutions: ["Diagnostico completo del cuadro electrico", "Localizacion del punto de fallo", "Reparacion o sustitucion de elementos danados", "Verificacion de toda la instalacion"],
      urgencyLevel: "Alta - Servicio prioritario",
      estimatedTime: "30-90 minutos",
      priceRange: "60-200"
    },
    "cortocircuito": {
      longDescription: "Un cortocircuito ocurre cuando la corriente electrica toma un camino no previsto, generalmente por un cable danado o una conexion defectuosa. Es una situacion potencialmente peligrosa que puede provocar incendios si no se soluciona rapidamente.",
      causes: ["Cables pelados o con aislamiento danado", "Enchufes en mal estado", "Humedad en la instalacion", "Electrodomesticos defectuosos", "Conexiones sueltas en cajas de empalme"],
      solutions: ["Localizacion exacta del cortocircuito", "Reparacion del cableado danado", "Sustitucion de elementos defectuosos", "Revision preventiva de la instalacion"],
      urgencyLevel: "Muy alta - Riesgo de incendio",
      estimatedTime: "45-120 minutos",
      priceRange: "80-250"
    },
    "olor-quemado": {
      longDescription: "El olor a quemado en la instalacion electrica es una senal de alerta grave que indica sobrecalentamiento. Puede provenir de cables, enchufes, interruptores o el cuadro electrico. Nunca debe ignorarse ya que es precursor habitual de incendios electricos.",
      causes: ["Conexiones flojas que generan arco electrico", "Cables subdimensionados para la carga", "Enchufes sobrecargados", "Componentes del cuadro deteriorados"],
      solutions: ["Desconexion inmediata de la zona afectada", "Localizacion del punto de sobrecalentamiento", "Sustitucion de cables y conexiones", "Revision integral de la instalacion"],
      urgencyLevel: "Critica - Emergencia",
      estimatedTime: "60-180 minutos",
      priceRange: "100-350"
    },
    "diferencial-salta": {
      longDescription: "Cuando el diferencial salta repetidamente, indica que existe una fuga de corriente en algun punto de la instalacion. El diferencial es un dispositivo de seguridad vital que te protege de electrocuciones, por lo que su salto frecuente no debe ignorarse.",
      causes: ["Electrodomestico con derivacion a tierra", "Humedad en enchufes o cajas", "Cable con aislamiento deteriorado", "Diferencial antiguo o defectuoso"],
      solutions: ["Identificacion del circuito con fuga", "Pruebas de aislamiento por circuito", "Reparacion del punto de fuga", "Sustitucion del diferencial si esta defectuoso"],
      urgencyLevel: "Alta - Riesgo electrico",
      estimatedTime: "30-120 minutos",
      priceRange: "60-200"
    },
  },
  fontanero: {
    "fuga-agua": {
      longDescription: "Una fuga de agua, visible u oculta, puede causar danos estructurales importantes si no se soluciona a tiempo. El agua filtrándose puede danar paredes, suelos, techos del vecino de abajo, y provocar la aparicion de moho perjudicial para la salud.",
      causes: ["Tuberias corroidas o deterioradas por antiguedad", "Juntas y conexiones desgastadas", "Congelacion de tuberias en invierno", "Presion excesiva del agua", "Movimientos estructurales del edificio"],
      solutions: ["Deteccion exacta con equipos de ultrasonidos", "Reparacion o sustitucion del tramo afectado", "Sellado profesional de juntas", "Prueba de presion posterior"],
      urgencyLevel: "Muy alta - Danos progresivos",
      estimatedTime: "30-120 minutos",
      priceRange: "60-250"
    },
    "tuberia-rota": {
      longDescription: "Una tuberia rota es una emergencia que requiere atencion inmediata. La cantidad de agua que puede escapar de una rotura es enorme y los danos se multiplican con cada minuto que pasa. Es fundamental cerrar la llave de paso inmediatamente.",
      causes: ["Antiguedad y corrosion del material", "Heladas que congelan el agua interior", "Golpes durante obras o reformas", "Presion excesiva en la red"],
      solutions: ["Corte de agua inmediato", "Sustitucion del tramo roto", "Verificacion de toda la linea", "Restablecimiento del servicio"],
      urgencyLevel: "Critica - Emergencia",
      estimatedTime: "60-180 minutos",
      priceRange: "100-400"
    },
    "inundacion": {
      longDescription: "Una inundacion domestica puede tener consecuencias devastadoras: danos en suelos, muebles, electrodomesticos, y afectar a viviendas vecinas. La actuacion rapida es clave para minimizar los danos materiales y facilitar la reclamacion al seguro.",
      causes: ["Rotura de tuberia principal", "Desbordamiento de sanitarios", "Fallo de electrodomesticos (lavadora, lavavajillas)", "Lluvias intensas y mal drenaje"],
      solutions: ["Corte de suministro de agua", "Extraccion del agua acumulada", "Reparacion de la causa", "Documentacion para el seguro"],
      urgencyLevel: "Critica - Emergencia maxima",
      estimatedTime: "60-240 minutos",
      priceRange: "150-500"
    },
  },
  cerrajero: {
    "puerta-bloqueada": {
      longDescription: "Quedarse con la puerta bloqueada es una situacion estresante que puede ocurrir en el peor momento. Ya sea porque se ha atascado el mecanismo, se ha roto la llave o simplemente la has olvidado dentro, nuestros cerrajeros pueden abrirla sin danos en la mayoria de casos.",
      causes: ["Cerradura agarrotada por falta de mantenimiento", "Llave deformada o desgastada", "Bombin deteriorado", "Puerta desajustada por dilatacion o hundimiento"],
      solutions: ["Apertura no destructiva con tecnicas profesionales", "Lubricacion y ajuste del mecanismo", "Cambio de bombin si es necesario", "Ajuste de puerta y marco"],
      urgencyLevel: "Alta - No puedes acceder a tu hogar",
      estimatedTime: "10-45 minutos",
      priceRange: "60-150"
    },
    "cerradura-rota": {
      longDescription: "Una cerradura rota compromete la seguridad de tu hogar. Ya sea por un intento de robo, desgaste natural o un fallo mecanico, es imprescindible repararla o sustituirla cuanto antes para proteger tu vivienda y tus pertenencias.",
      causes: ["Intento de robo o forzamiento", "Desgaste por uso prolongado", "Llave forzada o incorrecta", "Materiales de baja calidad"],
      solutions: ["Evaluacion del dano", "Reparacion si es viable", "Sustitucion por cerradura de mayor seguridad", "Instalacion de escudo protector"],
      urgencyLevel: "Muy alta - Seguridad comprometida",
      estimatedTime: "20-60 minutos",
      priceRange: "80-250"
    },
    "llave-dentro": {
      longDescription: "Dejarse las llaves dentro de casa es mas comun de lo que parece. Es una situacion que genera ansiedad pero que tiene solucion rapida con un cerrajero profesional que pueda abrir la puerta sin causar ningun dano.",
      causes: ["Despiste al salir con prisa", "Puerta que se cierra con corriente de aire", "Ninos que cierran desde dentro", "Olvido al sacar la basura o ir al buzon"],
      solutions: ["Apertura sin danos de la cerradura", "Recuperacion de las llaves", "Recomendacion de cerradura antipánico", "Copia de llaves preventiva"],
      urgencyLevel: "Alta - Acceso inmediato necesario",
      estimatedTime: "10-30 minutos",
      priceRange: "50-120"
    },
  },
  desatascos: {
    "wc-atascado": {
      longDescription: "Un WC atascado es uno de los problemas domesticos mas urgentes e incomodos. Si es el unico bano de la vivienda, la urgencia es maxima. Los atascos de inodoro pueden deberse a multiples causas y a menudo requieren intervencion profesional.",
      causes: ["Exceso de papel higienico", "Toallitas humedas (nunca son desechables)", "Objetos caidos accidentalmente", "Acumulacion de cal en tuberias antiguas", "Obstruccion en el bajante comunitario"],
      solutions: ["Desatasco mecanico profesional", "Hidrolimpieza si es necesario", "Inspeccion con camara", "Limpieza preventiva del tramo"],
      urgencyLevel: "Muy alta - Afecta habitabilidad",
      estimatedTime: "30-90 minutos",
      priceRange: "60-150"
    },
    "fregadero-atascado": {
      longDescription: "Un fregadero atascado impide el uso normal de la cocina y puede generar malos olores y problemas de higiene. La causa mas comun es la acumulacion de grasa que solidifica dentro de las tuberias y atrapa otros residuos.",
      causes: ["Grasa acumulada en las tuberias", "Restos de comida", "Jabon solidificado", "Sifon obstruido", "Problema en el bajante"],
      solutions: ["Limpieza del sifon", "Desatasco mecanico", "Hidrolimpieza de tuberias", "Tratamiento antigrasas"],
      urgencyLevel: "Media-Alta",
      estimatedTime: "20-60 minutos",
      priceRange: "50-100"
    },
  },
  calderas: {
    "sin-agua-caliente": {
      longDescription: "Quedarse sin agua caliente, especialmente en invierno, afecta seriamente al confort del hogar. La causa puede estar en la caldera, en el circuito de agua caliente sanitaria, o en el propio termo o calentador.",
      causes: ["Fallo en la caldera (piloto apagado, sensor defectuoso)", "Termostato mal configurado o roto", "Vaso de expansion deteriorado", "Falta de presion en el circuito", "Acumulacion de cal en el intercambiador"],
      solutions: ["Diagnostico completo de la caldera", "Reparacion del componente averiado", "Ajuste de presion y temperatura", "Descalcificacion si es necesario"],
      urgencyLevel: "Alta - Especialmente en invierno",
      estimatedTime: "30-120 minutos",
      priceRange: "80-300"
    },
    "caldera-no-enciende": {
      longDescription: "Cuando la caldera no enciende, el diagnostico correcto es fundamental. Puede ser algo tan simple como un fallo del piloto o tan complejo como una placa electronica averiada. Un tecnico cualificado puede determinar la causa rapidamente.",
      causes: ["Piloto apagado", "Fallo en la valvula de gas", "Placa electronica averiada", "Sensor de llama sucio", "Presion de gas insuficiente"],
      solutions: ["Revision completa del sistema", "Limpieza de sensores y quemadores", "Sustitucion de piezas defectuosas", "Verificacion de seguridades"],
      urgencyLevel: "Alta",
      estimatedTime: "30-90 minutos",
      priceRange: "80-300"
    },
    "fuga-gas": {
      longDescription: "Una posible fuga de gas es la emergencia mas seria que puede ocurrir con una caldera. Requiere actuacion inmediata siguiendo un protocolo de seguridad estricto. Nunca intentes localizar la fuga tu mismo.",
      causes: ["Juntas deterioradas en conexiones de gas", "Tubo flexible caducado o danado", "Llave de gas defectuosa", "Caldera con fuga interna"],
      solutions: ["Ventilacion inmediata del espacio", "Cierre de llave de gas", "Deteccion profesional de la fuga", "Reparacion con materiales homologados"],
      urgencyLevel: "Critica - Emergencia de seguridad",
      estimatedTime: "30-90 minutos",
      priceRange: "80-200"
    },
  },
}

interface PageProps {
  params: Promise<{ profession: string; problem: string; city: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { profession: professionId, problem: problemId, city: citySlug } = await params
  if (!VALID_PROFESSIONS.includes(professionId)) return { title: "No encontrado" }
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) return {}
  const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
  const problem = problems.find((p) => p.id === problemId)
  if (!problem) return {}
  const cityName = getCityDisplayName(citySlug)

  // Get detailed info if available
  const details = PROBLEM_DETAILS[professionId]?.[problemId]

  const title = `${problem.name} en ${cityName} - ${profession.name} Urgente 24h | 936 946 639`
  const description = details
    ? `${details.longDescription.slice(0, 140)}... ${profession.namePlural} urgentes en ${cityName}. Llegamos en 10 min. Llama: 936 946 639.`
    : `${problem.description} en ${cityName}? Solucionamos ${problem.name.toLowerCase()} en 10 minutos. ${profession.namePlural} 24h. Llama: 936 946 639.`

  return {
    title,
    description,
    keywords: `${problem.name.toLowerCase()} ${cityName}, ${profession.id} ${problem.id} ${cityName}, ${problem.id} urgente ${cityName}, solucionar ${problem.name.toLowerCase()} ${cityName}, precio ${problem.name.toLowerCase()} ${cityName}`,
    alternates: {
      canonical: `https://www.pronto-24.com/problema/${professionId}/${problemId}/${citySlug}/`,
    },
    openGraph: {
      title: `${problem.name} en ${cityName} - Solucion Urgente`,
      description: `Solucionamos ${problem.name.toLowerCase()} en ${cityName}. ${profession.namePlural} disponibles 24/7. Llama: 936 946 639`,
      type: "website",
    },
  }
}

export default async function ProblemCityPage({ params }: PageProps) {
  const { profession: professionId, problem: problemId, city: citySlug } = await params
  if (!VALID_PROFESSIONS.includes(professionId)) notFound()
  const profession = PROFESSIONS.find((p) => p.id === professionId)
  if (!profession) notFound()
  const problems = PROBLEMS[professionId as keyof typeof PROBLEMS] || []
  const problem = problems.find((p) => p.id === problemId)
  if (!problem) notFound()

  const cityName = getCityDisplayName(citySlug)
  const nearbyCities = getNearbyCities(citySlug, 8)
  const otherProblems = problems.filter(p => p.id !== problemId)
  const otherProfessions = PROFESSIONS.filter(p => p.id !== professionId)
  const details = PROBLEM_DETAILS[professionId]?.[problemId]

  // Schema.org for this specific problem page
  const problemSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${problem.name} en ${cityName} - ${profession.name}`,
    "description": details?.longDescription || `Servicio de ${profession.name.toLowerCase()} para ${problem.name.toLowerCase()} en ${cityName}. Disponible 24/7.`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "pronto-24.com",
      "telephone": "+34936946639"
    },
    "areaServed": { "@type": "City", "name": cityName },
    "serviceType": `${profession.name} - ${problem.name}`,
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://www.pronto-24.com/" },
      { "@type": "ListItem", "position": 2, "name": profession.name, "item": `https://www.pronto-24.com/${profession.id}/` },
      { "@type": "ListItem", "position": 3, "name": `${profession.name} en ${cityName}`, "item": `https://www.pronto-24.com/${profession.id}/${citySlug}/` },
      { "@type": "ListItem", "position": 4, "name": `${problem.name} en ${cityName}`, "item": `https://www.pronto-24.com/problema/${professionId}/${problemId}/${citySlug}/` },
    ]
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(problemSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <UrgencyBanner />
      <Header />
      <Breadcrumbs
        items={[
          { label: profession.name, href: `/${profession.id}/` },
          { label: `${profession.name} en ${cityName}`, href: `/${profession.id}/${citySlug}/` },
          { label: problem.name },
        ]}
      />
      <main className="flex-1">
        <ServiceLandingTemplate professionId={professionId} citySlug={citySlug} problemId={problemId} />

        {/* Problem-Specific Deep Content */}
        {details && (
          <section className="py-12 bg-muted/10">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                {problem.name} en {cityName}: Informacion completa
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                {details.longDescription}
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Causes */}
                <div className="p-6 rounded-2xl border border-border bg-background">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Causas mas comunes
                  </h3>
                  <ul className="space-y-2">
                    {details.causes.map((cause, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="p-6 rounded-2xl border border-border bg-background">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-accent" />
                    Como lo solucionamos
                  </h3>
                  <ul className="space-y-2">
                    {details.solutions.map((sol, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                        {sol}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quick info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <div className="text-sm text-muted-foreground">Urgencia</div>
                  <div className="font-bold text-foreground text-sm mt-1">{details.urgencyLevel}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <div className="text-sm text-muted-foreground">Tiempo estimado</div>
                  <div className="font-bold text-foreground text-sm mt-1">{details.estimatedTime}</div>
                </div>
                <div className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                  <div className="text-sm text-muted-foreground">Precio orientativo</div>
                  <div className="font-bold text-foreground text-sm mt-1">{details.priceRange}EUR</div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Interlinking: Other problems of the same profession */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Otros problemas de {profession.name.toLowerCase()} en {cityName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {otherProblems.map((p) => (
                <Link
                  key={p.id}
                  href={`/problema/${professionId}/${p.id}/${citySlug}/`}
                  className={`group flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                    p.urgent
                      ? "bg-destructive/5 border-destructive/20 hover:border-destructive/50"
                      : "bg-background border-border hover:border-foreground/30"
                  }`}
                >
                  <span className="text-lg">{p.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-foreground block truncate">{p.name}</span>
                    {p.urgent && <span className="text-[10px] font-bold text-destructive uppercase">Urgente</span>}
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Interlinking: Same problem in nearby cities */}
        {nearbyCities.length > 0 && (
          <section className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {problem.name} en ciudades cercanas a {cityName}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Tambien solucionamos {problem.name.toLowerCase()} en estas localidades.
              </p>
              <div className="flex flex-wrap gap-2.5">
                {nearbyCities.map((city) => (
                  <Link
                    key={city}
                    href={`/problema/${professionId}/${problemId}/${city}/`}
                    className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted/50 border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-background transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span>{problem.name} en {getCityDisplayName(city)}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Interlinking: Other services in this city */}
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Otros servicios urgentes en {cityName}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {otherProfessions.map((prof) => (
                <Link
                  key={prof.id}
                  href={`/${prof.id}/${citySlug}/`}
                  className="group p-5 rounded-2xl border border-border bg-background hover:border-foreground/30 hover:shadow-lg transition-all"
                >
                  <h3 className="font-bold text-foreground mb-2">{prof.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{prof.description}</p>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                    Ver servicio <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              ))}
            </div>

            {/* Link back to main city page */}
            <div className="mt-8 pt-6 border-t border-border">
              <Link
                href={`/${professionId}/${citySlug}/`}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background font-medium hover:bg-foreground/90 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                <span>Ver todos los servicios de {profession.name.toLowerCase()} en {cityName}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
