import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrendingDown,
  Users,
  DollarSign,
  Heart,
  PiggyBank,
  Briefcase,
  Clock,
  Target,
  ArrowRight,
  Zap,
  Shield,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="center-content max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            How We're <span className="text-primary">Rebuilding Commerce</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            The foundation of our modern society—capitalism—is failing us. MOMM is the answer. We are building a
            platform that uses the power of commerce to redirect wealth, ensuring that the people who support the
            community are the ones who benefit from it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                Start Shopping
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                Join the Movement
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-destructive">The Problem: A Broken System</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-destructive/20 bg-destructive/5">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                      <TrendingDown className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold">Wealth Disparity</h3>
                    <p className="text-muted-foreground">
                      Worse than ever before, where a handful of billionaires hoard resources while the majority
                      struggle.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                      <Users className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold">People Struggling</h3>
                    <p className="text-muted-foreground">
                      Millions juggle multiple jobs and fight to get by while wealth concentrates at the top.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                      <DollarSign className="h-8 w-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold">Broken Promises</h3>
                    <p className="text-muted-foreground">
                      We got tired of waiting for politics or the super-wealthy to do the right thing.
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-lg font-medium mb-4">
                    The solution isn't to beg them to "give back"—it's to go after the money and stop it from ending up
                    in their pockets in the first place.
                  </p>
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    MOMM is the answer.
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MOMM Economic Model Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="center-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The MOMM Economic Model: Equity for All</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              MOMM is designed to be community-owned and protected. Our goal is to ensure this platform can never be
              bought, diluted, or turned into another predatory corporation. If you interact with or support MOMM, you
              get a piece of the pie.
            </p>
          </div>

          {/* Equity Table */}
          <div className="max-w-5xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  We offer equity and profit share through every point of interaction:
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-4 px-4 font-semibold">Who You Are</th>
                        <th className="text-left py-4 px-4 font-semibold">How You Earn Equity & Profit Share</th>
                        <th className="text-left py-4 px-4 font-semibold">Why This Matters</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr className="hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-5 w-5 text-primary" />
                            <span className="font-medium">Investor</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">Invest as little as $100 to help us build.</td>
                        <td className="py-4 px-4">Fund the movement and share in its growth.</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-primary" />
                            <span className="font-medium">Community Builder</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          Contribute your skills: data analysis, marketing, engineering, legal, or social media.
                        </td>
                        <td className="py-4 px-4">
                          Your time is valuable. Get equity for the essential work of building the platform.
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Briefcase className="h-5 w-5 text-primary" />
                            <span className="font-medium">Vendor/Brand</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">Sell your verified ethical products on our platform.</td>
                        <td className="py-4 px-4">Share in the overall success of the market you help create.</td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Heart className="h-5 w-5 text-primary" />
                            <span className="font-medium">Shopper</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">Purchase through our platform.</td>
                        <td className="py-4 px-4">
                          Every dollar spent is a vote for change, and a percentage of the value is redirected back to
                          you.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Redefining Work Section */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Redefining Work: Our Commitment to People</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our dedication to economic justice starts within MOMM itself. We are building a company where human value
              is paramount.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Fair Compensation</h3>
                <p className="text-muted-foreground">
                  When we are able to hire full-time, we promise never to allow the CEO salary to exceed a fair multiple
                  of the lowest employee. We are inspired by models like Dan Price, who guarantees a high minimum salary
                  for all roles.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Life-Centric Work</h3>
                <p className="text-muted-foreground">
                  We champion the 4-Day Work Week and embed Diversity, Equity, and Inclusion (DEI) into every decision.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Contribution Over Commitment</h3>
                <p className="text-muted-foreground">
                  We know you are stretched thin. That's why we've designed MOMM so that even if you can only contribute
                  "one thing here or there," your effort still earns you equity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MOMM Vault Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="center-content">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">The MOMM Vault: The Power is Yours</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We believe our economy does have the power to give us what we want—we just have to take charge.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-12">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <PiggyBank className="h-10 w-10 text-primary" />
                </div>
                <p className="text-lg mb-6">
                  Instead of seeing a corporation profit, a percentage of the value created by every dollar you spend on
                  MOMM goes into your personal{" "}
                  <span className="font-bold text-primary">MOMM Vault (Community-Owned Rewards Fund)</span>.
                </p>
                <Badge variant="secondary" className="text-lg px-4 py-2">
                  You decide how that wealth is utilized
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Invest</h3>
                <p className="text-sm text-muted-foreground">
                  Opt to have your funds professionally managed and invested in the market or in small businesses.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Give</h3>
                <p className="text-sm text-muted-foreground">Donate to vetted nonprofits or community projects.</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Use it to pay for essential services like your health insurance or ClassPass membership.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold mb-2">Safety Net</h3>
                <p className="text-sm text-muted-foreground">
                  Simply set it aside for a time when you're low on funds and need to tap into it for purchases.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Card className="max-w-2xl mx-auto border-secondary/20 bg-secondary/5">
              <CardContent className="p-6">
                <p className="text-lg font-medium mb-4">Got a better idea for how the Vault should be used?</p>
                <p className="text-muted-foreground mb-4">
                  Let us know! MOMM is a platform built by the people, for the people. We need your help to do this
                  right.
                </p>
                <Link href="/contact">
                  <Button variant="secondary" className="bg-secondary hover:bg-secondary/90">
                    Share Your Ideas <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="center-content">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the Movement?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Every purchase, every contribution, every interaction helps build a more equitable economy. The time for
              change is now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/products">
                <Button size="lg" className="text-lg px-8 bg-primary hover:bg-primary/90">
                  Start Shopping <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                >
                  Become a Community Builder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
