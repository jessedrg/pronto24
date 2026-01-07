import { Shield, Clock, ThumbsUp, Award } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Nuestra garantía de servicio</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Llegada en 30min</h3>
            <p className="text-neutral-300 leading-relaxed">
              O el servicio es gratis. Garantizamos rapidez en emergencias.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">100% Garantizado</h3>
            <p className="text-neutral-300 leading-relaxed">
              Todos nuestros trabajos tienen garantía de satisfacción total.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Sin compromiso</h3>
            <p className="text-neutral-300 leading-relaxed">Presupuesto gratuito. Solo pagas si aceptas el servicio.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-black" />
            </div>
            <h3 className="text-xl font-bold mb-2">Profesionales</h3>
            <p className="text-neutral-300 leading-relaxed">Técnicos certificados con más de 10 años de experiencia.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
