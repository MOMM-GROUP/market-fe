import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Handshake, Users, XCircle, Ban, AlertTriangle, Coins } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import CertificationsShowcase from "@/components/certifications-showcase"

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
        <section className="py-32 px-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="center-content max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">The Era of the Billionaire is Over</h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-semibold">
              Stop funding the few. Join the Movement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/early-access">
                <Button size="lg" className="text-lg px-8 bg-teal-600 hover:bg-teal-700">
                  Join Early Access
                </Button>
              </Link>
              <Link href="/contributors">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Help Us Build This
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* "Here's What We're Done Accepting" Section */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="center-content max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">Here's What We're Done Accepting</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">WEALTH HOARDING</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Billionaires hoard while millions struggle. CEOs make 300x what workers earn. Wealth concentrates at
                    the top while everyone else fights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-pink-100 rounded-full flex items-center justify-center">
                    <Ban className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold">FALSE CHOICES</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Shop 'ethical' brands... but their CEO still hoards. Your purchases still fund predatory systems.
                    Even 'conscious' shopping feeds the billionaire class.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">BROKEN PROMISES</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Politicians won't fix this. The wealthy won't 'give back.' We're tired of waiting. Time to take
                    action.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* "MOMM: Economic Justice Through Commerce" Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
          <div className="center-content max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">What if your purchases actually worked for YOU?</h2>
              <p className="text-xl md:text-2xl mb-8 leading-relaxed">
                We are not building another company that enriches a few founders while workers fight for scraps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="border-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <Coins className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">YOU GET YOUR SHARE</h3>
                  <p className="leading-relaxed">
                    Every dollar you spend on MOMM redirects wealth back to the community—not billionaires. You shop.
                    You build. You profit.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">CONTRIBUTORS ACTUALLY OWN IT</h3>
                  <p className="leading-relaxed">
                    People who build MOMM share in its success. Not through cheap equity promises—through real profit
                    sharing. You build value. You keep value.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                    <Handshake className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">BRANDS PLAY FAIR</h3>
                  <p className="leading-relaxed">
                    Ethical brands reach conscious consumers. Everyone profits when values align. No middlemen taking
                    40% cuts. Real partnerships.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4">
          <div className="center-content">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Editor's Picks: Good for You, Good for the World</h2>
              <Link href="/early-access">
                <Button variant="outline">Join to View Products</Button>
              </Link>
            </div>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Products coming soon. Join our early access waitlist!</p>
              </div>
            )}
          </div>
        </section>

        {/* Certifications Tabs Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="center-content">
            <CertificationsShowcase />
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="center-content max-w-4xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">The Time for Change is Now</h2>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              The system isn't broken—it's working exactly as designed. For the few.
            </p>
            <p className="text-xl md:text-2xl mb-6 leading-relaxed">
              We're building something different. Something that works for everyone who creates the value.
            </p>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed font-semibold">
              Join us. Not as customers. As owners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/early-access">
                <Button size="lg" className="text-lg px-8 bg-teal-600 hover:bg-teal-700">
                  Join Early Access
                </Button>
              </Link>
              <Link href="/contributors">
                <Button size="lg" className="text-lg px-8 bg-orange-600 hover:bg-orange-700">
                  Join as Builder
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="text-lg px-8 bg-pink-600 hover:bg-pink-700">
                  Let's Talk
                </Button>
              </Link>
            </div>
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
