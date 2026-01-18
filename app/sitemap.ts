import type { MetadataRoute } from "next"
import { PROFESSIONS, PROBLEMS, getAllCities } from "@/lib/seo-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pronto24.xyz"
  const currentDate = new Date()
  const cities = getAllCities()

  const routes: MetadataRoute.Sitemap = [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    // Partners
    {
      url: `${baseUrl}/partners`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Profession main pages
    {
      url: `${baseUrl}/electricista`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fontanero`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cerrajero`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/desatascos`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/calderas`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]

  const modifiers = [
    // Alta urgencia (most important for SEO)
    "urgente", "24-horas", "ahora", "rapido", "emergencia",
    // Precio (high commercial intent)
    "economico", "barato", "precio", "presupuesto",
    // Disponibilidad
    "nocturno", "festivos", "fin-de-semana",
    // Ubicacion
    "cerca-de-mi", "a-domicilio",
    // Confianza
    "profesional", "con-garantia",
  ]

  // Add profession + city pages
  for (const profession of PROFESSIONS) {
    for (const city of cities) {
      // Base: /electricista/barcelona
      routes.push({
        url: `${baseUrl}/${profession.id}/${city}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      })

      // All modifiers: /electricista-urgente/barcelona, /electricista-24-horas/barcelona, etc.
      for (const modifier of modifiers) {
        routes.push({
          url: `${baseUrl}/${profession.id}-${modifier}/${city}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: modifier === "urgente" ? 0.85 : 0.8,
        })
      }
    }

    // Add problema + profession + problem + city pages
    const problems = PROBLEMS[profession.id as keyof typeof PROBLEMS] || []
    for (const problem of problems) {
      for (const city of cities) {
        routes.push({
          url: `${baseUrl}/problema/${profession.id}/${problem.id}/${city}`,
          lastModified: currentDate,
          changeFrequency: "weekly",
          priority: 0.75,
        })
      }
    }
  }

  return routes
}
