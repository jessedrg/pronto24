import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "rapidfix | Urgencias del hogar 24h",
  description:
    "Fontaneros, electricistas, cerrajeros, desatascos y calderas. Profesionales en tu puerta en menos de 30 minutos. 24h / 365 días.",
  keywords:
    "fontanero urgente, electricista 24 horas, cerrajero urgente, desatascos urgentes, reparación calderas, urgencias hogar",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "rapidfix | Urgencias del hogar 24h",
    description: "Profesionales en tu puerta en menos de 30 minutos.",
    type: "website",
    locale: "es_ES",
    siteName: "rapidfix",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16741652529" strategy="afterInteractive" />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16741652529');
          `}
        </Script>
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
