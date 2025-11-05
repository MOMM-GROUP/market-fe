import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github, 
  ExternalLink,
  Zap,
  Handshake,
  Shield,
  Brain,
  Globe,
  Coins,
  Trophy,
  Star,
  Clock,
  Eye,
  Crown,
  Mail,
  Code,
  Calendar,
  MapPin,
  Sparkles,
  Building2,
  Bot,
  Wrench,
  BarChart3,
  BookOpen,
  Lightbulb,
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
import { useState } from "react"

  const benefits = [
    {
      icon: Coins,
      title: 'Equity Opportunity',
      description: 'Earn equity for contributing to both open-source core and revenue features'
    },
    {
      icon: Trophy,
      title: 'Ground Floor Opportunity',
      description: 'Join as a founding contributor and help shape the entire system'
    },
    {
      icon: Network,
      title: 'Grow Your Network',
      description: 'Connect with people trying to change commerce'
    },
    {
      icon: Rocket,
      title: 'Career Growth',
      description: 'Build your portfolio with cutting-edge technology'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Help transform commerce for a more ethical world'
    },
    {
      icon: Award,
      title: 'Build Your Portfolio',
      description: 'Work on cutting-edge Web3 and AI technology'
    }
  ];
  const requirements = [
    'Passion for ethical commerce and building something from the ground up',
    'Strong communication skills and excitement about remote collaboration', 
    'Willingness to learn, contribute, and help shape our community (experience is a plus, not required!)'
  ];

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


      {/* Why Join Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
              Join the MOMM Community
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              Be part of a revolutionary project that's transforming how the world shops, lives and thrives.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-2" style={{ borderColor: '#F1F5F9' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#F0FDFA' }}>
                    <Icon className="h-6 w-6" style={{ color: '#0D9488' }} />
                  </div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F172A' }}>{benefit.title}</h3>
                  <p style={{ color: '#475569' }}>{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* Requirements Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Requirements */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl font-bold text-white">
                  What We're Looking For
                </h2>
                <p className="text-xl text-gray-300">
                  Passion and drive matter more than perfect experience
                </p>
              </div>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-white/10 backdrop-blur-sm">
                    <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#0D9488' }} />
                    <span className="text-white text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Success Story */}
            <div className="bg-gradient-to-br from-teal-500 to-orange-500 p-8 rounded-2xl text-white">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Rocket className="h-8 w-8" />
                  <h3 className="text-2xl font-bold">From Zero to Hero</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed">
                    "I launched my first Web3 contract with Boys Club with <strong>zero Web3 experience</strong> and generated over <strong>120 ETH</strong>."
                  </p>
                  <p className="text-sm opacity-90">
                    — MOMM Founder
                  </p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm">
                    <strong>💡 No Experience? Perfect!</strong><br/>
                    We believe passion and willingness to learn beats experience every time. This is your chance to break into an exciting new space!
                  </p>
                </div>
              </div>
            </div>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          {/* Don't See Your Skills? */}
          <Card className="border-4 border-teal-500 bg-teal-50">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-teal-600 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-teal-900">Don't See Your Skills Here?</h3>
              <p className="text-lg text-gray-700 mb-4 max-w-2xl mx-auto">
                This is not an exhaustive list of what we need.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-teal-600 hover:bg-teal-700" asChild>
                  <Link href="https://discord.gg/momm" target="_blank">
                    Please reach out anyway!
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>


      <section
        id="discord"
        className="py-20 px-4 bg-gradient-to-br from-teal-600 via-orange-600 to-pink-600 text-white"
      >
        <div className="container mx-auto max-w-6xl">


          {/* Dynamic Equity Model Section */}
            <div className="bg-white/90 p-8 rounded-2xl shadow-lg mb-16">

              <div className="mb-16 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#0F172A' }}>
                  A Fairer Model of Ownership
                </h2>
                <div className="flex justify-center">
                  <p className="text-2xl leading-relaxed font-medium pl-8 border-l-4 text-left max-w-3xl" style={{ color: '#0F172A', borderColor: '#0D9488' }}>
                    <strong>Value should be rewarded.</strong> Companies built on the backs of their community while wealth stays at the top have <strong>got to go</strong>. We are building a truly community-owned ecosystem where the people who create the value share in the success.
                  </p>
                </div>
              </div>
            
              {/* Visual Timeline */}
              <div className="mb-8">
                <div className="relative max-w-4xl mx-auto">
                  {/* Timeline Points */}
                  <div className="relative flex justify-between items-center">
                    <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
                      <div className="space-y-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#F0FDFA', color: '#0D9488' }}>
                          <Users className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold" style={{ color: '#0F172A' }}>1. Contribute</h3>
                        <p style={{ color: '#64748B' }}>Contribute code, design, or community growth to the MOMM ecosystem.</p>
                      </div>
                      <div className="space-y-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#FFF7ED', color: '#F97316' }}>
                          <BarChart3 className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold" style={{ color: '#0F172A' }}>2. Earn Points</h3>
                        <p style={{ color: '#64748B' }}>Receive "Contribution Points" representing your stake in the ecosystem.</p>
                      </div>
                      <div className="space-y-6">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: '#FDF2F8', color: '#EC4899' }}>
                          <Coins className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-semibold" style={{ color: '#0F172A' }}>3. Share Success</h3>
                        <p style={{ color: '#64748B' }}>A percentage of all revenue is distributed to you based on your points.</p>
                      </div>
                    </div>
                </div>
              </div>

            </div>
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#059669' }} />
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>Your Points Never Expire</h4>
                    <p style={{ color: '#64748B' }}>Once you earn a point, it is yours forever. You will always have a stake in the success you helped create.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#F97316' }} />
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>Your Share Evolves</h4>
                    <p style={{ color: '#64748B' }}>Each year, new points are issued to active contributors. Your percentage may dilute over time if you become inactive, but your points remain yours.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Eye className="w-8 h-8 flex-shrink-0 mt-1" style={{ color: '#0D9488' }} />
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: '#0F172A' }}>Fair & Transparent</h4>
                    <p style={{ color: '#64748B' }}>All point allocations and distributions are transparent and governed by the community.</p>
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-lg border-2 h-fit" style={{ backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' }}>
                <h4 className="font-semibold mb-4" style={{ color: '#0F172A' }}>A Simple Example:</h4>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F0FDFA' }}>
                    <p className="text-sm" style={{ color: '#0F172A' }}>
                      <strong style={{ color: '#0D9488' }}>Year 1:</strong> 3 contributors each earn 1 point (3 total). Profits split 3 ways.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                    <p className="text-sm" style={{ color: '#0F172A' }}>
                      <strong style={{ color: '#F97316' }}>Year 2:</strong> 1 original contributor earns another point, 4 new contributors join. Profit pool now split 8 ways, with the most active member receiving the largest share.
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: '#EFF6FF' }}>
                  <p className="text-sm font-medium" style={{ color: '#0F172A' }}>
                    💡 <strong>Key Insight:</strong> Stay active to maintain and grow your share, but your earned points are always yours.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Key Principles Highlight */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-teal-100 via-pink-100 to-orange-100">
              <h4 className="text-lg font-semibold mb-4 text-center" style={{ color: '#0D9488' }}>Why This Model Works</h4>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <Eye className="h-6 w-6 mx-auto mb-2" style={{ color: '#0D9488' }} />
                  <p className="font-medium text-sm" style={{ color: '#0F172A' }}>Transparent</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>All allocations are visible</p>
                </div>
                <div>
                  <Award className="h-6 w-6 mx-auto mb-2" style={{ color: '#0D9488' }} />
                  <p className="font-medium text-sm" style={{ color: '#0F172A' }}>Fair</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>Rewards actual contribution</p>
                </div>
                <div>
                  <Crown className="h-6 w-6 mx-auto mb-2" style={{ color: '#0D9488' }} />
                  <p className="font-medium text-sm" style={{ color: '#0F172A' }}>Permanent</p>
                  <p className="text-xs" style={{ color: '#64748B' }}>Your points are yours forever</p>
                </div>
              </div>
            </div>
          </div>
        </div> 



        {/* Join Our Community Section */}
        <section className="py-20 rounded-lg shadow-sm">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
                <h2 className="text-2xl font-bold" style={{ color: '#0F172A' }}>
                  <a 
                        href="https://discord.gg/PptvudG7jb" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
                        style={{ backgroundColor: '#5865F2' }}
                      >
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Join Our Community
                    </a>
                  </h2>
              </div>
          </div>
        </section>

      </section>
    </div>
  )
}
