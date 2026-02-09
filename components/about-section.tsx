import { Shield, Users, Clock, Award, MapPin, Phone, CheckCircle, Briefcase, Heart, Target, Zap } from "lucide-react"

export function AboutSection() {
  return (
    <section className="py-20 bg-background" id="sobre-nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Nuestra historia
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Más de 10 años siendo la referencia en servicios de urgencia 24h en España
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-pretty">
            Conoce quienes somos, como trabajamos, y por que familias y negocios en toda Espana 
            confian en nosotros para resolver sus emergencias del hogar.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: About text */}
          <div className="space-y-6">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">El origen de pronto-24.com</h3>
                <p>
                  <strong className="text-foreground">pronto-24.com</strong> nació en 2014 de una experiencia personal 
                  frustrante: nuestro fundador sufrió una fuga de agua a las 2 de la madrugada un sábado. 
                  Llamó a más de 10 empresas de urgencias antes de encontrar a alguien dispuesto a venir. 
                  Cuando llegó el fontanero (3 horas después), el trabajo costó el triple de lo razonable 
                  y la factura llegó llena de conceptos confusos.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Nuestra misión</h3>
                <p>
                  Esa experiencia nos impulsó a crear algo diferente: un servicio de urgencias que realmente 
                  estuviera disponible las 24 horas, que llegara rápido, con profesionales cualificados, 
                  y con precios transparentes. Sin sorpresas, sin letras pequeñas, sin estrés añadido en 
                  momentos que ya de por sí son complicados.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Cómo trabajamos</h3>
                <p>
                  Hoy contamos con una red de <strong className="text-foreground">más de 500 profesionales</strong> distribuidos 
                  por toda España. Cada técnico pasa un riguroso proceso de selección que incluye verificación 
                  de titulaciones, comprobación de antecedentes, periodo de prueba supervisado, y evaluación 
                  continua basada en las opiniones de los clientes. Solo el 15% de los candidatos supera 
                  todas las fases.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Nuestro compromiso contigo</h3>
                <p>
                  Sabemos que cuando nos llamas, estás pasando un mal momento. Por eso nos esforzamos en 
                  hacer todo el proceso lo más fácil posible: una llamada, un presupuesto claro, un profesional 
                  en tu puerta en minutos, y un problema resuelto. Sin complicaciones, sin esperas interminables, 
                  sin sustos en la factura. Ese es nuestro compromiso, cada día, cada servicio.
                </p>
              </div>
            </div>
            
            <a
              href="tel:+34936946639"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Llámanos: 936 946 639
            </a>
          </div>
          
          {/* Right: Stats and highlights */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">365 días al año</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Servicio disponible</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">30 min</div>
                <div className="text-sm text-muted-foreground">Tiempo max. de llegada</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Ciudades en España</div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Nuestra garantía triple</h3>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span><strong>Garantía de precio:</strong> El presupuesto que aceptas es el precio final. Sin sorpresas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span><strong>Garantía de trabajo:</strong> 12 meses de garantía en mano de obra.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span><strong>Garantía de satisfacción:</strong> Si no quedas contento, te devolvemos el dinero.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border border-border bg-muted/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Los 5 pilares de nuestro servicio
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span><strong className="text-foreground">Rapidez real:</strong> Tiempo medio de llegada de 20 minutos. No prometemos lo que no podemos cumplir.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span><strong className="text-foreground">Transparencia total:</strong> Presupuesto cerrado y por escrito antes de empezar cualquier trabajo.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span><strong className="text-foreground">Profesionales de élite:</strong> Solo el 15% de los candidatos supera nuestra selección.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <span><strong className="text-foreground">Garantía blindada:</strong> Respaldamos cada trabajo con garantía por escrito de 12 meses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <span><strong className="text-foreground">Atención humana:</strong> Personas reales te atienden 24/7. Nada de robots ni contestadores.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Sección de equipo y profesionales */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Conoce a los profesionales que te atenderán
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Nuestro equipo está formado por profesionales especializados en cada área, 
              todos con formación certificada y años de experiencia.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              {
                title: "Electricistas",
                description: "Carnet oficial de instalador autorizado. Expertos en instalaciones domésticas, comerciales e industriales. Media de 8 años de experiencia.",
                icon: Zap,
                stat: "120+"
              },
              {
                title: "Fontaneros",
                description: "Certificación profesional en instalaciones de fontanería y calefacción. Especialistas en detección y reparación de fugas.",
                icon: Briefcase,
                stat: "95+"
              },
              {
                title: "Cerrajeros",
                description: "Formación acreditada en sistemas de seguridad. Especialistas en aperturas no destructivas y cerraduras de alta seguridad.",
                icon: Shield,
                stat: "110+"
              },
              {
                title: "Desatascadores",
                description: "Equipados con tecnología punta: cámaras de inspección, equipos de presión y camión cuba para los casos más difíciles.",
                icon: Target,
                stat: "75+"
              },
              {
                title: "Técnicos de calderas",
                description: "Carnet de instalador de gas categoría A, B y C. Formación continua con las principales marcas del mercado.",
                icon: Award,
                stat: "85+"
              }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-muted/10 hover:bg-muted/20 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">{item.stat}</div>
                <h4 className="font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nuestras garantias */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Lo que nos diferencia
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Compromisos reales que respaldamos con hechos en cada servicio que realizamos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Presupuesto cerrado",
                description: "Antes de tocar nada, te decimos exactamente cuanto va a costar. El precio que aceptas es el precio final. Sin sorpresas, sin conceptos extra, sin letras pequenas.",
                icon: Shield,
              },
              {
                title: "Garantia de 12 meses",
                description: "Todos nuestros trabajos incluyen garantia por escrito de 12 meses en mano de obra y materiales. Si algo falla, volvemos sin coste adicional.",
                icon: Award,
              },
              {
                title: "Satisfaccion o devolucion",
                description: "Si no quedas satisfecho con el servicio recibido, te devolvemos el dinero. Tu tranquilidad es nuestra maxima prioridad.",
                icon: CheckCircle,
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-background">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-bold text-foreground text-lg mb-3">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cobertura geográfica */}
        <div className="border-t border-border pt-16 mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Cobertura en toda España
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Desde grandes ciudades hasta poblaciones más pequeñas, nuestra red de profesionales 
              cubre todo el territorio nacional.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              "Madrid", "Barcelona", "Valencia", "Sevilla", "Zaragoza", "Málaga",
              "Murcia", "Palma", "Las Palmas", "Bilbao", "Alicante", "Córdoba",
              "Valladolid", "Vigo", "Gijón", "Hospitalet", "Vitoria", "A Coruña",
              "Granada", "Elche", "Oviedo", "Badalona", "Cartagena", "Terrassa"
            ].map((city, i) => (
              <div key={i} className="px-4 py-3 rounded-xl bg-muted/30 border border-border text-center">
                <span className="text-sm font-medium text-foreground">{city}</span>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Y muchas más ciudades y poblaciones. Llama al <a href="tel:936946639" className="text-primary font-semibold hover:underline">936 946 639</a> para confirmar disponibilidad en tu zona.
          </p>
        </div>
      </div>
    </section>
  )
}
