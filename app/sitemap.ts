import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || "https://www.momm.group"

  // Static pages with their priorities
  const staticPages = [
    { url: "", changeFrequency: "daily" as const, priority: 1.0 },
    { url: "/products", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/vendors", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/contributors", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/investors", changeFrequency: "daily" as const, priority: 0.9 },
    { url: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { url: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/contact", changeFrequency: "monthly" as const, priority: 0.7 },
    { url: "/early-access", changeFrequency: "monthly" as const, priority: 0.8 },
  ]

  const currentDate = new Date()

  return staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))
}
