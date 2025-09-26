import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Navbar } from "@/components/navbar"
import { Suspense } from "react"
import { Footer } from "@/components/footer"
import { CategoryNav } from "@/components/category-nav"
import { AuthProvider } from "@/context/AuthContext"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "MarketPlace - Multi-Vendor Platform",
  description: "Your trusted marketplace connecting customers with verified vendors worldwide",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <CategoryNav />
              <main className="flex-1">{children}</main>
              <Footer />
            </Suspense>
          </div>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
