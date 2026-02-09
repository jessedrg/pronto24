import { Clock, MapPin, Phone, Calendar } from "lucide-react"

export function SocialProof() {
  return (
    <section className="py-12 px-4 bg-muted/20" aria-label="Servicio profesional">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Servicio profesional en toda Espana</h2>
          <p className="text-muted-foreground">Disponibles cuando nos necesites, donde nos necesites</p>

          <div className="pt-4 flex items-center justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-3xl font-black text-foreground">30 min</span>
              <p className="text-sm text-muted-foreground">tiempo maximo de llegada</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Calendar className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-3xl font-black text-foreground">24/7</span>
              <p className="text-sm text-muted-foreground">todos los dias del ano</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MapPin className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-3xl font-black text-foreground">Local</span>
              <p className="text-sm text-muted-foreground">tecnicos de tu zona</p>
            </div>
            <div className="w-px h-10 bg-border hidden sm:block" />
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Phone className="w-6 h-6 text-foreground" />
              </div>
              <span className="text-3xl font-black text-foreground">Gratis</span>
              <p className="text-sm text-muted-foreground">presupuesto sin compromiso</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
