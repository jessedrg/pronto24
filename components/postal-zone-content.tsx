"use client"

import { useEffect, useState } from "react"
import { MapPin, Sparkles } from "lucide-react"

interface PostalZoneContentProps {
  profession: string
  professionName: string
  postalcode: string
  zoneName: string
  cityName: string
  provincia?: string
}

export function PostalZoneContent({
  profession,
  professionName,
  postalcode,
  zoneName,
  cityName,
  provincia,
}: PostalZoneContentProps) {
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const params = new URLSearchParams({
          profession,
          postalcode,
          zoneName,
          cityName,
          ...(provincia ? { provincia } : {}),
        })
        const res = await fetch(`/api/postal-content?${params}`)
        if (!res.ok) throw new Error("Failed to fetch")
        const data = await res.json()
        if (data.content) {
          setContent(data.content)
        } else {
          setError(true)
        }
      } catch {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [profession, postalcode, zoneName, cityName, provincia])

  if (error || (!loading && !content)) return null

  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-foreground/10 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {professionName} en {zoneName}
            </h2>
            <p className="text-sm text-muted-foreground">
              Informacion sobre el servicio en codigo postal {postalcode}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-muted rounded-lg w-full" />
            <div className="h-4 bg-muted rounded-lg w-11/12" />
            <div className="h-4 bg-muted rounded-lg w-10/12" />
            <div className="h-4 bg-muted rounded-lg w-full" />
            <div className="h-4 bg-muted rounded-lg w-9/12" />
          </div>
        ) : (
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed text-base">
              {content}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
