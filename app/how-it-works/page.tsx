import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="center-content max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">How MOMM Works</h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            A marketplace where everybody wins. Shoppers, brands, and contributors.
          </p>
        </div>
      </section>

      {/* For Shoppers */}
      <section className="py-20 bg-gradient-to-r from-teal-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-4">For Shoppers</h3>
          <p className="text-gray-600 mb-12">Shop with purpose. Build wealth with every purchase.</p>

          {/* Timeline Layout */}
          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-teal-600 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
              <div className="text-center">
                <div className="w-16 h-16 bg-white border-4 border-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <h4 className="font-bold mb-2">1. Browse</h4>
                <p className="text-sm text-gray-600">Shop verified ethical products</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white border-4 border-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">✓</span>
                </div>
                <h4 className="font-bold mb-2">2. Verify</h4>
                <p className="text-sm text-gray-600">Every claim is verified</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white border-4 border-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <h4 className="font-bold mb-2">3. Buy</h4>
                <p className="text-sm text-gray-600">Purchase with confidence</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-white border-4 border-teal-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="font-bold mb-2">4. Earn</h4>
                <p className="text-sm text-gray-600">1-2% goes to your Vault</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="#vault">
              <Button className="bg-teal-600 hover:bg-teal-700">Learn About Your Vault →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Brands */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-4">For Ethical Brands</h3>
          <p className="text-gray-600 mb-12">Reach conscious consumers who value what you do.</p>

          {/* 3-Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border-2 border-orange-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🎯</div>
              <h4 className="text-xl font-bold mb-3">List Products</h4>
              <p className="text-gray-600">Submit your verified ethical products to reach conscious shoppers</p>
              <p className="text-sm text-orange-600 font-bold mt-4">5% Commission</p>
            </div>

            <div className="border-2 border-orange-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-bold mb-3">Get Analytics</h4>
              <p className="text-gray-600">Understand your customers' values and buying patterns</p>
              <p className="text-sm text-orange-600 font-bold mt-4">Real-time Insights</p>
            </div>

            <div className="border-2 border-orange-200 rounded-lg p-8 hover:shadow-lg transition">
              <div className="text-4xl mb-4">🤝</div>
              <h4 className="text-xl font-bold mb-3">Grow Together</h4>
              <p className="text-gray-600">Access co-marketing and partnership opportunities</p>
              <p className="text-sm text-orange-600 font-bold mt-4">Community First</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/brands">
              <Button className="bg-orange-600 hover:bg-orange-700">Become a Partner →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Contributors */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold mb-4">For Builders</h3>
          <p className="text-gray-600 mb-12">Build the future. Share in the success.</p>

          {/* Large Alternating Cards */}
          {/* Card 1 - Left aligned text, right aligned icon */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">Choose Your Role</h4>
              <p className="text-gray-700 mb-4">
                We're hiring for data specialists, legal experts, engineers, and community builders.
              </p>
              <ul className="text-sm space-y-2">
                <li>✓ Data Sourcing</li>
                <li>✓ Full-Stack Engineers</li>
                <li>✓ Legal & Operations</li>
                <li>✓ Community Management</li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-pink-200 rounded-lg flex items-center justify-center text-6xl">👥</div>
            </div>
          </div>

          {/* Card 2 - Right aligned text, left aligned icon */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 mb-12">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">Earn Profit Share</h4>
              <p className="text-gray-700 mb-4">
                Once we're profitable, 35% of profits go to contributors based on impact.
              </p>
              <ul className="text-sm space-y-2">
                <li>✓ Impact-based allocation</li>
                <li>✓ Role minimums guaranteed</li>
                <li>✓ Your points never expire</li>
                <li>✓ Compound forever</li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-purple-200 rounded-lg flex items-center justify-center text-6xl">💰</div>
            </div>
          </div>

          {/* Card 3 - Back to left aligned */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <h4 className="text-2xl font-bold mb-3">Build Community</h4>
              <p className="text-gray-700 mb-4">You're not just coding features. You're building a movement.</p>
              <ul className="text-sm space-y-2">
                <li>✓ Discord community</li>
                <li>✓ Weekly sync calls</li>
                <li>✓ Transparent decisions</li>
                <li>✓ Your voice matters</li>
              </ul>
            </div>
            <div className="flex-shrink-0">
              <div className="w-40 h-40 bg-pink-300 rounded-lg flex items-center justify-center text-6xl">🚀</div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/contributors">
              <Button className="bg-pink-600 hover:bg-pink-700">Join as Builder →</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* MOMM Vault Section */}
      <section id="vault" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-4">The MOMM Vault</h3>
          <p className="text-center text-gray-600 mb-12">Your personal rewards account. You decide how to use it.</p>

          {/* 2x2 Grid with Gradient Backgrounds */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-lg border-l-4 border-teal-600">
              <h4 className="text-xl font-bold mb-3">💵 Invest</h4>
              <p className="text-gray-700">Have your vault professionally managed in markets or small businesses.</p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-lg border-l-4 border-orange-600">
              <h4 className="text-xl font-bold mb-3">❤️ Give</h4>
              <p className="text-gray-700">Donate to vetted nonprofits or community projects you care about.</p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-lg border-l-4 border-pink-600">
              <h4 className="text-xl font-bold mb-3">🤝 Support</h4>
              <p className="text-gray-700">Use it for essential services like health insurance or wellness.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-lg border-l-4 border-purple-600">
              <h4 className="text-xl font-bold mb-3">🛡️ Safety Net</h4>
              <p className="text-gray-700">Save it for when you're low on funds and need a quick boost.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Common Questions</h3>

          {/* Accordion Layout */}
          <div className="space-y-4">
            <details className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>How do I start shopping?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                Sign up for the waitlist. We launch beta access to early members first.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>When do I get my vault money?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                It's stored in your account as credits immediately. Cash withdrawals come later as we scale.
              </p>
            </details>

            <details className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>How are contributions valued?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">Based on impact, not hours. Bigger impact = bigger share of profits.</p>
            </details>

            <details className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition group">
              <summary className="font-bold cursor-pointer list-none flex items-center justify-between">
                <span>Is this really happening?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-600">
                Yes. We have 2,847 products indexed, 156 certifications tracked, and 4 core team members building daily.
                Join our Discord to see the work in progress.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 text-center bg-gradient-to-r from-teal-600 via-orange-600 to-pink-600 text-white">
        <div className="center-content max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Join the Movement?</h2>
          <p className="text-lg mb-8 text-white/90 leading-relaxed">
            Every purchase, every contribution, every interaction helps build a more equitable economy. The time for
            change is now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/products">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Shopping
              </Button>
            </Link>
            <Link href="/investors">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Invest
              </Button>
            </Link>
            <Link href="/contributors">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white/10 bg-transparent"
              >
                Contribute
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
