import { NextResponse } from "next/server"
import { KEPT_CITIES } from "@/lib/kept-cities"
import { BLOG_ARTICLES } from "@/lib/blog-data"

export const dynamic = "force-dynamic"
export const runtime = "nodejs"

const BASE_URL = "https://www.pronto-24.com"

export async function GET() {
  const now = new Date().toISOString()

  const urls: { loc: string; priority: string; changefreq: string }[] = []

  // Homepage
  urls.push({ loc: `${BASE_URL}/`, priority: "1.0", changefreq: "daily" })

  // Desatascos landing
  urls.push({ loc: `${BASE_URL}/desatascos`, priority: "0.9", changefreq: "weekly" })

  // Partners
  urls.push({ loc: `${BASE_URL}/partners`, priority: "0.7", changefreq: "monthly" })

  // Blog
  urls.push({ loc: `${BASE_URL}/blog`, priority: "0.8", changefreq: "weekly" })
  for (const article of BLOG_ARTICLES) {
    urls.push({ loc: `${BASE_URL}/blog/${article.slug}`, priority: "0.8", changefreq: "monthly" })
  }

  // 3 desatascos patterns × kept cities
  for (const city of KEPT_CITIES) {
    urls.push({ loc: `${BASE_URL}/desatascos/${city}`, priority: "0.9", changefreq: "weekly" })
    urls.push({ loc: `${BASE_URL}/desatascos-24-horas/${city}`, priority: "0.8", changefreq: "weekly" })
    urls.push({ loc: `${BASE_URL}/desatascos-urgentes/${city}`, priority: "0.8", changefreq: "weekly" })
  }

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const url of urls) {
    xml += `  <url>\n`
    xml += `    <loc>${url.loc}</loc>\n`
    xml += `    <lastmod>${now}</lastmod>\n`
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`
    xml += `    <priority>${url.priority}</priority>\n`
    xml += `  </url>\n`
  }

  xml += "</urlset>"

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  })
}
