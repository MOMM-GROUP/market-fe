import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Users,
  TrendingUp,
  Target,
  CheckCircle,
  Package,
  Handshake,
  BarChart,
  Globe,
  Heart,
  Zap,
  Star,
} from "lucide-react"
import Link from "next/link"

export default function BrandsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">For Ethical Brands</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Partner With MOMM</h1>
          <p className="text-xl leading-relaxed text-white/95 mb-8 max-w-3xl mx-auto">
            Reach conscious consumers who actively seek ethical products. Get verified. Build trust. Share in the
            success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Become a Partner
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <a href="#how-it-works">Learn How It Works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Partner With MOMM */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Partner With MOMM?</h2>
            <p className="text-xl text-muted-foreground">We're building a marketplace where ethical brands thrive</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Reach Conscious Consumers</h3>
                <p className="text-muted-foreground">
                  Connect with shoppers who actively seek ethical products and are willing to pay for verified quality.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Build Trust Through Verification</h3>
                <p className="text-muted-foreground">
                  Our TRUST protocol verifies your certifications on blockchain, eliminating greenwashing concerns.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Fair Partnership Model</h3>
                <p className="text-muted-foreground">
                  No extractive fees. Share in the ecosystem's success. Your growth is our growth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Targeted Discovery</h3>
                <p className="text-muted-foreground">
                  Our HEART AI matches your products with shoppers whose values align with your brand.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Transparent Analytics</h3>
                <p className="text-muted-foreground">
                  Real-time insights into customer behavior, preferences, and impact metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Community Amplification</h3>
                <p className="text-muted-foreground">
                  Benefit from word-of-mouth marketing within a passionate community of ethical shoppers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Four simple steps to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-teal-600">1</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Apply to Partner</h3>
                <p className="text-sm text-muted-foreground">
                  Fill out our partnership form. We review applications within 48 hours.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-orange-600">2</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Submit Certifications</h3>
                <p className="text-sm text-muted-foreground">
                  Provide documentation for your ethical certifications (Organic, Fair Trade, B Corp, etc.)
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-pink-600">3</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Get Verified</h3>
                <p className="text-sm text-muted-foreground">
                  Our TRUST protocol verifies your claims on blockchain. No greenwashing, just truth.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="text-2xl font-bold text-purple-600">4</div>
                </div>
                <h3 className="text-lg font-semibold mb-3">Start Selling</h3>
                <p className="text-sm text-muted-foreground">
                  List your products and reach thousands of conscious consumers actively seeking ethical brands.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What We Look For in Partners</h2>
            <p className="text-xl text-muted-foreground">
              We partner with brands that share our commitment to ethical commerce
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2 border-green-200">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Required Criteria
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">
                      At least one verified ethical certification (Organic, Fair Trade, B Corp, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Transparent supply chain and sourcing practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Commitment to fair labor practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Willingness to share certification documentation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Alignment with MOMM's mission and values</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  Bonus Points
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Multiple certifications across different categories</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Minority-owned, women-owned, or LGBTQ+-owned business</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Active community engagement and social impact initiatives</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Innovative sustainability practices</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Star className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Commitment to continuous improvement and transparency</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Partnership Benefits</h2>
            <p className="text-xl text-muted-foreground">What you get as a MOMM partner brand</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-teal-600" />
                  Product Listing & Visibility
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Featured placement in relevant categories</li>
                  <li>• Verified badge on all your products</li>
                  <li>• Detailed brand story page</li>
                  <li>• Priority in search results for certified products</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  Marketing & Promotion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Featured in MOMM newsletters and social media</li>
                  <li>• Inclusion in curated collections</li>
                  <li>• Co-marketing opportunities</li>
                  <li>• Access to our community of conscious consumers</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-pink-600" />
                  Analytics & Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time sales and traffic data</li>
                  <li>• Customer demographics and preferences</li>
                  <li>• Impact metrics and reporting</li>
                  <li>• Competitive benchmarking</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Handshake className="h-5 w-5 text-purple-600" />
                  Community & Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Dedicated partner success manager</li>
                  <li>• Access to brand partner community</li>
                  <li>• Educational resources and best practices</li>
                  <li>• Priority customer support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Placeholder */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Partner Success Stories</h2>
            <p className="text-xl text-muted-foreground">Coming soon: Stories from brands thriving on MOMM</p>
          </div>

          <Card className="max-w-2xl mx-auto border-2 border-dashed">
            <CardContent className="p-12 text-center">
              <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                We're currently onboarding our first partner brands. Check back soon to see their success stories!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What does it cost to partner with MOMM?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We charge a fair commission on sales (significantly lower than traditional marketplaces). No upfront
                  fees, no hidden costs. You only pay when you sell.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How long does verification take?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Initial application review takes 48 hours. Certification verification typically takes 5-7 business
                  days depending on the complexity of your documentation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do I need to be certified to partner?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes, at least one verified ethical certification is required. This ensures all products on MOMM meet
                  our standards for ethical commerce.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I sell internationally?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Currently, we're focused on the US market. International expansion is planned for 2026. We'll notify
                  partner brands when new markets open.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Partner With MOMM?</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Join a marketplace that values ethics, transparency, and fair partnerships. Let's build a better economy
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Apply to Partner
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <a href="mailto:brands@momm.com">Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
