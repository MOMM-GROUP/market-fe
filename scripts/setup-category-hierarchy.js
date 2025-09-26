import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const categoryHierarchy = [
  {
    name: "Home & Garden",
    slug: "home-garden",
    description: "Everything for your home and garden needs",
    subcategories: [
      { name: "Cleaning Supplies", slug: "cleaning-supplies", description: "Household cleaning products" },
      { name: "Kitchen & Dining", slug: "kitchen-dining", description: "Kitchen appliances and dining essentials" },
      { name: "Furniture & Art", slug: "furniture-art", description: "Indoor and outdoor furniture and art" },
      { name: "Garden", slug: "garden", description: "Gardening tools and outdoor equipment" },
      { name: "Bedding & Linens", slug: "bedding-linens", description: "Bedroom and bathroom linens" },
      { name: "Home Decor", slug: "home-decor", description: "Home decorative items" },
      { name: "Lighting & Lamps", slug: "lighting-lamps", description: "Indoor and outdoor lighting" },
      { name: "Bath & Laundry", slug: "bath-laundry", description: "Bathroom and laundry essentials" },
    ],
  },
  {
    name: "Clothing & Accessories",
    slug: "clothing-accessories",
    description: "Fashion and accessories for all",
    subcategories: [
      { name: "Clothing", slug: "clothing", description: "Fashion clothing for all" },
      { name: "Accessories", slug: "accessories", description: "Fashion accessories" },
      { name: "Bags & Purses", slug: "bags-purses", description: "Handbags and accessories" },
    ],
  },
  {
    name: "Health, Bath & Beauty",
    slug: "health-bath-beauty",
    description: "Personal care and wellness products",
    subcategories: [
      { name: "Beauty", slug: "beauty", description: "General beauty products" },
      { name: "Bath & Body", slug: "bath-body", description: "Soaps, lotions, and bath products" },
      { name: "Health", slug: "health", description: "Health and wellness products" },
      { name: "Lip Care", slug: "lip-care", description: "Products for lip care certified by COSMOS standards" },
      { name: "Face Care", slug: "face-care", description: "Products for face care certified by COSMOS standards" },
      { name: "Body Care", slug: "body-care", description: "Products for body care certified by COSMOS standards" },
      { name: "Hand Care", slug: "hand-care", description: "Products for hand care certified by COSMOS standards" },
      { name: "Eye Care", slug: "eye-care", description: "Products for eye care certified by COSMOS standards" },
      { name: "Cleansers", slug: "cleansers", description: "Cleanser products certified by COSMOS standards" },
      { name: "Serums", slug: "serums", description: "Serum products certified by COSMOS standards" },
      { name: "Face Masks", slug: "face-masks", description: "Face mask products certified by COSMOS standards" },
      { name: "Sun Care", slug: "sun-care", description: "Sun care products certified by COSMOS standards" },
      { name: "Treatments", slug: "treatments", description: "Treatment products certified by COSMOS standards" },
      { name: "Essences", slug: "essences", description: "Essence products certified by COSMOS standards" },
      { name: "Skincare", slug: "skincare", description: "General skincare products certified by COSMOS standards" },
    ],
  },
  {
    name: "Toys, Kids & Babies",
    slug: "toys-kids-babies",
    description: "Products for children and babies",
    subcategories: [
      { name: "Clothing", slug: "kids-clothing", description: "Clothing for children and babies" },
      { name: "Shoes", slug: "kids-shoes", description: "Footwear for children and babies" },
      { name: "Toys", slug: "toys", description: "Educational and fun toys for kids" },
    ],
  },
]

async function setupCategoryHierarchy() {
  console.log("[v0] Starting category hierarchy setup...")

  try {
    // Clear existing categories to avoid duplicates
    console.log("[v0] Clearing existing categories...")
    const { error: clearError } = await supabase
      .from("categories")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000") // Delete all

    if (clearError) {
      console.error("[v0] Error clearing categories:", clearError)
    }

    // Insert main categories first
    console.log("[v0] Inserting main categories...")
    const mainCategories = categoryHierarchy.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      parent_id: null,
    }))

    const { data: insertedMainCategories, error: mainError } = await supabase
      .from("categories")
      .insert(mainCategories)
      .select("id, name, slug")

    if (mainError) {
      console.error("[v0] Error inserting main categories:", mainError)
      return
    }

    console.log("[v0] Main categories inserted:", insertedMainCategories.length)

    // Insert subcategories
    console.log("[v0] Inserting subcategories...")
    for (let i = 0; i < categoryHierarchy.length; i++) {
      const mainCategory = categoryHierarchy[i]
      const parentCategory = insertedMainCategories.find((cat) => cat.slug === mainCategory.slug)

      if (!parentCategory) {
        console.error(`[v0] Parent category not found for: ${mainCategory.name}`)
        continue
      }

      const subcategories = mainCategory.subcategories.map((subcat) => ({
        name: subcat.name,
        slug: subcat.slug,
        description: subcat.description,
        parent_id: parentCategory.id,
      }))

      const { data: insertedSubcategories, error: subError } = await supabase
        .from("categories")
        .insert(subcategories)
        .select("id, name")

      if (subError) {
        console.error(`[v0] Error inserting subcategories for ${mainCategory.name}:`, subError)
      } else {
        console.log(`[v0] Inserted ${insertedSubcategories.length} subcategories for ${mainCategory.name}`)
      }
    }

    // Verify the setup
    const { data: allCategories, error: verifyError } = await supabase
      .from("categories")
      .select("id, name, parent_id")
      .order("name")

    if (verifyError) {
      console.error("[v0] Error verifying categories:", verifyError)
    } else {
      const mainCats = allCategories.filter((cat) => !cat.parent_id)
      const subCats = allCategories.filter((cat) => cat.parent_id)
      console.log(`[v0] Setup complete! ${mainCats.length} main categories, ${subCats.length} subcategories`)
    }
  } catch (error) {
    console.error("[v0] Unexpected error:", error)
  }
}

setupCategoryHierarchy()
