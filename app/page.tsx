import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Sparkles, CheckCircle, Leaf, Handshake, Globe, Recycle, FlaskConical, Users } from "lucide-react"
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
            Shop Your Values. <span className="text-primary">With Proof.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty center-text max-w-3xl mx-auto">
            Tired of greenwashing and empty promises? MOMM is the first marketplace where every product's ethical claims
            are verified, making it simple to find brands you can trust and products you'll love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
              Start Exploring
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
            >
              How It Works
            </Button>
          </div>
        </div>
      </section>

      {/* Trust-Building Section - "The MOMM Difference" */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Confidence in Every Purchase.</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              No more guesswork. No more endless research. We did the hard work so you don't have to.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">We Verify Every Claim</h3>
              <p className="text-muted-foreground">
                From B Corp scores to organic certifications, our TRUST protocol rigorously vets every brand's ethical
                credentials. If you see a "Verified" checkmark, you know it's real.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Personalized to Your Values</h3>
              <p className="text-muted-foreground">
                Our HEART AI learns what matters most to you—fair labor, sustainability, women-owned—and filters the
                entire market to show you products that perfectly align with your principles.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">You Shop with Joy</h3>
              <p className="text-muted-foreground">
                Discover incredible products from brands that are genuinely making a difference. Feel good about every
                item in your cart and the positive impact you're creating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Values Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="center-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by What Matters Most</h2>
            <p className="text-xl text-muted-foreground">
              Your values are your guide. Start your search based on the principles you care about.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/products?values=organic" className="group">
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Organic & Natural</h3>
                  <p className="text-sm text-muted-foreground">Pure ingredients, responsibly grown.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?values=fair-labor" className="group">
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                    <Handshake className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Fair Labor</h3>
                  <p className="text-sm text-muted-foreground">
                    Brands committed to living wages and ethical treatment.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?values=climate" className="group">
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                    <Globe className="h-6 w-6 text-teal-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Climate Conscious</h3>
                  <p className="text-sm text-muted-foreground">Products that protect and restore our planet.</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?values=diverse" className="group">
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Diverse & Inclusive</h3>
                  <p className="text-sm text-muted-foreground">
                    Support women-owned, minority-owned, and inclusive brands.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?values=circular" className="group">
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                    <Recycle className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Circular & Low-Waste</h3>
                  <p className="text-sm text-muted-foreground">
                    Beautiful products designed to last and leave a smaller footprint.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/products?values=healthy" className="group">
              <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                    <FlaskConical className="h-6 w-6 text-pink-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Healthy & Non-Toxic</h3>
                  <p className="text-sm text-muted-foreground">Clean formulas for your body and home.</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Editor's Picks: Good for You, Good for the World</h2>
            <Link href="/products">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Our Promise / Deeper Dive Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="center-content max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Radical Transparency, Made Simple.</h2>
          <p className="text-xl text-muted-foreground mb-6">
            How can you be sure? Our TRUST protocol is the engine that powers our marketplace. It's a comprehensive,
            verifiable database of ethical information, tracking a product's journey from raw material to your doorstep.
          </p>
          <p className="text-muted-foreground mb-8">
            We combine data from hundreds of global certifications with cutting-edge verification technology to create a
            single, easy-to-understand ethical profile for every item. No jargon, no dense reports—just clear, honest
            information you can rely on.
          </p>
          <Button size="lg" variant="outline">
            Learn About Our Verification Process
          </Button>
        </div>
      </section>

      {/* Certifications Carousel Section */}
      <section className="py-16 px-4">
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

      {/* Final Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="center-content max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Movement for a More Meaningful Market.</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Every purchase is a vote for the world you want to live in. Start today by exploring products from brands
            that are building a better future for all.
          </p>
          <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
            Shop All Products
          </Button>
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

  const valuesMatchScore = Math.floor(Math.random() * 15) + 85 // Mock 85-100% match

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
            <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">-{discountPercent}%</Badge>
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

          {/* Values Match Score */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${valuesMatchScore}%` }} />
            </div>
            <span className="text-primary font-medium">{valuesMatchScore}% Match</span>
          </div>

          {/* Sample certifications */}
          <div className="flex gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs">
              B Corp
            </Badge>
            <Badge variant="outline" className="text-xs">
              Fair Trade
            </Badge>
            <Badge variant="outline" className="text-xs">
              Organic
            </Badge>
          </div>

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
