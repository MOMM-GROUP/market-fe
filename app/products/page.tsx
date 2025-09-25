"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid, List, Heart, Star, X } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"

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
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const supabase = createClient()
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [searchParams])

  useEffect(() => {
    fetchData()
  }, [searchQuery, selectedCategory, priceRange, verifiedOnly, sortBy])

  const fetchData = async () => {
    setLoading(true)

    const exampleProducts: Product[] = [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life",
        price: 199.99,
        compare_at_price: 249.99,
        featured_image_url: "/wireless-headphones.png",
        vendor_id: "vendor1",
        category_id: "electronics",
        is_active: true,
        inventory_quantity: 50,
        vendors: {
          business_name: "TechGear Pro",
          is_verified: true,
        },
        categories: {
          name: "Electronics",
          slug: "electronics",
        },
      },
      {
        id: "2",
        name: "Organic Cotton T-Shirt",
        description: "Comfortable and sustainable organic cotton t-shirt in various colors",
        price: 29.99,
        compare_at_price: null,
        featured_image_url: "/organic-cotton-tshirt.png",
        vendor_id: "vendor2",
        category_id: "clothing",
        is_active: true,
        inventory_quantity: 100,
        vendors: {
          business_name: "EcoWear",
          is_verified: true,
        },
        categories: {
          name: "Clothing",
          slug: "clothing",
        },
      },
      {
        id: "3",
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitor and GPS",
        price: 299.99,
        compare_at_price: 399.99,
        featured_image_url: "/smart-fitness-watch.png",
        vendor_id: "vendor3",
        category_id: "electronics",
        is_active: true,
        inventory_quantity: 25,
        vendors: {
          business_name: "FitTech Solutions",
          is_verified: false,
        },
        categories: {
          name: "Electronics",
          slug: "electronics",
        },
      },
      {
        id: "4",
        name: "Artisan Coffee Beans",
        description: "Single-origin coffee beans roasted to perfection",
        price: 24.99,
        compare_at_price: null,
        featured_image_url: "/artisan-coffee-beans.jpg",
        vendor_id: "vendor4",
        category_id: "food",
        is_active: true,
        inventory_quantity: 75,
        vendors: {
          business_name: "Mountain Roasters",
          is_verified: true,
        },
        categories: {
          name: "Food & Beverage",
          slug: "food",
        },
      },
    ]

    let query = supabase
      .from("products")
      .select(`
        *,
        vendors (business_name, is_verified),
        categories (name, slug)
      `)
      .eq("is_active", true)
      .gt("inventory_quantity", 0)

    if (searchQuery) {
      query = query.or(`name.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`)
    }

    if (selectedCategory !== "all") {
      const category = categories.find((c) => c.slug === selectedCategory)
      if (category) {
        query = query.eq("category_id", category.id)
      }
    }

    if (priceRange.min) {
      query = query.gte("price", Number.parseFloat(priceRange.min))
    }
    if (priceRange.max) {
      query = query.lte("price", Number.parseFloat(priceRange.max))
    }

    if (verifiedOnly) {
      query = query.eq("vendors.is_verified", true)
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

    const { data: productsData } = await query

    let filteredProducts = productsData && productsData.length > 0 ? productsData : exampleProducts

    if (productsData?.length === 0 || !productsData) {
      if (searchQuery) {
        filteredProducts = exampleProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      }

      if (selectedCategory !== "all") {
        filteredProducts = filteredProducts.filter((product) => product.categories.slug === selectedCategory)
      }

      if (verifiedOnly) {
        filteredProducts = filteredProducts.filter((product) => product.vendors.is_verified)
      }

      if (priceRange.min) {
        filteredProducts = filteredProducts.filter((product) => product.price >= Number.parseFloat(priceRange.min))
      }

      if (priceRange.max) {
        filteredProducts = filteredProducts.filter((product) => product.price <= Number.parseFloat(priceRange.max))
      }
    }

    setProducts(filteredProducts || [])
    setLoading(false)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      const exampleCategories: Category[] = [
        { id: "1", name: "Electronics", slug: "electronics" },
        { id: "2", name: "Clothing", slug: "clothing" },
        { id: "3", name: "Food & Beverage", slug: "food" },
        { id: "4", name: "Home & Garden", slug: "home" },
        { id: "5", name: "Sports", slug: "sports" },
        { id: "6", name: "Books", slug: "books" },
      ]

      const { data } = await supabase.from("categories").select("*").order("name")
      setCategories(data && data.length > 0 ? data : exampleCategories)
    }
    fetchCategories()
  }, [])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedCategory("all")
    setPriceRange({ min: "", max: "" })
    setVerifiedOnly(false)
    setSortBy("newest")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="center-content py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                </div>

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

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Price Range</h4>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Min"
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: e.target.value }))}
                    />
                    <Input
                      placeholder="Max"
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Vendor</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={verifiedOnly}
                        onChange={(e) => setVerifiedOnly(e.target.checked)}
                      />
                      <span className="text-sm">Verified Only</span>
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>
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
        // Check if product is favorited
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
    router.push(`/products/${product.id}`)
  }

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking add to cart

    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsAddingToCart(true)

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single()

      if (existingItem) {
        // Update quantity if item exists
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)
      } else {
        // Add new item to cart
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        })
      }

      // Refresh the page to update cart count in navbar
      window.location.reload()
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent navigation when clicking favorite

    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsTogglingFavorite(true)

    try {
      if (isFavorited) {
        // Remove from favorites
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", product.id)

        setIsFavorited(false)
      } else {
        // Add to favorites
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
                <span className="text-xs text-muted-foreground">{product.vendors.business_name}</span>
                {product.vendors.is_verified && (
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
                <Button size="sm" onClick={handleAddToCart} disabled={isAddingToCart}>
                  {isAddingToCart ? "Adding..." : "Add to Cart"}
                </Button>
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
            <span className="text-xs text-muted-foreground">{product.vendors.business_name}</span>
            {product.vendors.is_verified && (
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
          <Button className="w-full" size="sm" onClick={handleAddToCart} disabled={isAddingToCart}>
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
