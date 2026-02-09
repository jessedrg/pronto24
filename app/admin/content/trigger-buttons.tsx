"use client"

import { useState } from "react"
import { triggerGeneration, triggerIndexing } from "./actions"

export function TriggerButtons() {
  const [loadingGenerate, setLoadingGenerate] = useState(false)
  const [loadingIndex, setLoadingIndex] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handleGenerate() {
    setLoadingGenerate(true)
    setResult(null)
    try {
      const data = await triggerGeneration()
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
      const data = await triggerIndexing()
      setResult(data.message)
    } catch (e) {
      setResult(`Error: ${e instanceof Error ? e.message : "desconocido"}`)
    } finally {
      setLoadingIndex(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button
          onClick={handleGenerate}
          disabled={loadingGenerate}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loadingGenerate ? "Generando..." : "Generar ahora"}
        </button>
        <button
          onClick={handleIndexing}
          disabled={loadingIndex}
          className="px-3 py-1.5 text-xs font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loadingIndex ? "Enviando..." : "Indexar ahora"}
        </button>
      </div>
      {result && (
        <p className="text-xs text-muted-foreground max-w-md text-right">{result}</p>
      )}
    </div>
  )
}
