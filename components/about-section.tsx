import { Shield, Users, Clock, Award, MapPin, Phone, CheckCircle, Star, Heart, Target, Truck, Camera, Wrench, Waves } from "lucide-react"
import Link from "next/link"

export function AboutSection() {
  return (
    <section className="py-20 bg-background" id="sobre-nosotros">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Heart className="w-4 h-4" />
            Especialistas en desatascos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Mas de 10 anos solucionando atascos en toda Espana
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-pretty">
            Somos especialistas en desatascos y saneamiento. Conoce como trabajamos
            y por que comunidades, empresas y familias confian en nosotros.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
          {/* Left: About text */}
          <div className="space-y-6">
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">El origen de pronto-24.com</h3>
                <p>
                  <strong className="text-foreground">pronto-24.com</strong> nacio de la frustracion de lidiar con atascos urgentes
                  y no encontrar a nadie disponible. Un sabado por la noche, con la arqueta del edificio desbordada y
                  agua sucia inundando el garaje, nuestro fundador llamo a mas de 10 empresas. Nadie podia venir hasta
                  el lunes. Cuando finalmente llego un tecnico, el presupuesto se triplico sobre lo hablado por telefono.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Nuestra especializacion</h3>
                <p>
                  Nos especializamos exclusivamente en <strong className="text-foreground">desatascos y saneamiento</strong>.
                  No somos una empresa generalista — cada tecnico, cada equipo, cada vehiculo esta dedicado a resolver
                  atascos de la forma mas rapida y efectiva posible. Desde un WC atascado hasta la limpieza completa
                  de colectores con camion cuba, tenemos el equipo y la experiencia para cada situacion.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Nuestro equipo</h3>
                <p>
                  Contamos con una red de <strong className="text-foreground">mas de 80 tecnicos especializados</strong> en 
                  desatascos, distribuidos por toda Espana. Cada tecnico tiene formacion especifica en sistemas de 
                  saneamiento, manejo de equipos de alta presion, camaras CCTV de inspeccion y camiones cuba.
                  Solo el 20% de los candidatos supera nuestro proceso de seleccion.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Nuestro compromiso</h3>
                <p>
                  Un atasco grave puede inutilizar tu vivienda en minutos. Por eso garantizamos
                  <strong className="text-foreground"> 30 minutos de tiempo maximo de llegada</strong>, presupuesto cerrado
                  antes de empezar, y garantia de 12 meses por escrito. Si el atasco vuelve dentro del periodo
                  de garantia, volvemos gratis.
                </p>
              </div>
            </div>
            
            <a
              href="tel:+34936946639"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl transition-all"
            >
              <Phone className="w-5 h-5" />
              Llamanos: 936 946 639
            </a>
          </div>
          
          {/* Right: Stats and highlights */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Clock className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">365 dias al ano</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Truck className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">Camiones cuba propios</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">30 min</div>
                <div className="text-sm text-muted-foreground">Tiempo max. de llegada</div>
              </div>
              
              <div className="p-6 rounded-2xl bg-muted/30 border border-border text-center">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold text-foreground">100+</div>
                <div className="text-sm text-muted-foreground">Ciudades con servicio</div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-primary text-primary-foreground">
              <div className="flex items-start gap-4">
                <Shield className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Nuestra garantia triple</h3>
                  <ul className="space-y-2 text-primary-foreground/90">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span><strong>Garantia de precio:</strong> El presupuesto que aceptas es el precio final. Sin sorpresas.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span><strong>Garantia de trabajo:</strong> 12 meses. Si el atasco vuelve, volvemos gratis.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                      <span><strong>Garantia de satisfaccion:</strong> Si no quedas contento, te devolvemos el dinero.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl border border-border bg-muted/20">
              <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Los 5 pilares de nuestro servicio de desatascos
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">1</span>
                  <span><strong className="text-foreground">Rapidez real:</strong> 30 minutos maximo de llegada. Tenemos tecnicos repartidos por toda Espana.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">2</span>
                  <span><strong className="text-foreground">Equipo profesional:</strong> Sondas, alta presion, camion cuba y camaras CCTV. El equipo adecuado para cada atasco.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">3</span>
                  <span><strong className="text-foreground">Transparencia:</strong> Presupuesto cerrado por escrito antes de tocar nada.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">4</span>
                  <span><strong className="text-foreground">Solucion definitiva:</strong> No aliviamos el atasco, lo eliminamos. Diagnosticamos la causa raiz.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">5</span>
                  <span><strong className="text-foreground">Limpieza total:</strong> Dejamos la zona de trabajo impecable. Incluido en el servicio.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Equipo especializado */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Nuestro equipamiento profesional
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Invertimos en la mejor tecnologia del sector para resolver cualquier atasco
              de la forma mas rapida y menos invasiva posible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                title: "Camiones cuba",
                description: "Flota propia de camiones con bomba de succion industrial y deposito de 10.000 litros. Para fosas septicas, arquetas y atascos severos.",
                icon: Truck,
                stat: "15+"
              },
              {
                title: "Equipos de alta presion",
                description: "Maquinas de agua a presion hasta 200 bares con boquillas rotativas. Limpian las paredes de la tuberia eliminando grasa e incrustaciones.",
                icon: Waves,
                stat: "200 bar"
              },
              {
                title: "Camaras CCTV",
                description: "Camaras robotizadas que recorren el interior de las tuberias grabando en video HD. Localizan el problema exacto sin romper nada.",
                icon: Camera,
                stat: "HD"
              },
              {
                title: "Sondas y fresadoras",
                description: "Sondas mecanicas flexibles y fresadoras para eliminar raices, objetos solidos y acumulaciones en tuberias de todos los diametros.",
                icon: Wrench,
                stat: "50mm+"
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

        {/* Testimonios desatascos */}
        <div className="border-t border-border pt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Lo que dicen nuestros clientes de desatascos
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Opiniones reales de clientes que han utilizado nuestro servicio de desatascos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Laura Fernandez",
                location: "Madrid",
                rating: 5,
                text: "El bajante del edificio se atasco un domingo y el agua empezaba a salir por el bano del primero. Llamamos y en 25 minutos tenian el equipo de alta presion trabajando. En una hora estaba todo solucionado. Precio justo y limpiaron todo.",
                service: "Desatasco de bajante comunitario"
              },
              {
                name: "Pedro Navarro",
                location: "Barcelona",
                rating: 5,
                text: "Llevaba meses con el fregadero que desaguaba lento. Vinieron con la camara y vieron que habia una acumulacion de grasa enorme. Con el equipo de alta presion lo dejaron como nuevo. Me ensenaron el video del antes y despues.",
                service: "Desatasco con inspeccion CCTV"
              },
              {
                name: "Comunidad Residencial Sol",
                location: "Valencia",
                rating: 5,
                text: "La fosa septica del edificio necesitaba vaciado urgente. El camion cuba llego en 30 minutos, vaciaron y limpiaron la fosa, y nos dieron el certificado de gestion de residuos. Todo profesional y a buen precio.",
                service: "Vaciado de fosa septica"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-background">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.location} - {testimonial.service}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cobertura desatascos */}
        <div className="border-t border-border pt-16 mt-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Desatascos en toda Espana
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Servicio de desatascos urgente con camion cuba en mas de 100 ciudades.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { slug: "madrid", name: "Madrid" }, { slug: "barcelona", name: "Barcelona" },
              { slug: "valencia", name: "Valencia" }, { slug: "sevilla", name: "Sevilla" },
              { slug: "zaragoza", name: "Zaragoza" }, { slug: "malaga", name: "Malaga" },
              { slug: "murcia", name: "Murcia" }, { slug: "bilbao", name: "Bilbao" },
              { slug: "alicante", name: "Alicante" }, { slug: "cordoba", name: "Cordoba" },
              { slug: "granada", name: "Granada" }, { slug: "vigo", name: "Vigo" },
              { slug: "gijon", name: "Gijon" }, { slug: "oviedo", name: "Oviedo" },
              { slug: "santander", name: "Santander" }, { slug: "pamplona", name: "Pamplona" },
              { slug: "san-sebastian", name: "San Sebastian" }, { slug: "almeria", name: "Almeria" },
              { slug: "burgos", name: "Burgos" }, { slug: "valladolid", name: "Valladolid" },
              { slug: "hospitalet-llobregat", name: "Hospitalet" }, { slug: "badalona", name: "Badalona" },
              { slug: "terrassa", name: "Terrassa" }, { slug: "sabadell", name: "Sabadell" },
            ].map((city, i) => (
              <Link key={i} href={`/desatascos/${city.slug}`} className="px-4 py-3 rounded-xl bg-muted/30 border border-border text-center hover:border-foreground/30 transition-colors">
                <span className="text-sm font-medium text-foreground">Desatascos {city.name}</span>
              </Link>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Y muchas mas ciudades. Llama al <a href="tel:936946639" className="text-primary font-semibold hover:underline">936 946 639</a> para confirmar disponibilidad en tu zona.
          </p>
        </div>
      </div>
    </section>
  )
}
