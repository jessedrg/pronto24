import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/0x/", "/_next/"],
      },
      {
        userAgent: "GPTBot",
        disallow: ["/"],
      },
      {
        userAgent: "CCBot",
        disallow: ["/"],
      },
    ],
    sitemap: [
      "https://www.pronto-24.com/sitemap-v21.xml",
      "https://www.pronto-24.com/sitemap-cp-index.xml",
      "https://www.pronto-24.com/sitemaps/sitemap-cat-index.xml",
    ],
    host: "https://www.pronto-24.com",
  }
}
