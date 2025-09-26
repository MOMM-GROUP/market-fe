"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, ShoppingCart, Heart, LogOut, Package, Settings, User, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface UserProfile {
  id: string
  email: string
  profiles: {
    first_name: string
    last_name: string
    role: string
  }
}

export function Navbar() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    const supabase = createClient()

    const checkAuth = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!mounted) return

        if (authUser) {
          // Try to get profile, but don't fail if it doesn't exist
          const { data: profile } = await supabase
            .from("profiles")
            .select("first_name, last_name, role")
            .eq("id", authUser.id)
            .single()

          if (!mounted) return

          const userProfile = {
            id: authUser.id,
            email: authUser.email!,
            profiles: profile || {
              first_name: "User",
              last_name: "",
              role: "customer",
            },
          }
          setUser(userProfile)

          // Get cart count
          const { count } = await supabase.from("cart_items").select("*", { count: "exact" }).eq("user_id", authUser.id)

          if (mounted) {
            setCartCount(count || 0)
          }
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Auth check error:", error)
        if (mounted) {
          setUser(null)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    checkAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        checkAuth()
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setCartCount(0)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setCartCount(0)
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">MOMM Market</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="animate-pulse bg-muted rounded h-9 w-20"></div>
            <div className="animate-pulse bg-muted rounded h-9 w-24"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">MOMM Market</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium"></nav>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search products..."
              className="pl-10 pr-10 w-full bg-muted/50 border-0 focus:bg-background focus:ring-2 focus:ring-primary/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchQuery("")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          {user && (
            <Link href="/favorites">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {user ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">Hi {user.profiles.first_name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/favorites">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/cart">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Cart
                  </Link>
                </DropdownMenuItem>
                {user.profiles.role === "vendor" && (
                  <DropdownMenuItem asChild>
                    <Link href="/vendor">
                      <Settings className="mr-2 h-4 w-4" />
                      Vendor Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                {user.profiles.role === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <Settings className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-primary hover:bg-primary/90">Join Now</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
