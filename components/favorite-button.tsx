"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

interface FavoriteButtonProps {
  productId: string
  className?: string
  size?: "sm" | "lg" | "default" | "icon"
  variant?: "default" | "outline" | "secondary"
}

export function FavoriteButton({ productId, className = "", size = "icon", variant = "outline" }: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const [isTogglingFavorite, setIsTogglingFavorite] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      console.log("[v0] FavoriteButton: Checking user authentication for product:", productId)

      try {
        const {
          data: { user: authUser },
          error: userError,
        } = await supabase.auth.getUser()

        console.log("[v0] FavoriteButton: User check result:", { user: authUser?.id, error: userError })
        setUser(authUser)

        if (authUser) {
          console.log("[v0] FavoriteButton: Checking if product is favorited")
          // Check if product is favorited
          const { data, error } = await supabase
            .from("favorites")
            .select("id")
            .eq("user_id", authUser.id)
            .eq("product_id", productId)
            .single()

          console.log("[v0] FavoriteButton: Favorite check result:", { data, error })
          setIsFavorited(!!data)
        }
      } catch (error) {
        console.error("[v0] FavoriteButton: Error in checkUser:", error)
      }
    }
    checkUser()
  }, [supabase, productId])

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("[v0] FavoriteButton: Toggle favorite clicked", { user: user?.id, productId, isFavorited })

    if (!user) {
      console.log("[v0] FavoriteButton: No user, redirecting to login")
      router.push("/auth/login")
      return
    }

    setIsTogglingFavorite(true)

    try {
      if (isFavorited) {
        console.log("[v0] FavoriteButton: Removing from favorites")
        // Remove from favorites
        const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId)

        if (error) {
          console.error("[v0] FavoriteButton: Error removing favorite:", error)
        } else {
          console.log("[v0] FavoriteButton: Successfully removed from favorites")
          setIsFavorited(false)
        }
      } else {
        console.log("[v0] FavoriteButton: Adding to favorites")
        // Add to favorites
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: productId,
        })

        if (error) {
          console.error("[v0] FavoriteButton: Error adding favorite:", error)
        } else {
          console.log("[v0] FavoriteButton: Successfully added to favorites")
          setIsFavorited(true)
        }
      }
    } catch (error) {
      console.error("[v0] FavoriteButton: Error toggling favorite:", error)
    } finally {
      setIsTogglingFavorite(false)
    }
  }

  return (
    <Button
      className={className}
      size={size}
      variant={variant}
      onClick={handleToggleFavorite}
      disabled={isTogglingFavorite}
    >
      <Heart className={`h-4 w-4 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
    </Button>
  )
}
