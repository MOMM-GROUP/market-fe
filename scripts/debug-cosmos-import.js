import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function debugCosmosImport() {
  try {
    console.log("[v0] Starting database debug check...")

    // Check total products count
    const { data: totalProducts, error: totalError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })

    if (totalError) throw totalError
    console.log("[v0] Total products in database:", totalProducts?.length || 0)

    // Check if COSMOS vendor exists
    const { data: cosmosVendor, error: vendorError } = await supabase
      .from("vendors")
      .select("*")
      .ilike("business_name", "%cosmos%")

    if (vendorError) throw vendorError
    console.log("[v0] COSMOS vendor found:", cosmosVendor?.length > 0 ? "YES" : "NO")
    if (cosmosVendor?.length > 0) {
      console.log("[v0] COSMOS vendor details:", cosmosVendor[0])
    }

    // Check products from COSMOS vendor
    if (cosmosVendor?.length > 0) {
      const { data: cosmosProducts, error: productsError } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true })
        .eq("vendor_id", cosmosVendor[0].id)

      if (productsError) throw productsError
      console.log("[v0] Products from COSMOS vendor:", cosmosProducts?.length || 0)

      // Show first few COSMOS products
      const { data: sampleProducts, error: sampleError } = await supabase
        .from("products")
        .select("name, brand, price, is_active")
        .eq("vendor_id", cosmosVendor[0].id)
        .limit(5)

      if (sampleError) throw sampleError
      console.log("[v0] Sample COSMOS products:", sampleProducts)
    }

    // Check certifications
    const { data: certifications, error: certError } = await supabase
      .from("certifications")
      .select("*")
      .or("name.ilike.%cosmos%,name.ilike.%ecocert%")

    if (certError) throw certError
    console.log("[v0] COSMOS/ECOCERT certifications found:", certifications?.length || 0)
    console.log("[v0] Certifications:", certifications)

    // Check entity certifications
    const { data: entityCerts, error: entityError } = await supabase
      .from("entity_certifications")
      .select(`
        *,
        certifications!inner(name)
      `)
      .or("certifications.name.ilike.%cosmos%,certifications.name.ilike.%ecocert%")

    if (entityError) throw entityError
    console.log("[v0] Entity certifications linked:", entityCerts?.length || 0)

    // Check categories
    const { data: categories, error: catError } = await supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10)

    if (catError) throw catError
    console.log("[v0] Recent categories:", categories)

    // Check for any recent products (last 24 hours)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    const { data: recentProducts, error: recentError } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .gte("created_at", yesterday.toISOString())

    if (recentError) throw recentError
    console.log("[v0] Products created in last 24 hours:", recentProducts?.length || 0)

    console.log("[v0] Debug check completed!")
  } catch (error) {
    console.error("[v0] Error during debug check:", error)
    console.error("[v0] Error details:", error.message)
  }
}

debugCosmosImport()
