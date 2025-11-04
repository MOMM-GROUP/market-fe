import type React from "react"
import { redirect } from "next/navigation"
import { checkEarlyAccess } from "@/lib/early-access"

export async function EarlyAccessGate({ children }: { children: React.ReactNode }) {
  const { hasAccess } = await checkEarlyAccess()

  if (!hasAccess) {
    redirect("/early-access")
  }

  return <>{children}</>
}
