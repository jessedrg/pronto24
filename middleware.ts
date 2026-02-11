import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// =============================================================================
// PRONTO-24.COM URL CLEANUP MIDDLEWARE
// =============================================================================
// Strategy: Only desatascos service. Max ~500 URLs.
// Non-desatascos professions → 410 Gone + noindex
// Desatascos modifiers/cities → 301 redirect consolidation
// =============================================================================

import { KEPT_CITIES_SET } from "@/lib/kept-cities"

const BASE_URL = "https://www.pronto-24.com"

const ALL_PROFESSIONS = new Set(["electricista", "fontanero", "cerrajero", "desatascos", "calderas"])

const KNOWN_MODIFIERS = [
  "urgente", "24-horas", "ahora", "hoy", "rapido", "inmediato", "ya",
  "emergencia", "express", "24h", "urgencias", "sos", "al-momento",
  "economico", "barato", "low-cost", "mejor-precio", "asequible",
  "sin-compromiso", "gratis-presupuesto", "precios-justos", "oferta",
  "de-guardia", "nocturno", "festivos", "fin-de-semana", "mismo-dia",
  "sabados", "domingos", "noche", "365-dias",
  "cerca-de-mi", "a-domicilio", "zona", "centro", "local",
  "profesional", "de-confianza", "con-garantia", "autorizados", "certificado",
  "oficial", "titulado", "homologado", "experto", "especialista", "recomendado",
  "urgentes", "camion-cuba", "poceria", "con-camion", "arquetas",
  "urgente-24h", "barato-urgente", "rapido-economico", "urgente-barato",
  "24h-economico", "profesional-urgente", "economico-24h",
]

const KEPT_MODIFIERS = new Set(["", "24-horas", "urgentes"])

const MODIFIER_REDIRECT_MAP: Record<string, string> = {
  "urgente": "urgentes", "ahora": "24-horas", "hoy": "", "barato": "",
  "economico": "", "a-domicilio": "", "con-garantia": "", "profesional": "",
  "rapido": "24-horas", "inmediato": "24-horas", "cerca-de-mi": "",
  "de-confianza": "", "de-guardia": "24-horas", "nocturno": "24-horas",
  "festivos": "24-horas", "mismo-dia": "", "fin-de-semana": "24-horas",
  "ya": "24-horas", "emergencia": "24-horas", "express": "24-horas",
  "24h": "24-horas", "urgencias": "urgentes", "sos": "24-horas",
  "al-momento": "24-horas", "low-cost": "", "mejor-precio": "",
  "asequible": "", "sin-compromiso": "", "gratis-presupuesto": "",
  "precios-justos": "", "oferta": "", "sabados": "24-horas",
  "domingos": "24-horas", "noche": "24-horas", "365-dias": "24-horas",
  "zona": "", "centro": "", "local": "", "autorizados": "",
  "certificado": "", "oficial": "", "titulado": "", "homologado": "",
  "experto": "", "especialista": "", "recomendado": "",
  "camion-cuba": "", "poceria": "", "con-camion": "", "arquetas": "",
  "urgente-24h": "24-horas", "barato-urgente": "urgentes",
  "rapido-economico": "", "urgente-barato": "urgentes",
  "24h-economico": "24-horas", "profesional-urgente": "urgentes",
  "economico-24h": "24-horas",
}

function parseProfessionSlug(slug: string): { profession: string; modifier: string } | null {
  if (ALL_PROFESSIONS.has(slug)) return { profession: slug, modifier: "" }
  for (const mod of KNOWN_MODIFIERS) {
    const suffix = `-${mod}`
    if (slug.endsWith(suffix)) {
      const prof = slug.slice(0, -suffix.length)
      if (ALL_PROFESSIONS.has(prof)) return { profession: prof, modifier: mod }
    }
  }
  return null
}

function parsePrefixSlug(slug: string): { prefix: string; profession: string } | null {
  for (const prefix of ["precio", "presupuesto"]) {
    if (slug.startsWith(`${prefix}-`)) {
      const prof = slug.slice(prefix.length + 1)
      if (ALL_PROFESSIONS.has(prof)) return { prefix, profession: prof }
    }
  }
  return null
}

function buildDesatascosUrl(modifier: string, city?: string): string {
  const modPath = modifier ? `desatascos-${modifier}` : "desatascos"
  if (city && KEPT_CITIES_SET.has(city)) return `${BASE_URL}/${modPath}/${city}`
  return `${BASE_URL}/desatascos`
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip static/internal routes
  if (
    pathname === "/" ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/0x") ||
    pathname.startsWith("/sitemap") ||
    pathname.startsWith("/sitemaps") ||
    pathname.startsWith("/robots") ||
    pathname.startsWith("/partners") ||
    pathname.startsWith("/privacidad") ||
    pathname.startsWith("/terminos") ||
    pathname.startsWith("/aviso-legal") ||
    pathname.startsWith("/pago") ||
    pathname.startsWith("/lead") ||
    pathname.startsWith("/preguntas") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/images") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return NextResponse.next()

  // 1. /problema/:profession/:problem/:city
  if (segments[0] === "problema") {
    if (segments.length >= 4) {
      const prof = segments[1]
      const city = segments[3]
      if (prof === "desatascos") return NextResponse.redirect(buildDesatascosUrl("urgentes", city), 301)
      return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
    }
    if (segments.length >= 2 && segments[1] === "desatascos") {
      return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    }
    return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
  }

  // 2. /[profession]/cp/[postalcode] — all postal code URLs → 410 or redirect
  if (segments.length >= 3 && segments[1] === "cp") {
    const prof = segments[0]
    if (prof === "desatascos") {
      // Redirect desatascos CP pages to base desatascos page
      return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    }
    return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
  }

  // 3. /{prefix}-{profession}/{city}
  const prefixParsed = parsePrefixSlug(segments[0])
  if (prefixParsed) {
    const city = segments[1]
    if (prefixParsed.profession !== "desatascos") {
      return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
    }
    if (prefixParsed.prefix !== "precio") {
      if (city && KEPT_CITIES_SET.has(city)) return NextResponse.redirect(`${BASE_URL}/precio-desatascos/${city}`, 301)
      return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    }
    if (city && !KEPT_CITIES_SET.has(city)) return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    if (!city) return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    return NextResponse.next()
  }

  // 4. /{profession}[-{modifier}][/{city}]
  const parsed = parseProfessionSlug(segments[0])
  if (parsed) {
    const city = segments[1]
    if (parsed.profession !== "desatascos") {
      return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
    }
    if (parsed.modifier && !KEPT_MODIFIERS.has(parsed.modifier)) {
      const targetMod = MODIFIER_REDIRECT_MAP[parsed.modifier] ?? ""
      return NextResponse.redirect(buildDesatascosUrl(targetMod, city), 301)
    }
    if (parsed.modifier && !city) return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    if (!parsed.modifier && !city) return NextResponse.next()
    if (city && !KEPT_CITIES_SET.has(city)) return NextResponse.redirect(`${BASE_URL}/desatascos`, 301)
    return NextResponse.next()
  }

  // 5. Static profession pages
  if (segments.length === 1 && ALL_PROFESSIONS.has(segments[0]) && segments[0] !== "desatascos") {
    return new NextResponse("Gone", { status: 410, headers: { "X-Robots-Tag": "noindex" } })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)"],
}
