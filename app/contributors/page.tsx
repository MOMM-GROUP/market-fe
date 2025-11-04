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
  Briefcase,
  FileText,
  Video,
  TrendingUp,
  Headphones,
  Search,
  ClipboardCheck,
  Calculator,
  UserPlus,
} from "lucide-react"
import Link from "next/link"

export default function ContributorsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto max-w-5xl">
          <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
            <Heart className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Thank You to Our Early Builders</h1>
          <p className="text-xl md:text-2xl leading-relaxed text-white/95 mb-4 max-w-4xl mx-auto">
            We're incredibly grateful for the brilliant minds helping us build this. You're not just building features -
            you're building proof that there's a better way.
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

      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Other Valuable Skills</h2>
            <p className="text-xl text-muted-foreground mb-8">
              We value diverse talents and perspectives. Here are more skills that help us build MOMM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold">Product Management</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Help prioritize features, define roadmaps, and coordinate cross-functional work
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold">Business Development</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Build partnerships with brands, certifications, and other platforms
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Headphones className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold">Customer Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">Help users navigate the platform and resolve issues</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-orange-600" />
                  </div>
                  <h3 className="font-semibold">Content Writing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create blog posts, documentation, and educational content
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Video className="h-5 w-5 text-pink-600" />
                  </div>
                  <h3 className="font-semibold">Video Production</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Create explainer videos, tutorials, and promotional content
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                    <Palette className="h-5 w-5 text-teal-600" />
                  </div>
                  <h3 className="font-semibold">Graphic Design</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Design marketing materials, social media graphics, and brand assets
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Search className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold">UX Research</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Conduct user interviews, usability testing, and analyze behavior
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <ClipboardCheck className="h-5 w-5 text-red-600" />
                  </div>
                  <h3 className="font-semibold">QA Testing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Test features, find bugs, and ensure quality before launch
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <Calculator className="h-5 w-5 text-yellow-600" />
                  </div>
                  <h3 className="font-semibold">Finance & Accounting</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Help with financial planning, bookkeeping, and reporting
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-cyan-600" />
                  </div>
                  <h3 className="font-semibold">HR & Recruiting</h3>
                </div>
                <p className="text-sm text-muted-foreground">Help us find and onboard talented contributors</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Megaphone className="h-5 w-5 text-gray-600" />
                  </div>
                  <h3 className="font-semibold">PR & Communications</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage media relations, press releases, and public messaging
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-lime-600" />
                  </div>
                  <h3 className="font-semibold">Strategy & Planning</h3>
                </div>
                <p className="text-sm text-muted-foreground">Help shape long-term vision and strategic initiatives</p>
              </CardContent>
            </Card>
          </div>

          {/* Don't See Your Skills? */}
          <Card className="border-4 border-teal-500 bg-teal-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-600 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900">Don't See Your Skills Here?</h3>
              <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
                This is not an exhaustive list of what we need. We value all kinds of contributions and perspectives.
              </p>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto font-semibold">
                If you believe you can help us build a more equitable economy, please reach out anyway!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="/contact">
                    Tell Us About Your Skills <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="https://discord.gg/momm" target="_blank">
                    Join Discord Community
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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

      {/* How Equity Works */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          {/* Heading */}
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <h3 className="text-3xl font-bold">Impact-Based Revenue Sharing</h3>
              <p className="text-lg text-gray-600">
                A portion of quarterly profits distributed based on what you built, not how many hours you logged.
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

            <div className="text-center mb-12">
              <h4 className="text-2xl font-bold mb-8">How Your Share Grows Over Time</h4>
              <div className="grid grid-cols-4 gap-4 relative">
                {/* Connecting line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-500 via-orange-500 via-pink-500 to-purple-500 z-0" />

                {/* Step 1 */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    1
                  </div>
                  <h5 className="font-semibold mb-2 text-teal-900">Calculate Pool</h5>
                  <p className="text-sm text-gray-600">Quarterly profit share</p>
                </div>

                {/* Step 2 */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    2
                  </div>
                  <h5 className="font-semibold mb-2 text-orange-900">Measure Impact</h5>
                  <p className="text-sm text-gray-600">Shipped features not hours</p>
                </div>

                {/* Step 3 */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    3
                  </div>
                  <h5 className="font-semibold mb-2 text-pink-900">Distribute by Weight</h5>
                  <p className="text-sm text-gray-600">Impact determines your share</p>
                </div>

                {/* Step 4 */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    ∞
                  </div>
                  <h5 className="font-semibold mb-2 text-purple-900">Forever Yours</h5>
                  <p className="text-sm text-gray-600">Points never expire</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* LEFT COLUMN - How It Works */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold mb-6">How It Works</h4>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      1
                    </div>
                    <h5 className="font-semibold text-lg">Calculate Profit Pool</h5>
                  </div>
                  <p className="text-gray-700">
                    At the end of each quarter, we set aside a portion of profits for contributors. This becomes the
                    pool we distribute based on impact.
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      2
                    </div>
                    <h5 className="font-semibold text-lg">Measure Impact (Not Hours)</h5>
                  </div>
                  <p className="text-gray-700 mb-3">We assess what was actually shipped and accomplished:</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Features that launched</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Infrastructure improvements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Documentation and tools created</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-orange-600 flex-shrink-0 mt-0.5" />
                      <span>Problems solved</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Your impact is measured by what you delivered, not how long it took.
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      3
                    </div>
                    <h5 className="font-semibold text-lg">Distribute Based on Impact Weight</h5>
                  </div>
                  <p className="text-gray-700 mb-2">
                    Contributors receive points proportional to their impact. Larger impact = more points = larger share
                    of profit pool.
                  </p>
                  <p className="text-gray-700 font-semibold">Points earned are permanent. They're yours forever.</p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold flex-shrink-0">
                      4
                    </div>
                    <h5 className="font-semibold text-lg">Your Share Is Calculated</h5>
                  </div>
                  <p className="text-gray-700 mb-2">Your payout each quarter is determined by:</p>
                  <p className="text-center font-mono text-lg font-semibold text-purple-900 my-3">
                    Your points ÷ Total points in circulation
                  </p>
                  <p className="text-gray-700">
                    Work on multiple features? Your points add up across all contributions.
                  </p>
                </div>
              </div>

              {/* RIGHT COLUMN - Key Principles */}
              <div className="space-y-6">
                <h4 className="text-2xl font-bold mb-6">Key Principles</h4>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">♾️</span> Your Points Never Expire
                  </h5>
                  <p className="text-gray-700">
                    Once you earn a point, it's yours forever. You'll always have a stake in the success you helped
                    create.
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">📈</span> Your Share Evolves
                  </h5>
                  <p className="text-gray-700 mb-3">Each quarter, new points are issued to active contributors.</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Stay active → earn new points → grow your share</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Go inactive → keep your points → share dilutes as new contributors earn their points</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-3">
                    Your points are permanent, but your percentage changes based on the total point pool.
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">🎯</span> Role-Based Minimums
                  </h5>
                  <p className="text-gray-700 mb-3">
                    Critical roles that enable everything else receive guaranteed minimum shares regardless of quarterly
                    variance:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>DevOps & Infrastructure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Operations & Legal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Community Management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Strategy & Planning</span>
                    </li>
                  </ul>
                  <p className="text-gray-700 mt-3 text-sm">
                    These roles keep the platform running and the community thriving.
                  </p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 bg-white">
                  <h5 className="font-semibold text-lg mb-3 flex items-center gap-2">
                    <span className="text-2xl">🔍</span> Transparent & Auditable
                  </h5>
                  <p className="text-gray-700">
                    All point allocations and profit distributions are visible to the community. The system is open and
                    governed collectively.
                  </p>
                </div>
              </div>
            </div>

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
                  <p className="font-semibold text-orange-900 mb-2">💰 Sustainable</p>
                  <p className="text-gray-700">Tied to actual profits. We only pay what we can afford.</p>
                </div>
              </div>
            </div>

            <div className="border-4 border-teal-500 rounded-lg p-6 bg-teal-50">
              <p className="text-lg font-bold text-teal-900 mb-3">💎 Our Promise</p>
              <p className="text-gray-700 mb-3">
                You're not trading time for salary. You're building something. When it succeeds, you share in that
                success proportionally to the impact you created.
              </p>
              <p className="text-gray-700 font-semibold">
                The bigger the impact you create, the more you earn. No limits. No caps.
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="https://discord.gg/momm" target="_blank">
                  Join Discord Now <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
