import type { Metadata } from "next"
import Link from "next/link"
import { Clock, ArrowRight } from "lucide-react"
import { Footer } from "@/components/footer"
import { BLOG_ARTICLES } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Blog Desatascos: Guías, Precios y Consejos | pronto-24.com",
  description:
    "Guías profesionales de desatascos: precios reales, métodos caseros, prevención de atascos, cuándo llamar a un profesional. Consejos de técnicos expertos.",
  alternates: {
    canonical: "https://www.pronto-24.com/blog",
  },
  openGraph: {
    title: "Blog Desatascos - Guías y Consejos de Profesionales",
    description: "Todo lo que necesitas saber sobre desatascos, tuberías y prevención. Escrito por profesionales.",
    type: "website",
  },
}

const CATEGORY_LABELS: Record<string, { label: string; color: string }> = {
  desatascos: { label: "Desatascos", color: "bg-teal-500/10 text-teal-600" },
  prevencion: { label: "Prevención", color: "bg-blue-500/10 text-blue-600" },
  guia: { label: "Guía Práctica", color: "bg-amber-500/10 text-amber-600" },
  precios: { label: "Precios", color: "bg-purple-500/10 text-purple-600" },
}

export default function BlogPage() {
  const featured = BLOG_ARTICLES[0]
  const rest = BLOG_ARTICLES.slice(1)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="h-14" />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-foreground text-background py-16 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Blog de Desatascos
            </h1>
            <p className="text-xl text-background/60 max-w-2xl mx-auto">
              Guías profesionales, precios actualizados y consejos de prevención escritos por técnicos con años de experiencia.
            </p>
          </div>
        </section>

        {/* Featured article */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <Link
            href={`/blog/${featured.slug}`}
            className="group block rounded-3xl border border-border overflow-hidden hover:border-teal-500/30 transition-all hover:shadow-lg"
          >
            <div className="p-8 md:p-12 space-y-4">
              <div className="flex items-center gap-3 flex-wrap">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_LABELS[featured.category]?.color}`}>
                  {CATEGORY_LABELS[featured.category]?.label}
                </span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {featured.readingTime} min de lectura
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold group-hover:text-teal-600 transition-colors">
                {featured.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-2 text-teal-600 font-medium pt-2">
                <span>Leer artículo completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </section>

        {/* Article grid */}
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group block rounded-2xl border border-border p-6 hover:border-teal-500/30 transition-all hover:shadow-md space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${CATEGORY_LABELS[article.category]?.color}`}>
                    {CATEGORY_LABELS[article.category]?.label}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readingTime} min
                  </span>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-teal-600 transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-1.5 text-sm text-teal-600 font-medium pt-1">
                  <span>Leer más</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-foreground text-background py-16 px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">¿Necesitas un desatasco urgente?</h2>
            <p className="text-lg text-background/60">
              Técnicos profesionales con camión cuba en menos de 30 minutos. Presupuesto gratis por teléfono.
            </p>
            <a
              href="tel:+34936946639"
              className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold text-xl rounded-2xl transition-colors"
            >
              Llamar 936 946 639
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
