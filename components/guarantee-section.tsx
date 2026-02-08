import { Shield, Clock, ThumbsUp, Award } from "lucide-react"

export function GuaranteeSection() {
  return (
    <section className="py-16 bg-foreground text-background" aria-labelledby="guarantee-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 id="guarantee-heading" className="text-3xl md:text-4xl font-bold text-center text-background mb-12 text-balance">
          Nuestra garantia de servicio
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">Llegada en 30min</h3>
            <p className="text-background/70 leading-relaxed">
              O el servicio es gratis. Garantizamos rapidez en emergencias.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">100% Garantizado</h3>
            <p className="text-background/70 leading-relaxed">
              Todos nuestros trabajos tienen garantia de satisfaccion total.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">Sin compromiso</h3>
            <p className="text-background/70 leading-relaxed">Presupuesto gratuito. Solo pagas si aceptas el servicio.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">Profesionales</h3>
            <p className="text-background/70 leading-relaxed">Tecnicos certificados con mas de 10 anos de experiencia.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
