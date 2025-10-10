import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, CheckCircle, ExternalLink, Building, Package, Shield, Globe, FileText } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface Certification {
  id: string
  name: string
  description: string
  category: string
  icon_url: string | null
  website_url: string | null
  logo_link: string | null
  certifier: string | null
  industry: string | null
  region: string | null
  certification_cost: string | null
  audit_frequency: string | null
  certifies_company: boolean
  certifies_product: boolean
  certifies_process: boolean
  is_audited: boolean
  audited_by: string | null
  has_membership_network: boolean
  has_rating_system: boolean
  product_count: number | null
  company_count: number | null
  priority: string | null
  certifier_contact: string | null
  qualifiers: string | null
  information_source: string | null
  is_certification: boolean | null
  filter_type: string | null
  notes: string | null
  data_source: string | null
  created_at: string
  updated_at: string
}

const categoryColors = {
  environmental: "bg-green-100 text-green-800 border-green-200",
  social: "bg-blue-100 text-blue-800 border-blue-200",
  ethical: "bg-purple-100 text-purple-800 border-purple-200",
  quality: "bg-orange-100 text-orange-800 border-orange-200",
  organic: "bg-emerald-100 text-emerald-800 border-emerald-200",
  fair_trade: "bg-amber-100 text-amber-800 border-amber-200",
  safety: "bg-red-100 text-red-800 border-red-200",
}

