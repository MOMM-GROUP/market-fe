import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  ShoppingCart,
  Heart,
  DollarSign,
  Clock,
  Users,
  TrendingUp,
  Handshake,
  CheckCircle,
  AlertCircle,
  Search,
  Leaf,
  Factory,
  Truck,
  User,
} from "lucide-react"
import Link from "next/link"
import CertificationsShowcase from "@/components/certifications-showcase"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">The money exists. It's just going to the wrong people.</h1>
          <div className="text-xl md:text-2xl leading-relaxed text-white/95 space-y-4 max-w-4xl mx-auto">
            <p className="font-semibold">MOMM is cutting them out.</p>
          </div>
        </div>
      </section>

      {/* The Problem - Expanded */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Founding Narrative: How We're Rebuilding Commerce</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">The Problem</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Greenwashing</h3>
                <p className="text-muted-foreground">Consumers can't verify ethical claims</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Search className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fragmentation</h3>
                <p className="text-muted-foreground">Brands get lost. Shoppers get overwhelmed</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600 rotate-180" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Extraction</h3>
                <p className="text-muted-foreground">Billionaires profit. Everyone else struggles.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The MOMM Ecosystem */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The MOMM Ecosystem</h2>
            <p className="text-xl text-muted-foreground">
              Three interconnected systems working together to rebuild commerce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* TRUST */}
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-teal-100 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-teal-600">TRUST Protocol</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Zero-knowledge proof system for verifying certifications. Every claim is cryptographically verified on
                  blockchain. No more greenwashing, no more false promises.
                </p>
              </CardContent>
            </Card>

            {/* MARKET */}
            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-orange-600">MARKET Platform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Consumer marketplace where verified ethical products are discovered, trusted, and purchased. Every
                  transaction creates equity ownership for the community.
                </p>
              </CardContent>
            </Card>

            {/* HEART */}
            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-pink-600">HEART AI</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Personalized recommendation engine that learns your values and matches you with products that align
                  with your beliefs. Your ethics, your style, your choice.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Commitment to People */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">This Is How We're Different</h2>
            <p className="text-xl text-muted-foreground">Our Commitment to People</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fair Compensation</h3>
                <p className="text-muted-foreground mb-4">
                  When we are able to hire full-time, we promise never to allow the CEO salary to exceed a fair multiple
                  of the lowest employee.
                </p>
                <p className="text-muted-foreground">
                  We're inspired by models like Dan Price ($70K minimum salary for all).
                </p>
                <p className="text-sm font-semibold mt-4 text-foreground">
                  You don't build a just economy by hoarding.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Life-Centric Work</h3>
                <p className="text-muted-foreground mb-4">
                  We champion the 4-day work week. We embed Diversity, Equity, and Inclusion (DEI) into every decision.
                </p>
                <p className="text-sm font-semibold mt-4 text-foreground">
                  Not because it's trendy. Because people matter more than extraction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Contribution Over Commitment</h3>
                <p className="text-muted-foreground mb-4">We know you're stretched thin.</p>
                <p className="text-muted-foreground mb-4">
                  That's why we've designed MOMM so that even if you can only contribute 'one thing here or there,' your
                  effort still earns you equity.
                </p>
                <p className="text-sm font-semibold mt-4 text-foreground">Your time. Your choice. Your value.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Current Status Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">We're Actually Building This</h2>
            <p className="text-xl text-muted-foreground">Current Status</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-teal-600 mb-2">2,847</div>
                <p className="text-lg font-semibold">Products Indexed</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-orange-600 mb-2">156</div>
                <p className="text-lg font-semibold">Certifications Tracked</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="text-5xl font-bold text-pink-600 mb-2">MVP</div>
                <p className="text-lg font-semibold">Building MARKET Platform</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Vision Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The World We're Building</h2>
            <p className="text-xl text-muted-foreground">The Vision</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">FOR SHOPPERS</h3>
                <p className="text-sm text-muted-foreground">
                  Verified products. Real choices. Your purchases fund YOU, not billionaires.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">FOR BUILDERS</h3>
                <p className="text-sm text-muted-foreground">
                  Own what you build. Profit when you profit. Your voice matters in direction.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">FOR BRANDS</h3>
                <p className="text-sm text-muted-foreground">
                  Reach conscious consumers who value you. Fair partnership. Real impact.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">FOR EVERYONE</h3>
                <p className="text-sm text-muted-foreground">
                  Proof that another way is possible. That capitalism can serve people, not exploit them.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The MOMM Vault */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The MOMM Vault: The Power is Yours</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A percentage of the value created by every dollar you spend on MOMM goes into your personal MOMM Vault
              (Community-Owned Rewards Fund).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Invest</h3>
                <p className="text-sm text-muted-foreground">
                  Have your funds professionally managed and invested in the market or in small businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Give</h3>
                <p className="text-sm text-muted-foreground">
                  Donate to vetted nonprofits or community projects that align with your values.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Use it to pay for essential services like your health insurance or ClassPass membership.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Safety Net</h3>
                <p className="text-sm text-muted-foreground">
                  Simply set it aside for a time when you're low on funds and need to tap into it for purchases.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Got a better idea for how the Vault should be used? Let us know! MOMM is a platform built by the people,
              for the people.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Share Your Ideas
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications Showcase */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Verifying Ethical Commerce</h2>
            <p className="text-xl text-muted-foreground">We track 156+ certifications across 8 categories</p>
          </div>
          <CertificationsShowcase />
        </div>
      </section>

      {/* Journey Tracking */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">From Farmer to Shopper</h2>
            <p className="text-xl text-muted-foreground">Every product's journey is verified at each step</p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 transform -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-lg">
                  <Leaf className="h-10 w-10 text-teal-600" />
                </div>
                <h3 className="font-semibold mb-2">SOURCE</h3>
                <p className="text-sm text-muted-foreground">Ethical sourcing verified</p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-lg">
                  <Factory className="h-10 w-10 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">PRODUCTION</h3>
                <p className="text-sm text-muted-foreground">Fair labor practices certified</p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-lg">
                  <Truck className="h-10 w-10 text-pink-600" />
                </div>
                <h3 className="font-semibold mb-2">DISTRIBUTION</h3>
                <p className="text-sm text-muted-foreground">Sustainable logistics tracked</p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-lg">
                  <ShoppingCart className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">MARKETPLACE</h3>
                <p className="text-sm text-muted-foreground">Verified on MOMM MARKET</p>
              </div>

              {/* Step 5 */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center relative z-10 border-4 border-white shadow-lg">
                  <User className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">SHOPPER</h3>
                <p className="text-sm text-muted-foreground">You get equity + choice</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Join the Movement</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Whether you're an investor, builder, brand, or shopper—there's a place for you in the MOMM ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg" variant="secondary">
                Start Shopping
              </Button>
            </Link>
            <Link href="/contributors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Become a Contributor
              </Button>
            </Link>
            <Link href="/investors">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Invest in MOMM
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
