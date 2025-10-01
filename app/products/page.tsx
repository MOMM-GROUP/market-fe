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
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

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

  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    const searchParam = searchParams.get("search")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
    if (searchParam) {
      setSearchQuery(searchParam)
    }
  }, [searchParams])

  useEffect(() => {
    fetchData()
  }, [searchQuery, selectedCategory, filters, sortBy])

  const fetchData = async () => {
    setLoading(true)
    
    // The base query is now dynamic
    let query;

    // 1. IF a search query exists, use our powerful RPC function as the base.
    // This gives us relevance ranking from the start.
    if (searchQuery) {
      query = supabase.rpc("search_products", {
        search_term: searchQuery,
      })
    } else {
      // 2. IF NOT, use the standard 'products' table as the base.
      query = supabase.from("products").select(`
        *,
        vendors (business_name, is_verified),
        categories (name, slug)
      `)
    }

    // 3. ALL other filters and conditions are chained onto the base query,
    // regardless of whether it's a search result or the full product list.
    query = query
      .eq("is_active", true)
      .gt("inventory_quantity", 0)

    if (selectedCategory !== "all") {
      const category = categories.find((c) => c.slug === selectedCategory)
      if (category) {
        query = query.eq("category_id", category.id)
      }
    }

    if (filters.priceRange.min) {
      query = query.gte("price", Number.parseFloat(filters.priceRange.min))
    }
    if (filters.priceRange.max) {
      query = query.lte("price", Number.parseFloat(filters.priceRange.max))
    }

    if (filters.selectedBrands.length > 0) {
      query = query.in("brand", filters.selectedBrands)
    }

    if (filters.selectedColors.length > 0) {
      query = query.in("color", filters.selectedColors)
    }

    if (filters.selectedMaterials.length > 0) {
      query = query.in("material", filters.selectedMaterials)
    }

    if (filters.selectedStyles.length > 0) {
      query = query.in("style", filters.selectedStyles)
    }

    if (filters.selectedSizes.length > 0) {
      query = query.in("size", filters.selectedSizes)
    }

    if (filters.selectedFeatures.length > 0) {
      const featureConditions = filters.selectedFeatures.map((feature) => `features.ilike.%${feature}%`).join(",")
      query = query.or(featureConditions)
    }

    if (filters.selectedIngredients.length > 0) {
      const ingredientConditions = filters.selectedIngredients
        .map((ingredient) => `ingredients.ilike.%${ingredient}%`)
        .join(",")
      query = query.or(ingredientConditions)
    }

    if (filters.verifiedOnly) {
      query = query.eq("vendors.is_verified", true)
    }

    if (filters.selectedSubcategories.length > 0) {
      const { data: subcategoryData } = await supabase
        .from("categories")
        .select("id")
        .in("name", filters.selectedSubcategories)

      if (subcategoryData && subcategoryData.length > 0) {
        const subcategoryIds = subcategoryData.map((sub) => sub.id)
        query = query.in("category_id", subcategoryIds)
      }
    }

    switch (sortBy) {
      case "price-low":
        query = query.order("price", { ascending: true })
        break
      case "price-high":
        query = query.order("price", { ascending: false })
        break
      case "popular":
        query = query.order("created_at", { ascending: false })
        break
      default:
        query = query.order("created_at", { ascending: false })
    }

    const { data: productsData, error } = await query

    if (error) {
      console.error("Error fetching products:", error)
      setProducts([])
    } else {
      setProducts(productsData || [])
    }

    setLoading(false)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name")

      if (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      } else {
        setCategories(data || [])
      }
    }
    fetchCategories()
  }, [])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
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
                <span className="text-muted-foreground">({products?.length || 0} products)</span>
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
  const discountPercent = hasDiscount
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
