import { getSQL } from "@/lib/db"
import type { LocalEnrichment } from "@/lib/local-enrichment"
import { getLocalEnrichment as getStaticEnrichment } from "@/lib/local-enrichment"
import { getPostalCodeData, getCityFromPostalCode } from "@/lib/postal-data"
import { POSTAL_CODE_NAMES } from "@/lib/postal-code-names"

/**
 * DB content schema (what the AI generates and we store as JSONB).
 */
interface DBContent {
  municipio: string
  descripcionLocal: string
  problemasLocales: string[]
  infraestructura: string
  datosUnicos: string[]
  clima: string | null
  tipoZona: "urbana" | "semiurbana" | "rural"
  consejo: string
}

/**
 * Get enriched content for a CP+profession page.
 * Priority: 1) Static enrichment (hand-crafted), 2) DB content (AI-generated), 3) null
 *
 * This function NEVER breaks the existing site -- if DB is down or empty,
 * it falls back gracefully to the static enrichment data.
 */
export async function getEnrichedContent(
  cp: string,
  professionId: string
): Promise<LocalEnrichment | null> {
  // 1) Always try static enrichment first (highest quality, hand-crafted)
  const staticData = getStaticEnrichment(cp)
  if (staticData) return staticData

  // 2) Try DB content (AI-generated, profession-specific)
  try {
    const sql = getSQL()
    const rows = await sql`
      SELECT content FROM cp_generated_content
      WHERE postal_code = ${cp} AND profession = ${professionId} AND status = 'active'
      LIMIT 1
    `

    if (rows.length > 0 && rows[0].content) {
      const dbContent = rows[0].content as DBContent
      const postalData = getPostalCodeData(cp)
      const cityName = getCityFromPostalCode(cp)
      const cpName = POSTAL_CODE_NAMES[cp as keyof typeof POSTAL_CODE_NAMES] || cityName

      return {
        cp,
        municipio: dbContent.municipio || cpName,
        provincia: postalData?.provincia || "",
        comunidadAutonoma: postalData?.comunidad || "",
        poblacionAprox: "",
        tipoZona: dbContent.tipoZona || "urbana",
        clima: dbContent.clima || undefined,
        descripcionLocal: dbContent.descripcionLocal,
        problemasLocales: {
          [professionId]: dbContent.problemasLocales,
        },
        infraestructura: dbContent.infraestructura,
        datosUnicos: dbContent.datosUnicos,
      }
    }
  } catch (e) {
    // DB error -- fail silently, page still renders with generic content
    console.error("[v0] Error fetching DB content for", cp, professionId, e)
  }

  // 3) No enrichment available
  return null
}

/**
 * Check if a CP has any AI-generated content in the DB.
 */
export async function hasDBContent(cp: string): Promise<boolean> {
  try {
    const sql = getSQL()
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
