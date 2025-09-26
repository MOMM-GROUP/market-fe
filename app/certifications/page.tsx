import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Award, Search, Filter, Building, Package, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Certification {
  id: string
  name: string
  description: string
  category: string
  logo_link: string | null
  icon_url: string | null
  certifier: string | null
  product_count: number | null
  company_count: number | null
  priority: string | null
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

export default async function CertificationsPage() {
  const supabase = await createClient()

  const { data: certifications, error } = await supabase
    .from("certifications")
    .select("*")
    .order("priority", { ascending: false })
    .order("product_count", { ascending: false })

  if (error) {
    console.error("Error fetching certifications:", error)
  }

  // Group certifications by category
  const certificationsByCategory =
    certifications?.reduce(
      (acc, cert) => {
        const category = cert.category || "other"
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(cert)
        return acc
      },
      {} as Record<string, Certification[]>,
    ) || {}

  return (
    <div className="min-h-screen bg-background">
      <div className="center-content py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Certifications Directory</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover trusted certifications that verify ethical, sustainable, and quality standards across products
              and companies.
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search certifications..." className="pl-10" />
                </div>
                <Button variant="outline" className="bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter by Category
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications by Category */}
        <div className="space-y-12">
          {Object.entries(certificationsByCategory).map(([category, certs]) => (
            <div key={category}>
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold capitalize">{category.replace("_", " ")} Certifications</h2>
                <Badge variant="secondary">{certs.length}</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certs.map((certification) => {
                  const categoryColor =
                    categoryColors[certification.category as keyof typeof categoryColors] ||
                    "bg-gray-100 text-gray-800 border-gray-200"

                  return (
                    <Link key={certification.id} href={`/certifications/${certification.id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                        <CardHeader className="pb-4">
                          <div className="flex items-start gap-4">
                            <Image
                              src={
                                certification.logo_link ||
                                certification.icon_url ||
                                "/placeholder.svg?height=60&width=60&query=certification"
                              }
                              alt={certification.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover border"
                            />
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-lg line-clamp-2 mb-2">{certification.name}</CardTitle>
                              <Badge className={categoryColor} variant="outline">
                                {certification.category}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{certification.description}</p>

                          {certification.certifier && (
                            <p className="text-xs text-muted-foreground mb-3">
                              Certified by: <span className="font-medium">{certification.certifier}</span>
                            </p>
                          )}

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Package className="h-4 w-4 text-muted-foreground" />
                                <span>{certification.product_count || 0}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span>{certification.company_count || 0}</span>
                              </div>
                            </div>
                            {certification.priority === "high" && (
                              <Badge variant="secondary" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Trusted
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">{certifications?.length || 0}</h3>
              <p className="text-muted-foreground">Total Certifications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {certifications?.reduce((sum, cert) => sum + (cert.product_count || 0), 0) || 0}
              </h3>
              <p className="text-muted-foreground">Certified Products</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Building className="h-12 w-12 mx-auto text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-2">
                {certifications?.reduce((sum, cert) => sum + (cert.company_count || 0), 0) || 0}
              </h3>
              <p className="text-muted-foreground">Certified Companies</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
