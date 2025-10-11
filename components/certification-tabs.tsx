"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export default function CertificationTabs() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

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

  const certificationsByFilterType =
    certifications?.reduce(
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
      <div className="text-center py-8">
        <p className="text-muted-foreground">Loading certifications...</p>
      </div>
    )
  }

  return (
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
  )
}
