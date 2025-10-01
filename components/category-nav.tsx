"use client"

// Imports for UI and interactivity
import { ChevronDown, BarChart3, Package, Users, Settings, Store } from "lucide-react"
import Link from "next/link"
import type { Category, UserProfile } from "@/lib/types"

// Note: useEffect, useState, and createClient are no longer needed here for data fetching

export function CategoryNav({ 
  initialUser, 
  initialCategories 
}: { 
  initialUser: UserProfile | null, 
  initialCategories: Category[] 
}) {
  // The component receives the final, ready-to-use data as props
  const user = initialUser;
  const categories = initialCategories;

  // The 'loading' state is gone because the data is already here when the component renders!

  const shouldHaveDropdown = (categoryName: string) => {
    return categoryName !== "Health, Bath & Beauty"
  }

  if (user?.role === "vendor") {
    return (
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
        <nav className="flex h-12 items-center justify-center">
          <div className="flex items-center space-x-8">
            <Link href="/vendor" className="flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3">
              <BarChart3 className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link href="/vendor/products" className="flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3">
              <Package className="h-4 w-4" />
              <span>Products</span>
            </Link>
            <Link href="/vendor/orders" className="flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3">
              <Package className="h-4 w-4" />
              <span>Orders</span>
            </Link>
            <Link href="/vendor/team" className="flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3">
              <Users className="h-4 w-4" />
              <span>Team</span>
            </Link>
            <Link href="/vendor/settings" className="flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </Link>
            <Link href={`/vendors/${user.id}`} className="flex items-center space-x-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3">
              <Store className="h-4 w-4" />
              <span>View Storefront</span>
            </Link>
          </div>
        </nav>
      </div>
    )
  }

  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40">
      <nav className="flex h-12 items-center justify-center">
        <div className="flex items-center space-x-8">
{categories.map((category) => {
            const hasDropdown = shouldHaveDropdown(category.name);
            const hasSubcategories = category.subcategories && category.subcategories.length > 0;

            return (
              <div key={category.id} className="relative group">
                {/* The main category link */}
                <Link
                  href={`/products?category=${category.slug}`}
                  className="flex items-center space-x-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors py-3"
                >
                  <span>{category.name}</span>
                  {hasDropdown && hasSubcategories && (
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {/* The dropdown menu container */}
                {hasDropdown && hasSubcategories && (
                  <div className="absolute top-full left-0 z-[9999] min-w-[200px] bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0">
                    <div className="py-2">
                      {/* "All" link */}
                      <Link
                        href={`/products?category=${category.slug}`}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors font-medium"
                      >
                        All {category.name}
                      </Link>
                      
                      <div className="border-t my-1" />

                      {/* The subcategory links */}
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
            );
          })}
        </div>
      </nav>
    </div>
  )
}
