"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Filter } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"

interface Certification {
  id: string
  name: string
  description: string
  category: string
}

interface CertificationFilterProps {
  selectedCertifications: string[]
  onCertificationChange: (certificationIds: string[]) => void
  entityType?: "vendor" | "product" | "ingredient"
}

export function CertificationFilter({
  selectedCertifications,
  onCertificationChange,
  entityType = "vendor",
}: CertificationFilterProps) {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchCertifications() {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      )

      const { data, error } = await supabase
        .from("certifications")
        .select("id, name, description, category")
        .order("category", { ascending: true })
        .order("name", { ascending: true })

      if (error) {
        console.error("Error fetching certifications:", error)
      } else {
        setCertifications(data || [])
      }
      setLoading(false)
    }

    fetchCertifications()
  }, [])

  const handleCertificationToggle = (certificationId: string, checked: boolean) => {
    if (checked) {
      onCertificationChange([...selectedCertifications, certificationId])
    } else {
      onCertificationChange(selectedCertifications.filter((id) => id !== certificationId))
    }
  }

  const clearAll = () => {
    onCertificationChange([])
  }

  const groupedCertifications = certifications.reduce(
    (acc, cert) => {
      if (!acc[cert.category]) {
        acc[cert.category] = []
      }
      acc[cert.category].push(cert)
      return acc
    },
    {} as Record<string, Certification[]>,
  )

  if (loading) {
    return <div className="animate-pulse h-10 bg-gray-200 rounded"></div>
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button variant="outline" className="w-full justify-between bg-transparent">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Certifications
            {selectedCertifications.length > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {selectedCertifications.length}
              </span>
            )}
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </CollapsibleTrigger>

      <CollapsibleContent className="mt-4 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-medium">Filter by Certifications</h4>
          {selectedCertifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>

        <div className="space-y-4 max-h-64 overflow-y-auto">
          {Object.entries(groupedCertifications).map(([category, certs]) => (
            <div key={category} className="space-y-2">
              <h5 className="font-medium text-sm capitalize text-muted-foreground">{category}</h5>
              <div className="space-y-2 pl-2">
                {certs.map((cert) => (
                  <div key={cert.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cert.id}
                      checked={selectedCertifications.includes(cert.id)}
                      onCheckedChange={(checked) => handleCertificationToggle(cert.id, checked as boolean)}
                    />
                    <Label htmlFor={cert.id} className="text-sm cursor-pointer flex-1" title={cert.description}>
                      {cert.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
