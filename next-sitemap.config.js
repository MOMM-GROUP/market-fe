/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.momm.group", // Hardcoded with https://
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
    const currentDate = new Date();
    
    if (path === "/") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 1.0,
        lastmod: currentDate.toISOString(),
      }
    }
    
    if (path === "/products" || path === "/vendors" || path === "/contributors" || path === "/investors") {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.9,
        lastmod: currentDate.toISOString(),
      }
    }
    
    if (path.startsWith("/products/") || path.startsWith("/vendors/")) {
      return {
        loc: path,
        changefreq: "weekly",
        priority: 0.8,
        lastmod: currentDate.toISOString(),
      }
    }
    
    return {
      loc: path,
      changefreq: "weekly",
      priority: 0.7,
      lastmod: currentDate.toISOString(),
    }
  },
}
