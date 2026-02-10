"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  RefreshCw,
  Play,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Zap,
} from "lucide-react"

interface GenerationStats {
  overall: {
    total: number
    generated: number
    pending: number
    generating: number
    errored: number
    percentage: number
    totalWords: number
    avgWords: number
  }
  byProfession: Array<{
    profession_id: string
    total: number
    generated: number
    pending: number
    errored: number
  }>
  byPageType: Array<{
    page_type: string
    total: number
    generated: number
    pending: number
    errored: number
  }>
  recentRuns: Array<{
    id: number
    batch_size: number
    pages_processed: number
    pages_success: number
    pages_error: number
    duration_ms: number
    status: string
    created_at: string
  }>
  recentErrors: Array<{
    profession_id: string
    city_slug: string
    problem_id: string | null
    page_url: string
    ai_error_message: string
    updated_at: string
  }>
  recentGenerated: Array<{
    profession_id: string
    city_slug: string
    problem_id: string | null
    page_url: string
    ai_word_count: number
    ai_generated_at: string
  }>
}

const PROFESSION_LABELS: Record<string, string> = {
  electricista: "Electricista",
  fontanero: "Fontanero",
  cerrajero: "Cerrajero",
  desatascos: "Desatascos",
  calderas: "Calderas",
}

export default function ContentGenerationDashboard() {
  const [stats, setStats] = useState<GenerationStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/generation-status")
      if (res.ok) {
        const data = await res.json()
        setStats(data)
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(fetchStats, 5000)
    return () => clearInterval(interval)
  }, [autoRefresh, fetchStats])

  const triggerAction = async (action: string) => {
    setActionLoading(action)
    try {
      const res = await fetch("/api/admin/trigger-generation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })
      if (res.ok) {
        setAutoRefresh(true)
        setTimeout(fetchStats, 2000)
      }
    } catch (err) {
      console.error("Action failed:", err)
    } finally {
      setActionLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          <p className="text-muted-foreground">Cargando estadisticas...</p>
        </div>
      </div>
    )
  }

  const overall = stats?.overall

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Generacion de Contenido AI
            </h1>
            <p className="text-muted-foreground mt-1">
              Panel de control para la generacion masiva de contenido unico por pagina
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setAutoRefresh(!autoRefresh)
                fetchStats()
              }}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${autoRefresh ? "animate-spin" : ""}`} />
              {autoRefresh ? "Auto-refresh ON" : "Refrescar"}
            </Button>
            <Button
              size="sm"
              onClick={() => triggerAction("start")}
              disabled={actionLoading === "start"}
            >
              {actionLoading === "start" ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Iniciar Generacion
            </Button>
          </div>
        </div>

        {/* Overall Progress */}
        <Card className="mb-6 border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <Zap className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Progreso Total</p>
                    <p className="text-2xl font-bold text-foreground">
                      {overall?.percentage || 0}%
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {overall?.generated || 0} / {overall?.total || 0} paginas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {(overall?.totalWords || 0).toLocaleString()} palabras totales
                  </p>
                </div>
              </div>
              <Progress value={overall?.percentage || 0} className="h-3" />
              <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{overall?.total || 0}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{overall?.generated || 0}</p>
                  <p className="text-xs text-muted-foreground">Generadas</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-amber-600">{overall?.pending || 0}</p>
                  <p className="text-xs text-muted-foreground">Pendientes</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{overall?.generating || 0}</p>
                  <p className="text-xs text-muted-foreground">Generando</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{overall?.errored || 0}</p>
                  <p className="text-xs text-muted-foreground">Errores</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* By Profession */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Por Profesion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {stats?.byProfession?.map((prof) => {
                  const total = parseInt(String(prof.total)) || 0
                  const generated = parseInt(String(prof.generated)) || 0
                  const pct = total > 0 ? Math.round((generated / total) * 100) : 0
                  return (
                    <div key={prof.profession_id} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {PROFESSION_LABELS[prof.profession_id] || prof.profession_id}
                        </span>
                        <span className="text-muted-foreground">
                          {generated}/{total} ({pct}%)
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  )
                })}
                {(!stats?.byProfession || stats.byProfession.length === 0) && (
                  <p className="text-sm text-muted-foreground">No hay datos todavia</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* By Page Type */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Por Tipo de Pagina</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                {stats?.byPageType?.map((type) => {
                  const total = parseInt(String(type.total)) || 0
                  const generated = parseInt(String(type.generated)) || 0
                  const pct = total > 0 ? Math.round((generated / total) * 100) : 0
                  const typeLabels: Record<string, string> = {
                    city: "Paginas de Ciudad",
                    problem: "Paginas de Problema",
                    modifier: "Paginas de Modificador",
                  }
                  return (
                    <div key={type.page_type} className="flex flex-col gap-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">
                          {typeLabels[type.page_type] || type.page_type}
                        </span>
                        <span className="text-muted-foreground">
                          {generated}/{total} ({pct}%)
                        </span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                  )
                })}
                {(!stats?.byPageType || stats.byPageType.length === 0) && (
                  <p className="text-sm text-muted-foreground">No hay datos todavia</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mb-6 border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Acciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => triggerAction("start")}
                disabled={!!actionLoading}
              >
                {actionLoading === "start" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Play className="h-4 w-4 mr-2" />
                )}
                Iniciar / Continuar Generacion
              </Button>
              <Button
                variant="outline"
                onClick={() => triggerAction("retry-errors")}
                disabled={!!actionLoading}
              >
                {actionLoading === "retry-errors" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RotateCcw className="h-4 w-4 mr-2" />
                )}
                Reintentar Errores ({overall?.errored || 0})
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  if (window.confirm("Esto eliminara todo el contenido generado y empezara de nuevo. Continuar?")) {
                    triggerAction("reset-all")
                  }
                }}
                disabled={!!actionLoading}
              >
                {actionLoading === "reset-all" ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <AlertTriangle className="h-4 w-4 mr-2" />
                )}
                Reset Completo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Runs & Errors */}
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          {/* Recent Runs */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Ejecuciones Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {stats?.recentRuns?.map((run) => (
                  <div
                    key={run.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={run.pages_error > 0 ? "destructive" : "default"}
                          className="text-xs"
                        >
                          {run.pages_success} ok / {run.pages_error} err
                        </Badge>
                        <span className="text-muted-foreground">
                          {Math.round(run.duration_ms / 1000)}s
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(run.created_at).toLocaleString("es-ES")}
                    </span>
                  </div>
                ))}
                {(!stats?.recentRuns || stats.recentRuns.length === 0) && (
                  <p className="text-sm text-muted-foreground">No hay ejecuciones todavia</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Recent Errors */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Errores Recientes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
                {stats?.recentErrors?.map((err, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm"
                  >
                    <p className="font-medium text-red-800">{err.page_url}</p>
                    <p className="text-red-600 text-xs mt-1 line-clamp-2">
                      {err.ai_error_message}
                    </p>
                  </div>
                ))}
                {(!stats?.recentErrors || stats.recentErrors.length === 0) && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Sin errores
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recently Generated */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Paginas Generadas Recientemente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 max-h-80 overflow-y-auto">
              {stats?.recentGenerated?.map((page, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border p-3 text-sm"
                >
                  <div>
                    <a
                      href={page.page_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-accent hover:underline"
                    >
                      {page.page_url}
                    </a>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {page.ai_word_count} palabras
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {page.ai_generated_at
                      ? new Date(page.ai_generated_at).toLocaleString("es-ES")
                      : "-"}
                  </span>
                </div>
              ))}
              {(!stats?.recentGenerated || stats.recentGenerated.length === 0) && (
                <p className="text-sm text-muted-foreground">No hay paginas generadas todavia</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info box */}
        <div className="mt-6 rounded-lg border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-2">Como funciona el sistema:</p>
          <ul className="list-disc list-inside flex flex-col gap-1">
            <li>Cada pagina recibe contenido AI unico generado con GPT-4o-mini, adaptado a la ciudad, profesion y problema especifico.</li>
            <li>El cron procesa {10} paginas por lote, luego se auto-encadena para continuar con el siguiente lote.</li>
            <li>El contenido incluye: intro local, contexto de la zona, detalles del servicio, precios, prevencion, FAQs, informacion de barrio, tips estacionales y guia de emergencia.</li>
            <li>Cada pagina tendra entre 1.500 y 2.500 palabras unicas de contenido AI, haciendo imposible que sea marcada como "thin content".</li>
            <li>Media de palabras por pagina: <strong>{overall?.avgWords || 0}</strong></li>
          </ul>
        </div>
      </div>
    </main>
  )
}
