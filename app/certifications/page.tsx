"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Award, Search, Building, Package, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

        {/* Certifications Table */}
        <div className="space-y-12">
          {Object.entries(certificationsByFilterType).map(([filterType, certs]) => (
            <div key={filterType}>
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold capitalize">{filterType.replace("-", " ")} Certifications</h2>
                <Badge variant="secondary">{certs.length}</Badge>
              </div>

              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]">Logo</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Certifier</TableHead>
                      <TableHead className="text-center">Products</TableHead>
                      <TableHead className="text-center">Companies</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {certs.map((certification) => {
                      const filterTypeColor =
                        filterTypeColors[filterType as keyof typeof filterTypeColors] ||
                        "bg-gray-100 text-gray-800 border-gray-200"

                      return (
                        <TableRow key={certification.id} className="hover:bg-muted/50">
                          <TableCell>
                            <Link href={`/certifications/${certification.id}`}>
                              <div className="relative w-16 h-16 cursor-pointer hover:scale-105 transition-transform">
                                <Image
                                  src={getImageSrc(certification) || "/placeholder.svg"}
                                  alt={certification.name}
                                  fill
                                  className="rounded-lg object-contain"
                                  onError={() => handleImageError(certification.id)}
                                />
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link href={`/certifications/${certification.id}`} className="hover:underline">
                              <div>
                                <p className="font-semibold">{certification.name}</p>
                                <Badge className={`${filterTypeColor} text-xs mt-1`} variant="outline">
                                  {filterType}
                                </Badge>
                              </div>
                            </Link>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">{certification.certifier || "N/A"}</span>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Package className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{certification.product_count || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Building className="h-4 w-4 text-muted-foreground" />
                              <span className="font-medium">{certification.company_count || 0}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Link href={`/certifications/${certification.id}`}>
                              <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Card>
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
