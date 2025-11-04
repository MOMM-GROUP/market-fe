import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Calendar,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function InvestorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - KEEPING EXISTING BLUE GRADIENT */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Invest in the Future of Ethical Commerce</h1>
          <p className="text-xl leading-relaxed text-white/90 mb-8">
            Be part of a $4.2 trillion opportunity to reshape commerce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <a href="https://wefunder.com/momm" target="_blank" rel="noopener noreferrer">
                Invest on Wefunder <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="#terms">View Investment Terms</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Investors Back MOMM */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Investors Back MOMM</h2>
            <p className="text-xl text-muted-foreground">A massive market opportunity with proven consumer demand</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl font-bold text-teal-600 mb-2">$4.2T</div>
                <div className="text-sm font-semibold mb-2">Total Addressable Market</div>
                <p className="text-sm text-muted-foreground">
                  The global ethical commerce market is growing faster than ever
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl font-bold text-orange-600 mb-2">73%</div>
                <div className="text-sm font-semibold mb-2">Proven Consumer Demand</div>
                <p className="text-sm text-muted-foreground">Nearly 3 in 4 consumers want to buy ethically</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl font-bold text-pink-600 mb-2">Unique</div>
                <div className="text-sm font-semibold mb-2">Positioning</div>
                <p className="text-sm text-muted-foreground">
                  Only platform combining verification + marketplace + community ownership in one platform
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="text-5xl font-bold text-purple-600 mb-2">5+</div>
                <div className="text-sm font-semibold mb-2">Revenue Streams</div>
                <p className="text-sm text-muted-foreground">Diversified income from marketplace, data, services</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Now? */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Now?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The market for ethical commerce is massive and underserved. Consumers want to shop ethically but don't
              trust claims. Vendors want to reach conscious consumers but are fragmented. MOMM is the bridge.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Market Size
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  TAM: $4.2 trillion global ethical commerce market with double-digit annual growth
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Pain Point
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  89% of consumers report greenwashing concerns and lack of trust in ethical claims
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Competitive Landscape
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Blue ocean opportunity - no competitor offers verification + marketplace + community ownership in one
                  platform
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Market ready NOW - consumer trust at all-time low, demand for transparency at all-time high
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Make Money */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How We Make Money</h2>
            <p className="text-xl text-muted-foreground">Five diversified revenue streams</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-teal-600" />
                </div>
                <div className="text-3xl font-bold text-teal-600 mb-2">40%</div>
                <h3 className="font-semibold mb-2">Marketplace Commission</h3>
                <p className="text-sm text-muted-foreground">Transaction fees from vendor sales</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Zap className="h-8 w-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-orange-600 mb-2">25%</div>
                <h3 className="font-semibold mb-2">Vendor Services</h3>
                <p className="text-sm text-muted-foreground">Management dashboard, analytics, verification services</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-pink-600" />
                </div>
                <div className="text-3xl font-bold text-pink-600 mb-2">20%</div>
                <h3 className="font-semibold mb-2">B2B API Access</h3>
                <p className="text-sm text-muted-foreground">Enterprise access to verification data for brands</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">10%</div>
                <h3 className="font-semibold mb-2">Data Licensing</h3>
                <p className="text-sm text-muted-foreground">
                  Anonymized market insights to researchers and businesses
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">5%</div>
                <h3 className="font-semibold mb-2">Premium Features</h3>
                <p className="text-sm text-muted-foreground">Advanced tools for shoppers and vendors</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Growth Trajectory */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Growth Trajectory</h2>
            <p className="text-xl text-muted-foreground">
              Conservative projections based on comparable ethical commerce platforms
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
                <div>
                  <div className="text-sm text-muted-foreground mb-2">2025</div>
                  <div className="text-3xl font-bold text-teal-600">$500K</div>
                  <div className="text-xs text-muted-foreground mt-1">ARR</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">2026</div>
                  <div className="text-3xl font-bold text-orange-600">$3M</div>
                  <div className="text-xs text-muted-foreground mt-1">ARR</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">2027</div>
                  <div className="text-3xl font-bold text-pink-600">$10M</div>
                  <div className="text-xs text-muted-foreground mt-1">ARR</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">2028</div>
                  <div className="text-3xl font-bold text-purple-600">$25M</div>
                  <div className="text-xs text-muted-foreground mt-1">ARR</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">2029</div>
                  <div className="text-3xl font-bold text-blue-600">$60M</div>
                  <div className="text-xs text-muted-foreground mt-1">ARR</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Led by Experts */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Led by Experts</h2>
            <p className="text-xl text-muted-foreground">
              Building with a core team of commerce, data, and community experts
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg text-muted-foreground">
                Our founding team brings experience in marketplace platforms, data engineering, ethical commerce, and
                community building. We're backed by advisors from leading sustainability organizations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Investment Opportunity */}
      <section id="terms" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Investment Opportunity</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Key Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Funding Round</span>
                  <span className="font-semibold">Pre-Seed</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Target Raise</span>
                  <span className="font-semibold">$250K</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Currently Raised</span>
                  <span className="font-semibold">$5K</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">Number of Investors</span>
                  <span className="font-semibold">13</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Minimum Investment</span>
                  <span className="font-semibold">$100</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use of Funds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Product Development</span>
                    <span className="text-sm font-semibold">50%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-teal-600 h-2 rounded-full" style={{ width: "50%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Vendor Partnerships</span>
                    <span className="text-sm font-semibold">25%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: "25%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Infrastructure</span>
                    <span className="text-sm font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-pink-600 h-2 rounded-full" style={{ width: "20%" }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Legal & Compliance</span>
                    <span className="text-sm font-semibold">5%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "5%" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700"
            >
              <a href="https://wefunder.com/momm" target="_blank" rel="noopener noreferrer">
                Invest on Wefunder <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Profit Sharing Model */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Profit Sharing Model</h2>
            <p className="text-xl text-muted-foreground">
              Once MOMM reaches profitability (estimated 2026-2027), investors share in the success
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {/* Return Path Timeline */}
            <Card className="border-2 border-teal-500">
              <CardHeader className="bg-teal-50">
                <CardTitle>Return Path</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-24 flex-shrink-0 font-semibold text-teal-600">Year 0-2:</div>
                    <div>
                      <p className="text-muted-foreground">Company growth + equity value appreciation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-24 flex-shrink-0 font-semibold text-orange-600">Year 2+:</div>
                    <div>
                      <p className="text-muted-foreground">
                        Annual profit distribution (5% of profits) + Equity appreciation from future rounds
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Conservative Warning */}
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Conservative Timeline</h4>
                  <p className="text-yellow-800">
                    Most startups take 3-5 years to reach profitability. We're estimating Year 2-3 (2026-2027) for MOMM.
                    This is not a promise of immediate returns—it's a long-term investment in building something
                    meaningful.
                  </p>
                </div>
              </div>
            </div>

            {/* Return Scenarios */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center">Example Return Scenarios</h3>

              {/* Scenario 1 */}
              <Card className="border-2 border-teal-200">
                <CardHeader className="bg-teal-50">
                  <CardTitle className="text-lg">Scenario 1: Early Profitability (Year 2)</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="font-semibold">$2M ARR</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Net Margin</span>
                      <span className="font-semibold">12% ($240K profit)</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Investor Pool (5%)</span>
                      <span className="font-semibold">$12,000</span>
                    </div>
                    <div className="bg-teal-50 p-4 rounded-lg mt-4">
                      <p className="text-sm font-semibold text-teal-900 mb-2">Your $1,000 Investment:</p>
                      <p className="text-sm text-teal-700">≈ $60/year dividend</p>
                      <p className="text-xs text-teal-600 mt-2">+ Equity value appreciation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Scenario 2 */}
              <Card className="border-2 border-orange-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-lg">Scenario 2: Scaled Growth (Year 5)</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Revenue</span>
                      <span className="font-semibold">$10M ARR</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Net Margin</span>
                      <span className="font-semibold">15% ($1.5M profit)</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm text-muted-foreground">Investor Pool (5%)</span>
                      <span className="font-semibold">$75,000</span>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg mt-4">
                      <p className="text-sm font-semibold text-orange-900 mb-2">Your $1,000 Investment:</p>
                      <p className="text-sm text-orange-700">≈ $375/year dividend</p>
                      <p className="text-xs text-orange-600 mt-2">+ Company value appreciation (potential 10x+)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Why We're Conservative */}
            <Card className="bg-gradient-to-r from-teal-50 via-orange-50 to-pink-50 border-2">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-4">Why We're Conservative</h4>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <p>
                    ✓ <strong>Honest Timeline:</strong> Most startups fail or take 5+ years to profitability. We're
                    being realistic about the journey.
                  </p>
                  <p>
                    ✓ <strong>Dual Returns:</strong> You benefit from both profit-sharing AND equity appreciation as the
                    company grows.
                  </p>
                  <p>
                    ✓ <strong>Sustainable Model:</strong> We only distribute what we can afford, ensuring long-term
                    viability.
                  </p>
                  <p>
                    ✓ <strong>Community-First:</strong> Share success with everyone who built it.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* The Promise */}
            <div className="border-4 border-purple-500 rounded-lg p-6 bg-purple-50 text-center">
              <p className="text-lg font-bold text-purple-900 mb-3">💎 Our Promise to Investors</p>
              <p className="text-gray-700">
                We're not promising overnight returns. We're promising fairness, transparency, and the opportunity to be
                part of something that actually changes commerce for the better. When we succeed, you succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Transparency */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Risk Transparency</h2>
            <p className="text-xl text-muted-foreground">
              We believe in honest communication about both opportunities and challenges
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Execution Complexity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Risk</h4>
                    <p className="text-sm text-muted-foreground">
                      Building a complex marketplace with verification is technically challenging
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Mitigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Phased rollout, experienced team, community support, proven tech stack
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Market Competition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Risk</h4>
                    <p className="text-sm text-muted-foreground">Other platforms trying to solve ethical commerce</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Mitigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Community-owned model is unique, verification advantage, vendor dashboard differentiator
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Data Dependency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Risk</h4>
                    <p className="text-sm text-muted-foreground">Certification data quality is critical to success</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Mitigation</h4>
                    <p className="text-sm text-muted-foreground">
                      Verification process, automated + manual review, vendor self-reporting with badges
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  Adoption Risk
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-red-600">Risk</h4>
                    <p className="text-sm text-muted-foreground">
                      Getting vendors and shoppers to adopt simultaneously
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 text-green-600">Mitigation</h4>
                    <p className="text-sm text-muted-foreground">
                      2,847 products already indexed, free vendor tools, low-cost entry, community-first approach
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA - KEEPING EXISTING BLUE GRADIENT */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to join the movement?</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Invest in a platform that's building economic justice through commerce
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <a href="https://wefunder.com/momm" target="_blank" rel="noopener noreferrer">
                Invest Now <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <a href="mailto:team@momm.group">
                Schedule Call <Calendar className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/contact">Questions?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
