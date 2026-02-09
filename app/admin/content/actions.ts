"use server"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.pronto-24.com"

export async function triggerGenerationAction(): Promise<{ message: string }> {
  try {
    const res = await fetch(`${SITE_URL}/api/cron/generate-content`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
    })
    const data = await res.json()
    if (res.ok) {
      return { message: `Generado: ${data.pagesGenerated ?? 0} paginas para ${data.cpsProcessed ?? 0} CPs (${data.durationMs ?? 0}ms)` }
    }
    return { message: `Error: ${data.error || res.statusText}` }
  } catch (e) {
    return { message: `Error de red: ${e instanceof Error ? e.message : "desconocido"}` }
  }
}

export async function triggerIndexingAction(): Promise<{ message: string }> {
  try {
    const res = await fetch(`${SITE_URL}/api/cron/submit-indexing`, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.CRON_SECRET}` },
    })
    const data = await res.json()
    if (res.ok) {
      return { message: `Indexacion: ${data.submitted ?? 0} URLs enviadas a Google` }
    }
    return { message: `Error: ${data.error || res.statusText}` }
  } catch (e) {
    return { message: `Error de red: ${e instanceof Error ? e.message : "desconocido"}` }
  }
}
