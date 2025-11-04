import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, DollarSign, Users, Store, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function JourneyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Choose Your Journey</h1>
          <p className="text-xl leading-relaxed text-white/90 mb-8">
            There are four ways to participate in the MOMM movement. Each path leads to equity ownership and a more
            equitable economy.
          </p>
        </div>
      </section>

      {/* Journey Options */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shopper Journey */}
            <Card className="border-2 border-teal-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-br from-teal-50 to-teal-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">I Want to Shop</CardTitle>
                    <p className="text-sm text-muted-foreground">Buy products that align with your values</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Shop verified ethical products from trusted brands</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Get personalized recommendations based on your values</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Earn rewards in your MOMM Vault with every purchase</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Build equity ownership through your shopping</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
                  <Link href="/products">
                    Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Investor Journey */}
            <Card className="border-2 border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-br from-orange-50 to-orange-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">I Want to Invest</CardTitle>
                    <p className="text-sm text-muted-foreground">Fund the movement and share in its growth</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Invest as little as $100 in the future of ethical commerce</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Access a $4.2 trillion market opportunity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Earn equity and profit share as MOMM grows</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Support a community-owned platform</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-orange-600 hover:bg-orange-700" size="lg">
                  <Link href="/investors">
                    Learn About Investing <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Contributor Journey */}
            <Card className="border-2 border-pink-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-br from-pink-50 to-pink-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">I Want to Contribute</CardTitle>
                    <p className="text-sm text-muted-foreground">Build the platform and earn equity</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Contribute your skills: engineering, marketing, design, data, legal</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Work flexibly - even small contributions earn equity</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Join a guild and connect with like-minded builders</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Your time = ownership in the platform</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-pink-600 hover:bg-pink-700" size="lg">
                  <Link href="/contributors">
                    Explore Guilds <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Vendor Journey */}
            <Card className="border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                    <Store className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl">I Want to Sell</CardTitle>
                    <p className="text-sm text-muted-foreground">List your ethical products on MOMM</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Reach conscious consumers actively seeking ethical products</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Get verified through our TRUST protocol</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Earn equity in the marketplace you help create</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Join a community of ethical brands</p>
                  </div>
                </div>
                <Button asChild className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                  <Link href="/vendor/register">
                    Become a Vendor <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose MOMM */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why MOMM is Different</h2>
            <p className="text-xl text-muted-foreground">We're not just another marketplace. We're a movement.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Community-Owned</h3>
                <p className="text-sm text-muted-foreground">
                  Every participant earns equity. When MOMM succeeds, everyone succeeds.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Blockchain Verified</h3>
                <p className="text-sm text-muted-foreground">
                  TRUST protocol ensures every ethical claim is cryptographically verified.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">AI-Powered Personalization</h3>
                <p className="text-sm text-muted-foreground">
                  HEART AI learns your values and matches you with products that align.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">Economic Justice</h3>
                <p className="text-sm text-muted-foreground">
                  Wealth redistribution through the MOMM Vault puts power back in your hands.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Choose your path and join thousands building a more equitable economy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
