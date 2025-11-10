import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog - MOMM Market",
  description:
    "Stay updated with the latest news, insights, and stories from the MOMM marketplace community. Learn about ethical shopping, vendor spotlights, and platform updates.",
}

// Sample blog posts - In production, these would come from a database or CMS
const blogPosts = [
  {
    id: 1,
    title: "Welcome to MOMM: Building a Marketplace Where Values Matter",
    excerpt:
      "Discover how MOMM is revolutionizing online shopping by putting your values first. Learn about our mission to create a transparent, community-driven marketplace.",
    date: "2025-01-15",
    slug: "welcome-to-momm",
    category: "Company News",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Vendor Spotlight: Meet Our First Community Partners",
    excerpt:
      "Get to know the amazing vendors who are joining us on this journey. Learn their stories and discover what makes them special.",
    date: "2025-01-10",
    slug: "vendor-spotlight-january-2025",
    category: "Vendor Stories",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "The Power of Ethical Shopping: Why Your Purchases Matter",
    excerpt:
      "Explore how conscious consumer choices create real change. From supporting small businesses to environmental impact, every purchase tells a story.",
    date: "2025-01-05",
    slug: "power-of-ethical-shopping",
    category: "Insights",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Platform Update: New Features Rolling Out This Month",
    excerpt:
      "Check out the latest improvements to the MOMM marketplace. From enhanced search to improved vendor tools, we're constantly evolving.",
    date: "2024-12-28",
    slug: "platform-update-december-2024",
    category: "Product Updates",
    readTime: "4 min read",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">MOMM Blog</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stories, insights, and updates from the MOMM community. Discover how we're building a marketplace that
            values people and principles.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="container py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-teal-500">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 text-balance">{post.title}</h2>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <div className="flex items-center gap-2 text-teal-600 font-semibold">
                        Read More
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Coming Soon Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-teal-50 to-orange-50 border-2 border-teal-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">More Stories Coming Soon</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  We're just getting started! Follow us on social media or join our Discord community to stay updated
                  with the latest news and stories.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
