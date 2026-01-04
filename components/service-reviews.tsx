"use client"

import { Star, CheckCircle2, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Review {
  name: string
  location: string
  rating: 5
  date: string
  text: string
  service: string
  verified: boolean
}

interface ServiceReviewsProps {
  service: string
  reviews: Review[]
}

export function ServiceReviews({ service, reviews }: ServiceReviewsProps) {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-black text-black" />
              ))}
            </div>
            <span className="text-2xl font-bold">4.9/5</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">Más de 15.000 clientes satisfechos</h2>
          <p className="text-lg text-neutral-600">Opiniones verificadas de clientes reales en toda España</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold">{review.name}</h3>
                    {review.verified && <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  </div>
                  <p className="text-sm text-neutral-600">{review.location}</p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-black text-black" />
                  ))}
                </div>
              </div>

              <p className="text-neutral-700 mb-4 leading-relaxed">{review.text}</p>

              <div className="flex items-center justify-between text-sm text-neutral-500">
                <span className="font-medium">{review.service}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{review.date}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-white px-8 py-4 rounded-lg shadow-sm">
            <div>
              <div className="text-3xl font-bold">15.247</div>
              <div className="text-sm text-neutral-600">Servicios realizados</div>
            </div>
            <div className="w-px h-12 bg-neutral-200" />
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-neutral-600">Satisfacción</div>
            </div>
            <div className="w-px h-12 bg-neutral-200" />
            <div>
              <div className="text-3xl font-bold">24min</div>
              <div className="text-sm text-neutral-600">Tiempo medio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
