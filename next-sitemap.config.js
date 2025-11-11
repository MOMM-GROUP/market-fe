/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://www.momm.group",
  generateRobotsTxt: true, 
  generateIndexSitemap: false,
  exclude: [
    "/admin/*",
    "/admin",
    "/vendor/*",
    "/vendor",
    "/api/*",
    "/auth/*",
    "/cart",
    "/checkout",
    "/checkout/*",
    "/favorites",
    "/orders/*",
    "/orders",
    "/profile",
    "/returns",
    "/early-access/thank-you",
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/vendor", "/api", "/auth", "/checkout"],
      },
    ],
  },
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === "/") {
      return {
        loc: `${config.siteUrl}${path}`, 
        changefreq: "daily",
        priority: 1.0,
        lastmod: currentDate.toISOString(),
      }
    }

    // Main landing pages
    if (path === "/products" || path === "/vendors" || path === "/contributors" || path === "/investors") {
      return {
        loc: `${config.siteUrl}${path}`, 
        changefreq: "daily",
        priority: 0.9,
        lastmod: currentDate.toISOString(),
      }
    }

    // Individual product and vendor pages
    if (path.startsWith("/products/") || path.startsWith("/vendors/")) {
      return {
        loc: `${config.siteUrl}${path}`, 
        changefreq: "weekly",
        priority: 0.8,
        lastmod: currentDate.toISOString(),
      }
    }

    // Default for all other pages
    return {
      loc: `${config.siteUrl}${path}`,  
      changefreq: "weekly",
      priority: 0.7,
      lastmod: currentDate.toISOString(),
    }
  },
}
