import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar } from "lucide-react"

// Sample blog post data - In production, this would come from a database or CMS
const blogPosts = {
  "welcome-to-momm": {
    title: "Welcome to MOMM: Building a Marketplace Where Values Matter",
    date: "2025-01-15",
    category: "Company News",
    readTime: "5 min read",
    content: `
      <p>Welcome to MOMM Market - a marketplace built on the belief that every purchase should reflect your values and benefit everyone involved.</p>
      
      <h2>Our Mission</h2>
      <p>At MOMM, we're creating more than just another online marketplace. We're building a community where transparency, ethics, and shared prosperity are at the core of every transaction.</p>
      
      <h2>What Makes MOMM Different?</h2>
      <p>Unlike traditional marketplaces, MOMM puts you in control. Track where your money goes, understand the impact of your purchases, and be part of a community that values people over profits.</p>
      
      <h3>Transparency First</h3>
      <p>We believe you deserve to know everything about the products you buy and the companies you support. That's why we provide detailed information about vendors, their practices, and their values.</p>
      
      <h3>Community Driven</h3>
      <p>MOMM isn't just built for users - it's built by users. Join our Discord community to have a voice in platform decisions and connect with like-minded shoppers.</p>
      
      <h2>Join the Movement</h2>
      <p>Whether you're a shopper looking for ethical products, a vendor wanting to reach conscious consumers, or an investor believing in value-driven commerce, there's a place for you at MOMM.</p>
      
      <p>Ready to start shopping with purpose? Explore our marketplace today and discover vendors who share your values.</p>
    `,
  },
  "vendor-spotlight-january-2025": {
    title: "Vendor Spotlight: Meet Our First Community Partners",
    date: "2025-01-10",
    category: "Vendor Stories",
    readTime: "7 min read",
    content: `
      <p>We're thrilled to introduce you to the amazing vendors who are pioneering the MOMM marketplace. These businesses aren't just selling products - they're building a better future.</p>
      
      <h2>Why Vendor Stories Matter</h2>
      <p>Behind every product is a person with a story, a passion, and a commitment to quality. At MOMM, we believe these stories deserve to be heard.</p>
      
      <h2>Meet Our Vendors</h2>
      <p>From sustainable fashion to artisan crafts, our first wave of vendors represents the diversity and quality that MOMM stands for.</p>
      
      <h3>Commitment to Quality</h3>
      <p>Every vendor on MOMM goes through a careful verification process to ensure they meet our standards for ethics, quality, and transparency.</p>
      
      <h2>Want to Become a Vendor?</h2>
      <p>If you're a business owner who values ethics and quality, we'd love to hear from you. Visit our vendor application page or join our Discord to learn more.</p>
    `,
  },
  "power-of-ethical-shopping": {
    title: "The Power of Ethical Shopping: Why Your Purchases Matter",
    date: "2025-01-05",
    category: "Insights",
    readTime: "6 min read",
    content: `
      <p>Every purchase you make is a vote for the kind of world you want to live in. Here's why ethical shopping matters more than ever.</p>
      
      <h2>The Impact of Consumer Choices</h2>
      <p>When you choose where to spend your money, you're not just buying a product - you're supporting a business, its practices, and its values.</p>
      
      <h3>Supporting Small Businesses</h3>
      <p>Small businesses are the backbone of local economies. When you shop small, you're investing in real people and real communities.</p>
      
      <h3>Environmental Considerations</h3>
      <p>From packaging to shipping, every purchase has an environmental footprint. Ethical shopping means being mindful of that impact.</p>
      
      <h2>Making Informed Decisions</h2>
      <p>MOMM makes it easy to shop according to your values by providing transparent information about vendors and their practices.</p>
      
      <h2>Start Today</h2>
      <p>You don't have to be perfect to make a difference. Every ethical purchase, no matter how small, contributes to positive change.</p>
    `,
  },
  "platform-update-december-2024": {
    title: "Platform Update: New Features Rolling Out This Month",
    date: "2024-12-28",
    category: "Product Updates",
    readTime: "4 min read",
    content: `
      <p>We've been working hard to improve your MOMM experience. Here's what's new this month!</p>
      
      <h2>Enhanced Search</h2>
      <p>Finding the perfect product just got easier with our improved search functionality. Filter by values, certifications, and more.</p>
      
      <h2>Vendor Tools</h2>
      <p>We've rolled out new tools to help vendors manage their stores more efficiently, from inventory tracking to order management.</p>
      
      <h2>Mobile Experience</h2>
      <p>Our mobile app has received a major update with faster loading times and a smoother checkout process.</p>
      
      <h2>What's Next?</h2>
      <p>We're constantly evolving based on your feedback. Join our Discord to share your ideas and be part of the development process.</p>
      
      <h2>Thank You</h2>
      <p>To our amazing community - thank you for being part of this journey. Your support and feedback make MOMM better every day.</p>
    `,
  },
}

type BlogPostData = {
  title: string
  date: string
  category: string
  readTime: string
  content: string
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Post Not Found - MOMM Blog",
    }
  }

  return {
    title: `${post.title} - MOMM Blog`,
    description: post.content.substring(0, 160).replace(/<[^>]*>/g, ""),
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post: BlogPostData | undefined = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="container py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog">
            <Button variant="ghost" className="mb-8 -ml-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>

          {/* Post Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">{post.category}</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <span>{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">{post.title}</h1>
          </header>

          {/* Post Content */}
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              lineHeight: "1.7",
            }}
          />

          {/* Footer CTA */}
          <div className="mt-12 p-8 bg-gradient-to-r from-teal-50 to-orange-50 rounded-lg border-2 border-teal-200">
            <h3 className="text-2xl font-bold mb-3">Join the MOMM Community</h3>
            <p className="text-muted-foreground mb-6">
              Stay updated with the latest news, connect with like-minded shoppers, and be part of building a better
              marketplace.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <a href="https://discord.gg/PptvudG7jb" target="_blank" rel="noopener noreferrer">
                  Join Our Discord
                </a>
              </Button>
              <Button asChild variant="outline">
                <Link href="/early-access">Get Early Access</Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
