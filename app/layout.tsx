import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

// --- IMPORTS ---
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CategoryNav } from "@/components/category-nav"
import { createClient } from "@/lib/supabase/server"
import { Providers } from "./providers"
import type { Category, ServerSession } from "@/lib/types"
import { checkEarlyAccess } from "@/lib/early-access"
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
  title: "MOMM - Ethical Marketplace Where Your Purchases Work For You",
  description:
    "Revolutionary multi-vendor marketplace connecting conscious consumers with verified ethical brands. Track boycotts, verify claims, earn profit sharing, and vote with your dollar. Stop funding billionaires, start funding yourself.",
  generator: "v0.app",
}

// --- SERVER-SIDE DATA FETCHING FUNCTION ---
async function getNavData() {
  const supabase = await createClient()
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser()

  let session: ServerSession | null = null
  let categories: Category[] = []
  const { hasAccess } = await checkEarlyAccess()

  if (authUser) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id, username, role, first_name, last_name, phone, address, city, state, zip_code, created_at")
      .eq("id", authUser.id)
      .single()

    if (profile) {
      session = {
        user: authUser,
        profile: { ...profile, email: authUser.email! },
      }
    }
  }

  if (!session || session.profile.role !== "vendor") {
    const { data: allCategories } = await supabase.from("categories").select("id, name, slug, parent_id")

    if (allCategories) {
      const categoryMap = new Map<string, Category>()
      const topLevelCategories: Category[] = []
      allCategories.forEach((category) => {
        const typedCategory: Category = { ...category, subcategories: [] }
        categoryMap.set(typedCategory.id, typedCategory)
      })
      allCategories.forEach((category) => {
        if (category.parent_id) {
          const parent = categoryMap.get(category.parent_id)
          if (parent) {
            const child = categoryMap.get(category.id)!
            parent.subcategories?.push(child)
          }
        } else {
          const topLevelCat = categoryMap.get(category.id)!
          topLevelCategories.push(topLevelCat)
        }
      })
      categories = topLevelCategories
    }
  }
  return { user: session, categories: categories, hasAccess }
}

// --- THE ROOT LAYOUT COMPONENT ---
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { user, categories, hasAccess } = await getNavData()

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable} ${jetbrainsMono.variable}`}>
        {/* {(process.env.NODE_ENV === "development" || process.env.VERCEL_ENV === "preview") && (
          // eslint-disable-next-line @next/next/no-sync-scripts
          <script
            data-recording-token={process.env.METICULOUS_DATA_RECORDING_TOKEN}
            data-is-production-environment="false"
            src="https://snippet.meticulous.ai/v1/meticulous.js"
          />
        )} */}
        <Providers serverSession={user}>
          <div className="min-h-screen flex flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar hasAccess={hasAccess} />
              <CategoryNav
                initialUser={user ? user.profile : null}
                initialCategories={categories}
                hasAccess={hasAccess}
              />
              <main className="flex-1">{children}</main>
              <Footer />
            </Suspense>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
