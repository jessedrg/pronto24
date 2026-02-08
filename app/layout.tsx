import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Header } from "@/components/header"
import Script from "next/script"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "pronto-24.com | Servicios Urgentes 24h - Desatascos, Electricistas, Fontaneros",
  description:
    "pronto-24.com - Servicios de emergencia 24/7 en toda Espana. Desatascos urgentes, electricista 24h, fontanero express, cerrajero urgente. Respuesta en 10 minutos. Presupuesto gratis sin compromiso. Llama: 936 946 639",
  keywords:
    "desatasco urgente 24 horas, electricista urgente cerca de mi, fontanero urgente barato, cerrajero 24 horas, reparacion calderas urgente, servicio desatascos madrid, electricista barcelona 24h, fontanero valencia urgente, cerrajero sevilla, desatascador profesional",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "pronto-24.com - Servicios Urgentes 24/7 en Toda Espana",
    description: "Profesionales verificados en menos de 10 minutos. Presupuesto gratis sin compromiso. Llama: 936 946 639",
    type: "website",
    locale: "es_ES",
    siteName: "pronto-24.com",
    url: "https://www.pronto-24.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.pronto-24.com",
  },
  other: {
    "google-site-verification": "",
  },
  generator: 'v0.app'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* Preconnect hints for faster resource loading */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16741652529" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16741652529');
          `}
        </Script>

        {/* WebSite schema - enables sitelinks searchbox in SERP */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "pronto-24.com",
              alternateName: "Pronto 24",
              url: "https://www.pronto-24.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://www.pronto-24.com/{search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        {/* Organization schema - establishes entity identity */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "pronto-24.com",
              legalName: "Pronto 24 Servicios Urgentes",
              url: "https://www.pronto-24.com",
              logo: "https://www.pronto-24.com/favicon.svg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+34-936-946-639",
                contactType: "customer service",
                areaServed: "ES",
                availableLanguage: "Spanish",
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "00:00",
                  closes: "23:59",
                },
              },
              sameAs: [],
              areaServed: {
                "@type": "Country",
                name: "Spain",
              },
              serviceType: [
                "Electricista urgente",
                "Fontanero urgente",
                "Cerrajero urgente",
                "Desatascos urgentes",
                "Reparacion de calderas",
              ],
            }),
          }}
        />

        {/* LocalBusiness schema with correct phone */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "pronto-24.com",
              description: "Servicios de emergencia 24/7 en toda Espana. Electricistas, fontaneros, cerrajeros, desatascos y calderas.",
              telephone: "+34-936-946-639",
              url: "https://www.pronto-24.com",
              priceRange: "$$",
              openingHours: "Mo-Su 00:00-23:59",
              areaServed: {
                "@type": "Country",
                name: "Spain",
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Servicios de Emergencia",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Electricista Urgente 24h",
                      description: "Electricistas profesionales disponibles 24/7. Apagones, cortocircuitos, cuadros electricos.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Fontanero Urgente 24h",
                      description: "Fontaneros profesionales para emergencias. Fugas, tuberias rotas, inundaciones.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Cerrajero Urgente 24h",
                      description: "Cerrajeros de urgencia. Aperturas sin danos, cambio de cerraduras, bombines.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Desatascos Urgentes 24h",
                      description: "Servicio de desatascos con equipo profesional. WC, fregaderos, bajantes.",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Reparacion de Calderas 24h",
                      description: "Tecnicos de calderas certificados. Todas las marcas, revision y reparacion.",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`} suppressHydrationWarning>
        <ScrollToTop />
        <Header />
        {children}
      </body>
    </html>
  )
}
