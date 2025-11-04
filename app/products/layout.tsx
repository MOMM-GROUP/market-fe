import type React from "react"
import { EarlyAccessGate } from "@/components/early-access-gate"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <EarlyAccessGate>{children}</EarlyAccessGate>
}
