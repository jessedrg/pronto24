import { neon } from "@neondatabase/serverless"
import type { LocalEnrichment } from "@/lib/local-enrichment"
import { getLocalEnrichment as getStaticEnrichment } from "@/lib/local-enrichment"
import { getPostalCodeData } from "@/lib/postal-data"

const sql = neon(process.env.DATABASE_URL!)

interface DBContent {
  municipio: string
  poblacionAprox: string
  tipoZona: "urbana" | "semiurbana" | "rural"
  clima: string
  descripcionLocal: string
  problemasLocales: string[]
  infraestructura: string
  barriosZonas: string[]
  datosUnicos: string[]
}

/**
 * Fetch generated content from the database for a specific CP + profession.
 * Falls back to static enrichment data if no DB content exists.
 *
 * Priority order:
 * 1. AI-generated content from DB (most specific, profession-tailored)
 * 2. Static enrichment from local-enrichment.ts (manually curated)
 * 3. null (no enrichment available)
 */
export async function getEnrichedContent(
  cp: string,
  professionId: string
): Promise<LocalEnrichment | null> {
  try {
    const rows = await sql`
      SELECT content 
      FROM cp_generated_content 
      WHERE postal_code = ${cp} 
        AND profession = ${professionId}
        AND status = 'active'
      LIMIT 1
    `

    if (rows.length > 0 && rows[0].content) {
      const dbContent: DBContent =
        typeof rows[0].content === "string"
          ? JSON.parse(rows[0].content)
          : rows[0].content

      // Convert DB content to LocalEnrichment format
      const postalData = getPostalCodeData(cp)
      return {
        cp,
        municipio: dbContent.municipio,
        provincia: postalData?.provincia || "",
        comunidadAutonoma: postalData?.comunidad || "",
        poblacionAprox: dbContent.poblacionAprox,
        tipoZona: dbContent.tipoZona,
        clima: dbContent.clima,
        descripcionLocal: dbContent.descripcionLocal,
        problemasLocales: {
          [professionId]: dbContent.problemasLocales,
        },
        infraestructura: dbContent.infraestructura,
        barriosZonas: dbContent.barriosZonas,
        datosUnicos: dbContent.datosUnicos,
      }
    }
  } catch {
    // DB fetch failed, fall back to static
  }

  // Fallback to static enrichment
  return getStaticEnrichment(cp)
}

/**
 * Check if a CP has AI-generated content in the database.
 * Used for deciding whether to index the page.
 */
export async function hasDBContent(cp: string): Promise<boolean> {
  try {
    const rows = await sql`
      SELECT 1 FROM cp_generated_content 
      WHERE postal_code = ${cp} AND status = 'active'
      LIMIT 1
    `
    return rows.length > 0
  } catch {
    return false
  }
}

/**
 * Get stats about content generation progress.
 */
export async function getContentStats() {
  try {
    const [total, pending, recent] = await Promise.all([
      sql`SELECT COUNT(DISTINCT postal_code) as count FROM cp_generated_content WHERE status = 'active'`,
      sql`SELECT COUNT(*) as count FROM indexing_queue WHERE status = 'pending'`,
      sql`SELECT * FROM content_generation_log ORDER BY created_at DESC LIMIT 10`,
    ])

    return {
      totalCPsWithContent: total[0].count,
      pendingIndexing: pending[0].count,
      recentLogs: recent,
    }
  } catch {
    return {
      totalCPsWithContent: 0,
      pendingIndexing: 0,
      recentLogs: [],
    }
  }
}
