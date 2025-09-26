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

  const shouldHaveDropdown = (categoryName: string) => {
    // Health, Bath & Beauty doesn't have dropdown based on your image
    return categoryName !== "Health, Bath & Beauty"
  }

  if (loading) {
    return (
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-12 items-center justify-center">
            <div className="animate-pulse text-sm text-muted-foreground">Loading categories...</div>
          </div>
      </div>
    )
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="flex h-12 items-center justify-center">
          <div className="flex items-center space-x-8">
            {categories.map((category) => {
              const hasDropdown = shouldHaveDropdown(category.name)
              const hasSubcategories = category.subcategories && category.subcategories.length > 0

              return (
                <div key={category.id} className="relative group">
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="flex items-center space-x-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3"
                  >
                    <span>{category.name}</span>
                    {hasDropdown && hasSubcategories && (
                      <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>

                  {hasDropdown && hasSubcategories && (
                    <div className="absolute top-full left-0 z-50 min-w-[200px] bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                      <div className="py-2">
                        <Link
                          href={`/products?category=${category.slug}`}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors font-medium"
                        >
                          All {category.name}
                        </Link>
                        <div className="border-t my-1" />

                        {category.subcategories?.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            href={`/products?category=${subcategory.slug}`}
                            className="block px-4 py-2 text-sm text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </nav>
    </div>
  )
}
