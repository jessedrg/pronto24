"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const SESSION_COOKIE = "admin_session"
// Simple hash to avoid storing raw password in cookie
function hashToken(password: string): string {
  let hash = 0
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return `admin_${Math.abs(hash).toString(36)}_${password.length}`
}

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const password = formData.get("password") as string

  if (!password) {
    return { error: "Introduce la contrasena" }
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: "Contrasena incorrecta" }
  }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, hashToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/admin",
  })

  redirect("/admin/content")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
  redirect("/admin/login")
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const session = cookieStore.get(SESSION_COOKIE)
  if (!session?.value) return false
  
  const expected = hashToken(process.env.ADMIN_PASSWORD || "")
  return session.value === expected
}
