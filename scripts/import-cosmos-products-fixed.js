import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// COSMOS certified products data
const cosmosProductsData = `Commercial name,COSMOS Signature,Brand name,Company name,Certified by,Version
A9282 - Viking Beauty Exfoliating Face Scrub,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9285 - Viking Beauty Reviving Day cream,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9286 - Viking Beauty Reviving Night cream,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9287 - Viking Beauty Revitalizing Eye Cream,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9288 - Viking Beauty Glow Facial Oil,ORGANIC,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
A9289 - Viking Beauty Foam Cleanser,NATURAL,Viking Beauty Secrets Inc,VIKING BEAUTY SECRETS,ECOCERT GREENLIFE,3.1
Active Algae Balancing Probiotic Mask -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Calming Cleansing Balm -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Lightweight Moisturizer -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Active Algae Minty Mist -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Hurraw Apple Lip Balm,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Almond Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Coconut Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Mint Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hurraw! Vanilla Bean Lip Balm - 71% organic,NATURAL,Hurraw Balm LLC,Hurraw Balm LLC,ECOCERT GREENLIFE,3.1
Hyaluronic Gel Moisturizer,ORGANIC,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Hydrating Floral Essence,NATURAL,Tata Harper Skincare,TATA'S NATURAL ALCHEMY,ECOCERT GREENLIFE,3.1
Kakadu Plum Vitamin C Eye Cream -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Kakadu Plum Vitamin C Serum -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Noni Glow Face Oil -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Glow Foaming Cleanser -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1
Turmeric Glow Moisturizer -- KORA Organics,ORGANIC,KORA Organics,KORA US LLC,ECOCERT GREENLIFE,4.1`

// Parse CSV data
function parseCSV(csvText) {
  const lines = csvText.trim().split("\n")
  const headers = lines[0].split(",")
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = []
    let current = ""
    let inQuotes = false

    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j]

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

    if (values.length === headers.length) {
      const row = {}
      headers.forEach((header, index) => {
        row[header.trim()] = values[index]
      })
      data.push(row)
    }
  }

  return data
}

// Categorize products based on their names
function categorizeProduct(productName) {
  const name = productName.toLowerCase()

  if (name.includes("lip balm") || name.includes("lip ")) {
    return "Lip Care"
  } else if (name.includes("eye") || name.includes("contour")) {
    return "Eye Care"
  } else if (name.includes("cleanser") || name.includes("cleansing") || name.includes("wash")) {
    return "Cleansers"
  } else if (
    name.includes("moisturizer") ||
    name.includes("moisturiser") ||
    name.includes("cream") ||
    name.includes("lotion")
  ) {
    return "Face Care"
  } else if (name.includes("serum") || name.includes("essence")) {
    return "Serums"
  } else if (name.includes("mask") || name.includes("masque")) {
    return "Face Masks"
  } else if (name.includes("oil") && (name.includes("face") || name.includes("facial"))) {
    return "Face Care"
  } else if (name.includes("body") || name.includes("hand")) {
    return "Body Care"
  } else if (name.includes("sun") || name.includes("spf")) {
    return "Sun Care"
  } else {
    return "Skincare"
  }
}

// Generate price based on product type and brand
function generatePrice(productName, brand) {
  const name = productName.toLowerCase()
  const brandName = brand.toLowerCase()

  // Premium brands get higher prices
  const premiumBrands = ["kora organics", "tata harper", "chantecaille", "juice beauty"]
  const isPremium = premiumBrands.some((pb) => brandName.includes(pb))

  let basePrice = 15

  if (name.includes("serum") || name.includes("treatment")) {
    basePrice = isPremium ? 85 : 45
  } else if (name.includes("moisturizer") || name.includes("cream")) {
    basePrice = isPremium ? 75 : 35
  } else if (name.includes("cleanser") || name.includes("wash")) {
    basePrice = isPremium ? 45 : 25
  } else if (name.includes("oil")) {
    basePrice = isPremium ? 65 : 40
  } else if (name.includes("mask")) {
    basePrice = isPremium ? 55 : 30
  } else if (name.includes("lip balm")) {
    basePrice = isPremium ? 25 : 12
  } else if (name.includes("body") || name.includes("hand")) {
    basePrice = isPremium ? 40 : 20
  } else if (name.includes("set") || name.includes("kit") || name.includes("trio")) {
    basePrice = isPremium ? 120 : 65
  }

  // Add some variation
  const variation = Math.random() * 0.3 - 0.15 // ±15%
  return Math.round(basePrice * (1 + variation))
}

