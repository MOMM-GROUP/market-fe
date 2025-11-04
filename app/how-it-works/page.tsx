import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingCart,
  Filter,
  CreditCard,
  TrendingUp,
  Package,
  Shield,
  UsersIcon,
  Handshake,
  CheckCircle,
  Code,
  Heart,
  PiggyBank,
  Zap,
  Globe,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="center-content max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">How MOMM Works</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            A marketplace where everyone wins: shoppers, brands, and contributors
          </p>
        </div>
      </section>

      {/* For Shoppers */}
      <section className="py-16 px-4 bg-background">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">For Shoppers</h2>
            <p className="text-xl text-muted-foreground">Shop with purpose. Build wealth with every purchase.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">1. Browse</h3>
                <p className="text-sm text-muted-foreground">
                  Discover 2,847+ verified ethical products across all categories
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Filter className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">2. Filter</h3>
                <p className="text-sm text-muted-foreground">
                  Search by certifications you care about: Organic, Fair Trade, B Corp, and 150+ more
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">3. Purchase</h3>
                <p className="text-sm text-muted-foreground">
                  Buy directly from ethical brands with transparent pricing
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">4. Earn Equity</h3>
                <p className="text-sm text-muted-foreground">
                  A percentage of every purchase goes into your personal MOMM Vault
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/products">
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Brands */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">For Brands</h2>
            <p className="text-xl text-muted-foreground">
              Reach conscious consumers. Build trust. Share in the success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <Package className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">1. List Products</h3>
                <p className="text-sm text-muted-foreground">Add your ethical products to the MOMM marketplace</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">2. Get Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Submit certifications for blockchain verification through TRUST protocol
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">3. Reach Customers</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with shoppers who actively seek ethical products
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Handshake className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">4. Share Success</h3>
                <p className="text-sm text-muted-foreground">Participate in the ecosystem you help create and grow</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Partner With Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Contributors */}
      <section className="py-16 px-4 bg-background">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">For Contributors</h2>
            <p className="text-xl text-muted-foreground">Build the future. Own what you create.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">1. Choose Tasks</h3>
                <p className="text-sm text-muted-foreground">
                  Browse available tasks: coding, design, marketing, legal, and more
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Code className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">2. Contribute</h3>
                <p className="text-sm text-muted-foreground">
                  Work on your own schedule. Even small contributions matter.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">3. Earn Equity</h3>
                <p className="text-sm text-muted-foreground">Your contributions earn you ownership in MOMM's success</p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <UsersIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">4. Build Together</h3>
                <p className="text-sm text-muted-foreground">Join a community building a more equitable economy</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Link href="/contributors">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                Become a Contributor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MOMM Vault Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The MOMM Vault</h2>
            <p className="text-xl text-muted-foreground">Your personal wealth-building tool</p>
          </div>

          <Card className="mb-8 border-2 border-primary/20">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                <PiggyBank className="h-10 w-10 text-primary" />
              </div>
              <p className="text-lg mb-4 leading-relaxed">
                Every time you purchase on MOMM, a percentage of that value goes into your personal vault. You decide
                what to do with it:
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Invest</h3>
                <p className="text-sm text-muted-foreground">
                  Have your funds professionally managed and invested in the market or in small businesses
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
                  Donate to vetted nonprofits or community projects that matter to you
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold mb-3">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Use it to pay for essential services like health insurance or memberships
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
                  Set it aside for when you need it most for future purchases
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-background">
        <div className="center-content max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Common questions about how MOMM works</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  How do I earn equity as a shopper?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every purchase you make on MOMM contributes a percentage to your personal MOMM Vault. This vault
                  represents your equity in the platform and can be used for investing, giving, or future purchases.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  How are products verified?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use the TRUST protocol, a zero-knowledge proof system that verifies certifications on the
                  blockchain. Brands submit documentation, we verify it cryptographically, and you see transparent proof
                  on every product page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  Can I contribute without technical skills?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We need marketers, writers, designers, community managers, legal advisors, and more. Every skill has
                  value in building MOMM. Check our Contributors page to see available tasks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  How do brands benefit from joining MOMM?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Brands gain access to a growing community of conscious consumers who actively seek ethical products.
                  They also participate in the ecosystem's success through fair partnership models, not extractive
                  marketplace fees.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  Is MOMM a nonprofit or for-profit?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  MOMM is structured as a Public Benefit Corporation (PBC), which means we're legally required to
                  balance profit with social good. We're building a sustainable business that serves people, not just
                  shareholders.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="center-content max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Movement?</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Every purchase, every contribution, every interaction helps build a more equitable economy. The time for
            change is now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Shopping
              </Button>
            </Link>
            <Link href="/investors">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Invest
              </Button>
            </Link>
            <Link href="/contributors">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Contribute
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
