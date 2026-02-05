import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "¿Cuánto tarda en llegar un profesional a mi casa?",
    answer: "Nuestro tiempo medio de llegada es de 10 a 30 minutos, dependiendo de tu ubicación y la disponibilidad de técnicos en tu zona. Mantenemos profesionales distribuidos estratégicamente por toda Catalunya para garantizar la respuesta más rápida posible. En casos de emergencia extrema, priorizamos tu llamada."
  },
  {
    question: "¿Cuánto cuesta el servicio de urgencias?",
    answer: "El precio varía según el tipo de servicio y la complejidad del trabajo. Siempre damos un presupuesto cerrado antes de empezar cualquier trabajo, sin sorpresas ni costes ocultos. La visita de diagnóstico tiene un coste mínimo que se descuenta si decides realizar la reparación con nosotros. Trabajamos con precios transparentes y competitivos."
  },
  {
    question: "¿Trabajan de noche, fines de semana y festivos?",
    answer: "Sí, estamos disponibles las 24 horas del día, los 7 días de la semana, los 365 días del año. Esto incluye noches, madrugadas, fines de semana y todos los festivos. Las emergencias no entienden de horarios, y nosotros tampoco. Nuestro servicio nocturno y de festivos funciona exactamente igual que el diurno."
  },
  {
    question: "¿Los profesionales están certificados?",
    answer: "Absolutamente. Todos nuestros técnicos son profesionales certificados con años de experiencia en su especialidad. Electricistas con carnet oficial, fontaneros autorizados, cerrajeros profesionales, y técnicos de calderas con certificación de gas. Además, reciben formación continua para estar al día de las últimas tecnologías y normativas."
  },
  {
    question: "¿Qué garantía tienen los trabajos realizados?",
    answer: "Todos nuestros trabajos incluyen garantía por escrito de mínimo 12 meses en mano de obra. Los materiales que instalamos tienen además la garantía del fabricante. Si surge cualquier problema relacionado con nuestra intervención durante el período de garantía, volvemos sin coste adicional para solucionarlo."
  },
  {
    question: "¿Cómo puedo pagar el servicio?",
    answer: "Aceptamos múltiples formas de pago para tu comodidad: efectivo, tarjeta de crédito/débito (el técnico lleva datáfono), transferencia bancaria, y Bizum. Emitimos factura oficial por todos los trabajos realizados. También trabajamos con compañías de seguros del hogar."
  },
  {
    question: "¿Qué zonas cubren?",
    answer: "Actualmente damos servicio en toda Catalunya, con especial cobertura en Barcelona y área metropolitana, Girona, Tarragona y Lleida. También operamos en Málaga y estamos expandiéndonos a más ciudades de España. Consulta disponibilidad para tu zona llamando a nuestro teléfono de atención."
  },
  {
    question: "¿Qué hago en caso de emergencia mientras espero al técnico?",
    answer: "Nuestro equipo de atención telefónica te dará instrucciones específicas según tu emergencia. En general: para fugas de agua, cierra la llave de paso; para problemas eléctricos, baja el diferencial; para olor a gas, ventila y sal de casa. Te guiamos paso a paso mientras el técnico está en camino."
  },
]

export function HomeFAQ() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/10 text-foreground text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Todo lo que necesitas saber sobre nuestros servicios
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Resolvemos las dudas más comunes de nuestros clientes. Si tienes alguna pregunta adicional, 
            no dudes en llamarnos al 936 946 639.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details 
              key={i} 
              className="group rounded-2xl border border-border bg-background overflow-hidden"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-muted/30 transition-colors">
                <h3 className="text-lg font-semibold text-foreground pr-4 text-left">{faq.question}</h3>
                <span className="text-foreground shrink-0 transition-transform group-open:rotate-180">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-6 pb-6">
                <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
