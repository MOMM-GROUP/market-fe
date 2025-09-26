"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"

interface Product {
  id: string
  name: string
  description: string
  price: number
  featured_image_url: string | null
  vendors: {
    business_name: string
    is_verified: boolean
  } | null
  categories: {
    name: string
  } | null
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [favoritesLoading, setFavoritesLoading] = useState(true)
  const { user, loading } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    let isMounted = true

    const getFavorites = async () => {
      if (!user) {
        if (isMounted) {
          setFavoritesLoading(false)
        }
        return
      }

      // Get the list of favorite product IDs for the current user
      const { data: favoriteIdsData, error: idsError } = await supabase
        .from("favorites")
        .select("product_id")
        .eq("user_id", user.id)

      if (idsError) {
        console.error("Error fetching favorite IDs:", idsError)
        if (isMounted) setFavoritesLoading(false)
        return
      }

      const productIds = favoriteIdsData.map((fav) => fav.product_id)

      if (productIds.length > 0) {
        // Fetch all product details for the retrieved IDs
        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select(`
            id,
            name,
            description,
            price,
            featured_image_url,
            vendors (
              business_name,
              is_verified
            ),
            categories (
              name
            )
          `)
          .in("id", productIds)

        if (productsError) {
          console.error("Error fetching favorited products:", productsError)
        } else if (isMounted) {
          setFavorites(productsData || [])
        }
      } else {
        if (isMounted) {
          setFavorites([])
        }
      }

      if (isMounted) {
        setFavoritesLoading(false)
      }
    }

    if (!loading) {
      getFavorites()
    }

    return () => {
      isMounted = false
    }
  }, [user, loading, supabase])

  const removeFavorite = async (productId: string) => {
    if (!user) return

    const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId)

    if (error) {
      console.error("Error removing favorite:", error)
    } else {
      setFavorites(favorites.filter((product) => product.id !== productId))
    }
  }

  if (loading || favoritesLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your favorites...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your favorites</h1>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
        <p className="text-muted-foreground">Products you've saved for later</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-muted-foreground mb-4">Start browsing products and add them to your favorites!</p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="p-0">
                <div className="relative aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.featured_image_url || "/placeholder.svg?height=300&width=300"}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      removeFavorite(product.id)
                    }}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {product.categories?.name && (
                  <Badge variant="secondary" className="text-xs mb-2">
                    {product.categories.name}
                  </Badge>
                )}
                {product.vendors?.is_verified && (
                  <Badge variant="default" className="text-xs bg-green-100 text-green-800 ml-2">
                    Verified
                  </Badge>
                )}
                <Link href={`/products/${product.id}`}>
                  <CardTitle className="text-lg mb-2 line-clamp-2 cursor-pointer hover:underline">
                    {product.name}
                  </CardTitle>
                </Link>
                <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                <p className="text-sm text-muted-foreground">by {product.vendors?.business_name}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">${product.price}</span>
                <Button size="sm" className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
