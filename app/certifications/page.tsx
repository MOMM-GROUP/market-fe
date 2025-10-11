"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, Search, Building, Package } from "lucide-react"
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
  filter_type: string | null
}

const filterTypeColors = {
  organic: "bg-green-100 text-green-800 border-green-200",
  "fair-trade": "bg-blue-100 text-blue-800 border-blue-200",
  sustainability: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "animal-welfare": "bg-purple-100 text-purple-800 border-purple-200",
  safety: "bg-red-100 text-red-800 border-red-200",
  quality: "bg-orange-100 text-orange-800 border-orange-200",
  environmental: "bg-teal-100 text-teal-800 border-teal-200",
  social: "bg-indigo-100 text-indigo-800 border-indigo-200",
}

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function fetchCertifications() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("certifications")
        .select("*")
        .order("priority", { ascending: false })
        .order("product_count", { ascending: false })

      if (error) {
        console.error("Error fetching certifications:", error)
      } else {
        setCertifications(data || [])
      }
      setLoading(false)
    }

    fetchCertifications()
  }, [])

  const filteredCertifications = certifications.filter(
    (cert) =>
      cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.certifier?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.filter_type?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const certificationsByFilterType =
    filteredCertifications?.reduce(
      (acc, cert) => {
        const filterType = cert.filter_type || "other"
        if (!acc[filterType]) {
          acc[filterType] = []
        }
        acc[filterType].push(cert)
        return acc
      },
      {} as Record<string, Certification[]>,
    ) || {}

  const filterTypes = Object.keys(certificationsByFilterType).sort()
  const defaultTab = filterTypes[0] || "organic"

  const handleImageError = (certId: string) => {
    setImageErrors((prev) => ({ ...prev, [certId]: true }))
  }

  const getImageSrc = (cert: Certification) => {
    if (imageErrors[cert.id]) {
      return "/certification-document.png"
    }
    return cert.logo_link || cert.icon_url || "/certification-document.png"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Award className="h-12 w-12 mx-auto text-primary mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading certifications...</p>
        </div>
      </div>
    )
  }

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

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search certifications..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certifications Grid */}
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto">
            {filterTypes.map((filterType) => (
              <TabsTrigger key={filterType} value={filterType} className="capitalize">
                {filterType.replace("-", " ")}
                <Badge variant="secondary" className="ml-2">
                  {certificationsByFilterType[filterType].length}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {filterTypes.map((filterType) => {
            const certs = certificationsByFilterType[filterType]

            return (
              <TabsContent key={filterType} value={filterType} className="mt-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-8">
                  {certs.map((certification) => (
                    <Link
                      key={certification.id}
                      href={`/certifications/${certification.id}`}
                      className="group flex flex-col items-center"
                    >
                      <div className="relative w-full aspect-square hover:scale-110 transition-transform duration-200">
                        <Image
                          src={getImageSrc(certification) || "/placeholder.svg"}
                          alt={certification.name}
                          fill
                          className="object-contain"
                          onError={() => handleImageError(certification.id)}
                        />
                      </div>
                      <p className="text-xs text-center mt-2 text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                        {certification.name}
                      </p>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>

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
