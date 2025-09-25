"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface AddToCartButtonProps {
  productId: string
  className?: string
  size?: "sm" | "lg" | "default"
  variant?: "default" | "outline" | "secondary"
}

export function AddToCartButton({
  productId,
  className = "",
  size = "default",
  variant = "default",
}: AddToCartButtonProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()
      setUser(authUser)
    }
    checkUser()
  }, [supabase])

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      router.push("/auth/login")
      return
    }

    setIsAddingToCart(true)

    try {
      // Check if item already exists in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single()

      if (existingItem) {
        // Update quantity if item exists
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)
      } else {
        // Add new item to cart
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: productId,
          quantity: 1,
        })
      }

      // Refresh the page to update cart count in navbar
      window.location.reload()
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  return (
    <Button className={className} size={size} variant={variant} onClick={handleAddToCart} disabled={isAddingToCart}>
      <ShoppingCart className="h-4 w-4 mr-2" />
      {isAddingToCart ? "Adding..." : "Add to Cart"}
    </Button>
  )
}
