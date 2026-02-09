import { neon } from "@neondatabase/serverless"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"
import { TriggerButtons } from "./trigger-buttons"

const sql = neon(process.env.DATABASE_URL!)

export const dynamic = "force-dynamic"

export default async function ContentAdminPage() {
  const [totalContent, contentByProfession, indexingStats, recentLogs, recentPages] =
    await Promise.all([
      sql`
      SELECT 
        COUNT(DISTINCT postal_code) as total_cps,
        COUNT(*) as total_pages
      FROM cp_generated_content 
      WHERE status = 'active'
    `,
      sql`
      SELECT profession, COUNT(*) as count 
      FROM cp_generated_content 
      WHERE status = 'active'
      GROUP BY profession 
      ORDER BY count DESC
    `,
      sql`
      SELECT status, COUNT(*) as count 
      FROM indexing_queue 
      GROUP BY status
    `,
      sql`
      SELECT * FROM content_generation_log 
      ORDER BY created_at DESC 
      LIMIT 15
    `,
      sql`
      SELECT postal_code, profession, created_at 
      FROM cp_generated_content 
      WHERE status = 'active'
      ORDER BY created_at DESC 
      LIMIT 20
    `,
    ])

  const totalCPs = Object.keys(POSTAL_CODE_NAMES).length
  const generatedCPs = Number(totalContent[0]?.total_cps || 0)
  const totalPages = Number(totalContent[0]?.total_pages || 0)
  const progressPercent = totalCPs > 0 ? ((generatedCPs / totalCPs) * 100).toFixed(1) : "0"
  const daysRemaining = Math.ceil(((totalCPs - generatedCPs) * 5) / 400)

  const pendingIndex = indexingStats
    .filter((r: { status: string }) => r.status === "pending")
    .reduce((acc: number, r: { count: number }) => acc + Number(r.count), 0)
  const submittedIndex = indexingStats
    .filter((r: { status: string }) => r.status === "submitted")
    .reduce((acc: number, r: { count: number }) => acc + Number(r.count), 0)
  const failedIndex = indexingStats
    .filter((r: { status: string }) => r.status === "failed")
    .reduce((acc: number, r: { count: number }) => acc + Number(r.count), 0)

  const professionLabels: Record<string, string> = {
    fontanero: "Fontanero",
    electricista: "Electricista",
    cerrajero: "Cerrajero",
    desatascos: "Desatascos",
    calderas: "Calderas",
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Panel de Contenido AI
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Generacion automatizada de contenido local para paginas de codigo postal
            </p>
          </div>
          <TriggerButtons />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">CPs cubiertos</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {generatedCPs.toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              de {totalCPs.toLocaleString("es-ES")}
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Paginas totales</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {totalPages.toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              CP x profesion
            </p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">En cola indexar</p>
            <p className="text-2xl font-bold text-yellow-600 mt-1">
              {pendingIndex.toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">pendientes</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Indexadas</p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {submittedIndex.toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">en Google</p>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Fallidas</p>
            <p className="text-2xl font-bold text-red-600 mt-1">
              {failedIndex.toLocaleString("es-ES")}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">errores</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rounded-lg border bg-card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">Progreso general</p>
            <p className="text-sm text-muted-foreground">{progressPercent}%</p>
          </div>
          <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(Number(progressPercent), 100)}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            A ~400 paginas/dia (3 ejecuciones), faltan ~{daysRemaining.toLocaleString("es-ES")} dias para cubrir todos los CPs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* By Profession */}
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Por profesion</h2>
            <div className="space-y-2.5">
              {contentByProfession.length > 0 ? (
                contentByProfession.map(
                  (row: { profession: string; count: number }) => (
                    <div key={row.profession} className="flex items-center gap-2">
                      <span className="text-xs font-medium text-foreground w-24">
                        {professionLabels[row.profession] || row.profession}
                      </span>
                      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{
                            width: `${Math.min((Number(row.count) / totalCPs) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground w-12 text-right tabular-nums">
                        {Number(row.count).toLocaleString("es-ES")}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  Sin contenido generado aun. Ejecuta el cron manualmente o espera al proximo ciclo.
                </p>
              )}
            </div>
          </div>

          {/* Indexing Status */}
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Estado indexacion</h2>
            <div className="space-y-2.5">
              {indexingStats.length > 0 ? (
                indexingStats.map(
                  (row: { status: string; count: number }) => {
                    const colors: Record<string, string> = {
                      pending: "bg-yellow-500",
                      submitted: "bg-green-500",
                      failed: "bg-red-500",
                    }
                    const labels: Record<string, string> = {
                      pending: "Pendiente",
                      submitted: "Enviada",
                      failed: "Fallida",
                    }
                    return (
                      <div key={row.status} className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${colors[row.status] || "bg-muted-foreground"}`} />
                        <span className="text-xs font-medium text-foreground">
                          {labels[row.status] || row.status}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto tabular-nums">
                          {Number(row.count).toLocaleString("es-ES")}
                        </span>
                      </div>
                    )
                  }
                )
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  Sin datos de indexacion.
                </p>
              )}
            </div>
          </div>

          {/* Recent Pages */}
          <div className="rounded-lg border bg-card p-4">
            <h2 className="text-sm font-semibold text-foreground mb-3">Ultimas paginas generadas</h2>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {recentPages.length > 0 ? (
                recentPages.map(
                  (row: { postal_code: string; profession: string; created_at: string }, i: number) => (
                    <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-border/50 last:border-0">
                      <a
                        href={`/${row.profession}/cp/${row.postal_code}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                      >
                        /{row.profession}/cp/{row.postal_code}/
                      </a>
                      <span className="text-muted-foreground tabular-nums">
                        {new Date(row.created_at).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )
                )
              ) : (
                <p className="text-xs text-muted-foreground py-4 text-center">
                  Sin paginas generadas aun.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Execution Log Table */}
        <div className="rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Historial de ejecuciones</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">Fecha</th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">Batch</th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">CPs</th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">Paginas</th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">Errores</th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">Duracion</th>
                  <th className="text-left py-2 px-2 text-muted-foreground font-medium">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.length > 0 ? recentLogs.map(
                  (log: {
                    id: number
                    created_at: string
                    batch_size: number
                    cps_generated: number
                    pages_generated: number
                    errors: number
                    duration_ms: number
                    status: string
                  }) => (
                    <tr key={log.id} className="border-b last:border-0">
                      <td className="py-2 px-2 text-foreground tabular-nums">
                        {new Date(log.created_at).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 px-2 text-foreground tabular-nums">{log.batch_size}</td>
                      <td className="py-2 px-2 text-foreground tabular-nums">{log.cps_generated ?? "-"}</td>
                      <td className="py-2 px-2 text-foreground tabular-nums">{log.pages_generated ?? "-"}</td>
                      <td className="py-2 px-2 text-foreground tabular-nums">{log.errors ?? "-"}</td>
                      <td className="py-2 px-2 text-muted-foreground tabular-nums">
                        {log.duration_ms ? `${(log.duration_ms / 1000).toFixed(1)}s` : "-"}
                      </td>
                      <td className="py-2 px-2">
                        <span
                          className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            log.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : log.status === "running"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  )
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground text-xs">
                      No hay ejecuciones registradas. Pulsa &quot;Generar ahora&quot; para empezar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Schedule Info */}
        <div className="mt-6 rounded-lg border border-dashed bg-card/50 p-4">
          <h3 className="text-xs font-semibold text-foreground mb-2">Horarios automaticos (UTC)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">Generacion:</span> 06:00, 14:00, 22:00 (~80 CPs x 5 profesiones = ~400 paginas/ejecucion)
            </div>
            <div>
              <span className="font-medium text-foreground">Indexacion:</span> 07:30, 15:30, 23:30 (envia a Google Indexing API, max 200/ejecucion)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
