import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL)

async function debugCosmosImport() {
  try {
    console.log("[v0] Starting database debug check...")

    // Check total products count
    const totalProducts = await sql`SELECT COUNT(*) as count FROM products`
    console.log("[v0] Total products in database:", totalProducts[0].count)

    // Check if COSMOS vendor exists
    const cosmosVendor = await sql`SELECT * FROM vendors WHERE business_name ILIKE '%cosmos%'`
    console.log("[v0] COSMOS vendor found:", cosmosVendor.length > 0 ? "YES" : "NO")
    if (cosmosVendor.length > 0) {
      console.log("[v0] COSMOS vendor details:", cosmosVendor[0])
    }

    // Check products from COSMOS vendor
    if (cosmosVendor.length > 0) {
      const cosmosProducts = await sql`SELECT COUNT(*) as count FROM products WHERE vendor_id = ${cosmosVendor[0].id}`
      console.log("[v0] Products from COSMOS vendor:", cosmosProducts[0].count)

      // Show first few COSMOS products
      const sampleProducts = await sql`
        SELECT name, brand, price, is_active 
        FROM products 
        WHERE vendor_id = ${cosmosVendor[0].id} 
        LIMIT 5
      `
      console.log("[v0] Sample COSMOS products:", sampleProducts)
    }

    // Check certifications
    const certifications = await sql`SELECT * FROM certifications WHERE name ILIKE '%cosmos%' OR name ILIKE '%ecocert%'`
    console.log("[v0] COSMOS/ECOCERT certifications found:", certifications.length)
    console.log("[v0] Certifications:", certifications)

    // Check entity certifications
    const entityCerts = await sql`
      SELECT COUNT(*) as count 
      FROM entity_certifications ec
      JOIN certifications c ON ec.certification_id = c.id
      WHERE c.name ILIKE '%cosmos%' OR c.name ILIKE '%ecocert%'
    `
    console.log("[v0] Entity certifications linked:", entityCerts[0].count)

    // Check categories
    const categories = await sql`SELECT * FROM categories ORDER BY created_at DESC LIMIT 10`
    console.log("[v0] Recent categories:", categories)

    // Check for any recent products (last 24 hours)
    const recentProducts = await sql`
      SELECT COUNT(*) as count 
      FROM products 
      WHERE created_at > NOW() - INTERVAL '24 hours'
    `
    console.log("[v0] Products created in last 24 hours:", recentProducts[0].count)

    console.log("[v0] Debug check completed!")
  } catch (error) {
    console.error("[v0] Error during debug check:", error)
    console.error("[v0] Error details:", error.message)
  }
}

debugCosmosImport()
