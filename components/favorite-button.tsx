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
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)

      if (authUser) {
        // Check if product is favorited
        const { data } = await supabase
          .from("favorites")
          .select("id")
          .eq("user_id", authUser.id)
          .eq("product_id", productId)
          .single()

        setIsFavorited(!!data)
      }
    }
    checkUser()
  }, [supabase, productId])

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsTogglingFavorite(true)

    try {
      if (isFavorited) {
        // Remove from favorites
        await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId)

        setIsFavorited(false)
      } else {
        // Add to favorites
        await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: productId,
        })

        setIsFavorited(true)
      }
    } catch (error) {
      console.error("Error toggling favorite:", error)
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
