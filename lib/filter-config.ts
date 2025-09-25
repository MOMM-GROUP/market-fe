export interface FilterConfig {
  price: boolean
  certifications: boolean
  dimensions: boolean
  weight: boolean
  features: boolean
  ingredients: boolean
  verifiedVendor: boolean
}

export interface CategoryFilterConfig {
  [categorySlug: string]: FilterConfig
}

// Define which filters are applicable to each category
export const categoryFilterConfig: CategoryFilterConfig = {
  // Electronics & Technology
  electronics: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },
  computers: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },
  phones: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },
  accessories: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },

  // Fashion & Apparel
  clothing: {
    price: true,
    certifications: true,
    dimensions: true, // for sizing
    weight: false,
    features: true, // material, style features
    ingredients: true, // fabric composition
    verifiedVendor: true,
  },
  shoes: {
    price: true,
    certifications: true,
    dimensions: true, // shoe sizes
    weight: false,
    features: true,
    ingredients: true, // materials
    verifiedVendor: true,
  },
  "accessories-fashion": {
    price: true,
    certifications: true,
    dimensions: true,
    weight: false,
    features: true,
    ingredients: true,
    verifiedVendor: true,
  },

  // Health & Beauty
  skincare: {
    price: true,
    certifications: true,
    dimensions: false,
    weight: true, // product size/volume
    features: true, // skin type, benefits
    ingredients: true, // very important for skincare
    verifiedVendor: true,
  },
  makeup: {
    price: true,
    certifications: true,
    dimensions: false,
    weight: true,
    features: true,
    ingredients: true,
    verifiedVendor: true,
  },
  supplements: {
    price: true,
    certifications: true,
    dimensions: false,
    weight: true,
    features: true, // benefits, dosage
    ingredients: true, // very important
    verifiedVendor: true,
  },

  // Food & Beverages
  food: {
    price: true,
    certifications: true, // organic, fair trade, etc.
    dimensions: false,
    weight: true, // package size
    features: true, // dietary features
    ingredients: true, // very important for food
    verifiedVendor: true,
  },
  beverages: {
    price: true,
    certifications: true,
    dimensions: false,
    weight: true,
    features: true,
    ingredients: true,
    verifiedVendor: true,
  },

  // Home & Garden
  furniture: {
    price: true,
    certifications: true,
    dimensions: true, // very important for furniture
    weight: true,
    features: true, // materials, style
    ingredients: false,
    verifiedVendor: true,
  },
  decor: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },
  garden: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: true, // for plant care products
    verifiedVendor: true,
  },

  // Sports & Outdoors
  sports: {
    price: true,
    certifications: true,
    dimensions: true, // equipment sizes
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },
  outdoor: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: false,
    verifiedVendor: true,
  },

  // Default configuration for unknown categories
  default: {
    price: true,
    certifications: true,
    dimensions: true,
    weight: true,
    features: true,
    ingredients: true,
    verifiedVendor: true,
  },
}

export function getFilterConfigForCategory(categorySlug: string): FilterConfig {
  return categoryFilterConfig[categorySlug] || categoryFilterConfig["default"]
}

// Helper function to get available filter options for a category
export function getAvailableFilters(categorySlug: string): string[] {
  const config = getFilterConfigForCategory(categorySlug)
  return Object.entries(config)
    .filter(([_, enabled]) => enabled)
    .map(([filterName, _]) => filterName)
}
