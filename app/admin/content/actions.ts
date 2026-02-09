"use server"

import { isAuthenticated } from "../auth-actions"
import { runGeneration } from "@/app/api/cron/generate-content/route"
import { runIndexing } from "@/app/api/cron/submit-indexing/route"

export async function triggerGenerationAction(): Promise<{ message: string }> {
  const authed = await isAuthenticated()
  if (!authed) return { message: "No autorizado" }

  try {
    const res = await runGeneration()
    const data = await res.json()
    if (res.ok) {
      return { message: `Generado: ${data.pagesGenerated ?? 0} paginas para ${data.cpsProcessed ?? 0} CPs (${data.durationMs ?? 0}ms)` }
    }
    return { message: `Error: ${data.error || "Error desconocido"}` }
  } catch (e) {
    return { message: `Error: ${e instanceof Error ? e.message : "desconocido"}` }
  }
}

export async function triggerIndexingAction(): Promise<{ message: string }> {
  const authed = await isAuthenticated()
  if (!authed) return { message: "No autorizado" }

  try {
    const res = await runIndexing()
    const data = await res.json()
    if (res.ok) {
      return { message: `Indexacion: ${data.submitted ?? 0} URLs enviadas a Google` }
    }
    return { message: `Error: ${data.error || "Error desconocido"}` }
  } catch (e) {
    return { message: `Error: ${e instanceof Error ? e.message : "desconocido"}` }
  }
}
