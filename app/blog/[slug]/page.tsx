import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Blog Post - MOMM Market",
  description: "MOMM Blog - Coming Soon",
}

export default function BlogPostPage() {
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

          {/* Coming Soon Content */}
          <div className="text-center py-20">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Coming Soon</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're working on bringing you valuable content. Check back soon for stories, insights, and updates from
              the MOMM community.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}
