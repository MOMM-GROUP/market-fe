import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // Using service role key for admin operations
)

// Read the CSV data from the attachment
const csvData = `Commercial name,COSMOS Signature,Brand name,Company name,Certified by,Version
"VIKING BEAUTY SECRETS - ORGANIC FACE CREAM","ORGANIC","VIKING BEAUTY SECRETS","VIKING BEAUTY SECRETS","ECOCERT GREENLIFE","V3.0"
"VIKING BEAUTY SECRETS - ORGANIC BODY LOTION","ORGANIC","VIKING BEAUTY SECRETS","VIKING BEAUTY SECRETS","ECOCERT GREENLIFE","V3.0"
"VIKING BEAUTY SECRETS - ORGANIC HAND CREAM","ORGANIC","VIKING BEAUTY SECRETS","VIKING BEAUTY SECRETS","ECOCERT GREENLIFE","V3.0"
"VIKING BEAUTY SECRETS - ORGANIC LIP BALM","ORGANIC","VIKING BEAUTY SECRETS","VIKING BEAUTY SECRETS","ECOCERT GREENLIFE","V3.0"
"VIKING BEAUTY SECRETS - ORGANIC BODY BUTTER","ORGANIC","VIKING BEAUTY SECRETS","VIKING BEAUTY SECRETS","ECOCERT GREENLIFE","V3.0"
"KORA Organics Noni Bright Vitamin C Serum","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Noni Night AHA Resurfacing Serum","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Turmeric Brightening & Exfoliating Mask","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Noni Glow Face Oil","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Milky Mushroom Gentle Cleansing Oil","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Noni Radiant Eye Oil","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Plant Stem Cell Retinol Alternative Serum","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Hydrating Moisturizer","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Cream Cleanser","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Enriched Body Lotion","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Body Oil","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"KORA Organics Invigorating Body Wash","ORGANIC","KORA Organics","KORA Organics Pty Ltd","ECOCERT GREENLIFE","V3.0"
"Tata Harper Clarifying Mask","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Purifying Cleanser","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Regenerating Cleanser","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Refreshing Cleanser","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Softening Cleanser","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Radiance Mask","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Daily Vitamin Refining Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Barrier Repair Moisturizer","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Multi-Peptide Moisturizer","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Softening Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Gentle Retinol Treatment","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Brightening Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Superkind Fragrance-Free Eye Crème","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Water-Lock Moisturizer","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Elixir Vitae Antioxidant Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Boosted Contouring Eye Balm","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Crème Riche Anti-Aging Peptide Night Moisturizer","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Retinoic Nutrient Face Oil","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Rejuvenating Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Restorative Eye Crème","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Replenishing Nutrient Complex","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Rebuilding Moisturizer","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Concentrated Brightening Essence","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Concentrated Brightening Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Honey Blossom Mask","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Illuminating Moisturizer","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Resurfacing Mask","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Resurfacing Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Hydrating Floral Essence","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Hydrating Hyaluronic Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Very Bronzing Face Oil","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Very Highlighting Serum","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Very Sculpting Face Oil","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Aromatic Stress Treatment","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Aromatic Irritability Treatment","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Tata Harper Body Oil","ORGANIC","Tata Harper","Tata Harper LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Unscented","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Vanilla Bean","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Coconut","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Mint","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Cherry","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Lime","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Orange","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Lemon","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Grapefruit","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Chocolate","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Root Beer","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Black Cherry","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Papaya","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Banana","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Almond","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Pitta","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Kapha","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Vata","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Earl Grey","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Green Tea","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Chai Spice","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Lip Balm - Coffee Bean","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Night Treatment","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Sun Protection SPF 15","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Tinted Lip Balm - Red","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Tinted Lip Balm - Pink","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Tinted Lip Balm - Berry","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Tinted Lip Balm - Aura","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Tinted Lip Balm - Noir","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"
"Hurraw! Tinted Lip Balm - Fuchsia","ORGANIC","Hurraw!","Hurraw! LLC","ECOCERT GREENLIFE","V3.0"`

// Parse CSV function
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

  return lines.slice(1).map((line) => {
    const values = []
    let current = ""
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '"') {
        inQuotes = !inQuotes
      } else if (char === "," && !inQuotes) {
        values.push(current.trim())
        current = ""
      } else {
        current += char
      }
    }
    values.push(current.trim())

    const obj = {}
    headers.forEach((header, index) => {
      obj[header] = values[index] || ""
    })
    return obj
  })
}

