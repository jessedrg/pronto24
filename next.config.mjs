/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },

  async rewrites() {
    return [
      {
        source: "/sitemap-v10.xml",
        destination: "/sitemap-v10.xml",
      },
      {
        source: "/sitemap.xml",
        destination: "/sitemap.xml",
      },
      {
        source: "/:slug.xml",
        destination: "/_sitemaps/:slug.xml",
      },
    ]
  },

}

export default nextConfig
