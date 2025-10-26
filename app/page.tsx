import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Heart,
  CheckCircle,
  Leaf,
  Handshake,
  Globe,
  Recycle,
  FlaskConical,
  Users,
  PiggyBank,
  Zap,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CertificationTabs from "@/components/certification-tabs"

interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price: number | null
  featured_image_url: string | null
  brand: string
  category_id: string
  vendor_id: string
  is_active: boolean
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

interface Certification {
  id: string
  name: string
  priority: number
  product_count: number
}

export default async function HomePage() {
  console.log("[v0] HomePage rendering")

  try {
    const supabase = await createClient()
    console.log("[v0] Supabase client created")

    const { data: products, error: productsError } = await supabase
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
        vendors!inner (
          business_name,
          is_verified
        ),
        categories!inner (
          name,
          slug
        )
      `)
      .eq("is_active", true)
      .limit(8)

    if (productsError) {
      console.error("[v0] Error fetching products:", productsError)
    } else {
      console.log("[v0] Products fetched:", products?.length || 0)
    }

    const { data: categories, error: categoriesError } = await supabase
      .from("categories")
      .select("id, name, slug, image_url")
      .is("parent_id", null)
      .limit(6)

    if (categoriesError) {
      console.error("[v0] Error fetching categories:", categoriesError)
    } else {
      console.log("[v0] Categories fetched:", categories?.length || 0)
    }

    const { data: certifications, error: certificationsError } = await supabase
      .from("certifications")
      .select("*")
      .order("priority", { ascending: false })
      .limit(50)

    if (certificationsError) {
      console.error("[v0] Error fetching certifications:", certificationsError)
    } else {
      console.log("[v0] Certifications fetched:", certifications?.length || 0)
    }

    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="center-content max-w-5xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance center-text">
              Shop Your Values. <span className="text-primary">Redefine the Economy.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty center-text max-w-3xl mx-auto">
              The era of the billionaire is over. MOMM is the marketplace built for economic justice, where a
              significant portion of the value we create goes straight back to the community. Stop funding the few. Join
              the Movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/how-it-works">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  How It Works
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Core Value Proposition - 3 Pillars */}
        <section className="py-16 px-4">
          <div className="center-content">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">YOU Are the Ultimate Decider</h3>
                <p className="text-muted-foreground">
                  Tired of shopping someone else's version of 'good'? Our HEART AI is your personal compass. It learns
                  what you value—from Fair Labor to style—and instantly filters the world to match your ethics, your
                  principles, and your style.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <PiggyBank className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Wealth Goes to the Community</h3>
                <p className="text-muted-foreground">
                  The core of the movement. A portion of the profits from your verified purchases goes into The MOMM
                  Vault—a fund you control to invest in safety nets, local communities, or causes you care about. We
                  built a system where wealth empowers the people.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">The Truth. Guaranteed.</h3>
                <p className="text-muted-foreground">
                  No more guesswork. Our TRUST protocol does the detective work for you, vetting every single claim and
                  supply chain fact. If it's on MOMM, it's earned the Verified checkmark. The facts are real; the choice
                  is yours.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Revolutionary Features Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="center-content">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Revolutionary Features</h2>
              <p className="text-xl text-muted-foreground">
                Built for a new economy where your values drive real change
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <PiggyBank className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">Community-Owned Rewards</h3>
                  <p className="text-muted-foreground">
                    The MOMM Vault is not cash back. A percentage of the value created by your purchase helps fund the
                    Vault, which you can use to invest in ethical brands, donate to vetted nonprofits, or build your own
                    personal safety net. Redistribute power and wealth.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">AI-Powered Personal Styling</h3>
                  <p className="text-muted-foreground">
                    Beyond ethics. Our AI also matches products to your unique style, body shape, and color season. Shop
                    your principles and your perfect fit.
                  </p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <RotateCcw className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">The Complete Lifecycle</h3>
                  <p className="text-muted-foreground">
                    Buy new, sell used, and recycle—all in one place. With End-of-Life Guidance built-in, you finally
                    have total control over your product's journey. Zero waste, zero worries.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Values Section */}
        <section className="py-16 px-4">
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
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products available at the moment.</p>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Tabs Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="center-content">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Our Certifications</h2>
              <p className="text-muted-foreground">
                Trusted by industry leaders and certified by top organizations worldwide
              </p>
            </div>
            <CertificationTabs certifications={certifications || []} />
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error("[v0] Exception in HomePage:", error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Unable to load page</h2>
          <p className="text-muted-foreground">Please check your database connection.</p>
        </div>
      </div>
    )
  }
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
            <span className="text-xs text-muted-foreground">{product.vendors?.business_name}</span>
            {product.vendors?.is_verified && (
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
          <Link href={`/products/${product.id}`}>
            <Button className="w-full bg-transparent" size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