async function importCosmosProducts() {
  try {
    console.log("[v0] Starting COSMOS products import...")

    // Parse the CSV data
    const products = parseCSV(cosmosProductsData)
    console.log(`[v0] Parsed ${products.length} products from CSV`)

    // Create categories
    const categories = [
      "Lip Care",
      "Eye Care",
      "Cleansers",
      "Face Care",
      "Serums",
      "Face Masks",
      "Body Care",
      "Sun Care",
      "Skincare",
    ]

    console.log("[v0] Creating product categories...")
    const categoryMap = {}

    for (const categoryName of categories) {
      const { data: existingCategory, error: categoryError } = await supabase
        .from("categories")
        .select("id")
        .eq("name", categoryName)
        .single()

      if (existingCategory && !categoryError) {
        categoryMap[categoryName] = existingCategory.id
        console.log(`[v0] Found existing category: ${categoryName}`)
      } else {
        const { data: newCategory, error: insertError } = await supabase
          .from("categories")
          .insert({
            name: categoryName,
            slug: categoryName.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and"),
            description: `COSMOS certified ${categoryName.toLowerCase()} products`,
          })
          .select("id")
          .single()

        if (insertError) throw insertError
        categoryMap[categoryName] = newCategory.id
        console.log(`[v0] Created new category: ${categoryName}`)
      }
    }

    // Create COSMOS certifications
    console.log("[v0] Setting up COSMOS certifications...")
    const certificationBodies = ["ECOCERT GREENLIFE", "SOIL ASSOCIATION CERTIFICATION"]
    const certificationMap = {}

    for (const body of certificationBodies) {
      const certName = `COSMOS - ${body}`
      const { data: existingCert, error: certError } = await supabase
        .from("certifications")
        .select("id")
        .eq("name", certName)
        .single()

      if (existingCert && !certError) {
        certificationMap[body] = existingCert.id
        console.log(`[v0] Found existing certification: ${certName}`)
      } else {
        const { data: newCert, error: insertError } = await supabase
          .from("certifications")
          .insert({
            name: certName,
            category: "Organic/Natural",
            description: `COSMOS certification by ${body} - ensuring organic and natural cosmetic standards`,
            website_url: body.includes("ECOCERT") ? "https://www.ecocert.com" : "https://www.soilassociation.org",
          })
          .select("id")
          .single()

        if (insertError) throw insertError
        certificationMap[body] = newCert.id
        console.log(`[v0] Created new certification: ${certName}`)
      }
    }

    // Create a default vendor for COSMOS products
    console.log("[v0] Creating COSMOS vendor...")
    const { data: existingVendor, error: vendorError } = await supabase
      .from("vendors")
      .select("id")
      .eq("business_name", "COSMOS Certified Products")
      .single()

    let vendorId
    if (existingVendor && !vendorError) {
      vendorId = existingVendor.id
      console.log("[v0] Found existing COSMOS vendor")
    } else {
      const { data: newVendor, error: insertError } = await supabase
        .from("vendors")
        .insert({
          business_name: "COSMOS Certified Products",
          business_description:
            "Curated collection of COSMOS certified organic and natural cosmetic products from leading brands worldwide.",
          business_email: "info@cosmoscertified.com",
          is_verified: true,
          commission_rate: 0.15,
        })
        .select("id")
        .single()

      if (insertError) throw insertError
      vendorId = newVendor.id
      console.log("[v0] Created new COSMOS vendor")
    }

    // Insert products in batches
    console.log("[v0] Inserting products...")
    let insertedCount = 0

    for (const product of products) {
      try {
        const category = categorizeProduct(product["Commercial name"])
        const categoryId = categoryMap[category]
        const price = generatePrice(product["Commercial name"], product["Brand name"])

        // Generate SKU from product name
        const sku = product["Commercial name"]
          .replace(/[^a-zA-Z0-9\s]/g, "")
          .replace(/\s+/g, "-")
          .toUpperCase()
          .substring(0, 50)

        // Insert product
        const { data: insertedProduct, error: productError } = await supabase
          .from("products")
          .insert({
            name: product["Commercial name"],
            brand: product["Brand name"],
            description: `${product["COSMOS Signature"]} certified ${category.toLowerCase()} by ${product["Brand name"]}. Certified by ${product["Certified by"]} under COSMOS version ${product["Version"]}.`,
            price: price,
            compare_at_price: Math.round(price * 1.2),
            sku: sku,
            vendor_id: vendorId,
            category_id: categoryId,
            is_active: true,
            inventory_quantity: Math.floor(Math.random() * 100) + 10,
            notes: `Company: ${product["Company name"]} | COSMOS: ${product["COSMOS Signature"]} | Version: ${product["Version"]}`,
          })
          .select("id, name")
          .single()

        if (productError) throw productError

        // Link product to certification
        const certificationId = certificationMap[product["Certified by"]]
        if (certificationId) {
          const { error: certLinkError } = await supabase.from("entity_certifications").insert({
            entity_id: insertedProduct.id,
            entity_type: "product",
            certification_id: certificationId,
            verified: true,
            certification_data: {
              cosmos_signature: product["COSMOS Signature"],
              version: product["Version"],
              company: product["Company name"],
              certified_by: product["Certified by"],
            },
          })

          if (certLinkError) throw certLinkError
        }

        insertedCount++
        console.log(`[v0] Inserted: ${insertedProduct.name}`)
      } catch (error) {
        console.error(`[v0] Error inserting product ${product["Commercial name"]}:`, error.message)
      }
    }

    console.log(`[v0] Successfully imported ${insertedCount} COSMOS certified products!`)
    console.log("[v0] Import completed successfully!")
  } catch (error) {
    console.error("[v0] Import failed:", error)
    console.error("[v0] Error details:", error.message)
  }
}

// Run the import
importCosmosProducts()
