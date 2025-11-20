import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Package, Users, Mail, Phone, CheckCircle, Award, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

export default async function VendorProfilePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()

  try {
    // Fetch vendor details
    const { data: vendor, error: vendorError } = await supabase.from("vendors").select("*").eq("id", params.id).single()

    if (vendorError || !vendor) {
      notFound()
    }

    // Fetch vendor's products
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, price, compare_at_price, featured_image_url, inventory_quantity")
      .eq("vendor_id", params.id)
      .eq("is_active", true)
      .limit(12)

    // Fetch vendor's certifications
    const { data: certifications, error: certificationsError } = await supabase
      .from("entity_certifications")
      .select(`
        verified,
        certifications (
          name,
          description,
          icon_url,
          id
        )
      `)
      .eq("entity_id", params.id)
      .eq("entity_type", "vendor")
      .eq("verified", true)

    // Mock data for demo (replace with real data later)
    const mockStats = {
      totalProducts: products?.length || 0,
      followers: Math.floor(Math.random() * 10000) + 1000,
      rating: (Math.random() * 1.5 + 3.5).toFixed(1),
      totalReviews: Math.floor(Math.random() * 500) + 50,
      joinDate: new Date(vendor.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      }),
    }

    return (
      <div className="min-h-screen bg-background">
        <div className="center-content py-8">
          {/* Vendor Header */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative">
                    <Image
                      src={vendor.logo_url || "/placeholder.svg?height=120&width=120&query=vendor logo"}
                      alt={vendor.business_name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-4 border-background shadow-lg"
                    />
                    {vendor.is_verified && (
                      <Badge className="absolute -bottom-2 -right-2 bg-green-500 text-white">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{vendor.business_name}</h1>
                      <p className="text-muted-foreground text-lg">
                        {vendor.business_description || "A trusted vendor on our platform"}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{mockStats.rating}</span>
                        <span className="text-muted-foreground">({mockStats.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Package className="h-4 w-4" />
                        <span>{mockStats.totalProducts} Products</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{mockStats.followers.toLocaleString()} Followers</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Joined {mockStats.joinDate}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-primary">
                        <Users className="h-4 w-4 mr-2" />
                        Follow Vendor
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Products ({mockStats.totalProducts})</CardTitle>
                </CardHeader>
                <CardContent>
                  {products && products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <div className="aspect-square relative overflow-hidden rounded-t-lg">
                              <Image
                                src={
                                  product.featured_image_url || "/placeholder.svg?height=200&width=200&query=product"
                                }
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                              {product.compare_at_price && product.compare_at_price > product.price && (
                                <Badge className="absolute top-2 left-2 bg-accent text-accent-foreground">Sale</Badge>
                              )}
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
                              <div className="flex items-center gap-2">
                                <span className="font-bold">${product.price}</span>
                                {product.compare_at_price && product.compare_at_price > product.price && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ${product.compare_at_price}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">
                                {product.inventory_quantity > 0 ? "In Stock" : "Out of Stock"}
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No products available at the moment</p>
                    </div>
                  )}

                  {products && products.length >= 12 && (
                    <div className="mt-6 text-center">
                      <Button variant="outline" className="bg-transparent">
                        View All Products
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* About */}
              <Card>
                <CardHeader>
                  <CardTitle>About {vendor.business_name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {vendor.business_description ||
                      `${vendor.business_name} is a verified vendor committed to providing quality products and excellent customer service. They have been a trusted partner on our platform since ${mockStats.joinDate}.`}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {vendor.business_email && (
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{vendor.business_email}</span>
                    </div>
                  )}
                  {vendor.business_phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{vendor.business_phone}</span>
                    </div>
                  )}
                  {vendor.business_address && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{vendor.business_address}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Certifications */}
              {certifications && certifications.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {certifications.map((cert, index) => (
                      <Link
                        key={index}
                        href={`/certifications/${cert.certifications?.id || "#"}`}
                        className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <div>
                          <span className="font-medium text-sm">{cert.certifications?.name}</span>
                          {cert.certifications?.description && (
                            <p className="text-xs text-muted-foreground">{cert.certifications.description}</p>
                          )}
                        </div>
                      </Link>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Trust Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle>Why Trust This Vendor?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {vendor.is_verified && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Verified business</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Secure payment processing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Customer protection guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Quality assurance standards</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading vendor profile:", error)
    notFound()
  }
}
