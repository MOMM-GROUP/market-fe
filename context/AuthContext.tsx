"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
  zip_code: string | null
  role: string
  created_at: string
}

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  cartCount: number
  setCartCount: (count: number) => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [cartCount, setCartCount] = useState(0)
  const supabase = createClient()

  const fetchProfile = async (authUser: User) => {
    try {
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      if (profileData) {
        const userProfile: UserProfile = {
          ...profileData,
          email: authUser.email!,
        }
        setProfile(userProfile)

        // Fetch cart count for non-vendor users
        if (profileData.role !== "vendor") {
          const { count } = await supabase.from("cart_items").select("*", { count: "exact" }).eq("user_id", authUser.id)

          setCartCount(count || 0)
        } else {
          setCartCount(0)
        }
      } else {
        setProfile(null)
        setCartCount(0)
      }
    } catch (error) {
      console.error("Error fetching profile:", error)
      setProfile(null)
      setCartCount(0)
    }
  }

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user)
    }
  }

  useEffect(() => {
    let mounted = true

    const initializeAuth = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!mounted) return

        if (authUser) {
          setUser(authUser)
          await fetchProfile(authUser)
        } else {
          setUser(null)
          setProfile(null)
          setCartCount(0)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        if (mounted) {
          setUser(null)
          setProfile(null)
          setCartCount(0)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    initializeAuth()

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return

      if (event === "SIGNED_IN" && session?.user) {
        setUser(session.user)
        await fetchProfile(session.user)
      } else if (event === "SIGNED_OUT") {
        setUser(null)
        setProfile(null)
        setCartCount(0)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const value: AuthContextType = {
    user,
    profile,
    loading,
    cartCount,
    setCartCount,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
