import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Heart,
  Handshake,
  Users,
  XCircle,
  Ban,
  Eye,
  DollarSign,
  Wallet,
  Vote,
  Filter,
  UserCheck,
  Lock,
  Brain,
  CheckCircle2,
  TrendingUp,
  Package,
  Award,
  MessageCircle,
  HelpCircle,
} from "lucide-react"
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
        {/* Hero Section - KEEPING AS IS */}
        <section className="py-32 px-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="center-content max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">The Era of the Billionaire is Over</h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-semibold">
              The money exists. It's just going to the wrong people.
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

        {/* How MOMM Works For You */}
        <section className="py-20 px-4">
          <div className="center-content max-w-6xl">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">How MOMM Works For You</h2>

            {/* Feature 1: Never See Brands You're Boycotting */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Ban className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">1. Never See Brands You're Boycotting</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Tell us who you're boycotting—Nestlé, Amazon, whoever—and they disappear from your search. No
                    accidental purchases. No supporting companies you oppose.
                  </p>
                  <p className="text-sm font-semibold text-teal-600">Your boycott list is yours. Private. Permanent.</p>
                </div>
              </div>
            </div>

            {/* Feature 2: See Political Donations */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">2. See Exactly Who Companies Donate To</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Every brand shows political donations. Right there. No research needed.
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    Filter out brands that fund politicians you don't support.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Get Paid */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">3. Get Paid For Shopping, Selling & Building</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Every purchase puts money into your MOMM Vault—your personal profit share.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="font-semibold mb-2">🛒 Buy</p>
                        <p className="text-sm text-muted-foreground">You get a share of platform profits</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="font-semibold mb-2">💼 Sell</p>
                        <p className="text-sm text-muted-foreground">Keep more of your revenue than on Amazon</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="font-semibold mb-2">🔨 Build</p>
                        <p className="text-sm text-muted-foreground">Contributors own what they create</p>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="text-sm font-semibold text-green-600">
                    Not points. Not credits. Real money. In your vault.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4: Use Your Vault */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wallet className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">4. Use Your Vault However You Want</h3>
                  <p className="text-lg text-muted-foreground mb-4">Your money. Your choice. Use it for:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <Card className="border-2">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl mb-2">💰</p>
                        <p className="font-semibold mb-2">Invest</p>
                        <p className="text-xs text-muted-foreground">
                          Professionally managed investments in the market or small businesses
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl mb-2">💚</p>
                        <p className="font-semibold mb-2">Give</p>
                        <p className="text-xs text-muted-foreground">
                          Donate to vetted nonprofits or community projects
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl mb-2">🏥</p>
                        <p className="font-semibold mb-2">Live</p>
                        <p className="text-xs text-muted-foreground">
                          Pay for health insurance, ClassPass, or essentials
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-4 text-center">
                        <p className="text-2xl mb-2">🛡️</p>
                        <p className="font-semibold mb-2">Save</p>
                        <p className="text-xs text-muted-foreground">Emergency fund when you need it</p>
                      </CardContent>
                    </Card>
                  </div>
                  <p className="text-sm font-semibold text-purple-600">
                    Got a better idea? Tell us. MOMM is built by the people who use it.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 5: Filter By Values */}
            <div className="mb-16">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Filter className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">5. Filter By What Actually Matters To You</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Everyone has different values. MOMM lets you filter by yours:
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                    <Badge variant="outline" className="justify-start p-2">
                      🌍 Local
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      🏳️‍🌈 LGBTQ+ Owned
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      👩🏾‍💼 BIPOC Owned
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      ♿ Disability-Owned
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      ♻️ Sustainable
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      🤝 Fair Labor
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      🌱 Organic
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      🏢 B Corp
                    </Badge>
                    <Badge variant="outline" className="justify-start p-2">
                      🔬 Cruelty-Free
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-pink-600">
                    Set your values once. Every search respects them.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 6: Get Matched */}
            <div className="mb-0">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <UserCheck className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">6. Get Matched With Real People Like You</h3>
                  <p className="text-lg text-muted-foreground mb-4">
                    Tired of influencers who don't look like you? Don't share your values? Are clearly just paid to
                    promote?
                  </p>
                  <p className="text-lg font-semibold mb-3">MOMM matches you with:</p>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Reviewers who share your ethical values</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>People with similar measurements and body types</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Real community members (not paid shills)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Influencers who actually use the products</span>
                    </li>
                  </ul>
                  <p className="text-sm font-semibold text-teal-600">
                    See how products look on bodies like yours. From people who believe what you believe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4">
          <div className="center-content max-w-5xl">
            <h2 className="text-4xl font-bold text-center mb-12">The MOMM Difference</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-4 font-bold text-lg">Feature</th>
                    <th className="text-center p-4 font-bold text-lg">Other Marketplaces</th>
                    <th className="text-center p-4 font-bold text-lg bg-teal-50">MOMM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Who profits</td>
                    <td className="text-center p-4 text-muted-foreground">Billionaires profit</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">You profit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Your data</td>
                    <td className="text-center p-4 text-muted-foreground">Your data gets sold</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Your data stays private</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Verification</td>
                    <td className="text-center p-4 text-muted-foreground">Can't verify claims</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Every claim is verified</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Boycotts</td>
                    <td className="text-center p-4 text-muted-foreground">Support companies you hate</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Boycott whoever you want</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Transparency</td>
                    <td className="text-center p-4 text-muted-foreground">Mystery political donations</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Full transparency</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Personalization</td>
                    <td className="text-center p-4 text-muted-foreground">One-size-fits-all</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Filtered by your values</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
          <div className="center-content max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">We're Actually Building This</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div>
                <div className="text-5xl font-bold mb-2">2,847</div>
                <div className="text-xl">Products Indexed</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">156</div>
                <div className="text-xl">Certifications Tracked</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">MVP</div>
                <div className="text-xl">Building MARKET Platform</div>
              </div>
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

        {/* Get Started Section */}
        <section className="py-16 px-4">
          <div className="center-content max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">Stop funding billionaires. Start funding yourself.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR SHOPPERS</h3>
                  <p className="text-sm text-muted-foreground">
                    Start shopping verified ethical products. Your purchases build your equity.
                  </p>
                  <Link href="/early-access">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Start Shopping →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <Handshake className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR SELLERS</h3>
                  <p className="text-sm text-muted-foreground">
                    List your products. Reach conscious consumers. Keep more of your money.
                  </p>
                  <Link href="/vendors">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Become a Vendor →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR BUILDERS</h3>
                  <p className="text-sm text-muted-foreground">
                    Help build the platform. Own what you create. Profit when we profit.
                  </p>
                  <Link href="/contributors">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Join Contributors →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR INVESTORS</h3>
                  <p className="text-sm text-muted-foreground">
                    Back a marketplace that actually works for people, not billionaires.
                  </p>
                  <Link href="/investors">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Invest in MOMM →</Button>
                  </Link>
                </CardContent>
              </Card>
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
