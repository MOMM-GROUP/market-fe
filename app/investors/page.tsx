"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  ExternalLink, 
  Target, 
  Globe, 
  Shield, 
  Rocket, 
  BarChart3, 
  PieChart, 
  Award, 
  ArrowRight,  
  Building2, 
  Lightbulb, 
  Network, 
  ShoppingCart,
  Coins, 
  Star, 
  Eye, 
  Heart, 
  Zap, 
  Crown, 
  Briefcase, 
  Calculator, 
  TrendingDown, 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  FileText, 
  Download, 
  Lock, 
  Handshake, 
  Sparkles, 
  LineChart, 
  Activity, 
  Percent, 
  Clock,  
  Info
 } from "lucide-react"
import Link from "next/link"
import { useState } from "react";

const investmentHighlights = [
    {
      title: 'Massive Market Opportunity',
      value: '$4.2T',
      description: 'Global ethical consumer market growing 20% annually',
      icon: Globe,
      color: '#0D9488'
    },
    {
      title: 'Proven Demand',
      value: '73%',
      description: 'Nearly 3 in 4 consumers want to buy ethically',
      icon: TrendingUp,
      color: '#F97316'
    },
    {
      title: 'First-Mover Advantage',
      value: 'Unique',
      description: 'Only platform combining verification + AI + marketplace + community ownership',
      icon: Crown,
      color: '#EC4899'
    },
    {
      title: 'Revenue Streams',
      value: '5+',
      description: 'Multiple monetization channels from day one',
      icon: DollarSign,
      color: '#7C3AED'
    }
  ];

  const marketMetrics = {
    market: {
      title: 'Total Addressable Market',
      value: '$4.2T',
      growth: '+20%',
      description: 'Global ethical consumer market',
      details: [
        'Sustainable products market: $150B (2024)',
        'E-commerce verification: $8B (2024)',
        'AI personalization: $12B (2024)',
        'Growing 20% annually through 2030'
      ]
    },
    problem: {
      title: 'Market Pain Points',
      value: '89%',
      growth: 'Critical',
      description: 'Consumer trust gap in ethical claims',
      details: [
        '89% struggle to verify ethical claims',
        '67% have been misled by greenwashing',
        '78% want more transparency',
        '45% abandon purchases due to uncertainty'
      ]
    },
    competition: {
      title: 'Competitive Landscape',
      value: 'Blue Ocean',
      growth: 'Uncontested',
      description: 'No direct competitors with our approach',
      details: [
        'Existing marketplaces lack verification',
        'Certification bodies are fragmented',
        'No AI-powered ethical matching exists',
        'First to combine all three elements'
      ]
    }
  };

  const revenueStreams = [
    {
      title: 'Marketplace Commission',
      percentage: '40%',
      description: '3-5% commission on verified product sales',
      timeline: 'Q2 2025',
      icon: ShoppingCart,
      color: '#0D9488'
    },
    {
      title: 'Verification Services',
      percentage: '25%',
      description: 'B2B verification API and enterprise tools',
      timeline: 'Q3 2025',
      icon: Shield,
      color: '#F97316'
    },
    {
      title: 'Premium Features',
      percentage: '20%',
      description: 'Advanced analytics and priority placement',
      timeline: 'Q2 2025',
      icon: Crown,
      color: '#EC4899'
    },
    {
      title: 'Data Licensing',
      percentage: '10%',
      description: 'Anonymized ethical consumer insights',
      timeline: 'Q4 2025',
      icon: BarChart3,
      color: '#7C3AED'
    },
    {
      title: 'Token Economy',
      percentage: '5%',
      description: 'MOMM token transaction fees and staking',
      timeline: 'Q4 2025',
      icon: Coins,
      color: '#059669'
    }
  ];

  const financialProjections = [
    { year: '2025', revenue: '$250K', users: '10K', gmv: '$2M' },
    { year: '2026', revenue: '$2.5M', users: '100K', gmv: '$50M' },
    { year: '2027', revenue: '$12M', users: '500K', gmv: '$300M' },
    { year: '2028', revenue: '$45M', users: '2M', gmv: '$1.2B' },
    { year: '2029', revenue: '$120M', users: '5M', gmv: '$3B' }
  ];

  const teamCredentials = [
    {
      name: 'Founding Team',
      description: 'Combined 20+ years in tech, sustainability, and blockchain',
      achievements: [
        'Previous exits in B2B SaaS',
        'Deep expertise in Web3 and AI',
        'Strong network in sustainability space',
        'Track record of building scalable platforms'
      ]
    },
    {
      name: 'Advisory Board',
      description: 'Industry leaders from major certification bodies and VCs',
      achievements: [
        'Former executives from B Corp, Fair Trade',
        'VCs from top sustainability funds',
        'Technical advisors from Ethereum Foundation',
        'Retail executives from major brands'
      ]
    }
  ];

  const investmentTerms = {
    round: 'Pre-Seed Round',
    target: '$250K',
    raised: '$5K',
    valuation: '-',
    minInvestment: '$100',
    investors: '13',
    timeline: 'Closing Q3 2025'
  };

  const useOfFunds = [
    { category: 'Product & Engineering', percentage: 50, amount: '$125K', description: 'Primary focus. Core engineering & Product team to build the TRUST protocol, MARKET platform & our proprietary data scraping and normalization engine' },
    { category: 'Brand Partnerships & Community Growth', percentage: 25, amount: '$62K', description: 'Onboard our first cohort of ethical brand partners and conscious consumers through targeted outreach and strategic marketing.' },
    { category: 'Technology Infrastructure', percentage: 20, amount: '$37K', description: 'Essential costs including cloud hosting, database services, data scraping tools, and node infrastructure.' },
    { category: 'Operations & Legal', percentage: 10, amount: '$25K', description: 'Legal work for our company and DAO structure, Intellectual Property (IP), compliance, and general operational expenses.' }
  ];

  const riskFactors = [
    'Early-stage company with limited operating history',
    'Regulatory uncertainty in blockchain and data privacy',
    'Dependence on third-party certification bodies',
    'Competition from established e-commerce platforms',
    'Market adoption risk for new verification technology'
  ];


