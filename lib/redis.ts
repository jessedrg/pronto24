import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// Cache keys for AI-generated postal code content
export function getPostalContentKey(profession: string, postalcode: string): string {
  return `postal-content:${profession}:${postalcode}`
}
