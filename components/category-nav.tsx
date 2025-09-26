"use client"

import { createClient } from "@/lib/supabase/client"
import { ChevronDown } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
  subcategories?: Category[]
}

// Define the main categories structure
const MAIN_CATEGORIES = [
  {
    name: "Home & Garden",
    slug: "home-garden",
    hasDropdown: true,
    subcategories: [
      "Furniture",
      "Home Decor",
      "Kitchen & Dining",
      "Bedding & Bath",
      "Garden & Outdoor",
      "Home Improvement",
      "Storage & Organization",
    ],
  },
  {
    name: "Clothing & Accessories",
    slug: "clothing-accessories",
    hasDropdown: true,
    subcategories: [
      "Women's Clothing",
      "Men's Clothing",
      "Shoes",
      "Bags & Accessories",
      "Jewelry",
      "Watches",
      "Sunglasses",
    ],
  },
  {
    name: "Health, Bath & Beauty",
    slug: "health-bath-beauty",
    hasDropdown: false,
    subcategories: [
      "Skincare",
      "Makeup",
      "Hair Care",
      "Bath & Body",
      "Fragrances",
      "Health & Wellness",
      "Personal Care",
    ],
  },
  {
    name: "Toys, Kids & Babies",
    slug: "toys-kids-babies",
    hasDropdown: true,
    subcategories: [
      "Toys & Games",
      "Baby & Toddler",
      "Kids' Clothing",
      "Kids' Furniture",
      "Educational Toys",
      "Outdoor Play",
      "Baby Care",
    ],
  },
]

export function CategoryNav() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase.from("categories").select("id, name, slug, parent_id").order("name")

        if (error) {
          console.error("Error fetching categories:", error)
          return
        }

        // Organize categories into parent-child structure
        const parentCategories = data?.filter((cat) => !cat.parent_id) || []
        const childCategories = data?.filter((cat) => cat.parent_id) || []

        const categoriesWithSubs = parentCategories.map((parent) => ({
          ...parent,
          subcategories: childCategories.filter((child) => child.parent_id === parent.id),
        }))

        setCategories(categoriesWithSubs)
      } catch (error) {
        console.error("Error fetching categories:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const findMatchingSubcategories = (mainCategorySubcats: string[]) => {
    return categories.reduce((acc: Category[], category) => {
      // Check if this category matches any of the subcategory names
      if (
        mainCategorySubcats.some(
          (subcat) =>
            category.name.toLowerCase().includes(subcat.toLowerCase()) ||
            subcat.toLowerCase().includes(category.name.toLowerCase()),
        )
      ) {
        acc.push(category)
      }

      // Also check subcategories
      if (category.subcategories) {
        const matchingSubcats = category.subcategories.filter((subcat) =>
          mainCategorySubcats.some(
            (mainSubcat) =>
              subcat.name.toLowerCase().includes(mainSubcat.toLowerCase()) ||
              mainSubcat.toLowerCase().includes(subcat.name.toLowerCase()),
          ),
        )
        acc.push(...matchingSubcats)
      }

      return acc
    }, [])
  }

  if (loading) {
    return (
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container">
          <div className="flex h-12 items-center justify-center">
            <div className="animate-pulse text-sm text-muted-foreground">Loading categories...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <nav className="flex h-12 items-center justify-center">
          <div className="flex items-center space-x-8">
            {MAIN_CATEGORIES.map((mainCategory) => {
              const matchingSubcategories = findMatchingSubcategories(mainCategory.subcategories)

              return (
                <div key={mainCategory.slug} className="relative group">
                  <Link
                    href={`/products?category=${mainCategory.slug}`}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3"
                  >
                    <span>{mainCategory.name}</span>
                    {mainCategory.hasDropdown && (
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {/* Dropdown for subcategories */}
                  {mainCategory.hasDropdown && (
                    <div className="absolute top-full left-0 z-50 min-w-[200px] bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                      <div className="py-2">
                        <Link
                          href={`/products?category=${mainCategory.slug}`}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors font-medium"
                        >
                          All {mainCategory.name}
                        </Link>
                        <div className="border-t my-1" />

                        {/* Show predefined subcategories first */}
                        {mainCategory.subcategories.map((subcategoryName) => (
                          <Link
                            key={subcategoryName}
                            href={`/products?search=${encodeURIComponent(subcategoryName)}`}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {subcategoryName}
                          </Link>
                        ))}

                        {/* Show matching database categories if any */}
                        {matchingSubcategories.length > 0 && (
                          <>
                            <div className="border-t my-1" />
                            {matchingSubcategories.slice(0, 5).map((subcategory) => (
                              <Link
                                key={subcategory.id}
                                href={`/products?category=${subcategory.slug}`}
                                className="block px-4 py-2 text-sm text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
