"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

const certifications = [
  { id: 1, name: "ISO 9001", logo: "/iso-9001-certification-logo.png" },
  { id: 2, name: "SSL Secure", logo: "/ssl-security-certificate-logo.jpg" },
  { id: 3, name: "PCI DSS", logo: "/pci-dss-compliance-logo.png" },
  { id: 4, name: "GDPR", logo: "/gdpr-compliance-logo.png" },
  { id: 5, name: "SOC 2", logo: "/soc-2-certification-logo.png" },
  { id: 6, name: "Better Business Bureau", logo: "/bbb-accredited-logo.png" },
  { id: 7, name: "TrustPilot", logo: "/placeholder-zijvs.png" },
  { id: 8, name: "Verified by Visa", logo: "/placeholder-xmnlu.png" },
]

export function CertificationCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [])

  // Create an infinite loop effect by duplicating the array
  const extendedCertifications = [...certifications, ...certifications, ...certifications]

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-1000 ease-in-out"
        style={{
          transform: `translateX(-${(currentIndex * 100) / 4}%)`,
          width: `${extendedCertifications.length * 25}%`,
        }}
      >
        {extendedCertifications.map((cert, index) => (
          <div
            key={`${cert.id}-${Math.floor(index / certifications.length)}`}
            className="flex-shrink-0 px-4"
            style={{ width: `${100 / extendedCertifications.length}%` }}
          >
            <div className="bg-background rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
              <div className="relative h-20 w-full flex items-center justify-center">
                <Image
                  src={cert.logo || "/placeholder.svg"}
                  alt={`${cert.name} certification`}
                  width={120}
                  height={80}
                  className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
              <p className="text-center text-sm font-medium text-muted-foreground mt-2">{cert.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gradient overlays for smooth infinite effect */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />
    </div>
  )
}

export default CertificationCarousel
