import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || "https://www.momm.group"

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/vendor", "/api", "/auth", "/checkout"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
