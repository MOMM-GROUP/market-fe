"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Heart, Star } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { AmazonStyleFilters } from "@/components/amazon-style-filters"

export function ProductsPageClient({
  initialProducts,
  initialCategories,
  totalCount,
  currentPage,
  selectedCategory,
}: {
  initialProducts: Product[]
  initialCategories: Category[]
  totalCount: number
  currentPage: number
  selectedCategory: string
}) {
  const [products] = useState(initialProducts)
  const [categories] = useState(initialCategories)
}

interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price: number | null
  featured_image_url: string | null
  vendor_id: string
  category_id: string
  is_active: boolean
  inventory_quantity: number
  vendors: {
    business_name: string
    is_verified: boolean
  }
  categories: {
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const [filters, setFilters] = useState({
    priceRange: { min: "", max: "" },
    selectedCertifications: [] as string[],
    selectedBrands: [] as string[],
    selectedColors: [] as string[],
    selectedMaterials: [] as string[],
    selectedStyles: [] as string[],
    selectedSizes: [] as string[],
    selectedFeatures: [] as string[],
    selectedIngredients: [] as string[],
    selectedSubcategories: [] as string[],
    verifiedOnly: false,
  })
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const ITEMS_PER_PAGE = 20
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE)

  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")
    const pageParam = searchParams.get("page")

    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    }
    if (pageParam) {
      setCurrentPage(Number.parseInt(pageParam))
    }
  }, [searchParams])

  useEffect(() => {
    setCurrentPage(1) // Reset to page 1 when filters change
  }, [searchQuery, selectedCategory, filters, sortBy])

  useEffect(() => {
    fetchData()
  }, [searchQuery, selectedCategory, filters, sortBy, currentPage])

  const fetchData = async () => {
    console.log("[v0] Starting fetchData - Page:", currentPage)
    console.log("[v0] Selected category:", selectedCategory)
    setLoading(true)

    try {
      const supabase = createClient()

      // Step 1: Get category IDs (including children)
      let categoryIds: string[] = []
      if (selectedCategory !== "all") {
        console.log("[v0] Looking up category:", selectedCategory)

        const { data: categoryData, error: categoryError } = await supabase
          .from("categories")
          .select("id")
          .eq("slug", selectedCategory)
          .single()

        if (categoryError) {
          console.error("[v0] Category lookup error:", categoryError)
        } else if (categoryData) {
          const { data: childCategories } = await supabase
            .from("categories")
            .select("id")
            .eq("parent_id", categoryData.id)

          categoryIds = [categoryData.id, ...(childCategories?.map((c) => c.id) || [])]

          console.log("[v0] Category IDs to filter:", categoryIds)
        }
      } else {
        console.log("[v0] Fetching all products (no category filter)")
      }

      // Step 2: Build query with LEFT joins (not INNER)
      let query = supabase
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
        inventory_quantity,
        vendors (
          business_name,
          is_verified
        ),
        categories (
          name,
          slug
        )
      `)
        .eq("is_active", true)
        .not("category_id", "is", null) // Only show categorized products
        .not("vendor_id", "is", null) // Only show products with vendors

      // Step 3: Apply category filter ONLY if we have category IDs
      if (categoryIds.length > 0) {
        console.log("[v0] Applying category filter for", categoryIds.length, "categories")
        query = query.in("category_id", categoryIds)
      }

      // Step 4: Apply other filters
      if (filters.priceRange.min) {
        query = query.gte("price", Number.parseFloat(filters.priceRange.min))
      }
      if (filters.priceRange.max) {
        query = query.lte("price", Number.parseFloat(filters.priceRange.max))
      }
      if (filters.selectedBrands.length > 0) {
        query = query.in("brand", filters.selectedBrands)
      }

      // Step 5: Apply sorting
      switch (sortBy) {
        case "price-low":
          query = query.order("price", { ascending: true })
          break
        case "price-high":
          query = query.order("price", { ascending: false })
          break
        case "popular":
        default:
          query = query.order("created_at", { ascending: false })
      }

      // Step 6: Get total count
      const countQuery = supabase
        .from("products")
        .select("id", { count: "exact", head: true })
        .eq("is_active", true)
        .not("category_id", "is", null)
        .not("vendor_id", "is", null)

      if (categoryIds.length > 0) {
        countQuery.in("category_id", categoryIds)
      }

      const { count, error: countError } = await countQuery

      if (countError) {
        console.error("[v0] Count error:", countError)
      } else {
        console.log("[v0] Total matching products:", count)
        setTotalProducts(count || 0)
      }

      // Step 7: Apply pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE
      const to = from + ITEMS_PER_PAGE - 1
      query = query.range(from, to)

      console.log("[v0] Fetching page:", currentPage, "Range:", from, "-", to)
      const { data: productsData, error } = await query

      if (error) {
        console.error("[v0] Products error:", error)
        console.error("[v0] Error code:", error.code)
        console.error("[v0] Error message:", error.message)
        console.error("[v0] Error details:", error.details)
        console.error("[v0] Error hint:", error.hint)
        setProducts([])
      } else {
        console.log("[v0] Products fetched:", productsData?.length || 0)
        if (productsData && productsData.length > 0) {
          console.log("[v0] First product:", {
            id: productsData[0].id,
            name: productsData[0].name,
            category: productsData[0].categories?.name,
            vendor: productsData[0].vendors?.business_name,
          })
        }
        setProducts(productsData || [])
      }
    } catch (error) {
      console.error("[v0] Exception:", error)
      setProducts([])
      setTotalProducts(0)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/get-categories-cache`)

        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setCategories(data || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      }
    }
    fetchCategories()
  }, [])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setCurrentPage(1)
    setFilters({
      priceRange: { min: "", max: "" },
      selectedCertifications: [],
      selectedBrands: [],
      selectedColors: [],
      selectedMaterials: [],
      selectedStyles: [],
      selectedSizes: [],
      selectedFeatures: [],
      selectedIngredients: [],
      selectedSubcategories: [],
      verifiedOnly: false,
    })
    setSortBy("newest")
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="center-content py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Category</h4>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories?.map((category) => (
                        <SelectItem key={category.id} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <AmazonStyleFilters
              selectedCategory={selectedCategory}
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </aside>

          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold">All Products</h1>
                <span className="text-muted-foreground">({totalProducts} products)</span>
                {searchQuery && <Badge variant="secondary">Search: "{searchQuery}"</Badge>}
              </div>

              <div className="flex items-center gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-0">
                      <div className="aspect-square bg-muted rounded-t-lg" />
                      <div className="p-4 space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4" />
                        <div className="h-4 bg-muted rounded w-1/2" />
                        <div className="h-6 bg-muted rounded w-1/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center"
                      : "space-y-4"
                  }
                >
                  {products?.map((product) => (
                    <ProductCard key={product.id} product={product} viewMode={viewMode} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    <div className="flex gap-1">
                      {/* Show first page */}
                      {currentPage > 3 && (
                        <>
                          <Button
                            variant={currentPage === 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(1)}
                          >
                            1
                          </Button>
                          {currentPage > 4 && <span className="px-2">...</span>}
                        </>
                      )}

                      {/* Show pages around current page */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((page) => {
                          return (
                            page === currentPage ||
                            page === currentPage - 1 ||
                            page === currentPage + 1 ||
                            (page <= 2 && currentPage <= 3) ||
                            (page >= totalPages - 1 && currentPage >= totalPages - 2)
                          )
                        })
                        .map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </Button>
                        ))}

                      {/* Show last page */}
                      {currentPage < totalPages - 2 && (
                        <>
                          {currentPage < totalPages - 3 && <span className="px-2">...</span>}
                          <Button
                            variant={currentPage === totalPages ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(totalPages)}
                          >
                            {totalPages}
                          </Button>
                        </>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}

            {!loading && products.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
                <Button onClick={clearFilters}>Clear Filters</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ product, viewMode = "grid" }: { product: Product; viewMode?: "grid" | "list" }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPercent =
    hasDiscount && product.compare_at_price
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : 0

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)

      if (authUser) {
        const { data } = await supabase
          .from("favorites")
          .select("id")
          .eq("user_id", authUser.id)
          .eq("product_id", product.id)
          .single()

        setIsFavorited(!!data)
      }
    }
    checkUser()
  }, [supabase, product.id])

  const handleProductClick = () => {
    console.log("[v0] Navigating to product:", product.id) // Added debug logging
    router.push(`/products/${product.id}`)
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsTogglingFavorite(true)

    try {
      if (isFavorited) {
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", product.id)

        setIsFavorited(false)
      } else {
        await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: product.id,
        })

        setIsFavorited(true)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
    } finally {
      setIsTogglingFavorite(false)
    }
  }

  if (viewMode === "list") {
    return (
      <Card className="group hover:shadow-lg transition-shadow cursor-pointer" onClick={handleProductClick}>
        <CardContent className="p-0">
          <div className="flex gap-4 p-4">
            <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={product.featured_image_url || "/placeholder.svg?height=96&width=96&query=product"}
                alt={product.name}
                fill
                className="object-cover"
              />
              {hasDiscount && (
                <Badge className="absolute top-1 left-1 bg-accent text-accent-foreground text-xs">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{product.vendors?.business_name}</span>
                {product.vendors?.is_verified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              <h3 className="font-medium text-sm">{product.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">${product.price}</span>
                  {hasDiscount && (
                    <span className="text-sm text-muted-foreground line-through">${product.compare_at_price}</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">View Details</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-200 hover:scale-105 w-full max-w-sm cursor-pointer"
      onClick={handleProductClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.featured_image_url || "/placeholder.svg?height=300&width=300&query=product"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">-{discountPercent}%</Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${
              isFavorited ? "opacity-100" : ""
            }`}
            onClick={handleToggleFavorite}
            disabled={isTogglingFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{product.vendors?.business_name}</span>
            {product.vendors?.is_verified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          <h3 className="font-medium line-clamp-2 text-sm">{product.name}</h3>
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${product.compare_at_price}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">(4.8)</span>
          </div>
          <Button className="w-full bg-transparent" size="sm" variant="outline">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
