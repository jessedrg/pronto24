import { Shield, Users, Clock, Award, MapPin, Phone } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: About text */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Más de 10 años solucionando emergencias del hogar en Catalunya
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">pronto-24.com</strong> nació con una misión clara: ofrecer servicios de urgencias 
                para el hogar de la máxima calidad, disponibles cuando realmente los necesitas. Sabemos que una 
                fuga de agua a las 3 de la mañana o quedarse fuera de casa un domingo no puede esperar al lunes.
              </p>
              
              <p>
                Nuestro equipo está formado por profesionales certificados con amplia experiencia: electricistas 
                con carnet oficial, fontaneros autorizados, cerrajeros profesionales y técnicos de calderas 
                certificados. Todos comparten los mismos valores de profesionalidad, puntualidad y trato cercano.
              </p>
              
              <p>
                Operamos principalmente en <strong className="text-foreground">Catalunya</strong> (Barcelona, Girona, Tarragona y Lleida) 
                y <strong className="text-foreground">Málaga</strong>, con planes de expansión a más ciudades de España. 
                Conocemos las particularidades de cada zona, desde los edificios históricos del Eixample hasta 
                las urbanizaciones más modernas del Maresme.
              </p>
              
              <p>
                Lo que nos diferencia es nuestro compromiso con la transparencia: presupuesto cerrado antes de 
                empezar, sin sorpresas ni costes ocultos. Y si no quedas satisfecho, te devolvemos el dinero. 
                Así de simple.
              </p>
            </div>
            
            <a
              href="tel:+34936946639"
              className="inline-flex items-center gap-2 px-6 py-3 bg-foreground hover:bg-foreground/90 text-white font-bold rounded-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Llámanos: 936 946 639
            </a>
          </div>
          
          {/* Right: Stats and highlights */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-foreground" />
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Disponibilidad total</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-foreground" />
                <div className="text-3xl font-bold text-foreground">15.000+</div>
                <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-foreground" />
                <div className="text-3xl font-bold text-foreground">4.9/5</div>
                <div className="text-sm text-muted-foreground">Valoración media</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-foreground" />
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Ciudades cubiertas</div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-foreground text-white">
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Garantía de satisfacción</h3>
                  <p className="text-white/80 leading-relaxed">
                    Todos nuestros trabajos incluyen garantía por escrito. Si no quedas 100% satisfecho 
                    con el resultado, te devolvemos el dinero. Sin preguntas, sin complicaciones.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border border-border bg-muted/20">
              <h3 className="font-bold text-foreground mb-3">Nuestros valores</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground shrink-0" />
                  <span><strong className="text-foreground">Rapidez:</strong> Llegamos cuando más nos necesitas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground shrink-0" />
                  <span><strong className="text-foreground">Transparencia:</strong> Precios claros, sin sorpresas</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground shrink-0" />
                  <span><strong className="text-foreground">Profesionalidad:</strong> Técnicos certificados y formados</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-foreground shrink-0" />
                  <span><strong className="text-foreground">Garantía:</strong> Respaldamos cada trabajo realizado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
