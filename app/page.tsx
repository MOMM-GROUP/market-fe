import { createClient } from "@/lib/supabase/server"
import HomePageClient from "@/components/home-page-client"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MOMM - Shop Your Values, Own Your Impact | Ethical Marketplace",
  description:
    "Join the revolutionary marketplace where your purchases work for you. Track boycotts, verify ethical claims, earn profit sharing through the MOMM Vault. Shop from verified vendors who share your values. Stop funding billionaires.",
  alternates: {
    canonical: "https://www.momm.group",
  },
}

export default async function HomePage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      price,
      compare_at_price,
      featured_image_url,
      brand,
      category_id,
      vendor_id,
      is_active,
      vendors!inner (
        business_name,
        is_verified
      ),
      categories!inner (
        name,
        slug
      )
    `)
    .eq("is_active", true)
    .limit(8)

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug, image_url")
    .is("parent_id", null)
    .limit(6)

  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .order("priority", { ascending: false })
    .limit(50)

  return (
    <HomePageClient products={products || []} categories={categories || []} certifications={certifications || []} />
  )
}
