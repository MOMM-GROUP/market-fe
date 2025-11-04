import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  TrendingDown,
  Users,
  DollarSign,
  Heart,
  PiggyBank,
  Briefcase,
  Zap,
  Shield,
  Globe,
  ShoppingCart,
  CheckCircle,
  FileCheck,
  Search,
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
            Three interconnected systems working together to rebuild commerce
          </p>
        </div>
      </section>

      {/* The Three Systems Section */}
      <section className="py-16 px-4 bg-background">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Three Systems</h2>
            <p className="text-xl text-muted-foreground">TRUST verifies. MARKET connects. HEART personalizes.</p>
          </div>

          {/* TRUST Protocol */}
          <div className="mb-16">
            <Card className="border-2 border-teal-200 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Shield className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">TRUST: Verification</h3>
                    <p className="text-teal-100">Zero-knowledge proof system for ethical claims</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">
                  The TRUST protocol is our zero-knowledge proof system. When a brand claims to be "organic" or
                  "fair-trade," we verify it cryptographically on the blockchain. You see the claim, you see the proof,
                  no middleman.
                </p>

                <div className="bg-teal-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-lg mb-4">How It Works:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Brand submits certification</p>
                        <p className="text-sm text-muted-foreground">
                          Companies provide documentation of their ethical certifications
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">TRUST protocol verifies on blockchain</p>
                        <p className="text-sm text-muted-foreground">
                          Cryptographic verification ensures authenticity without exposing sensitive data
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Consumer sees verification status</p>
                        <p className="text-sm text-muted-foreground">
                          Transparent proof displayed on every product page
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">No fraud, no greenwashing</p>
                        <p className="text-sm text-muted-foreground">
                          Immutable blockchain records prevent false claims
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-teal-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Result: Complete transparency and trust</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MARKET Platform */}
          <div className="mb-16">
            <Card className="border-2 border-orange-200 overflow-hidden">
              <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">MARKET: Discovery</h3>
                    <p className="text-orange-100">Connecting conscious consumers with verified products</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">
                  Our MARKET platform connects conscious consumers with verified ethical products. Every product has
                  been vetted, every claim has been verified, and every purchase creates value for you.
                </p>

                <div className="bg-orange-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-lg mb-4">Key Features:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Search className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Browse verified ethical products</p>
                        <p className="text-sm text-muted-foreground">
                          Every product backed by TRUST protocol verification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileCheck className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Filter by certifications you care about</p>
                        <p className="text-sm text-muted-foreground">Organic, Fair Trade, B Corp, and 150+ more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <TrendingDown className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">See company impact metrics</p>
                        <p className="text-sm text-muted-foreground">
                          Transparent data on environmental and social impact
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-orange-600 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium">Every purchase = equity for you</p>
                        <p className="text-sm text-muted-foreground">
                          Build wealth through the MOMM Vault with every transaction
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-orange-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Result: Shop with confidence and purpose</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* HEART AI */}
          <div className="mb-16">
            <Card className="border-2 border-pink-200 overflow-hidden">
              <div className="bg-gradient-to-r from-pink-600 to-pink-500 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">HEART: Personalization</h3>
                    <p className="text-pink-100">AI that learns your values and matches your style</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-lg mb-6 leading-relaxed">
                  HEART is our AI recommendation engine that learns your values. Tell us what matters to
                  you—environment, fair labor, diversity—and we match you with products that align.
                </p>

                <div className="bg-pink-50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-lg mb-4">How It Works:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        1
                      </div>
                      <div>
                        <p className="font-medium">You answer value questions</p>
                        <p className="text-sm text-muted-foreground">
                          Tell us what matters most: environment, labor, diversity, health, etc.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        2
                      </div>
                      <div>
                        <p className="font-medium">HEART learns your preferences</p>
                        <p className="text-sm text-muted-foreground">
                          AI analyzes your values, style preferences, and shopping behavior
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Get personalized product matches</p>
                        <p className="text-sm text-muted-foreground">
                          See products ranked by how well they align with your values
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Your score matches your values</p>
                        <p className="text-sm text-muted-foreground">
                          Every product shows a personalized match percentage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-pink-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-medium">Result: Shopping that truly reflects who you are</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Economic Model Deep Dive */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Everyone Gets a Piece of the Pie</h2>
            <p className="text-xl text-muted-foreground">Four ways to participate in the MOMM economy</p>
          </div>

          <div className="space-y-8">
            {/* For INVESTORS */}
            <Card>
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-3">
                  <DollarSign className="h-6 w-6 text-purple-600" />
                  For INVESTORS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  Invest as little as $100. You're funding the movement AND sharing in its growth. When MOMM succeeds,
                  you succeed.
                </p>
              </CardContent>
            </Card>

            {/* For COMMUNITY BUILDERS */}
            <Card>
              <CardHeader className="bg-teal-50">
                <CardTitle className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-teal-600" />
                  For COMMUNITY BUILDERS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  Your skills are valuable. Engineers, marketers, lawyers, designers—contribute and earn equity. Your
                  time = ownership.
                </p>
              </CardContent>
            </Card>

            {/* For VENDORS/BRANDS */}
            <Card>
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-3">
                  <Briefcase className="h-6 w-6 text-orange-600" />
                  For VENDORS/BRANDS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  Sell verified products on our platform. Share in the success of the market you help create. Everyone
                  wins when you win.
                </p>
              </CardContent>
            </Card>

            {/* For SHOPPERS */}
            <Card>
              <CardHeader className="bg-pink-50">
                <CardTitle className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-pink-600" />
                  For SHOPPERS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-lg leading-relaxed">
                  Every dollar is a vote for change. A percentage of every transaction goes into your personal Vault.
                  Shop with purpose, profit with purpose.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MOMM Vault Section */}
      <section className="py-16 px-4 bg-background">
        <div className="center-content max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Your Personal Vault</h2>
            <p className="text-xl text-muted-foreground">A reward system that's actually yours</p>
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
