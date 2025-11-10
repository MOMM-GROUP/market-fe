import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - MOMM Market",
  description: "Stay updated with the latest news, insights, and stories from the MOMM marketplace community.",
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-teal-50 via-orange-50 to-pink-50">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">MOMM Blog</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stories, insights, and updates from the MOMM community.
          </p>
        </div>
      </section>

      {/* Coming Soon Section */}
      <div className="container py-24 md:py-32">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">Coming Soon</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We're working on bringing you valuable content, vendor stories, and marketplace insights. Check back soon or
            join our Discord community to stay updated.
          </p>
        </div>
      </div>
    </div>
  )
}
