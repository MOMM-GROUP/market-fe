import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Filter, Heart, Shield, Truck, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CertificationCarousel from "@/components/certification-carousel"

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
  image_url: string | null
}

export default async function HomePage() {
  const supabase = await createClient()

  // Get featured products
  const { data: products } = await supabase
    .from("products")
    .select(
      `
      *,
      vendors (business_name, is_verified),
      categories (name, slug)
    `,
    )
    .eq("is_active", true)
    .gt("inventory_quantity", 0)
    .limit(8)

  // Get categories
  const { data: categories } = await supabase.from("categories").select("*").limit(6)

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="center-content max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance center-text">
            Discover Amazing Products from <span className="text-primary">Trusted Vendors</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty center-text max-w-3xl mx-auto">
            Shop from thousands of verified vendors offering unique products at competitive prices. Your marketplace for
            everything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
              Start Shopping
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
              Become a Vendor
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center">
            {categories?.map((category) => (
              <Link key={category.id} href={`/products?category=${category.slug}`} className="w-full max-w-xs">
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary/30 rounded" />
                    </div>
                    <h3 className="font-medium text-sm">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="center-content">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Link href="/products">
                <Button variant="outline">View All</Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Secure Shopping</h3>
              <p className="text-muted-foreground">
                Shop with confidence knowing your transactions are protected by industry-leading security.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Verified Vendors</h3>
              <p className="text-muted-foreground">
                All our vendors go through a rigorous verification process to ensure quality and reliability.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your orders delivered quickly with our network of trusted shipping partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Carousel Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="center-content">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
            <p className="text-muted-foreground">
              Trusted by industry leaders and certified by top organizations worldwide
            </p>
          </div>
          <CertificationCarousel />
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.featured_image_url || "/placeholder.svg?height=300&width=300&query=product"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
              -{discountPercent}%
            </Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
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
          <Button className="w-full" size="sm">
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
