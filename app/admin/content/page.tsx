import { getSQL } from "@/lib/db"
import { TriggerButtons } from "./trigger-buttons"

interface Stats {
  totalGenerated: number
  totalPendingIndex: number
  totalSubmitted: number
  totalFailed: number
  professionBreakdown: { profession: string; count: number }[]
  recentLogs: {
    id: string
    created_at: string
    pages_generated: number
    cps_generated: number
    errors: number
    duration_ms: number
    status: string
  }[]
  recentContent: {
    postal_code: string
    profession: string
    created_at: string
    status: string
  }[]
}

async function getStats(): Promise<Stats> {
  const sql = getSQL()

  const [totalGen, pendingIdx, submittedIdx, failedIdx, profBreakdown, logs, recent] =
    await Promise.all([
      sql`SELECT COUNT(*) as count FROM cp_generated_content WHERE status = 'active'`,
      sql`SELECT COUNT(*) as count FROM indexing_queue WHERE status = 'pending'`,
      sql`SELECT COUNT(*) as count FROM indexing_queue WHERE status = 'submitted'`,
      sql`SELECT COUNT(*) as count FROM indexing_queue WHERE status = 'failed'`,
      sql`SELECT profession, COUNT(*) as count FROM cp_generated_content WHERE status = 'active' GROUP BY profession ORDER BY count DESC`,
      sql`SELECT id, created_at, pages_generated, cps_generated, errors, duration_ms, status FROM content_generation_log ORDER BY created_at DESC LIMIT 10`,
      sql`SELECT postal_code, profession, created_at, status FROM cp_generated_content ORDER BY created_at DESC LIMIT 20`,
    ])

  return {
    totalGenerated: Number(totalGen[0]?.count ?? 0),
    totalPendingIndex: Number(pendingIdx[0]?.count ?? 0),
    totalSubmitted: Number(submittedIdx[0]?.count ?? 0),
    totalFailed: Number(failedIdx[0]?.count ?? 0),
    professionBreakdown: profBreakdown.map((r) => ({
      profession: String(r.profession),
      count: Number(r.count),
    })),
    recentLogs: logs.map((r) => ({
      id: String(r.id),
      created_at: String(r.created_at),
      pages_generated: Number(r.pages_generated),
      cps_generated: Number(r.cps_generated),
      errors: Number(r.errors),
      duration_ms: Number(r.duration_ms),
      status: String(r.status),
    })),
    recentContent: recent.map((r) => ({
      postal_code: String(r.postal_code),
      profession: String(r.profession),
      created_at: String(r.created_at),
      status: String(r.status),
    })),
  }
}

export default async function AdminContentPage() {
  let stats: Stats
  try {
    stats = await getStats()
  } catch (e) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="p-6 rounded-xl border border-destructive/20 bg-destructive/5 max-w-md">
          <h1 className="text-lg font-bold text-foreground mb-2">Error cargando stats</h1>
          <p className="text-sm text-muted-foreground">{e instanceof Error ? e.message : "Error desconocido"}</p>
        </div>
      </div>
    )
  }

  // Estimate progress
  const totalPossiblePages = 11141 * 5 // all CPs x 5 professions
  const progressPercent = ((stats.totalGenerated / totalPossiblePages) * 100).toFixed(2)
  const daysRemaining = stats.totalGenerated > 0
    ? Math.ceil((totalPossiblePages - stats.totalGenerated) / (stats.totalGenerated / Math.max(1, stats.recentLogs.length)))
    : "?"

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Content Generation Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Sistema automatizado de generacion de contenido con IA + Google Indexing API
          </p>
        </div>

        {/* Manual triggers */}
        <div className="mb-8 p-6 rounded-2xl border border-border bg-muted/30">
          <h2 className="text-lg font-bold text-foreground mb-3">Acciones manuales</h2>
          <TriggerButtons />
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl border border-border bg-background">
            <p className="text-sm text-muted-foreground">Paginas generadas</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats.totalGenerated.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{progressPercent}% del total ({totalPossiblePages.toLocaleString()})</p>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-background">
            <p className="text-sm text-muted-foreground">Pendientes de indexar</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats.totalPendingIndex.toLocaleString()}</p>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-background">
            <p className="text-sm text-muted-foreground">Enviadas a Google</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats.totalSubmitted.toLocaleString()}</p>
          </div>
          <div className="p-5 rounded-2xl border border-border bg-background">
            <p className="text-sm text-muted-foreground">Fallidas</p>
            <p className="text-3xl font-bold text-foreground mt-1">{stats.totalFailed.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-8 p-5 rounded-2xl border border-border bg-background">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold text-foreground">Progreso total</h3>
            <span className="text-sm text-muted-foreground">~{daysRemaining} ejecuciones restantes</span>
          </div>
          <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all"
              style={{ width: `${Math.min(100, Number(progressPercent))}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {stats.totalGenerated.toLocaleString()} / {totalPossiblePages.toLocaleString()} paginas con contenido unico
          </p>
        </div>

        {/* Breakdown by profession */}
        {stats.professionBreakdown.length > 0 && (
          <div className="mb-8 p-5 rounded-2xl border border-border bg-background">
            <h3 className="text-sm font-bold text-foreground mb-3">Por profesion</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {stats.professionBreakdown.map((p) => (
                <div key={p.profession} className="p-3 rounded-xl bg-muted/30 border border-border">
                  <p className="text-xs text-muted-foreground capitalize">{p.profession}</p>
                  <p className="text-lg font-bold text-foreground">{p.count.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent generation logs */}
          <div className="p-5 rounded-2xl border border-border bg-background">
            <h3 className="text-sm font-bold text-foreground mb-3">Ultimas ejecuciones</h3>
            {stats.recentLogs.length === 0 ? (
              <p className="text-sm text-muted-foreground">Ninguna ejecucion todavia. Pulsa &quot;Generar contenido ahora&quot; para empezar.</p>
            ) : (
              <div className="space-y-2">
                {stats.recentLogs.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 border border-border">
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {log.pages_generated} paginas / {log.cps_generated} CPs
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(log.created_at).toLocaleString("es-ES")} - {(log.duration_ms / 1000).toFixed(1)}s
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {log.errors > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-medium">
                          {log.errors} err
                        </span>
                      )}
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        log.status === "completed" ? "bg-green-100 text-green-800" : "bg-muted text-muted-foreground"
                      }`}>
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent content */}
          <div className="p-5 rounded-2xl border border-border bg-background">
            <h3 className="text-sm font-bold text-foreground mb-3">Ultimo contenido generado</h3>
            {stats.recentContent.length === 0 ? (
              <p className="text-sm text-muted-foreground">Sin contenido generado todavia.</p>
            ) : (
              <div className="space-y-1.5">
                {stats.recentContent.map((c, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">{c.postal_code}</span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-foreground capitalize">{c.profession}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(c.created_at).toLocaleDateString("es-ES")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
