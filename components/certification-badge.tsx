import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { CheckCircle, ExternalLink } from "lucide-react"

interface CertificationBadgeProps {
  name: string
  description?: string
  category: string
  websiteUrl?: string
  verified?: boolean
  certificationData?: {
    score?: number
    certification_date?: string
    expiration_date?: string
    [key: string]: any
  }
  size?: "sm" | "md" | "lg"
  showTooltip?: boolean
}

const categoryColors = {
  environmental: "bg-green-100 text-green-800 border-green-200",
  social: "bg-blue-100 text-blue-800 border-blue-200",
  ethical: "bg-purple-100 text-purple-800 border-purple-200",
  quality: "bg-orange-100 text-orange-800 border-orange-200",
}

export function CertificationBadge({
  name,
  description,
  category,
  websiteUrl,
  verified = false,
  certificationData,
  size = "md",
  showTooltip = true,
}: CertificationBadgeProps) {
  const colorClass =
    categoryColors[category as keyof typeof categoryColors] || "bg-gray-100 text-gray-800 border-gray-200"

  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  }

  const badge = (
    <Badge variant="outline" className={`${colorClass} ${sizeClasses[size]} flex items-center gap-1 font-medium`}>
      {verified && <CheckCircle className="w-3 h-3" />}
      {name}
      {websiteUrl && <ExternalLink className="w-3 h-3" />}
    </Badge>
  )

  if (!showTooltip || !description) {
    return badge
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold">{name}</p>
            <p className="text-sm">{description}</p>
            {certificationData?.score && <p className="text-sm">Score: {certificationData.score}/100</p>}
            {certificationData?.expiration_date && (
              <p className="text-xs text-muted-foreground">
                Expires: {new Date(certificationData.expiration_date).toLocaleDateString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
