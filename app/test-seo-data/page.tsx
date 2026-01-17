import { PROFESSIONS, getCityDisplayName } from "@/lib/seo-data"

export default function TestSeoDataPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Test SEO Data Import</h1>
      <p>If you see this, lib/seo-data.ts imports work.</p>
      <p>Professions count: {PROFESSIONS.length}</p>
      <p>City display name for barcelona: {getCityDisplayName("barcelona")}</p>
    </div>
  )
}
