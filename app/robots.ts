import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/desatascos",
          "/desatascos/",
          "/desatascos-24-horas/",
          "/desatascos-urgentes/",
          "/precio-desatascos/",
          "/partners",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/0x/",
          "/_next/",
          "/electricista",
          "/fontanero",
          "/cerrajero",
          "/calderas",
          "/problema/",
          "/presupuesto-",
          "/precio-electricista",
          "/precio-fontanero",
          "/precio-cerrajero",
          "/precio-calderas",
          "/sitemap-cp",
          "/sitemap-files/",
        ],
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
    sitemap: "https://www.pronto-24.com/sitemap-v21.xml",
    host: "https://www.pronto-24.com",
  }
}
