"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ShoppingCart, Store } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface ProductLink {
  id: string
  platform: string
  url: string
  price: number
  currency: string
  is_available: boolean
  last_updated: string
}

interface WhereToBuySectionProps {
  productId: string
  className?: string
}

const platformConfig: Record<
  string,
  {
    icon: string
    colors: string
    textColor: string
    hoverColors: string
  }
> = {
  amazon: {
    icon: "📦",
    colors: "bg-[#FF9900] border-[#FF9900]",
    textColor: "text-black",
    hoverColors: "hover:bg-[#E88B00] hover:border-[#E88B00]",
  },
  ebay: {
    icon: "🏪",
    colors: "bg-[#0064D2] border-[#0064D2]",
    textColor: "text-white",
    hoverColors: "hover:bg-[#0056B3] hover:border-[#0056B3]",
  },
  walmart: {
    icon: "🏬",
    colors: "bg-[#0071CE] border-[#0071CE]",
    textColor: "text-white",
    hoverColors: "hover:bg-[#005BA1] hover:border-[#005BA1]",
  },
  target: {
    icon: "🎯",
    colors: "bg-[#CC0000] border-[#CC0000]",
    textColor: "text-white",
    hoverColors: "hover:bg-[#B30000] hover:border-[#B30000]",
  },
  bestbuy: {
    icon: "💻",
    colors: "bg-[#FFE000] border-[#FFE000]",
    textColor: "text-black",
    hoverColors: "hover:bg-[#E6CC00] hover:border-[#E6CC00]",
  },
  etsy: {
    icon: "🎨",
    colors: "bg-[#F16521] border-[#F16521]",
    textColor: "text-white",
    hoverColors: "hover:bg-[#D4541A] hover:border-[#D4541A]",
  },
  shopify: {
    icon: "🛍️",
    colors: "bg-[#7AB55C] border-[#7AB55C]",
    textColor: "text-white",
    hoverColors: "hover:bg-[#6A9F4F] hover:border-[#6A9F4F]",
  },
  other: {
    icon: "🏪",
    colors: "bg-gray-600 border-gray-600",
    textColor: "text-white",
    hoverColors: "hover:bg-gray-700 hover:border-gray-700",
  },
}

export function WhereToBuySection({ productId, className = "" }: WhereToBuySectionProps) {
  const [links, setLinks] = useState<ProductLink[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    async function fetchProductLinks() {
      try {
        const { data, error } = await supabase
          .from("product_links")
          .select("*")
          .eq("product_id", productId)
          .eq("is_available", true)
          .order("price", { ascending: true })

        if (error) {
          console.error("Error fetching product links:", error)
          return
        }

        setLinks(data || [])
      } catch (error) {
        console.error("Error:", error)
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchProductLinks()
    }
  }, [productId, supabase])

  const handlePurchaseClick = (url: string, platform: string) => {
    // Track click analytics here if needed
    window.open(url, "_blank", "noopener,noreferrer")
  }

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Where to Buy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-14 bg-gray-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (links.length === 0) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Where to Buy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Store className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No purchase links available</p>
            <p className="text-sm text-gray-400">Check back later for purchase options</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const lowestPrice = Math.min(...links.map((link) => link.price))

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Where to Buy
        </CardTitle>
        <p className="text-sm text-gray-600">
          Available from {links.length} retailer{links.length !== 1 ? "s" : ""}
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {links.map((link) => {
            const platformKey = link.platform.toLowerCase()
            const config = platformConfig[platformKey] || platformConfig.other

            return (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{config.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-lg capitalize">{link.platform}</span>
                      {link.price === lowestPrice && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 border-green-200">
                          Best Price
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-green-600">
                      {link.currency} {link.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handlePurchaseClick(link.url, link.platform)}
                  className={`
                    ${config.colors} 
                    ${config.textColor} 
                    ${config.hoverColors}
                    font-semibold px-6 py-3 text-base
                    transition-all duration-200 
                    shadow-md hover:shadow-lg
                    transform hover:scale-105
                  `}
                  size="lg"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Buy on {link.platform}
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Smart Shopping Tip</h4>
              <p className="text-sm text-blue-800">
                Prices and availability may vary by platform. We've sorted these by price to help you find the best
                deal. Click any "Buy" button to check current pricing and availability.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Verified Links</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Real-time Pricing</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Secure Checkout</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