// Helper function to categorize products
function categorizeProduct(productName) {
  const name = productName.toLowerCase()

  if (name.includes("lip balm") || name.includes("lip")) return "Lip Care"
  if (name.includes("face cream") || name.includes("moisturizer") || name.includes("face oil")) return "Face Care"
  if (
    name.includes("body lotion") ||
    name.includes("body oil") ||
    name.includes("body wash") ||
    name.includes("body butter")
  )
    return "Body Care"
  if (name.includes("hand cream")) return "Hand Care"
  if (name.includes("eye") && (name.includes("cream") || name.includes("oil") || name.includes("balm")))
    return "Eye Care"
  if (name.includes("cleanser") || name.includes("cleansing")) return "Cleansers"
  if (name.includes("serum")) return "Serums"
  if (name.includes("mask")) return "Face Masks"
  if (name.includes("sun") || name.includes("spf")) return "Sun Care"
  if (name.includes("treatment")) return "Treatments"
  if (name.includes("essence")) return "Essences"

  return "Skincare"
}

// Helper function to generate realistic pricing
function generatePrice(productName, brand) {
  const name = productName.toLowerCase()
  const brandLower = brand.toLowerCase()

  // Premium brands
  if (brandLower.includes("tata harper") || brandLower.includes("kora organics")) {
    if (name.includes("serum") || name.includes("oil")) return Math.floor(Math.random() * 50) + 80 // $80-130
    if (name.includes("moisturizer") || name.includes("cream")) return Math.floor(Math.random() * 40) + 60 // $60-100
    if (name.includes("cleanser")) return Math.floor(Math.random() * 30) + 40 // $40-70
    if (name.includes("mask")) return Math.floor(Math.random() * 35) + 45 // $45-80
    return Math.floor(Math.random() * 40) + 50 // $50-90
  }

  // Mid-range brands
  if (brandLower.includes("viking beauty")) {
    if (name.includes("cream") || name.includes("lotion")) return Math.floor(Math.random() * 20) + 25 // $25-45
    if (name.includes("lip balm")) return Math.floor(Math.random() * 10) + 8 // $8-18
    return Math.floor(Math.random() * 15) + 20 // $20-35
  }

  // Affordable brands
  if (brandLower.includes("hurraw")) {
    if (name.includes("lip balm")) return Math.floor(Math.random() * 3) + 3 // $3-6
    if (name.includes("treatment") || name.includes("spf")) return Math.floor(Math.random() * 5) + 8 // $8-13
    return Math.floor(Math.random() * 4) + 4 // $4-8
  }

  // Default pricing
  return Math.floor(Math.random() * 30) + 20 // $20-50
}

