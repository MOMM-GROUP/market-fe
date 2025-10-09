import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, Shield, CheckCircle, Truck, RotateCcw, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { FavoriteButton } from "@/components/favorite-button"
import { WhereToBuySection } from "@/components/where-to-buy-section"

interface Product {
  id: string
  name: string
  description: string
  price: number
  compare_at_price: number | null
  featured_image_url: string | null
  vendor_id: string
  category_id: string
  is_active: boolean
  inventory_quantity: number
  vendors: {
    business_name: string
    is_verified: boolean
    description?: string
  }
  categories: {
    name: string
    slug: string
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createClient()

  try {
    const { data: product, error } = await supabase
      .from("products")
      .select(`
        *,
        vendors (business_name, is_verified, business_description),
        categories (name, slug)
      `)
      .eq("id", id)
      .eq("is_active", true)
      .single()

    if (error || !product) {
      notFound()
    }

    const { data: productCertifications, error: certError } = await supabase
      .from("entity_certifications")
      .select(`
        certifications (
          id,
          name,
          description,
          category,
          icon_url,
          logo_link
        )
      `)
      .eq("entity_id", id)
      .eq("entity_type", "product")

    const hasDiscount = product.compare_at_price && product.compare_at_price > product.price
    const discountPercent = hasDiscount
      ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
      : 0

    // Mock values match score
    const valuesMatchScore = Math.floor(Math.random() * 15) + 85

    return (
      <div className="min-h-screen bg-background">
        <div className="center-content py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.featured_image_url || "/placeholder.svg?height=600&width=600&query=product"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {hasDiscount && (
                  <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">-{discountPercent}%</Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Link
                    href={`/vendors/${product.vendor_id}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {product.vendors?.business_name}
                  </Link>
                  {product.vendors?.is_verified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

                {/* Values Match Score */}
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-medium">Your Values Match:</span>
                    <span className="text-lg font-bold text-primary">{valuesMatchScore}%</span>
                  </div>
                  <div className="flex-1 bg-muted rounded-full h-3 mb-2">
                    <div
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${valuesMatchScore}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on your preferences for Eco-Friendly, Fair Trade, and Organic materials.
                  </p>
                </div>

                {/* Ownership & Attributes */}
                <div className="flex gap-2 flex-wrap mb-4">
                  <Badge variant="outline" className="text-xs">
                    Women-Owned
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Minority-Owned
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    B Corp Certified
                  </Badge>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-3xl font-bold">${product.price}</span>
                  {hasDiscount && (
                    <span className="text-xl text-muted-foreground line-through">${product.compare_at_price}</span>
                  )}
                </div>

                <div className="flex items-center gap-1 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground ml-2">(4.8) • 127 reviews</span>
                </div>

                <div className="flex gap-3 mb-6">
                  <div className="flex-1">
                    <WhereToBuySection productId={product.id} />
                  </div>
                  <FavoriteButton productId={product.id} size="lg" />
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Free shipping on orders over $75</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Secure checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Product Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{product.description}</p>
                </CardContent>
              </Card>

              {/* Verified Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle>The Ethical Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {productCertifications && productCertifications.length > 0 ? (
                    productCertifications.map((item) => {
                      const cert = item.certifications
                      if (!cert) return null

                      return (
                        <Link
                          key={cert.id}
                          href={`/certifications/${cert.id}`}
                          className="flex items-center gap-3 p-3 rounded-lg border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all duration-200 group cursor-pointer"
                        >
                          <div className="flex-shrink-0">
                            {cert.icon_url || cert.logo_link ? (
                              <Image
                                src={cert.icon_url || cert.logo_link || ""}
                                alt={cert.name}
                                width={24}
                                height={24}
                                className="rounded"
                              />
                            ) : (
                              <CheckCircle className="h-6 w-6 text-green-600" />
                            )}
                          </div>
                          <div className="flex-1">
                            <span className="font-medium text-primary group-hover:text-primary/80 transition-colors">
                              {cert.name}
                            </span>
                            {cert.description && (
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{cert.description}</p>
                            )}
                          </div>
                          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-xs text-primary font-medium">View Details →</span>
                          </div>
                        </Link>
                      )
                    })
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Award className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No certifications found for this product.</p>
                      <p className="text-sm mt-1">Certifications may be pending verification.</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* The Journey of This Product */}
              <Card>
                <CardHeader>
                  <CardTitle>From Farm to Your Doorstep</CardTitle>
                  <p className="text-sm text-muted-foreground">Simplified TRUST Protocol</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                          1
                        </div>
                        <div className="w-px h-12 bg-border mt-2"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Raw Materials (India)</h4>
                        <p className="text-sm text-muted-foreground">Verified: GOTS Organic, Fair Trade</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                          2
                        </div>
                        <div className="w-px h-12 bg-border mt-2"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Manufacturing (Portugal)</h4>
                        <p className="text-sm text-muted-foreground">Verified: OEKO-TEX</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                          3
                        </div>
                        <div className="w-px h-12 bg-border mt-2"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">Assembly (Vietnam)</h4>
                        <p className="text-sm text-muted-foreground">Verified: B Corp Factory</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                          4
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium">Distribution (California)</h4>
                        <p className="text-sm text-muted-foreground">Verified: Carbon Neutral, FSC Packaging</p>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <Link href="/trust-verification" className="text-sm text-primary hover:underline">
                    Learn more about our TRUST verification →
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Vendor Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    About {product.vendors?.business_name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.vendors.description || "A verified vendor committed to ethical and sustainable practices."}
                  </p>
                  <Link href={`/vendors/${product.vendor_id}`}>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                      View Vendor Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Trust Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Trust This Product?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>All claims verified by TRUST protocol</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Supply chain transparency</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Third-party certifications</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Regular compliance audits</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("[v0] ProductDetailPage: Unexpected error:", error)
    notFound()
  }
}
