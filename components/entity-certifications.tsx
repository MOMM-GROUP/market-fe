"use client"

import { useState, useEffect } from "react"
import { CertificationBadge } from "./certification-badge"
import { createBrowserClient } from "@supabase/ssr"

interface EntityCertification {
  id: string
  certification_id: string
  certification_data: any
  verified: boolean
  certifications: {
    id: string
    name: string
    description: string
    category: string
    website_url: string
  }
}

interface EntityCertificationsProps {
  entityType: "vendor" | "product" | "ingredient"
  entityId: string
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
  maxDisplay?: number
}

export function EntityCertifications({
  entityType,
  entityId,
  size = "md",
  showTooltip = true,
  maxDisplay,
}: EntityCertificationsProps) {
  const [certifications, setCertifications] = useState<EntityCertification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEntityCertifications() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { data, error } = await supabase
        .from("entity_certifications")
        .select(`
          id,
          certification_id,
          certification_data,
          verified,
          certifications (
            id,
            name,
            description,
            category,
            website_url
          )
        `)
        .eq("entity_type", entityType)
        .eq("entity_id", entityId)
        .eq("verified", true)

      if (error) {
        console.error("Error fetching entity certifications:", error)
      } else {
        setCertifications(data || [])
      }
      setLoading(false)
    }

    fetchEntityCertifications()
  }, [entityType, entityId])

  if (loading) {
    return (
      <div className="flex gap-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-6 w-20 bg-gray-200 rounded"></div>
        ))}
      </div>
    )
  }

  if (certifications.length === 0) {
    return null
  }

  const displayCertifications = maxDisplay ? certifications.slice(0, maxDisplay) : certifications

  const remainingCount = maxDisplay && certifications.length > maxDisplay ? certifications.length - maxDisplay : 0

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {displayCertifications.map((entityCert) => (
        <CertificationBadge
          key={entityCert.id}
          name={entityCert.certifications.name}
          description={entityCert.certifications.description}
          category={entityCert.certifications.category}
          websiteUrl={entityCert.certifications.website_url}
          verified={entityCert.verified}
          certificationData={entityCert.certification_data}
          size={size}
          showTooltip={showTooltip}
        />
      ))}
      {remainingCount > 0 && <span className="text-sm text-muted-foreground">+{remainingCount} more</span>}
    </div>
  )
}
