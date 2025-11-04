import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  TrendingUp,
  Target,
  CheckCircle,
  BarChart,
  Zap,
  Star,
  Clock,
  Award,
  Users,
  Lightbulb,
  Heart,
  Handshake,
  LineChart,
  Network,
  DollarSign,
} from "lucide-react"
import Link from "next/link"

export default function VendorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">For Ethical Vendors</Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Sell to Conscious Consumers</h1>
          <p className="text-xl leading-relaxed text-white/95 mb-8 max-w-3xl mx-auto">
            Reach customers who actually value ethics. Get verified. Grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Apply to Sell
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <a href="#how-it-works">Learn How It Works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Partner With MOMM - 3 Pillars */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Partner With MOMM?</h2>
            <p className="text-xl text-muted-foreground">Three pillars of vendor success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Unbreakable Trust */}
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <Shield className="h-8 w-8 text-teal-600" />
                </div>
                <CardTitle className="text-2xl text-teal-600">Unbreakable Trust</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Cryptographic proof of certifications</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Transparent supply chain tracking</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Verified ethical credentials</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Shareable verification badges</span>
                </div>
              </CardContent>
            </Card>

            {/* Actionable Insights */}
            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <BarChart className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-2xl text-orange-600">Actionable Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Real-time consumer insights</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Performance analytics dashboard</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Market trend analysis</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold">FREE vendor management dashboard</span>
                </div>
              </CardContent>
            </Card>

            {/* Powerful Connections */}
            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Network className="h-8 w-8 text-pink-600" />
                </div>
                <CardTitle className="text-2xl text-pink-600">Powerful Connections</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Conscious consumer access</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Influencer matching system</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">B2B partner network</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-pink-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Expert service network</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* FREE Vendor Dashboard Highlight */}
          <Card className="border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <LineChart className="h-10 w-10 text-purple-600" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold mb-2">FREE Vendor Management Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage your sales across all platforms in one place. Unified sales management, cross-platform
                    analytics, inventory sync, performance tracking, and customer insights.
                  </p>
                  <Badge className="bg-purple-600 text-white">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Planned Services - 9 Services across 3 Categories */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Planned Services</h2>
            <p className="text-xl text-muted-foreground">Comprehensive support for vendor success</p>
          </div>

          {/* Category 1: Verification & Trust Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-teal-600">Verification & Trust Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Award className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">Automated Certification Verification</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• One-click certification submission</p>
                  <p>• Cryptographic proof generation</p>
                  <p>• Real-time verification status</p>
                  <p>• Shareable verification badges</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-teal-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">In-Progress Certification Tracking</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Track certifications you're working toward</p>
                  <p>• Public progress display</p>
                  <p>• Community support access</p>
                  <p>• Achievement celebration</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-teal-600" />
                  </div>
                  <CardTitle className="text-lg">Pipeline Improvement Consulting</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Supply chain gap analysis</p>
                  <p>• Certification roadmap planning</p>
                  <p>• Expert network connections</p>
                  <p>• Implementation support</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Category 2: Growth & Insights Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-6 text-orange-600">Growth & Insights Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Early User Testing</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Direct feedback from engaged consumers</p>
                  <p>• Pre-launch product validation</p>
                  <p>• Iterative improvement cycles</p>
                  <p>• Community-driven development</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Targeted Influencer Matching</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• HEART AI matches influencers to vendors</p>
                  <p>• Authentic creator partnerships</p>
                  <p>• Values-based alignment</p>
                  <p>• Performance tracking</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg">Data & Analytics Dashboard</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Performance tracking</p>
                  <p>• HEART score insights by segment</p>
                  <p>• Industry benchmarks (anonymized)</p>
                  <p>• FREE vendor dashboard included</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Category 3: Ecosystem & Connections */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-pink-600">Ecosystem & Connections</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Handshake className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">B2B Partner Network</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Expert service provider network</p>
                  <p>• Discounted partner services</p>
                  <p>• Digital marketing support</p>
                  <p>• Sustainable packaging solutions</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-pink-100 rounded-lg flex items-center justify-center">
                    <Zap className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">Co-Marketing & Bundling</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Partner with complementary vendors</p>
                  <p>• Joint marketing campaigns</p>
                  <p>• Product bundles & giveaways</p>
                  <p>• Cross-promotion opportunities</p>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 mb-3 bg-pink-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-lg">Investor Access</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Introductions to impact investors</p>
                  <p>• Sustainability-focused VCs</p>
                  <p>• Angel networks</p>
                  <p>• For high-potential vendors</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* How Verification Works */}
      <section id="how-it-works" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How Verification Works</h2>
            <p className="text-xl text-muted-foreground">Simple, transparent, and flexible</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 border-teal-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-teal-600" />
                  Verification Timeline
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Badge className="bg-teal-600 text-white">48hrs</Badge>
                  <div>
                    <p className="font-semibold">Initial Review</p>
                    <p className="text-sm text-muted-foreground">We review your application and documentation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Badge className="bg-teal-600 text-white">5-7 days</Badge>
                  <div>
                    <p className="font-semibold">Full Verification</p>
                    <p className="text-sm text-muted-foreground">Complete verification depending on complexity</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-orange-600" />
                  Qualification Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Claim certifications (Organic, Fair Trade, B Corp, etc.)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Ownership-based qualifications (Minority, Women, LGBTQ+-owned)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Track in-progress certifications</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-8 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold mb-3">Verification is Optional But Beneficial</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                You can start selling without verification, but verified vendors get priority placement, trust badges,
                and access to our conscious consumer community.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Commission Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Fair Commission Structure</h2>
          <Card className="border-2 border-green-200 bg-gradient-to-r from-green-50 to-teal-50">
            <CardContent className="p-12">
              <div className="text-5xl font-bold text-green-600 mb-4">5% or We Match Your Lowest Rate</div>
              <p className="text-xl text-muted-foreground mb-6">
                Pay just 5% commission, or if you have a lower rate on another platform, we'll match it. We believe in
                fair partnerships, not extractive fees.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mt-8 text-left">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">5% standard commission rate</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Or we match your lowest platform rate</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">No hidden fees or surprises</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Plus access to all services above</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Selling?</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Join a marketplace that values ethics, transparency, and fair partnerships. Let's build a better economy
            together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary">
                Apply to Sell
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
              <a href="mailto:vendors@momm.com">Email Us</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
