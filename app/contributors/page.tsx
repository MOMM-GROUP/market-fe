import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Megaphone,
  Scale,
  Palette,
  Database,
  Users,
  CheckCircle,
  ArrowRight,
  Clock,
  DollarSign,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function ContributorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Build the Future. Earn Equity.</h1>
          <p className="text-xl leading-relaxed text-white/90 mb-8">
            Your skills are valuable. Contribute to MOMM and earn ownership in the platform you're helping to build.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="#guilds">Explore Guilds</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Contribute */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Contribute to MOMM?</h2>
            <p className="text-xl text-muted-foreground">
              We're building something different. A platform owned by the people who build and use it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Earn Equity</h3>
                <p className="text-muted-foreground">
                  Every contribution earns you equity in MOMM. Your time = ownership. When MOMM succeeds, you succeed.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Commitment</h3>
                <p className="text-muted-foreground">
                  Contribute as much or as little as you want. Even "one thing here or there" earns you equity. No
                  pressure, just progress.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Build Community</h3>
                <p className="text-muted-foreground">
                  Join a movement of builders creating a more equitable economy. Connect with like-minded people making
                  real change.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* The Guild System */}
      <section id="guilds" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">The Guild System</h2>
            <p className="text-xl text-muted-foreground">
              Find your place in the MOMM community. Every guild is essential to our success.
            </p>
          </div>

          <div className="space-y-6">
            {/* Engineering Guild */}
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-teal-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Engineering Guild</CardTitle>
                      <p className="text-sm text-muted-foreground">Build the platform</p>
                    </div>
                  </div>
                  <Badge variant="secondary">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">What We Need:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Full-Stack Developers</Badge>
                    <Badge variant="outline">Blockchain Engineers</Badge>
                    <Badge variant="outline">AI/ML Engineers</Badge>
                    <Badge variant="outline">DevOps</Badge>
                    <Badge variant="outline">QA Engineers</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Example Contributions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Build TRUST protocol verification system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Develop HEART AI recommendation engine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Create marketplace features and integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Optimize performance and scalability</span>
                    </li>
                  </ul>
                </div>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Join Engineering Guild <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Marketing Guild */}
            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-orange-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Megaphone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Marketing Guild</CardTitle>
                      <p className="text-sm text-muted-foreground">Spread the word</p>
                    </div>
                  </div>
                  <Badge variant="secondary">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">What We Need:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Content Creators</Badge>
                    <Badge variant="outline">Social Media Managers</Badge>
                    <Badge variant="outline">SEO Specialists</Badge>
                    <Badge variant="outline">Community Managers</Badge>
                    <Badge variant="outline">Growth Hackers</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Example Contributions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Create social media content and campaigns</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Write blog posts and educational content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Manage community engagement and growth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Develop partnership and outreach strategies</span>
                    </li>
                  </ul>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  Join Marketing Guild <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Design Guild */}
            <Card className="border-2 border-pink-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-pink-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                      <Palette className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Design Guild</CardTitle>
                      <p className="text-sm text-muted-foreground">Craft the experience</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Medium Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">What We Need:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">UI/UX Designers</Badge>
                    <Badge variant="outline">Brand Designers</Badge>
                    <Badge variant="outline">Illustrators</Badge>
                    <Badge variant="outline">Motion Designers</Badge>
                    <Badge variant="outline">Product Designers</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Example Contributions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Design user interfaces and experiences</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Create brand assets and visual identity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Develop design systems and components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-pink-600 flex-shrink-0 mt-0.5" />
                      <span>Conduct user research and testing</span>
                    </li>
                  </ul>
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  Join Design Guild <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Data Guild */}
            <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-purple-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Data Guild</CardTitle>
                      <p className="text-sm text-muted-foreground">Power the insights</p>
                    </div>
                  </div>
                  <Badge variant="secondary">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">What We Need:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Data Scientists</Badge>
                    <Badge variant="outline">Data Analysts</Badge>
                    <Badge variant="outline">Data Engineers</Badge>
                    <Badge variant="outline">Research Specialists</Badge>
                    <Badge variant="outline">Certification Experts</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Example Contributions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Research and catalog certifications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Build data pipelines and scraping tools</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Analyze market trends and user behavior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Verify brand claims and certifications</span>
                    </li>
                  </ul>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  Join Data Guild <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            {/* Legal Guild */}
            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Legal Guild</CardTitle>
                      <p className="text-sm text-muted-foreground">Ensure compliance</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Medium Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">What We Need:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Corporate Lawyers</Badge>
                    <Badge variant="outline">Crypto/Web3 Lawyers</Badge>
                    <Badge variant="outline">Compliance Specialists</Badge>
                    <Badge variant="outline">IP Attorneys</Badge>
                    <Badge variant="outline">Contract Specialists</Badge>
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Example Contributions:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Review terms of service and privacy policies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Navigate crypto and blockchain regulations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Structure equity and ownership models</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Ensure compliance across jurisdictions</span>
                    </li>
                  </ul>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Join Legal Guild <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Equity Works */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How You Earn Equity</h2>
            <p className="text-xl text-muted-foreground">Transparent, fair compensation for your contributions</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Track Your Time</h3>
                <p className="text-muted-foreground">
                  Log your contributions through our simple tracking system. Every hour counts.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Earn Points</h3>
                <p className="text-muted-foreground">
                  Contributions are converted to equity points based on skill level and impact.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-pink-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Convert to Equity</h3>
                <p className="text-muted-foreground">
                  Points convert to actual equity ownership when we formalize the structure.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="max-w-3xl mx-auto border-2 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-center">Example Equity Calculation</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">10 hours of engineering work</span>
                  <span className="font-semibold">100 points</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">5 hours of marketing content</span>
                  <span className="font-semibold">50 points</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <span className="text-muted-foreground">3 hours of design work</span>
                  <span className="font-semibold">30 points</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold">Total Equity Points</span>
                  <span className="font-bold text-primary text-xl">180 points</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                Points are converted to equity shares based on total contributor pool and company valuation
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started */}
      <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Contributing?</h2>
            <p className="text-xl text-muted-foreground">Join the movement and start earning equity today</p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Choose Your Guild</h3>
                    <p className="text-muted-foreground">
                      Pick the guild that matches your skills and interests. You can join multiple guilds.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Connect With Us</h3>
                    <p className="text-muted-foreground">
                      Fill out our contributor form or reach out directly. We'll get you set up with access and tasks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Start Contributing</h3>
                    <p className="text-muted-foreground">
                      Pick up tasks, track your time, and start earning equity. It's that simple.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700"
                >
                  <Link href="/contact">
                    Apply to Contribute <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Your Skills. Your Equity. Your Future.</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Join hundreds of contributors building a more equitable economy. Every contribution matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Start Contributing</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent"
            >
              <Link href="/about">Learn More About MOMM</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
