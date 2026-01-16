import type { MetadataRoute } from "next"
import { PROFESSIONS, PROBLEMS, getAllCities } from "@/lib/seo-data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rapidfix.es"
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
  ]

  // Add profession main pages
  for (const profession of PROFESSIONS) {
    routes.push({
      url: `${baseUrl}/${profession.id}`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    })

    // Add profession + city pages
    for (const city of cities) {
      routes.push({
        url: `${baseUrl}/${profession.id}/${city}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.8,
      })

      // Add urgent pages
      routes.push({
        url: `${baseUrl}/${profession.id}-urgente/${city}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.85,
      })
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
