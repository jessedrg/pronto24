import { neon } from "@neondatabase/serverless"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"

const sql = neon(process.env.DATABASE_URL!)

export const dynamic = "force-dynamic"

export default async function ContentAdminPage() {
  const [totalContent, contentByProfession, indexingStats, recentLogs] =
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
    ])

  const totalCPs = Object.keys(POSTAL_CODE_NAMES).length
  const generatedCPs = Number(totalContent[0].total_cps)
  const totalPages = Number(totalContent[0].total_pages)
  const progressPercent = ((generatedCPs / totalCPs) * 100).toFixed(1)

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Content Generation Dashboard
        </h1>
        <p className="text-muted-foreground mb-8">
          Sistema automatizado de generacion de contenido local con IA
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">CPs con contenido</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {generatedCPs.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              de {totalCPs.toLocaleString()} ({progressPercent}%)
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Paginas generadas</p>
            <p className="text-3xl font-bold text-foreground mt-1">
              {totalPages.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              CP x profesion
            </p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Pendientes indexar</p>
            <p className="text-3xl font-bold text-primary mt-1">
              {indexingStats
                .filter(
                  (r: { status: string; count: number }) =>
                    r.status === "pending"
                )
                .reduce(
                  (acc: number, r: { count: number }) => acc + Number(r.count),
                  0
                )
                .toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">en cola</p>
          </div>
          <div className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">Indexadas</p>
            <p className="text-3xl font-bold text-green-600 mt-1">
              {indexingStats
                .filter(
                  (r: { status: string; count: number }) =>
                    r.status === "submitted"
                )
                .reduce(
                  (acc: number, r: { count: number }) => acc + Number(r.count),
                  0
                )
                .toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              enviadas a Google
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rounded-xl border bg-card p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-foreground">
              Progreso de generacion
            </p>
            <p className="text-sm text-muted-foreground">
              {progressPercent}% completado
            </p>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            A ~400 paginas/dia, se completara en{" "}
            {Math.ceil(
              ((totalCPs - generatedCPs) * 5) / 400
            ).toLocaleString()}{" "}
            dias aprox.
          </p>
        </div>

        {/* Content by Profession */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Por profesion
            </h2>
            <div className="space-y-3">
              {contentByProfession.map(
                (row: { profession: string; count: number }) => (
                  <div key={row.profession} className="flex items-center gap-3">
                    <span className="text-sm font-medium text-foreground w-32 capitalize">
                      {row.profession}
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${(Number(row.count) / totalCPs) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-16 text-right">
                      {Number(row.count).toLocaleString()}
                    </span>
                  </div>
                )
              )}
              {contentByProfession.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No hay contenido generado aun. El cron se ejecuta a las 6:00,
                  14:00 y 22:00 UTC.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Estado de indexacion
            </h2>
            <div className="space-y-3">
              {indexingStats.map(
                (row: { status: string; count: number }) => (
                  <div key={row.status} className="flex items-center gap-3">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        row.status === "submitted"
                          ? "bg-green-500"
                          : row.status === "pending"
                            ? "bg-yellow-500"
                            : row.status === "failed"
                              ? "bg-red-500"
                              : "bg-muted-foreground"
                      }`}
                    />
                    <span className="text-sm font-medium text-foreground capitalize">
                      {row.status}
                    </span>
                    <span className="text-sm text-muted-foreground ml-auto">
                      {Number(row.count).toLocaleString()}
                    </span>
                  </div>
                )
              )}
              {indexingStats.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Sin datos de indexacion aun.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Logs */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Historial de generacion
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Fecha
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Batch
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    CPs
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Paginas
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Errores
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Duracion
                  </th>
                  <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                    Estado
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map(
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
                      <td className="py-2 px-3 text-foreground">
                        {new Date(log.created_at).toLocaleString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2 px-3 text-foreground">
                        {log.batch_size}
                      </td>
                      <td className="py-2 px-3 text-foreground">
                        {log.cps_generated ?? "-"}
                      </td>
                      <td className="py-2 px-3 text-foreground">
                        {log.pages_generated ?? "-"}
                      </td>
                      <td className="py-2 px-3 text-foreground">
                        {log.errors ?? "-"}
                      </td>
                      <td className="py-2 px-3 text-muted-foreground">
                        {log.duration_ms
                          ? `${(log.duration_ms / 1000).toFixed(1)}s`
                          : "-"}
                      </td>
                      <td className="py-2 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
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
                )}
                {recentLogs.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No hay ejecuciones registradas aun.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