async function importCosmosProducts() {
  try {
    console.log("[v0] Starting COSMOS products import...")

    // Parse the CSV data
    const products = parseCSV(csvData)
    console.log(`[v0] Parsed ${products.length} products from CSV`)

    // Create or get the COSMOS vendor
    const { data: existingVendor, error: vendorCheckError } = await supabase
      .from("vendors")
      .select("id")
      .eq("name", "COSMOS Certified Products")
      .single()

    let vendorId
    if (existingVendor) {
      vendorId = existingVendor.id
      console.log("[v0] Using existing COSMOS vendor")
    } else {
      const { data: newVendor, error: vendorError } = await supabase
        .from("vendors")
        .insert({
          name: "COSMOS Certified Products",
          description: "Premium organic and natural cosmetics certified by COSMOS standards",
          email: "info@cosmoscertified.com",
          phone: "+1-555-COSMOS",
          address: "123 Organic Beauty Lane",
          city: "Natural City",
          state: "CA",
          zip_code: "90210",
          country: "USA",
        })
        .select("id")
        .single()

      if (vendorError) {
        console.error("[v0] Error creating vendor:", vendorError)
        return
      }

      vendorId = newVendor.id
      console.log("[v0] Created new COSMOS vendor")
    }

    // Get or create categories
    const categoryNames = [...new Set(products.map((p) => categorizeProduct(p["Commercial name"])))]
    const categoryMap = {}

    for (const categoryName of categoryNames) {
      const { data: existingCategory } = await supabase
        .from("categories")
        .select("id")
        .eq("name", categoryName)
        .single()

      if (existingCategory) {
        categoryMap[categoryName] = existingCategory.id
      } else {
        const { data: newCategory, error: categoryError } = await supabase
          .from("categories")
          .insert({
            name: categoryName,
            description: `${categoryName} products certified by COSMOS standards`,
          })
          .select("id")
          .single()

        if (!categoryError && newCategory) {
          categoryMap[categoryName] = newCategory.id
        }
      }
    }

    console.log(`[v0] Created/found ${Object.keys(categoryMap).length} categories`)

    // Create or get COSMOS certifications
    const certificationBodies = [...new Set(products.map((p) => p["Certified by"]))]
    const certificationMap = {}

    for (const certBody of certificationBodies) {
      const { data: existingCert } = await supabase
        .from("certifications")
        .select("id")
        .eq("name", `COSMOS ${certBody}`)
        .single()

      if (existingCert) {
        certificationMap[certBody] = existingCert.id
      } else {
        const { data: newCert, error: certError } = await supabase
          .from("certifications")
          .insert({
            name: `COSMOS ${certBody}`,
            description: `COSMOS organic and natural cosmetics certification by ${certBody}`,
            issuing_organization: certBody,
            certification_type: "organic_cosmetics",
          })
          .select("id")
          .single()

        if (!certError && newCert) {
          certificationMap[certBody] = newCert.id
        }
      }
    }

    console.log(`[v0] Created/found ${Object.keys(certificationMap).length} certifications`)

    // Insert products in batches
    const batchSize = 50
    let insertedCount = 0

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize)

      const productsToInsert = batch.map((product) => {
        const category = categorizeProduct(product["Commercial name"])
        const price = generatePrice(product["Commercial name"], product["Brand name"])

        return {
          name: product["Commercial name"],
          description: `${product["COSMOS Signature"]} certified ${category.toLowerCase()} by ${product["Brand name"]}. Certified by ${product["Certified by"]} under COSMOS ${product["Version"]} standards.`,
          price: price,
          category_id: categoryMap[category],
          vendor_id: vendorId,
          stock_quantity: Math.floor(Math.random() * 100) + 20,
          sku: `COSMOS-${product["Brand name"].replace(/\s+/g, "").toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          brand: product["Brand name"],
          weight: Math.floor(Math.random() * 500) + 50,
          dimensions: `${Math.floor(Math.random() * 10) + 5}x${Math.floor(Math.random() * 10) + 5}x${Math.floor(Math.random() * 15) + 10}`,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
      })

      const { data: insertedProducts, error: insertError } = await supabase
        .from("products")
        .insert(productsToInsert)
        .select("id")

      if (insertError) {
        console.error(`[v0] Error inserting batch ${i / batchSize + 1}:`, insertError)
        continue
      }

      // Link products to certifications
      if (insertedProducts) {
        const certificationLinks = []

        insertedProducts.forEach((insertedProduct, index) => {
          const originalProduct = batch[index]
          const certificationId = certificationMap[originalProduct["Certified by"]]

          if (certificationId) {
            certificationLinks.push({
              entity_type: "product",
              entity_id: insertedProduct.id,
              certification_id: certificationId,
              certification_details: {
                cosmos_signature: originalProduct["COSMOS Signature"],
                version: originalProduct["Version"],
                company: originalProduct["Company name"],
              },
              certified_date: new Date().toISOString(),
              expiry_date: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString(), // 3 years from now
            })
          }
        })

        if (certificationLinks.length > 0) {
          const { error: linkError } = await supabase.from("entity_certifications").insert(certificationLinks)

          if (linkError) {
            console.error(`[v0] Error linking certifications for batch ${i / batchSize + 1}:`, linkError)
          }
        }
      }

      insertedCount += insertedProducts?.length || 0
      console.log(
        `[v0] Inserted batch ${i / batchSize + 1}/${Math.ceil(products.length / batchSize)} - Total: ${insertedCount}`,
      )
    }

    console.log(`[v0] Successfully imported ${insertedCount} COSMOS certified products!`)

    // Final verification
    const { data: finalCount } = await supabase
      .from("products")
      .select("id", { count: "exact" })
      .eq("vendor_id", vendorId)

    console.log(`[v0] Final verification: ${finalCount?.length || 0} products in database for COSMOS vendor`)
  } catch (error) {
    console.error("[v0] Import failed:", error)
  }
}

// Run the import
importCosmosProducts()
