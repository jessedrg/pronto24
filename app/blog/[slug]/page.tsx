import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { Clock, ArrowLeft, ArrowRight, Phone, MapPin } from "lucide-react"
import { Footer } from "@/components/footer"
import { BLOG_ARTICLES, getArticleBySlug, getRelatedArticles } from "@/lib/blog-data"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return BLOG_ARTICLES.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: "No encontrado" }

  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: {
      canonical: `https://www.pronto-24.com/blog/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      locale: "es_ES",
      siteName: "pronto-24.com",
    },
  }
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  desatascos: { label: "Desatascos", color: "bg-teal-500/10 text-teal-600" },
  prevencion: { label: "Prevención", color: "bg-blue-500/10 text-blue-600" },
  guia: { label: "Guía Práctica", color: "bg-amber-500/10 text-amber-600" },
  precios: { label: "Precios", color: "bg-purple-500/10 text-purple-600" },
}

function cityDisplayName(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
}

function renderMarkdown(content: string): string {
  let html = content
    .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-8 mb-3 text-foreground">$1</h3>')
    .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-10 mb-4 text-foreground">$1</h2>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*$)/gm, '<li class="ml-4 pl-2 py-0.5">$1</li>')
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc space-y-1 my-4 text-muted-foreground">$&</ul>')
    .replace(/^\| (.+) \|$/gm, (match) => {
      const cells = match.split("|").filter(Boolean).map((c) => c.trim())
      const row = cells.map((c) => `<td class="px-4 py-2 border-b border-border text-sm">${c}</td>`).join("")
      return `<tr>${row}</tr>`
    })
    .replace(/(<tr>.*<\/tr>\n?)+/g, '<div class="overflow-x-auto my-6"><table class="w-full border border-border rounded-lg overflow-hidden"><tbody>$&</tbody></table></div>')
    .replace(/^(?!<[hultd])((?!^\s*$).+)$/gm, '<p class="text-muted-foreground leading-relaxed my-3">$1</p>')

  return html
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const related = getRelatedArticles(slug)

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: "pronto-24.com" },
    publisher: {
      "@type": "Organization",
      name: "pronto-24.com",
      logo: { "@type": "ImageObject", url: "https://www.pronto-24.com/favicon.svg" },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.pronto-24.com/blog/${article.slug}`,
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="h-14" />

      <main className="flex-1">
        {/* Article header */}
        <section className="bg-foreground text-background py-12 px-4">
          <div className="max-w-3xl mx-auto space-y-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-sm text-background/50 hover:text-background transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Volver al blog
            </Link>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_LABELS[article.category]?.color}`}>
                {CATEGORY_LABELS[article.category]?.label}
              </span>
              <span className="flex items-center gap-1 text-sm text-background/50">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime} min de lectura
              </span>
              <span className="text-sm text-background/50">
                Actualizado: {new Date(article.updatedAt).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-lg text-background/60 leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </section>

        {/* Article content */}
        <article className="max-w-3xl mx-auto px-4 py-12">
          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(article.content) }}
          />
        </article>

        {/* Inline CTA */}
        <section className="max-w-3xl mx-auto px-4 pb-12">
          <div className="rounded-2xl bg-foreground text-background p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">¿Necesitas un desatasco profesional?</h2>
            <p className="text-background/60">
              Técnicos con camión cuba en tu puerta en menos de 30 minutos. Presupuesto gratis por teléfono. Servicio 24 horas.
            </p>
            <a
              href="tel:+34936946639"
              className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl transition-colors"
            >
              <Phone className="w-5 h-5" />
              Llamar 936 946 639
            </a>
          </div>
        </section>

        {/* City interlinking */}
        {article.relatedCities.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 pb-12">
            <h2 className="text-xl font-bold mb-4">Desatascos disponibles en tu ciudad</h2>
            <div className="flex flex-wrap gap-2">
              {article.relatedCities.map((city) => (
                <Link
                  key={city}
                  href={`/desatascos/${city}`}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border text-sm hover:border-teal-500/30 hover:text-teal-600 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  Desatascos en {cityDisplayName(city)}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related articles */}
        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-4 pb-16">
            <h2 className="text-xl font-bold mb-4">Artículos relacionados</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block rounded-2xl border border-border p-5 hover:border-teal-500/30 transition-all space-y-2"
                >
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_LABELS[r.category]?.color}`}>
                    {CATEGORY_LABELS[r.category]?.label}
                  </span>
                  <h3 className="font-semibold group-hover:text-teal-600 transition-colors leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