export default function InvestorsPage() {
    const [selectedMetric, setSelectedMetric] = useState('market');
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

            {/* Investment Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
              Investment Highlights
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              Why MOMM represents a compelling investment opportunity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {investmentHighlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border-2" style={{ borderColor: '#F1F5F9' }}>
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${highlight.color}20` }}>
                      <Icon className="h-6 w-6" style={{ color: highlight.color }} />
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-2" style={{ color: highlight.color }}>{highlight.value}</div>
                      <h3 className="text-lg font-semibold mb-2" style={{ color: '#0F172A' }}>{highlight.title}</h3>
                      <p className="text-sm" style={{ color: '#64748B' }}>{highlight.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* Join Our Mission */}
      <section className="py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
              Why Investors are Backing MOMM TRUST
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              We're building the infrastructure for verifiable commerce. Our fundraising campaign on Wefunder allows you to invest in the future of ethical shopping and become part of the solution.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Rocket className="h-8 w-8" style={{ color: '#0D9488' }} />
                  <h3 className="text-2xl font-bold" style={{ color: '#0F172A' }}>Investment Highlights</h3>
                </div>
                <p className="text-lg" style={{ color: '#475569' }}>
                  Why investors are backing MOMM TRUST
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F0FDFA' }}>
                    <TrendingUp className="h-6 w-6" style={{ color: '#0D9488' }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: '#0F172A' }}>Growing Market</h4>
                    <p style={{ color: '#475569' }}>$150B+ ethical consumer market</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF7ED' }}>
                    <Network className="h-6 w-6" style={{ color: '#F97316' }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: '#0F172A' }}>Built on Proven Blockchain Tech</h4>
                    <p style={{ color: '#475569' }}>Built on proven blockchain tech</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FDF2F8' }}>
                    <Award className="h-6 w-6" style={{ color: '#EC4899' }} />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold" style={{ color: '#0F172A' }}>First-Mover Advantage</h4>
                    <p style={{ color: '#475569' }}>Pioneering verifiable commerce</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4" style={{ color: '#0F172A' }}>
                    Invest in the Future of Ethical Commerce
                  </h3>
                  <p style={{ color: '#475569' }}>
                    Join a community of ethical investors and help scale global impact
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 rounded-lg" style={{ backgroundColor: '#F0FDFA' }}>
                    <Coins className="h-5 w-5" style={{ color: '#0D9488' }} />
                    <span style={{ color: '#0F172A' }}>Equity crowdfunding opportunity</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg" style={{ backgroundColor: '#FFF7ED' }}>
                    <Users className="h-5 w-5" style={{ color: '#F97316' }} />
                    <span style={{ color: '#0F172A' }}>Join a community of ethical investors</span>
                  </div>
                  <div className="flex items-center space-x-3 p-4 rounded-lg" style={{ backgroundColor: '#FDF2F8' }}>
                    <Globe className="h-5 w-5" style={{ color: '#EC4899' }} />
                    <span style={{ color: '#0F172A' }}>Help scale global impact</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a 
                    href="https://wefunder.com/momm" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center" style={{ backgroundColor: '#0D9488' }} onMouseEnter={(e) => e.target.style.backgroundColor = '#0F766E'} onMouseLeave={(e) => e.target.style.backgroundColor = '#0D9488'}
                  >
                    Invest on Wefunder
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

            {/* Market Opportunity */}
      <section id="market-opportunity" className="py-20" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
              Market Opportunity
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              A massive and growing market with clear demand for our solution
            </p>
          </div>

          {/* Metric Selector */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 p-2 rounded-xl" style={{ backgroundColor: '#F1F5F9' }}>
              {Object.entries(marketMetrics).map(([key, metric]) => (
                <button
                  key={key}
                  onClick={() => setSelectedMetric(key)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    selectedMetric === key ? 'text-white shadow-lg' : 'hover:bg-white'
                  }`}
                  style={{
                    backgroundColor: selectedMetric === key ? '#0D9488' : 'transparent',
                    color: selectedMetric === key ? 'white' : '#64748B'
                  }}
                >
                  {metric.title}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Metric Display */}
          <div className="max-w-4xl mx-auto">
            {Object.entries(marketMetrics).map(([key, metric]) => (
              <div
                key={key}
                className={`transition-all duration-500 ${
                  selectedMetric === key ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 absolute'
                }`}
                style={{ display: selectedMetric === key ? 'block' : 'none' }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-4xl font-bold" style={{ color: '#0D9488' }}>{metric.value}</div>
                          <div className="text-lg font-semibold" style={{ color: '#059669' }}>{metric.growth}</div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2" style={{ color: '#0F172A' }}>{metric.title}</h3>
                        <p className="text-lg" style={{ color: '#64748B' }}>{metric.description}</p>
                      </div>

                      <div className="space-y-3">
                        {metric.details.map((detail, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5" style={{ color: '#0D9488' }} />
                            <span style={{ color: '#0F172A' }}>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-full h-64 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F0FDFA' }}>
                        <BarChart3 className="h-32 w-32 opacity-20" style={{ color: '#0D9488' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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

            {/* Investment Terms */}
      <section className="py-20" style={{ backgroundColor: '#F1F5F9' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 mb-16">
            <h2 className="text-4xl font-bold" style={{ color: '#0F172A' }}>
              Investment Terms
            </h2>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: '#475569' }}>
              Current funding round details and use of proceeds
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Investment Terms */}
            <div className="bg-white p-8 rounded-2xl shadow-xl h-fit">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F172A' }}>Current Round</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm" style={{ color: '#64748B' }}>Round Type</div>
                    <div className="text-xl font-bold" style={{ color: '#0F172A' }}>{investmentTerms.round}</div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: '#64748B' }}>Target Raise</div>
                    <div className="text-xl font-bold" style={{ color: '#0D9488' }}>{investmentTerms.target}</div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: '#64748B' }}>Pre-Money Valuation</div>
                    <div className="text-xl font-bold" style={{ color: '#0F172A' }}>{investmentTerms.valuation}</div>
                  </div>
                  <div>
                    <div className="text-sm" style={{ color: '#64748B' }}>Minimum Investment</div>
                    <div className="text-xl font-bold" style={{ color: '#0F172A' }}>{investmentTerms.minInvestment}</div>
                  </div>
                </div>

                <div className="pt-6 border-t" style={{ borderColor: '#E2E8F0' }}>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold" style={{ color: '#0F172A' }}>Funding Progress</span>
                    <span className="text-sm" style={{ color: '#64748B' }}>{investmentTerms.raised} raised</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div 
                      className="h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: '20%',
                        backgroundColor: '#0D9488'
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm" style={{ color: '#64748B' }}>
                    <span>{investmentTerms.investors} investors</span>
                    <span>{investmentTerms.timeline}</span>
                  </div>
                </div>

                <a 
                  href="https://wefunder.com/momm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                  style={{ backgroundColor: '#0D9488' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#0F766E'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#0D9488'}
                >
                  Invest Now on Wefunder
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Use of Funds */}
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6" style={{ color: '#0F172A' }}>Use of Funds</h3>
              <div className="space-y-4">
                {useOfFunds.map((fund, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold" style={{ color: '#0F172A' }}>{fund.category}</span>
                      <div className="text-right">
                        <div className="font-bold" style={{ color: '#0D9488' }}>{fund.percentage}%</div>
                        <div className="text-sm" style={{ color: '#64748B' }}>{fund.amount}</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${fund.percentage}%`,
                          backgroundColor: '#0D9488'
                        }}
                      ></div>
                    </div>
                    <p className="text-sm" style={{ color: '#64748B' }}>{fund.description}</p>
                  </div>
                ))}
              </div>
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
              <Link href="/contact">Questions? Join Discord</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
