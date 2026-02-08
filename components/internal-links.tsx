import Link from "next/link"
import { MapPin, Wrench, AlertTriangle, ArrowRight, Building2, Navigation } from "lucide-react"
import { PROFESSIONS, PROBLEMS, getCityDisplayName, getNearbyCities } from "@/lib/seo-data"

interface InternalLinksProps {
  currentProfessionId: string
  currentCitySlug?: string
  currentProblemId?: string
  showProblems?: boolean
  showOtherServices?: boolean
  showNearbyCities?: boolean
  showAllCities?: boolean
  maxCities?: number
}

export function InternalLinks({
  currentProfessionId,
  currentCitySlug,
  currentProblemId,
  showProblems = true,
  showOtherServices = true,
  showNearbyCities = true,
  maxCities = 12,
}: InternalLinksProps) {
  const currentProfession = PROFESSIONS.find(p => p.id === currentProfessionId)
  const problems = PROBLEMS[currentProfessionId as keyof typeof PROBLEMS] || []
  const otherProfessions = PROFESSIONS.filter(p => p.id !== currentProfessionId)
  const nearbyCities = currentCitySlug ? getNearbyCities(currentCitySlug, maxCities) : []
  const cityName = currentCitySlug ? getCityDisplayName(currentCitySlug) : ""

  return (
    <div className="space-y-12">
      {/* Related Problems / Services for this profession + city */}
      {showProblems && problems.length > 0 && currentCitySlug && (
        <section className="py-12 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Problemas de {currentProfession?.name.toLowerCase()} en {cityName}
                </h2>
                <p className="text-sm text-muted-foreground">Resolvemos cualquier averia. Selecciona tu problema para mas informacion.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mt-6">
              {problems.map((problem) => (
                <Link
                  key={problem.id}
                  href={`/problema/${currentProfessionId}/${problem.id}/${currentCitySlug}/`}
                  className={`group flex items-center gap-3 p-4 rounded-xl border transition-all hover:scale-[1.02] ${
                    problem.id === currentProblemId
                      ? "bg-foreground text-background border-foreground"
                      : problem.urgent
                        ? "bg-destructive/5 border-destructive/20 hover:border-destructive/50 hover:bg-destructive/10"
                        : "bg-background border-border hover:border-foreground/30 hover:bg-muted/50"
                  }`}
                >
                  <span className="text-lg">{problem.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-medium block truncate ${
                      problem.id === currentProblemId ? "text-background" : "text-foreground"
                    }`}>
                      {problem.name}
                    </span>
                    {problem.urgent && problem.id !== currentProblemId && (
                      <span className="text-[10px] font-bold text-destructive uppercase">Urgente</span>
                    )}
                  </div>
                  <ArrowRight className={`w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                    problem.id === currentProblemId ? "text-background" : "text-foreground"
                  }`} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Other services in this city */}
      {showOtherServices && currentCitySlug && (
        <section id="otros-servicios" className="py-12 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Otros servicios urgentes en {cityName}
                </h2>
                <p className="text-sm text-muted-foreground">Disponibles 24 horas, 365 dias al ano.</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {otherProfessions.map((prof) => {
                const profProblems = PROBLEMS[prof.id as keyof typeof PROBLEMS] || []
                return (
                  <Link
                    key={prof.id}
                    href={`/${prof.id}/${currentCitySlug}/`}
                    className="group relative p-6 rounded-2xl border border-border bg-background hover:border-foreground/30 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${prof.color}15` }}
                      >
                        <Wrench className="w-5 h-5" style={{ color: prof.color }} />
                      </div>
                      <h3 className="font-bold text-foreground">{prof.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {prof.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {profProblems.slice(0, 3).map((p) => (
                        <span key={p.id} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                          {p.name}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:gap-2.5 transition-all">
                      <span>Ver servicio</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Nearby cities */}
      {showNearbyCities && nearbyCities.length > 0 && (
        <section id="ciudades-cercanas" className="py-12 bg-muted/20 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
                <Navigation className="w-5 h-5 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {currentProfession?.name} en ciudades cercanas
                </h2>
                <p className="text-sm text-muted-foreground">Tambien damos cobertura en estas localidades cercanas a {cityName}.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2.5 mt-6">
              {nearbyCities.map((city) => (
                <Link
                  key={city}
                  href={`/${currentProfessionId}/${city}/`}
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background border border-border text-sm font-medium text-foreground hover:border-foreground/30 hover:bg-muted/50 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <span>{getCityDisplayName(city)}</span>
                </Link>
              ))}
            </div>

            {/* Cross-link to other professions in nearby cities */}
            <div className="mt-8 pt-6 border-t border-border">
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Mas servicios en la zona
              </h3>
              <div className="flex flex-wrap gap-2">
                {otherProfessions.slice(0, 3).map((prof) =>
                  nearbyCities.slice(0, 3).map((city) => (
                    <Link
                      key={`${prof.id}-${city}`}
                      href={`/${prof.id}/${city}/`}
                      className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {prof.name} en {getCityDisplayName(city)}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
