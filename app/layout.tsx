import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import { Header } from "@/components/header"
import { FloatingCallButton } from "@/components/floating-call-button"
import Script from "next/script"
import "./globals.css"

const geistSans = Geist({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: "Electricista, Fontanero y Cerrajero Urgente 24h | pronto-24.com",
  description:
    "Servicios de emergencia 24/7 en toda Espana. Electricistas, fontaneros, cerrajeros y desatascos urgentes. Llegamos en 30 minutos. Presupuesto gratis. Llama: 936 946 639",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "pronto-24.com - Servicios Urgentes 24/7 en Toda Espana",
    description: "Profesionales verificados en un maximo de 30 minutos. Presupuesto gratis sin compromiso. Llama: 936 946 639",
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
    languages: {
      "es-ES": "https://www.pronto-24.com",
    },
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover" as const,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* DNS prefetch for Google Ads - loaded lazily to avoid blocking */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16741652529" strategy="lazyOnload" />
        <Script id="google-ads" strategy="lazyOnload">
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
              areaServed: {
                "@type": "Country",
                name: "Spain",
              },
            }),
          }}
        />
      </head>
      <body className={`${geistSans.className} antialiased`} suppressHydrationWarning>
        <Header />
        <div className="pt-14">
          {children}
        </div>
        <FloatingCallButton />
      </body>
    </html>
  )
}
