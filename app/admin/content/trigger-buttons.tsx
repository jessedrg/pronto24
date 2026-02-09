"use client"

import { useState } from "react"
import { triggerGenerationAction, triggerIndexingAction } from "./actions"

export function TriggerButtons() {
  const [loadingGenerate, setLoadingGenerate] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handleGenerate() {
    setLoadingGenerate(true)
    setResult(null)
    try {
      const data = await triggerGenerationAction()
      setResult(data.message)
    } catch (e) {
      setResult(`Error: ${e instanceof Error ? e.message : "desconocido"}`)
    } finally {
      setLoadingGenerate(false)
    }
  }

  async function handleIndexing() {
    setLoadingIndex(true)
    setResult(null)
    try {
      const data = await triggerIndexingAction()
      setResult(data.message)
    } catch (e) {
      setResult(`Error: ${e instanceof Error ? e.message : "desconocido"}`)
    } finally {
      setLoadingIndex(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <button
          onClick={handleGenerate}
          disabled={loadingGenerate}
          className="px-4 py-2 rounded-lg bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors disabled:opacity-50"
        >
          {loadingGenerate ? "Generando..." : "Generar contenido ahora"}
        </button>
        <button
          onClick={handleIndexing}
          disabled={loadingIndex}
          className="px-4 py-2 rounded-lg bg-background text-foreground font-medium text-sm border border-border hover:bg-muted transition-colors disabled:opacity-50"
        >
          {loadingIndex ? "Enviando..." : "Enviar a Google Indexing"}
        </button>
      </div>
      {result && (
        <div className="p-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground">
          {result}
        </div>
      )}
    </div>
  )
}
