"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  hasDiscount: boolean
  discountPercent: number
}

export function ProductImageGallery({ images, productName, hasDiscount, discountPercent }: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  const hasMultipleImages = images.length > 1
  const displayImages = images.length > 0 ? images : ["/diverse-products-still-life.png"]

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1))
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div
        className="relative aspect-square overflow-hidden rounded-lg border bg-muted"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={displayImages[currentIndex] || "/placeholder.svg"}
          alt={`${productName} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          priority={currentIndex === 0}
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground font-semibold">
            -{discountPercent}%
          </Badge>
        )}

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentIndex + 1} / {displayImages.length}
          </div>
        )}

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md transition-opacity duration-200",
                isHovering ? "opacity-100" : "opacity-0",
              )}
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md transition-opacity duration-200",
                isHovering ? "opacity-100" : "opacity-0",
              )}
              onClick={goToNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* No Image Placeholder */}
        {images.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">No image available</p>
          </div>
        )}
      </div>

      {/* Thumbnail Grid */}
      {hasMultipleImages && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-md border-2 transition-all duration-200 hover:opacity-80",
                currentIndex === index
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-border hover:border-primary/50",
              )}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
