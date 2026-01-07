const cities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
  "Málaga",
  "Murcia",
  "Palma",
  "Las Palmas",
  "Bilbao",
  "Alicante",
  "Córdoba",
  "Valladolid",
  "Vigo",
  "Gijón",
  "Hospitalet",
  "Vitoria",
  "Granada",
  "Elche",
  "Oviedo",
  "Badalona",
  "Cartagena",
  "Terrassa",
  "Jerez",
  "Sabadell",
  "Santa Cruz",
  "Pamplona",
  "Almería",
  "Fuenlabrada",
  "Leganés",
]

export function Coverage() {
  return (
    <section className="py-24 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-balance">Servicio Disponible en Barcelona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Actualmente operamos en Barcelona. Próximamente en más ciudades de España.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="p-8 bg-background rounded-lg text-center hover:shadow-md transition-shadow min-w-[200px]">
            <span className="text-2xl font-bold">Barcelona</span>
            <p className="text-sm text-muted-foreground mt-2">Disponible 24/7</p>
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-12 text-lg">
          🚀 Próximamente en Madrid, Valencia, Sevilla y más ciudades
        </p>
      </div>
    </section>
  )
}
