// components/HomePageClient.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Heart,
  Handshake,
  Users,
  Ban,
  Eye,
  DollarSign,
  Sprout,
  PiggyBank,
  Wallet,
  Filter,
  RotateCcw,
  UserCheck,
  TrendingUp,
  Package,
  Wand2,
  CheckCircle,
  Infinity,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price: number | null
  featured_image_url: string | null
  brand: string
  category_id: string
  vendor_id: string
  is_active: boolean
  vendors: {
    business_name: string
    is_verified: boolean
  }
  categories: {
    name: string
    slug: string
  }
}

interface Category {
  id: string
  name: string
  slug: string
  image_url: string | null
}

interface Certification {
  id: string
  name: string
  priority: number
  product_count: number
}

interface HomePageClientProps {
  products: Product[]
  categories: Category[]
  certifications: Certification[]
}

export default function HomePageClient({ 
  products, 
  categories, 
  certifications 
}: HomePageClientProps) {
  const [selectedFeature, setSelectedFeature] = useState('styling')

  const revolutionaryFeatures = {
    styling: {
      title: 'AI-Powered Personal Styling',
      description: 'Beyond values - find products that match your unique style, body shape, and color season',
      icon: Wand2,
      color: '#EC4899',
      bgColor: '#FDF2F8',
      details: [
        'Personal style analysis and recommendations',
        'Body shape and fit optimization',
        'Color season matching for perfect looks',
        'Style evolution tracking over time'
      ]
    },
    circular: {
      title: 'Circular Marketplace',
      description: 'Buy new or used, sell when done, recycle responsibly - complete product lifecycle',
      icon: Infinity,
      color: '#0D9488',
      bgColor: '#F0FDFA',
      details: [
        'Choose new from brands or used from members',
        'Easy resale and exchange platform',
        'Integrated recycling programs',
        'Product lifecycle tracking'
      ]
    },
    endoflife: {
      title: 'End-of-Life Guidance',
      description: 'Every purchase includes clear instructions for responsible disposal and recycling',
      icon: RotateCcw,
      color: '#059669',
      bgColor: '#F0FDF4',
      details: [
        'Product-specific disposal instructions',
        'Local recycling center finder',
        'Upcycling and repurpose ideas',
        'Environmental impact tracking'
      ]
    },
    voteByDollar: {
      title: 'Vote With Your Dollar',
      description: 'Every purchase gives you a say in the brands and products we support',
      icon: Handshake,
      color: '#F97316',
      bgColor: '#FFF7ED',
      details: [
        'Filter out brands your boycotting.',
        'Filter out brands that fund politics you don\'t support.',
        'Get notified of new boycotts based on your values.',
      ]
    }
  }

  const vaultFeatures = [
    {
      title: 'Build Your Safety Net',
      description: 'Let rewards grow into a personal emergency fund for life transitions',
      icon: PiggyBank,
      color: '#0D9488'
    },
    {
      title: 'Invest in the Future',
      description: 'Use rewards as capital to invest directly in ethical brands raising funds',
      icon: TrendingUp,
      color: '#F97316'
    },
    {
      title: 'Amplify Your Impact',
      description: 'Convert to premium store credit, donate to nonprofits, or fund sustainability projects',
      icon: Sprout,
      color: '#059669'
    }
  ]

  return (      
      <div className="min-h-screen bg-background">
        {/* Hero Section - KEEPING AS IS */}
        <section className="py-32 px-4 text-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="center-content max-w-5xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance">The Era of the Billionaire is Over</h1>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-semibold">
              The money exists. It's just going to the wrong people.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/early-access">
                <Button size="lg" className="text-lg px-8 bg-teal-600 hover:bg-teal-700">
                  Join Early Access
                </Button>
              </Link>
              <Link href="/contributors">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Help Us Build This
                </Button>
              </Link>
            </div>
          </div>
        </section>


      {/* Revolutionary Features Section */}
      <section id="revolutionary" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
              Revolutionary Features Coming Soon
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              We're not just building another shopping app. These groundbreaking features will transform how you discover, buy, and interact with products throughout their entire lifecycle.
            </p>
          </div>

          {/* Feature Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 p-2 rounded-xl" style={{ backgroundColor: '#F1F5F9' }}>
              {Object.entries(revolutionaryFeatures).map(([key, feature]) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedFeature(key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      selectedFeature === key ? 'text-white shadow-lg' : 'hover:bg-white'
                    }`}
                    style={{
                      backgroundColor: selectedFeature === key ? feature.color : 'transparent',
                      color: selectedFeature === key ? 'white' : '#64748B'
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{feature.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Feature Display */}
          <div className="max-w-4xl mx-auto">
            {Object.entries(revolutionaryFeatures).map(([key, feature]) => {
              const Icon = feature.icon;
              return (
                <div
                  key={key}
                  className={`transition-all duration-500 ${
                    selectedFeature === key ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 absolute'
                  }`}
                  style={{ display: selectedFeature === key ? 'block' : 'none' }}
                >
                  <div className="bg-white p-8 rounded-2xl shadow-xl border-2" style={{ borderColor: feature.color }}>
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: feature.bgColor }}>
                            <Icon className="h-8 w-8" style={{ color: feature.color }} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold" style={{ color: '#0F172A' }}>{feature.title}</h3>
                            <p className="text-lg" style={{ color: '#64748B' }}>{feature.description}</p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {feature.details.map((detail, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="h-5 w-5" style={{ color: feature.color }} />
                              <span style={{ color: '#0F172A' }}>{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="relative">
                        <div className="w-full h-64 rounded-xl flex items-center justify-center" style={{ backgroundColor: feature.bgColor }}>
                          <Icon className="h-32 w-32 opacity-20" style={{ color: feature.color }} />
                        </div>
                        <div className="absolute inset-0 rounded-xl border-2 border-dashed opacity-50" style={{ borderColor: feature.color }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MOMM Vault Section */}
      <section className="py-20" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <PiggyBank className="h-8 w-8" style={{ color: '#7C3AED' }} />
              <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
                The MOMM Vault
              </h2>
            </div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              Your personal rewards vault. More than just cash back - it's a flexible fund that you control, designed for real-life needs and opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {vaultFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="space-y-6">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${feature.color}20` }}>
                      <Icon className="h-6 w-6" style={{ color: feature.color }} />
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-3" style={{ color: '#0F172A' }}>{feature.title}</h3>
                      <p className="leading-relaxed" style={{ color: '#475569' }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Vault Visualization */}
          <div className="bg-gradient-to-br p-8 rounded-2xl shadow-xl text-white max-w-4xl mx-auto" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)' }}>
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">How Your Vault Grows</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-bold">1</span>
                    </div>
                    <span>Earn rewards on every verified purchase</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-bold">2</span>
                    </div>
                    <span>Watch your vault grow automatically</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-sm font-bold">3</span>
                    </div>
                    <span>Use funds however you choose</span>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="w-full h-48 rounded-xl bg-white/10 flex items-center justify-center">
                  <PiggyBank className="h-24 w-24 opacity-50" />
                </div>
                <div className="absolute inset-0 rounded-xl border-2 border-dashed border-white/30"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Comparison Table */}
        <section className="py-16 px-4">
          <div className="center-content max-w-5xl">
            <h2 className="text-4xl font-bold text-center mb-12">The MOMM Difference</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2">
                    <th className="text-left p-4 font-bold text-lg">Feature</th>
                    <th className="text-center p-4 font-bold text-lg">Other Marketplaces</th>
                    <th className="text-center p-4 font-bold text-lg bg-teal-50">MOMM</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4">Who profits</td>
                    <td className="text-center p-4 text-muted-foreground">Billionaires profit</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">You profit</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Your data</td>
                    <td className="text-center p-4 text-muted-foreground">Your data gets sold</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Your data stays private</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Verification</td>
                    <td className="text-center p-4 text-muted-foreground">Can't verify claims</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Every claim is verified</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Boycotts</td>
                    <td className="text-center p-4 text-muted-foreground">Support companies you hate</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Boycott whoever you want</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Transparency</td>
                    <td className="text-center p-4 text-muted-foreground">Mystery political donations</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Full transparency</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4">Personalization</td>
                    <td className="text-center p-4 text-muted-foreground">One-size-fits-all</td>
                    <td className="text-center p-4 bg-teal-50 font-semibold text-teal-700">Filtered by your values</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-teal-600 to-blue-600 text-white">
          <div className="center-content max-w-4xl text-center">
            <h2 className="text-4xl font-bold mb-4">We're Actually Building This</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
              <div>
                <div className="text-5xl font-bold mb-2">2,847</div>
                <div className="text-xl">Products Indexed</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">156</div>
                <div className="text-xl">Certifications Tracked</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">MVP</div>
                <div className="text-xl">Building MARKET Platform</div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 px-4">
          <div className="center-content">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Editor's Picks: Good for You, Good for the World</h2>
              <Link href="/early-access">
                <Button variant="outline">Join to View Products</Button>
              </Link>
            </div>
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
                {products.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Products coming soon. Join our early access waitlist!</p>
              </div>
            )}
          </div>
        </section>

        {/* Get Started Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
          <div className="center-content max-w-6xl">
            <h2 className="text-4xl font-bold text-center mb-12">Stop funding billionaires. Start funding yourself.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR SHOPPERS</h3>
                  <p className="text-sm text-muted-foreground">
                    Shopping products. Build Profit.
                  </p>
                  <Link href="/early-access">
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">Start Shopping →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                    <Handshake className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR SELLERS</h3>
                  <p className="text-sm text-muted-foreground">
                    List products. Reach consumers. Keep more of your money.
                  </p>
                  <Link href="/vendors">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Become a Vendor →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-orange-100 rounded-full flex items-center justify-center">
                    <Users className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR BUILDERS</h3>
                  <p className="text-sm text-muted-foreground">
                    Help build the platform. Profit when we profit.
                  </p>
                  <Link href="/contributors">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">Join Contributors →</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold">FOR INVESTORS</h3>
                  <p className="text-sm text-muted-foreground">
                    Back a marketplace that actually works for people, not billionaires.
                  </p>
                  <Link href="/investors">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Invest in MOMM →</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    )
  }

function ProductCard({ product }: { product: Product }) {
  const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  const valuesMatchScore = Math.floor(Math.random() * 15) + 85 // Mock 85-100% match

  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.featured_image_url || "/placeholder.svg?height=300&width=300&query=product"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {hasDiscount && (
            <Badge className="absolute top-2 left-2 bg-secondary text-secondary-foreground">-{discountPercent}%</Badge>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{product.vendors?.business_name}</span>
            {product.vendors?.is_verified && (
              <Badge variant="secondary" className="text-xs">
                Verified
              </Badge>
            )}
          </div>
          <h3 className="font-medium line-clamp-2 text-sm">{product.name}</h3>

          {/* Values Match Score */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex-1 bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${valuesMatchScore}%` }} />
            </div>
            <span className="text-primary font-medium">{valuesMatchScore}% Match</span>
          </div>

          {/* Sample certifications */}
          <div className="flex gap-1 flex-wrap">
            <Badge variant="outline" className="text-xs">
              B Corp
            </Badge>
            <Badge variant="outline" className="text-xs">
              Fair Trade
            </Badge>
            <Badge variant="outline" className="text-xs">
              Organic
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-lg">${product.price}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${product.compare_at_price}</span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">(4.8)</span>
          </div>
          <Link href={`/products/${product.id}`}>
            <Button className="w-full bg-transparent" size="sm" variant="outline">
              View Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>


  )
}