export default async function CertificationProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  try {
    const { data: certification, error } = await supabase.from("certifications").select("*").eq("id", id).single()

    if (error || !certification) {
      notFound()
    }

    const { data: certifiedProducts } = await supabase
      .from("entity_certifications")
      .select(`
        id,
        verified,
        products (
          id,
          name,
          featured_image_url,
          price,
          vendors (business_name)
        )
      `)
      .eq("certification_id", id)
      .eq("entity_type", "product")
      .eq("verified", true)
      .limit(6)

    const { data: certifiedVendors } = await supabase
      .from("entity_certifications")
      .select(`
        id,
        verified,
        vendors (
          id,
          business_name,
          logo_url,
          is_verified
        )
      `)
      .eq("certification_id", id)
      .eq("entity_type", "vendor")
      .eq("verified", true)
      .limit(6)

    const categoryColor =
      categoryColors[certification.category as keyof typeof categoryColors] ||
      "bg-gray-100 text-gray-800 border-gray-200"

    const trustScore = Math.floor(
      (certification.is_audited ? 25 : 0) +
        (certification.has_rating_system ? 20 : 0) +
        (certification.certifies_company && certification.certifies_product ? 25 : 15) +
        (certification.audit_frequency ? 20 : 10) +
        (certification.priority === "high" ? 10 : 5),
    )

    return (
      <div className="min-h-screen bg-background">
        <div className="center-content py-8">
          <div className="mb-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="relative">
                    <Image
                      src={
                        certification.logo_link ||
                        certification.icon_url ||
                        "/placeholder.svg?height=120&width=120&query=certification logo" ||
                        "/placeholder.svg"
                      }
                      alt={certification.name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-4 border-background shadow-lg"
                    />
                    <Badge className={`absolute -bottom-2 -right-2 ${categoryColor}`}>
                      <Award className="h-3 w-3 mr-1" />
                      {certification.category}
                    </Badge>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{certification.name}</h1>
                      <p className="text-muted-foreground text-lg">{certification.description}</p>
                      {certification.certifier && (
                        <p className="text-sm text-muted-foreground mt-2">
                          Certified by: <span className="font-medium">{certification.certifier}</span>
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium">Trust Score:</span>
                        <span className="text-lg font-bold text-primary">{trustScore}%</span>
                      </div>
                      <div className="flex-1 bg-muted rounded-full h-3 mb-2">
                        <div
                          className="bg-primary h-3 rounded-full transition-all duration-500"
                          style={{ width: `${trustScore}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on audit standards, verification processes, and industry recognition.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span>{certification.product_count || 0} Certified Products</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{certification.company_count || 0} Certified Companies</span>
                      </div>
                      {certification.region && (
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span>{certification.region}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      {certification.website_url && (
                        <Link href={certification.website_url} target="_blank">
                          <Button className="bg-primary">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Visit Website
                          </Button>
                        </Link>
                      )}
                      <Button variant="outline" className="bg-transparent">
                        <FileText className="h-4 w-4 mr-2" />
                        View Standards
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>What This Certification Covers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                      className={`p-4 rounded-lg border ${certification.certifies_company ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Building
                          className={`h-5 w-5 ${certification.certifies_company ? "text-green-600" : "text-gray-400"}`}
                        />
                        <span className="font-medium">Companies</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {certification.certifies_company
                          ? "Certifies business practices and operations"
                          : "Does not certify companies"}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${certification.certifies_product ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Package
                          className={`h-5 w-5 ${certification.certifies_product ? "text-green-600" : "text-gray-400"}`}
                        />
                        <span className="font-medium">Products</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {certification.certifies_product
                          ? "Certifies individual products and materials"
                          : "Does not certify products"}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-lg border ${certification.certifies_process ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Shield
                          className={`h-5 w-5 ${certification.certifies_process ? "text-green-600" : "text-gray-400"}`}
                        />
                        <span className="font-medium">Processes</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {certification.certifies_process
                          ? "Certifies manufacturing and supply chain processes"
                          : "Does not certify processes"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {certifiedProducts && certifiedProducts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Certified Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {certifiedProducts.map((item) => (
                        <Link key={item.id} href={`/products/${item.products.id}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer">
                            <div className="aspect-square relative overflow-hidden rounded-t-lg">
                              <Image
                                src={
                                  item.products.featured_image_url ||
                                  "/placeholder.svg?height=200&width=200&query=product" ||
                                  "/placeholder.svg"
                                }
                                alt={item.products.name}
                                fill
                                className="object-cover"
                              />
                              <Badge className="absolute top-2 left-2 bg-green-500 text-white">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Certified
                              </Badge>
                            </div>
                            <CardContent className="p-4">
                              <h3 className="font-medium text-sm mb-2 line-clamp-2">{item.products.name}</h3>
                              <p className="text-xs text-muted-foreground mb-1">
                                {item.products.vendors?.business_name}
                              </p>
                              <span className="font-bold">${item.products.price}</span>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    {certification.product_count && certification.product_count > 6 && (
                      <div className="mt-6 text-center">
                        <Button variant="outline" className="bg-transparent">
                          View All {certification.product_count} Certified Products
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {certifiedVendors && certifiedVendors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Certified Companies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {certifiedVendors.map((item) => (
                        <Link key={item.id} href={`/vendors/${item.vendors.id}`}>
                          <Card className="hover:shadow-md transition-shadow cursor-pointer p-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={item.vendors.logo_url || "/placeholder.svg?height=60&width=60&query=company logo"}
                                alt={item.vendors.business_name}
                                width={60}
                                height={60}
                                className="rounded-full object-cover"
                              />
                              <div className="flex-1">
                                <h3 className="font-medium">{item.vendors.business_name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className="bg-green-500 text-white text-xs">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Certified
                                  </Badge>
                                  {item.vendors.is_verified && (
                                    <Badge variant="secondary" className="text-xs">
                                      Verified
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </div>
                    {certification.company_count && certification.company_count > 6 && (
                      <div className="mt-6 text-center">
                        <Button variant="outline" className="bg-transparent">
                          View All {certification.company_count} Certified Companies
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Certification Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {certification.industry && (
                    <div>
                      <span className="text-sm font-medium">Industry:</span>
                      <p className="text-sm text-muted-foreground">{certification.industry}</p>
                    </div>
                  )}
                  {certification.certification_cost && (
                    <div>
                      <span className="text-sm font-medium">Cost:</span>
                      <p className="text-sm text-muted-foreground">{certification.certification_cost}</p>
                    </div>
                  )}
                  {certification.audit_frequency && (
                    <div>
                      <span className="text-sm font-medium">Audit Frequency:</span>
                      <p className="text-sm text-muted-foreground">{certification.audit_frequency}</p>
                    </div>
                  )}
                  {certification.audited_by && (
                    <div>
                      <span className="text-sm font-medium">Audited By:</span>
                      <p className="text-sm text-muted-foreground">{certification.audited_by}</p>
                    </div>
                  )}
                  {certification.certifier_contact && (
                    <div>
                      <span className="text-sm font-medium">Contact:</span>
                      <p className="text-sm text-muted-foreground">{certification.certifier_contact}</p>
                    </div>
                  )}
                  {certification.qualifiers && (
                    <div>
                      <span className="text-sm font-medium">Qualifiers:</span>
                      <p className="text-sm text-muted-foreground">{certification.qualifiers}</p>
                    </div>
                  )}
                  {certification.information_source && (
                    <div>
                      <span className="text-sm font-medium">Information Source:</span>
                      <p className="text-sm text-muted-foreground">{certification.information_source}</p>
                    </div>
                  )}
                  {certification.data_source && (
                    <div>
                      <span className="text-sm font-medium">Data Source:</span>
                      <p className="text-sm text-muted-foreground">{certification.data_source}</p>
                    </div>
                  )}
                  {certification.filter_type && (
                    <div>
                      <span className="text-sm font-medium">Filter Type:</span>
                      <p className="text-sm text-muted-foreground">{certification.filter_type}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {certification.notes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Additional Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{certification.notes}</p>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Why Trust This Certification?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {certification.is_audited && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Third-party audited</span>
                    </div>
                  )}
                  {certification.has_rating_system && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Scoring system available</span>
                    </div>
                  )}
                  {certification.has_membership_network && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Member network support</span>
                    </div>
                  )}
                  {certification.audit_frequency && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Regular compliance checks</span>
                    </div>
                  )}
                  {certification.is_certification && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span>Official certification program</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Industry recognized standards</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Trust Score</span>
                    <span className="font-bold text-primary">{trustScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Products</span>
                    <span className="font-medium">{certification.product_count || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Companies</span>
                    <span className="font-medium">{certification.company_count || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <Badge className={categoryColor} variant="outline">
                      {certification.category}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error loading certification profile:", error)
    notFound()
  }
}
