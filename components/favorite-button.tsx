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
  const [userProfile, setUserProfile] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { user: authUser },
          error: userError,
        } = await supabase.auth.getUser()

        setUser(authUser)

        if (authUser) {
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", authUser.id).single()
          setUserProfile(profile)

          if (profile?.role !== "vendor") {
            // Check if product is favorited
            const { data, error } = await supabase
              .from("favorites")
              .select("id")
              .eq("user_id", authUser.id)
              .eq("product_id", productId)
              .single()

            setIsFavorited(!!data)
          }
        }
      } catch (error) {
        console.error("Error in checkUser:", error)
      }
    }
    checkUser()
  }, [supabase, productId])

  if (userProfile?.role === "vendor") {
    return null
  }

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
        const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId)

        if (error) {
          console.error("Error removing favorite:", error)
        } else {
          setIsFavorited(false)
        }
      } else {
        // Add to favorites
        const { error } = await supabase.from("favorites").insert({
          user_id: user.id,
          product_id: productId,
        })

        if (error) {
          console.error("Error adding favorite:", error)
        } else {
          setIsFavorited(true)
        }
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
