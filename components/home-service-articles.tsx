"use client"

import { 
  Waves, 
  Clock,
  Shield,
  CheckCircle2,
  ArrowRight,
  Phone,
  Star,
  AlertTriangle,
  Lightbulb,
  Truck,
  Camera,
  Wrench,
  Droplets,
  ThermometerSun
} from "lucide-react"
import Link from "next/link"

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
            Guia completa de desatascos: todo lo que necesitas saber
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Informacion detallada sobre nuestros servicios de desatascos profesionales.
            Aprende cuando llamar a un profesional, que tecnicas utilizamos, y como prevenir atascos en tu hogar.
          </p>
        </div>

        <article className="scroll-mt-24">
          <div className="p-8 lg:p-10 rounded-3xl border border-border bg-muted/10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center shrink-0">
                <Waves className="w-8 h-8 text-teal-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Desatascos Urgentes 24 Horas: Servicio Profesional con Camion Cuba
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
            <div className="prose max-w-none mb-8 space-y-4">
              <p className="text-muted-foreground leading-relaxed text-lg">
                El servicio de desatascos urgente de pronto-24.com resuelve cualquier obstruccion en tuberias y sistemas de saneamiento, desde un simple atasco de lavabo hasta la limpieza completa de bajantes, arquetas y fosas septicas con camion cuba. Un WC atascado o un fregadero que no desagua afectan directamente a la habitabilidad de tu hogar, por eso respondemos con la maxima urgencia: <strong className="text-foreground">30 minutos de tiempo maximo de llegada</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Utilizamos tres niveles de tecnologia segun la gravedad del atasco: <strong className="text-foreground">desatasco mecanico con sondas</strong> para obstrucciones simples, <strong className="text-foreground">agua a alta presion hasta 200 bares</strong> para atascos de grasa y acumulaciones, y <strong className="text-foreground">succion con camion cuba</strong> para limpieza de fosas septicas, arquetas y atascos severos en colectores. Ademas, contamos con <strong className="text-foreground">camaras CCTV de inspeccion</strong> para diagnosticar atascos recurrentes sin necesidad de obra.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Left: Why Choose Us */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  Por que elegir nuestro servicio de desatascos
                </h4>
                <ul className="space-y-3">
                  {[
                    "Tecnicos especializados exclusivamente en sistemas de saneamiento y desatascos",
                    "Equipos de agua a alta presion de grado industrial (hasta 200 bares)",
                    "Flota propia de camiones cuba para atascos severos y limpieza de fosas",
                    "Camaras de inspeccion CCTV robotizadas para diagnostico preciso",
                    "Resolvemos la causa raiz del atasco, no solo aliviamos los sintomas",
                    "Limpieza completa de la zona de trabajo incluida en el servicio",
                    "Gestion legal de residuos con certificado (para fosas y arquetas)",
                    "Presupuesto cerrado antes de empezar — sin sorpresas ni costes ocultos"
                  ].map((reason, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Expert Tips */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-foreground" />
                  Consejos de nuestros expertos en desatascos
                </h4>
                <div className="space-y-3">
                  {[
                    "Nunca tires toallitas humedas por el WC, aunque digan ser biodegradables. Son la causa numero 1 de atascos en España.",
                    "Usa rejillas en todos los desagues del bano para retener pelos. Un simple pelo acumula grasa y forma tapones.",
                    "Vierte un litro de agua hirviendo por cada desague una vez por semana. Disuelve la grasa acumulada en las paredes.",
                    "No uses productos quimicos desatascadores de forma habitual. Corroen las tuberias y crean problemas mayores a largo plazo.",
                    "Si un desague huele mal sin estar atascado, vierte agua: el sifon puede haberse secado y deja pasar gases.",
                    "La grasa de cocina NUNCA debe ir por el fregadero. Dejala enfriar en un bote y tirala a la basura organica."
                  ].map((tip, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-background border border-border">
                      <span className="text-foreground font-bold shrink-0">{i + 1}.</span>
                      <span className="text-muted-foreground text-sm">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Common Problems */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Problemas de atascos mas comunes que solucionamos
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "WC atascado", description: "El inodoro no traga o el agua sube peligrosamente al tirar de la cadena. Causa habitual: toallitas, exceso de papel o objetos caidos.", urgent: true },
                  { name: "Fregadero obstruido", description: "El agua se acumula y no baja o lo hace muy lentamente. Causa habitual: acumulacion de grasa, restos de comida y jabon.", urgent: true },
                  { name: "Bajante de edificio atascado", description: "Varios vecinos afectados simultaneamente o el agua sale por desagues de pisos inferiores. Requiere intervencion en el bajante comunitario.", urgent: true },
                  { name: "Arqueta bloqueada o desbordada", description: "La arqueta del patio, garaje o jardin esta llena y no evacua. Puede causar inundaciones y malos olores graves.", urgent: true },
                  { name: "Malos olores persistentes", description: "Olor a cloaca que sale de los desagues aunque no esten atascados visualmente. Indica obstruccion parcial o sifon seco.", urgent: false },
                  { name: "Atasco por raices de arboles", description: "Las raices penetran por las juntas de las tuberias buscando agua. Muy comun en chalets y viviendas con jardin.", urgent: false },
                  { name: "Fosa septica llena", description: "La fosa septica necesita vaciado periodico con camion cuba. Si se desborda, contamina el terreno.", urgent: true },
                  { name: "Tuberias con cal o incrustaciones", description: "El agua dura deposita cal en las paredes de las tuberias, reduciendo el diametro util hasta provocar atascos.", urgent: false },
                  { name: "Atasco recurrente (mismo punto)", description: "Si el mismo desague se atasca repetidamente, hay un problema estructural que requiere inspeccion con camara.", urgent: false },
                ].map((problem, i) => (
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
                Como funciona nuestro servicio de desatascos paso a paso
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Recibes nuestra llamada en menos de 30 segundos. Evaluamos el atasco por telefono para enviar el equipo adecuado (sonda, alta presion o camion cuba).",
                  "El tecnico mas cercano sale inmediatamente hacia tu ubicacion con todo el equipamiento necesario para resolver el atasco.",
                  "Diagnosticamos la ubicacion exacta y gravedad del atasco. Si es necesario, usamos camara de inspeccion CCTV.",
                  "Te damos presupuesto cerrado por escrito. No empezamos hasta que aceptes el precio. Sin sorpresas.",
                  "Aplicamos el metodo mas efectivo y menos invasivo: mecanico, hidraulico o succion. Comprobamos flujo correcto.",
                  "Limpiamos la zona de trabajo, te damos consejos de prevencion, y te entregamos garantia por escrito de 12 meses."
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-muted/30">
                    <div className="w-8 h-8 rounded-full bg-foreground text-white flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-muted-foreground text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Table */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4">
                Precios orientativos de desatascos (2026)
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full border border-border rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Servicio</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Precio desde</th>
                      <th className="text-left p-4 font-semibold text-foreground text-sm">Tiempo estimado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { service: "Desatasco WC / fregadero / lavabo", price: "80€", time: "30-60 min" },
                      { service: "Desatasco bajante comunitario", price: "120€", time: "60-120 min" },
                      { service: "Inspeccion con camara CCTV", price: "120€", time: "30-45 min" },
                      { service: "Limpieza de arquetas", price: "150€", time: "60-90 min" },
                      { service: "Camion cuba (vaciado + limpieza)", price: "200€", time: "90-180 min" },
                      { service: "Vaciado de fosa septica", price: "250€", time: "120-180 min" },
                      { service: "Reparacion de tuberia (sin zanja)", price: "300€", time: "Variable" },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-muted/20">
                        <td className="p-4 text-sm text-muted-foreground">{row.service}</td>
                        <td className="p-4 text-sm font-semibold text-foreground">{row.price}</td>
                        <td className="p-4 text-sm text-muted-foreground">{row.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                * Precios orientativos con IVA incluido. Tarifa diurna (8:00-22:00). Nocturno y festivos: +30%. 
                Presupuesto cerrado siempre antes de empezar.
              </p>
            </div>

            {/* Techniques explained */}
            <div className="mb-8">
              <h4 className="text-lg font-bold text-foreground mb-4">
                Tecnicas profesionales que utilizamos
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Wrench, title: "Desatasco mecanico con sonda", desc: "Sonda flexible de acero que penetra en la tuberia y rompe o extrae la obstruccion. Ideal para objetos solidos, acumulaciones de papel y raices pequenas. Sin productos quimicos." },
                  { icon: Droplets, title: "Agua a alta presion (200 bares)", desc: "Manguera con boquilla giratoria que lanza agua a 200 bares de presion. Arranca la grasa pegada a las paredes, elimina incrustaciones de cal y limpia la tuberia como nueva." },
                  { icon: Truck, title: "Camion cuba con succion", desc: "Camion equipado con bomba de succion de gran potencia y deposito de 10.000 litros. Para atascos severos en colectores, vaciado de fosas septicas y limpieza de arquetas." },
                  { icon: Camera, title: "Inspeccion con camara CCTV", desc: "Camara robotizada que recorre el interior de la tuberia grabando en video HD. Permite ver la causa exacta del atasco: raices, roturas, deformaciones o acumulaciones." },
                ].map((tech, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-background">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                        <tech.icon className="w-5 h-5 text-teal-500" />
                      </div>
                      <h5 className="font-semibold text-foreground">{tech.title}</h5>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{tech.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coverage + CTA */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
              <div>
                <h5 className="font-semibold text-foreground mb-2">Cobertura nacional</h5>
                <p className="text-sm text-muted-foreground">Servicio de desatascos con camion cuba en Madrid, Barcelona, Valencia, Sevilla, Malaga, Zaragoza, Bilbao, Murcia, Alicante, Granada y mas de 100 ciudades en toda Espana.</p>
              </div>
              <div>
                <h5 className="font-semibold text-foreground mb-2">Garantia y factura</h5>
                <p className="text-sm text-muted-foreground">12 meses de garantia por escrito en todos los trabajos. Factura oficial con IVA siempre. Pago en efectivo, tarjeta o Bizum.</p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6 pt-6 border-t border-border flex flex-wrap gap-4 items-center justify-between">
              <Link
                href="/desatascos"
                className="inline-flex items-center gap-2 text-foreground font-medium hover:underline"
              >
                Ver todas las ciudades con servicio de desatascos
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
      </div>
    </section>
  )
}
