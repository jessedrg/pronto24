import { Shield, Clock, ThumbsUp, Award, Phone } from "lucide-react"

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
            <h3 className="text-xl font-bold text-background mb-2">Llegada en 30 min</h3>
            <p className="text-background/70 leading-relaxed">
              Tiempo maximo garantizado. En zonas urbanas, normalmente en 10-15 minutos.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">Garantia 12 meses</h3>
            <p className="text-background/70 leading-relaxed">
              Todos nuestros trabajos incluyen garantia por escrito. Si falla, volvemos gratis.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ThumbsUp className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">Sin compromiso</h3>
            <p className="text-background/70 leading-relaxed">Presupuesto gratuito antes de empezar. Solo pagas si aceptas.</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-foreground" />
            </div>
            <h3 className="text-xl font-bold text-background mb-2">Certificados</h3>
            <p className="text-background/70 leading-relaxed">Tecnicos verificados con anos de experiencia y formacion continua.</p>
          </div>
        </div>

        {/* CTA inside guarantee */}
        <div className="mt-12 text-center">
          <a
            href="tel:+34936946639"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-500/30 transition-all hover:scale-[1.02]"
            aria-label="Llamar al 936 946 639"
          >
            <Phone className="w-5 h-5" />
            <span>Llamar ahora - 936 946 639</span>
          </a>
          <p className="mt-4 text-sm text-background/50">Disponible 24 horas, 365 dias al ano</p>
        </div>
      </div>
    </section>
  )
}
