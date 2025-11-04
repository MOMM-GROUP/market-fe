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
  DollarSign,
  Target,
  MessageCircle,
  Rocket,
  Network,
  Award,
  Heart,
} from "lucide-react"
import Link from "next/link"

export default function ContributorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
            Stop Building for Billionaires. Build With Us Instead.
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed text-white/95 mb-4 max-w-4xl mx-auto">
            We're looking for people who are done building features to make CEOs rich.
          </p>
          <p className="text-xl md:text-2xl leading-relaxed text-white/95 mb-8 max-w-4xl mx-auto font-semibold">
            Join us. Your work directly profits you. Your impact compounds. Your voice matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8">
              <Link href="#roles">See Open Roles</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 bg-transparent text-lg px-8"
            >
              <Link href="#discord">Join Discord</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="roles" className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">We Need Your Skills</h2>
            <p className="text-xl text-muted-foreground">
              These are the skills we're actively recruiting for right now
            </p>
          </div>

          <div className="space-y-6">
            {/* Data Sourcing Specialists */}
            <Card className="border-2 border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-purple-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Data Sourcing Specialists</CardTitle>
                      <p className="text-sm text-muted-foreground">Scraping + cleaning certification data</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-600">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">
                  Building data pipelines. We have 2,847 products - we need you to scale this.
                </p>

                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Web scraping & API integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Data validation & cleaning</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span>Building reusable pipelines</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Python</Badge>
                    <Badge variant="outline">Web Scraping</Badge>
                    <Badge variant="outline">APIs</Badge>
                    <Badge variant="outline">Data Quality</Badge>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-purple-900">Impact:</p>
                  <p className="text-sm text-purple-700">Every certification you verify helps 10,000+ shoppers</p>
                </div>

                <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                  <Link href="/contact">
                    I can do this <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Legal Experts */}
            <Card className="border-2 border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-blue-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <Scale className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Legal Experts</CardTitle>
                      <p className="text-sm text-muted-foreground">Company structure + certification compliance</p>
                    </div>
                  </div>
                  <Badge className="bg-blue-600">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">We're building fairly - we need legal guardians</p>

                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Advise on becoming a PBC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Certification compliance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Data privacy & terms</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Business Law</Badge>
                    <Badge variant="outline">Startup Experience</Badge>
                    <Badge variant="outline">Data Privacy</Badge>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-blue-900">Impact:</p>
                  <p className="text-sm text-blue-700">You help us stay ethical while we scale</p>
                </div>

                <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/contact">
                    I can help <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Full-Stack Engineers */}
            <Card className="border-2 border-teal-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-teal-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                      <Code className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Full-Stack Engineers</CardTitle>
                      <p className="text-sm text-muted-foreground">Building MARKET marketplace platform</p>
                    </div>
                  </div>
                  <Badge className="bg-teal-600">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">React/TypeScript frontend. We need the technical foundation.</p>

                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Frontend (React/Next.js/TypeScript)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Backend (Node.js/Python)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span>Database design (PostgreSQL)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">TypeScript</Badge>
                    <Badge variant="outline">React</Badge>
                    <Badge variant="outline">Node.js</Badge>
                    <Badge variant="outline">PostgreSQL</Badge>
                    <Badge variant="outline">GraphQL</Badge>
                  </div>
                </div>

                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-teal-900">Impact:</p>
                  <p className="text-sm text-teal-700">Every feature you build = real shoppers verify claims</p>
                </div>

                <Button className="bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="/contact">
                    I'm interested <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Community Builders */}
            <Card className="border-2 border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="bg-orange-50">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">Community Builders</CardTitle>
                      <p className="text-sm text-muted-foreground">Discord moderation + community growth</p>
                    </div>
                  </div>
                  <Badge className="bg-orange-600">High Priority</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">You build the movement with people</p>

                <div>
                  <h4 className="font-semibold mb-2">Responsibilities:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Community engagement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Event/discussion facilitation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Help new members onboard</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Skills Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Community Management</Badge>
                    <Badge variant="outline">Social Media</Badge>
                    <Badge variant="outline">People Skills</Badge>
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm font-semibold text-orange-900">Impact:</p>
                  <p className="text-sm text-orange-700">You're literally building the movement day-to-day</p>
                </div>

                <Button className="bg-orange-600 hover:bg-orange-700" asChild>
                  <Link href="/contact">
                    I want this <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
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
            <h2 className="text-4xl font-bold mb-4">The System</h2>
            <p className="text-xl text-muted-foreground">
              Find your place in the MOMM community. Every contributor is essential to our success.
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
                      <CardTitle className="text-2xl">Engineering</CardTitle>
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
                  Join Engineering <ArrowRight className="ml-2 h-4 w-4" />
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
                      <CardTitle className="text-2xl">Marketing</CardTitle>
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
          {/* Heading */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold">Impact-Based Profit Sharing</h3>
              <p className="text-lg text-gray-600">
                35% of profits distributed to contributors based on what you created, not how many hours you worked.
              </p>
            </div>

            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚠️</div>
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">We're Not Yet Profitable</h4>
                  <p className="text-yellow-800 mb-2">
                    This model shows how we'll distribute profits once we reach profitability (estimated Year 2-3).
                  </p>
                  <p className="text-yellow-800">
                    Early contributors will be part of conversations around implementing this model. Your points are
                    yours forever.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 1: Calculate Available Profits */}
            <div className="border-2 border-teal-500 rounded-lg p-6 bg-teal-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Calculate Profit Pool</h4>
                  <p className="text-gray-700 mb-3">
                    At the end of each quarter, we calculate total profits after operational costs.
                  </p>
                  <div className="bg-white p-3 rounded border border-teal-200">
                    <p className="text-sm">
                      <strong>Example:</strong> $100,000 in profits
                    </p>
                    <p className="text-sm text-teal-600 font-semibold mt-1">→ 35% to contributors = $35,000</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Identify Impact */}
            <div className="border-2 border-orange-500 rounded-lg p-6 bg-orange-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Measure Impact (Not Hours)</h4>
                  <p className="text-gray-700 mb-3">
                    We assess what was actually accomplished. What features shipped? What milestones hit? What metrics
                    improved?
                  </p>
                  <div className="bg-white p-3 rounded border border-orange-200 space-y-2">
                    <p className="text-sm">
                      ✓ <strong>Direct:</strong> "Shipped new marketplace search algorithm"
                    </p>
                    <p className="text-sm">
                      ✓ <strong>Enabling:</strong> "Built infrastructure that unblocked 3 teams"
                    </p>
                    <p className="text-sm">
                      ✓ <strong>Compound:</strong> "Created documentation that saved 100+ hours"
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Allocate Based on Impact */}
            <div className="border-2 border-pink-500 rounded-lg p-6 bg-pink-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Distribute Based on Impact Weight</h4>
                  <p className="text-gray-700 mb-3">Larger impact = larger share of the profit pool. Simple as that.</p>
                  <div className="bg-white p-4 rounded border border-pink-200 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm">Feature A (60% of total impact)</span>
                      <span className="font-bold text-pink-600">$21,000</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm">Feature B (25% of total impact)</span>
                      <span className="font-bold text-pink-600">$8,750</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="text-sm">Operations & Infrastructure (15% of total impact)</span>
                      <span className="font-bold text-pink-600">$5,250</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Split Among Contributors */}
            <div className="border-2 border-purple-500 rounded-lg p-6 bg-purple-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-2">Team Gets Their Share</h4>
                  <p className="text-gray-700 mb-3">
                    Each feature/work area is split among the people who contributed. Your role on the team determines
                    your share.
                  </p>
                  <div className="bg-white p-4 rounded border border-purple-200 space-y-2">
                    <p className="text-sm">
                      <strong>Example - Feature A ($21,000):</strong>
                    </p>
                    <div className="ml-4 space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Lead Engineer</span>
                        <span className="font-bold">$10,500 (50%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Support Engineer</span>
                        <span className="font-bold">$6,300 (30%)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Designer</span>
                        <span className="font-bold">$4,200 (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Minimums */}
            <div className="border-2 border-green-500 rounded-lg p-6 bg-green-50">
              <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <span className="text-green-600">✓</span> Role Minimums (We Always Pay These)
              </h4>
              <p className="text-gray-700 mb-4">
                Some roles enable everything else. So we guarantee minimums regardless of quarterly impact:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-1">Community Managers</p>
                  <p className="text-sm text-gray-600">Minimum 2% of profit pool every quarter</p>
                  <p className="text-xs text-green-600 mt-2">Ensures community always has dedicated support</p>
                </div>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-1">Operations & Legal</p>
                  <p className="text-sm text-gray-600">Minimum 1.5% of profit pool every quarter</p>
                  <p className="text-xs text-green-600 mt-2">Keeps the ship running</p>
                </div>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-1">DevOps & Infrastructure</p>
                  <p className="text-sm text-gray-600">Minimum 2% of profit pool every quarter</p>
                  <p className="text-xs text-green-600 mt-2">Platform reliability never takes a back seat</p>
                </div>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-sm font-semibold text-green-900 mb-1">Strategy & Planning</p>
                  <p className="text-sm text-gray-600">Minimum 1.5% of profit pool every quarter</p>
                  <p className="text-xs text-green-600 mt-2">Vision and direction matter</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-100 via-pink-100 to-orange-100 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-4">Real Contributor Scenarios</h4>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-teal-200">
                  <p className="font-semibold text-teal-900 mb-2">Scenario 1: Early Contributor</p>
                  <p className="text-sm text-gray-700 mb-2">
                    You join at launch, contribute $50K of value over 12 months
                  </p>
                  <div className="bg-teal-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>At profitability (Year 2):</strong> $84,000 profit pool total
                    </p>
                    <p className="text-sm text-teal-600 font-semibold">
                      Your share if you were 20% of impact: $16,800/year
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-orange-200">
                  <p className="font-semibold text-orange-900 mb-2">Scenario 2: Year 2 Contributor</p>
                  <p className="text-sm text-gray-700 mb-2">You join Year 2, contribute $30K value over year</p>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="text-sm">
                      <strong>At Year 3 profitability:</strong> $150,000 profit pool (more revenue)
                    </p>
                    <p className="text-sm text-orange-600 font-semibold">
                      Your share if you were 10% of impact: $15,000/year
                    </p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border-2 border-pink-200">
                  <p className="font-semibold text-pink-900 mb-2">Key Promise: Your Points Are Yours Forever</p>
                  <p className="text-sm text-gray-700">
                    Even if you leave, you keep earning your % share. Example: Founder who contributed early gets 5%
                    forever.
                  </p>
                </div>
              </div>
            </div>

            {/* Why This Works */}
            <div className="bg-gradient-to-r from-teal-100 via-pink-100 to-orange-100 rounded-lg p-6">
              <h4 className="font-semibold text-lg mb-4">Why This Model Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="font-semibold text-teal-900 mb-2">🎯 Rewards Impact</p>
                  <p className="text-gray-700">You're measured on what you ship, not how much you sit at your desk.</p>
                </div>
                <div>
                  <p className="font-semibold text-pink-900 mb-2">🤝 Fair to All Roles</p>
                  <p className="text-gray-700">
                    Engineers, designers, marketers, ops—everyone's contribution is valued.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-orange-900 mb-2">🔒 Sustainable</p>
                  <p className="text-gray-700">Tied to actual profits means we only pay what we can truly afford.</p>
                </div>
              </div>
            </div>

            {/* The Promise */}
            <div className="border-4 border-teal-500 rounded-lg p-6 bg-teal-50">
              <p className="text-lg font-bold text-teal-900 mb-3">💎 Our Promise</p>
              <p className="text-gray-700">
                You're not trading your time for a salary. You're building something, and when it succeeds, you share in
                that success. The bigger the impact you create, the more you earn. No limits. No caps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Single Unified CTA with Discord */}
      <section
        id="discord"
        className="py-20 px-4 bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6">Ready to Build With Us?</h2>
            <p className="text-2xl leading-relaxed text-white/95 mb-4">
              Join our Discord community where the real work happens
            </p>
            <p className="text-xl text-white/90">
              Connect with the team, pick up tasks, and start earning equity today
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Benefits Grid */}
            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Real-Time Collaboration</h3>
                  <p className="text-white/90">Work directly with founding team on active projects</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Rocket className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Early Access</h3>
                  <p className="text-white/90">Know what's coming and help shape direction</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Network className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Build Your Network</h3>
                  <p className="text-white/90">Connect with people trying to change commerce</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/15 transition-all">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-white">Get Recognized</h3>
                  <p className="text-white/90">Contribute, get recognized, earn profit share</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main CTA */}
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <MessageCircle className="h-12 w-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4 text-white">Join Our Discord Community</h3>
            <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
              This is where the work happens. Join the conversation, pick up tasks, and start contributing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="https://discord.gg/momm" target="_blank">
                  Join Discord Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 bg-transparent text-lg px-8"
                asChild
              >
                <Link href="/contact">Email Us Instead</Link>
              </Button>
            </div>
            <p className="text-white/90">
              Or reach out directly:{" "}
              <a href="mailto:team@momm.group" className="text-white font-semibold hover:underline">
                team@momm.group
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-r from-teal-600 via-pink-600 to-orange-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Thank You to Our Early Builders</h2>
          <p className="text-xl leading-relaxed text-white/95 mb-6">
            We're incredibly grateful for the brilliant minds helping us build this. You're not just building features -
            you're building proof that there's a better way.
          </p>
          <p className="text-2xl font-semibold">You're part of ending the billionaire era.</p>
        </div>
      </section>
    </div>
  )
}
