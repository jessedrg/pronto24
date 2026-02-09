import { MapPin, AlertTriangle, Building2, Info, Thermometer } from "lucide-react"
import type { LocalEnrichment } from "@/lib/local-enrichment"

interface LocalContentProps {
  enrichment: LocalEnrichment
  professionId: string
  professionName: string
}

export function LocalContent({ enrichment, professionId, professionName }: LocalContentProps) {
  const localProblems = enrichment.problemasLocales[professionId] || []

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex items-start gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-foreground/5 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-6 h-6 text-foreground" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-balance">
              {professionName} en {enrichment.municipio}: lo que debes saber sobre tu zona
            </h2>
            <p className="text-muted-foreground mt-2 text-balance leading-relaxed">
              Informacion real y especifica del codigo postal {enrichment.cp} para que sepas que esperar de nuestro servicio.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Column 1: Zone Description + Infrastructure */}
          <div className="lg:col-span-2 space-y-8">
            {/* Zone description */}
            <div className="rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-foreground" />
                <h3 className="text-lg font-bold text-foreground">
                  Sobre {enrichment.municipio} ({enrichment.cp})
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {enrichment.descripcionLocal}
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border">
                  <span className="text-sm font-medium text-muted-foreground">Provincia</span>
                  <span className="text-sm font-bold text-foreground ml-auto">{enrichment.provincia}</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border">
                  <span className="text-sm font-medium text-muted-foreground">Poblacion</span>
                  <span className="text-sm font-bold text-foreground ml-auto">{enrichment.poblacionAprox}</span>
                </div>
                {enrichment.altitud && (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border">
                    <span className="text-sm font-medium text-muted-foreground">Altitud</span>
                    <span className="text-sm font-bold text-foreground ml-auto">{enrichment.altitud}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-background border border-border">
                  <span className="text-sm font-medium text-muted-foreground">Tipo zona</span>
                  <span className="text-sm font-bold text-foreground ml-auto capitalize">{enrichment.tipoZona}</span>
                </div>
              </div>
              {enrichment.barriosZonas && enrichment.barriosZonas.length > 0 && (
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-sm font-medium text-muted-foreground">Barrios y zonas que cubrimos:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {enrichment.barriosZonas.map((barrio) => (
                      <span
                        key={barrio}
                        className="px-3 py-1.5 rounded-lg bg-foreground/5 text-sm font-medium text-foreground"
                      >
                        {barrio}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Local problems specific to this profession */}
            {localProblems.length > 0 && (
              <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <h3 className="text-lg font-bold text-foreground">
                    Problemas tipicos de {professionName.toLowerCase()} en {enrichment.municipio}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Estos son los problemas mas frecuentes que encontramos al dar servicio de {professionName.toLowerCase()} en el codigo postal {enrichment.cp}. Nuestros tecnicos los conocen bien y llegan preparados con el material adecuado.
                </p>
                <ul className="space-y-3">
                  {localProblems.map((problem, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-destructive/10 text-destructive text-xs font-bold flex-shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="text-sm text-foreground leading-relaxed">{problem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Infrastructure info */}
            <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-5 h-5 text-foreground" />
                <h3 className="text-lg font-bold text-foreground">
                  Estado de las infraestructuras en {enrichment.cp}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {enrichment.infraestructura}
              </p>
            </div>
          </div>

          {/* Column 2: Unique Data + Climate */}
          <div className="space-y-6">
            {/* Climate info */}
            {enrichment.clima && (
              <div className="rounded-2xl border border-border bg-muted/30 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Thermometer className="w-5 h-5 text-foreground" />
                  <h3 className="text-base font-bold text-foreground">Clima de la zona</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {enrichment.clima}
                </p>
                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  El clima local influye directamente en el tipo de averias que atendemos. Nuestros tecnicos conocen la zona y llegan preparados.
                </p>
              </div>
            )}

            {/* Unique facts */}
            {enrichment.datosUnicos.length > 0 && (
              <div className="rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6">
                <h3 className="text-base font-bold text-foreground mb-4">
                  Datos sobre {enrichment.municipio}
                </h3>
                <ul className="space-y-4">
                  {enrichment.datosUnicos.map((dato, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-foreground/40 flex-shrink-0 mt-2" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{dato}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA local */}
            <div className="rounded-2xl bg-foreground text-background p-6">
              <h3 className="text-base font-bold mb-2">
                {professionName} en {enrichment.municipio}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed mb-4">
                Conocemos la zona de {enrichment.municipio} y sus particularidades. Llegamos en 30 minutos con el material adecuado para resolver tu averia.
              </p>
              <a
                href="tel:936946639"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-background text-foreground font-bold text-sm hover:bg-background/90 transition-colors w-full justify-center"
              >
                Llamar al 936 946 639
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
