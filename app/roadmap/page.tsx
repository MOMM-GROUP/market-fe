import { CheckCircle2, Clock, Circle, Database, Shield, Users, TrendingUp, Rocket, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function RoadmapPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">Development Roadmap</h1>
            <p className="text-xl text-muted-foreground">Building the Future Step by Step</p>
          </div>
        </div>
      </section>

      {/* Current Progress Metrics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="border-teal-200 bg-teal-50/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Database className="h-12 w-12 text-teal-600 mb-4" />
                  <div className="text-4xl font-bold text-teal-600 mb-2">2,847</div>
                  <div className="text-sm text-muted-foreground">Products Indexed</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Shield className="h-12 w-12 text-orange-600 mb-4" />
                  <div className="text-4xl font-bold text-orange-600 mb-2">156</div>
                  <div className="text-sm text-muted-foreground">Certifications Tracked</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-200 bg-pink-50/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-pink-600 mb-4" />
                  <div className="text-4xl font-bold text-pink-600 mb-2">4</div>
                  <div className="text-sm text-muted-foreground">Core Team</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <TrendingUp className="h-12 w-12 text-purple-600 mb-4" />
                  <div className="text-4xl font-bold text-purple-600 mb-2">Active</div>
                  <div className="text-sm text-muted-foreground">Seeking Funding</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Development Phases */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Our Development Phases</h2>

            <div className="space-y-6">
              {/* Phase 1 */}
              <Card className="border-2 border-teal-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">Phase 1: Foundation</CardTitle>
                        <Badge className="bg-teal-600">In Progress</Badge>
                      </div>
                      <CardDescription className="text-base">
                        Building the core TRUST protocol and initial data infrastructure
                      </CardDescription>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-teal-600 font-bold">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Rocket className="h-4 w-4" />
                      Key Milestones
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>TRUST Protocol MVP (Completed)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <span>Initial Data Scraping (In Progress)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                        <span>Smart Contract Deployment (In Progress)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>The Graph Subgraph (Planned)</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Deliverables
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Functional TRUST protocol with basic verification</li>
                      <li>• 10,000+ products with verified certifications</li>
                      <li>• Open-source GraphQL API</li>
                      <li>• Developer documentation and SDK</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Needs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Blockchain Developers (2-3)</Badge>
                      <Badge variant="outline">Data Engineers (2)</Badge>
                      <Badge variant="outline">Full-Stack Developers (1-2)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 2 */}
              <Card className="border-2 border-orange-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">Phase 2: Market Launch</CardTitle>
                        <Badge variant="outline">Planned</Badge>
                      </div>
                      <CardDescription className="text-base">
                        Launch the consumer-facing marketplace with curated ethical products
                      </CardDescription>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground font-bold">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Rocket className="h-4 w-4" />
                      Key Milestones
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>MARKET Platform Beta</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Brand Partnerships</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Payment Integration</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Mobile App Launch</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Deliverables
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Live MARKET platform with 1,000+ products</li>
                      <li>• Mobile applications for iOS and Android</li>
                      <li>• Integrated payment processing</li>
                      <li>• Brand onboarding system</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Needs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Full-Stack Developers (3-4)</Badge>
                      <Badge variant="outline">Mobile Developers (2)</Badge>
                      <Badge variant="outline">Product Designers (2)</Badge>
                      <Badge variant="outline">Business Development (1-2)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 3 */}
              <Card className="border-2 border-pink-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">Phase 3: HEART AI Integration</CardTitle>
                        <Badge variant="outline">Planned</Badge>
                      </div>
                      <CardDescription className="text-base">
                        Deploy AI-powered personalization and ethical scoring system
                      </CardDescription>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground font-bold">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Rocket className="h-4 w-4" />
                      Key Milestones
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>HEART AI MVP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Personalization Engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Real-time Scoring</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Community Features</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Deliverables
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• HEART AI recommendation system</li>
                      <li>• Personalized product discovery</li>
                      <li>• Community-driven reviews and ratings</li>
                      <li>• Advanced analytics dashboard</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Needs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">AI/ML Engineers (2-3)</Badge>
                      <Badge variant="outline">Data Scientists (2)</Badge>
                      <Badge variant="outline">Backend Developers (2)</Badge>
                      <Badge variant="outline">Community Managers (1-2)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Phase 4 */}
              <Card className="border-2 border-purple-200">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">Phase 4: Scale & Expansion</CardTitle>
                        <Badge variant="outline">Planned</Badge>
                      </div>
                      <CardDescription className="text-base">
                        Global expansion and enterprise partnerships
                      </CardDescription>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Progress</span>
                      <span className="text-muted-foreground font-bold">0%</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Rocket className="h-4 w-4" />
                      Key Milestones
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Global Certification Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Enterprise API</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>Token Governance System</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Circle className="h-5 w-5 text-gray-400" />
                        <span>DAO Governance</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Deliverables
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Global certification database</li>
                      <li>• Enterprise API partnerships</li>
                      <li>• Token and governance system</li>
                      <li>• Multi-language platform support</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Needs
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Business Development (2-3)</Badge>
                      <Badge variant="outline">International Relations (1-2)</Badge>
                      <Badge variant="outline">DevOps Engineers (2)</Badge>
                      <Badge variant="outline">Legal & Compliance (1)</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Milestones */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Immediate Priorities</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>Secure Seed Funding</CardTitle>
                    <Badge className="bg-red-600">High</Badge>
                  </div>
                  <CardDescription>Q1 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Raise initial funding to support core team and development
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>Build Contributor System</CardTitle>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                  <CardDescription>Q1 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Develop equity allocation system based on contributions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>Open Source Release</CardTitle>
                    <Badge className="bg-red-600">High</Badge>
                  </div>
                  <CardDescription>Q2 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Make codebase public after securing initial partnerships
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>Launch Beta Platform</CardTitle>
                    <Badge variant="outline">Medium</Badge>
                  </div>
                  <CardDescription>Q2 2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Release beta version with initial brand partners</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-20 bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Help Us Build This Vision</h2>
            <p className="text-lg mb-8 text-white/90 leading-relaxed">
              We're building more than a platform - we're creating a movement toward transparent, ethical commerce. Join
              thousands of conscious consumers, ethical brands, and passionate developers who are building the future of
              verified commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary">
                <Link href="/contributors">Join as Contributor</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  View on GitHub
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
