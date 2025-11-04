"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Handshake, Recycle, Globe, FlaskConical, Building2, Star, UsersIcon } from "lucide-react"

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

interface CertificationTabsProps {
  certifications: Certification[]
}

const categoryMetadata: Record<
  string,
  { emoji: string; title: string; color: string; icon: any; description: string }
> = {
  organic: {
    emoji: "🌱",
    title: "Organic",
    color: "text-green-600",
    icon: Leaf,
    description: "Certifications that verify products are made with organic materials and natural processes",
  },
  "fair-labor": {
    emoji: "🤝",
    title: "Fair Labor",
    color: "text-blue-600",
    icon: Handshake,
    description: "Certifications that ensure fair wages, safe working conditions, and ethical labor practices",
  },
  circular: {
    emoji: "♻️",
    title: "Circular",
    color: "text-purple-600",
    icon: Recycle,
    description: "Certifications that promote recycling, reuse, and circular economy principles",
  },
  climate: {
    emoji: "🌍",
    title: "Climate",
    color: "text-orange-600",
    icon: Globe,
    description: "Certifications focused on carbon neutrality, energy efficiency, and environmental protection",
  },
  health: {
    emoji: "🧪",
    title: "Health",
    color: "text-red-600",
    icon: FlaskConical,
    description: "Certifications that ensure products are free from harmful chemicals and safe for human health",
  },
  business: {
    emoji: "🏢",
    title: "Business",
    color: "text-blue-700",
    icon: Building2,
    description: "Certifications that evaluate overall business practices, governance, and social responsibility",
  },
  quality: {
    emoji: "⭐",
    title: "Quality",
    color: "text-purple-700",
    icon: Star,
    description:
      "Certifications that ensure high-quality manufacturing processes, safety standards, and product excellence",
  },
  diversity: {
    emoji: "🌈",
    title: "Diversity",
    color: "text-pink-600",
    icon: UsersIcon,
    description: "Certifications that recognize businesses owned by underrepresented groups and promote diversity",
  },
}

export default function CertificationTabs({ certifications }: CertificationTabsProps) {
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

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

  if (!certifications || certifications.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No certifications available</p>
      </div>
    )
  }

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="w-full justify-center overflow-x-auto flex-wrap h-auto bg-muted/50 p-2 rounded-2xl">
        {filterTypes.map((filterType) => {
          const metadata = categoryMetadata[filterType] || { emoji: "📋", title: filterType, color: "text-gray-600" }
          return (
            <TabsTrigger
              key={filterType}
              value={filterType}
              className="capitalize data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-3 rounded-xl m-1"
            >
              <span className="mr-2">{metadata.emoji}</span>
              {metadata.title}
              <Badge variant="secondary" className="ml-2">
                {certificationsByFilterType[filterType].length}
              </Badge>
            </TabsTrigger>
          )
        })}
      </TabsList>

      {filterTypes.map((filterType) => {
        const certs = certificationsByFilterType[filterType]
        const metadata = categoryMetadata[filterType] || {
          title: filterType,
          color: "text-gray-600",
          description: "Certifications in this category",
        }

        return (
          <TabsContent key={filterType} value={filterType} className="mt-6">
            <div className="text-center mb-8">
              <h3 className={`text-2xl font-bold mb-2 ${metadata.color}`}>{metadata.title} Certifications</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">{metadata.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {certs.map((certification) => (
                <Link
                  key={certification.id}
                  href={`/certifications/${certification.id}`}
                  className="group flex flex-col items-center p-4 rounded-xl border-2 border-transparent hover:border-primary/20 hover:bg-muted/50 transition-all duration-200"
                >
                  <div className="relative w-full aspect-square mb-3 group-hover:scale-110 transition-transform duration-200">
                    <Image
                      src={getImageSrc(certification) || "/placeholder.svg"}
                      alt={certification.name}
                      fill
                      className="object-contain"
                      onError={() => handleImageError(certification.id)}
                    />
                  </div>
                  <p className="text-xs text-center text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 font-medium">
                    {certification.name}
                  </p>
                  {certification.product_count && certification.product_count > 0 && (
                    <Badge variant="outline" className="mt-2 text-xs">
                      {certification.product_count} products
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
