"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"


// Define an interface for the certification data we expect from Supabase
interface Certification {
  id: string
  name: string
  logo_link: string | null
}

export function CertificationCarousel() {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null) // State to hold error messages
  const [currentIndex, setCurrentIndex] = useState(0)

  // Effect to fetch certifications from the database
  useEffect(() => {
    const supabase = createClient()
    const fetchCertifications = async () => {
      const { data, error } = await supabase
        .from("certifications")
        .select("id, name, logo_link")
        .neq("logo_link", null)

      if (error) {
        console.error("Error fetching certifications:", error)
        setError("Could not load certifications at this time.") // Set user-facing error message
      } else if (data) {
        setCertifications(data)
      }
      setLoading(false)
    }

    fetchCertifications()
  }, []) // Dependency array should be empty to run only once on mount

  // Effect to manage the carousel's auto-scroll behavior
  useEffect(() => {
    if (certifications.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certifications.length)
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  }, [certifications.length])

  if (loading) {
    return (
      <div className="text-center p-8">
        <p>Loading Certifications...</p>
      </div>
    )
  }

  // Display an error message if the fetch failed
  if (error) {
    return (
      <div className="text-center p-8 text-red-600">
        <p>{error}</p>
      </div>
    )
  }
  
  if (certifications.length === 0) {
    return null; // Don't render the component if there are no certifications to show
  }

  // Create an infinite loop effect by duplicating the array
  const extendedCertifications = [...certifications, ...certifications, ...certifications]

  return (
    <>
      {/* The CSS for the continuous sliding animation is defined here */}
      <style jsx>{`
        @keyframes slide {
          from {
            transform: translateX(0);
          }
          to {
            /* We slide by -50% because the extendedCertifications array is twice
              the length of the original. This brings the second half (the duplicate)
              perfectly into view, creating a seamless loop.
            */
            transform: translateX(-50%);
          }
        }
        .carousel-track {
          /* Adjust the duration (e.g., 60s) to make the slide slower or faster.
            'linear' ensures constant speed. 'infinite' makes it loop forever.
          */
          animation: slide 120s linear infinite;
        }
        .carousel-container:hover .carousel-track {
          /* This is a nice UX touch: pause the animation on hover */
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative overflow-hidden carousel-container">
        <div className="flex carousel-track">
          {extendedCertifications.map((cert, index) => (
            <div key={`${cert.id}-${index}`} className="carousel-item px-4 flex-shrink-0" style={{ width: "200px" }}>
              {/* Added flex, flex-col, and h-full to make all cards equal height */}
              <div className="bg-background rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                {/* Added flex-grow to push text to the bottom and center the image */}
                <div className="relative w-full flex-grow flex items-center justify-center">
                  <Image
                    src={cert.logo_link || "/placeholder.svg"}
                    alt={`${cert.name} certification`}
                    fill
                    sizes="200px"
                    className="object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </div>
                {/* <p className="text-center text-xsm font-small text-muted-foreground mt-2">{cert.name}</p> */}
              </div>
            </div>
          ))}
        </div>

        {/* Gradient overlays for smooth infinite effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-muted/30 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-muted/30 to-transparent pointer-events-none" />
      </div>
    </>
  )
}

export default CertificationCarousel
