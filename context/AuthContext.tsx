"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { UserProfile, ServerSession } from "@/lib/types"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  cartCount: number
  setCartCount: (count: number) => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 1. The Provider now accepts the server-fetched session as a prop.
export function AuthProvider({ children, serverSession }: { children: React.ReactNode, serverSession: ServerSession | null }) {
  const supabase = createClient()
  
  // 2. Initialize state directly from the server prop. No more fetching here!
  const [user, setUser] = useState(serverSession?.user ?? null)
  const [profile, setProfile] = useState(serverSession?.profile ?? null)
  const [cartCount, setCartCount] = useState(0)

  // 3. Loading is now 'false' from the start if the server provided the session.
  const [loading, setLoading] = useState(false)

  // 4. A new, separate useEffect just for fetching the cart count.
  useEffect(() => {
    // Only fetch cart if we have a user and they are not a vendor.
    if (user && profile && profile.role !== 'vendor') {
      const fetchCartCount = async () => {
        const { count } = await supabase
          .from("cart_items")
          .select("*", { count: "exact" })
          .eq("user_id", user.id);
        setCartCount(count || 0);
      };
      fetchCartCount();
    } else {
      setCartCount(0);
    }
  }, [user, profile]); // This runs whenever the user or profile changes.

  const fetchProfile = async (authUser: User) => {
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", authUser.id).single();
    if (profileData) {
        setProfile({ ...profileData, email: authUser.email! });
    } else {
        setProfile(null);
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user);
    }
  };

<<<<<<< HEAD
  // This useEffect handles real-time auth changes (login/logout) efficiently.
  useEffect(() => {
    // The listener is set up just once when the component mounts.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        // This callback has the most up-to-date session info from Supabase.
        const currentUser = session?.user ?? null;
        
        // Update the user state.
        setUser(currentUser);

        // If a user exists, fetch their profile. Otherwise, clear it.
        if (currentUser) {
          // fetchProfile is already defined in your component.
          // It will get the latest profile and set the state.
          await fetchProfile(currentUser);
        } else {
          // If the user is logged out, clear the profile and cart.
          setProfile(null);
          setCartCount(0);
        }
      }
    );

  // The cleanup function runs when the component unmounts to prevent memory leaks.
  return () => {
    subscription.unsubscribe();
  };
}, []); // <-- The empty array means this effect runs only ONCE.
=======
  // 5. This useEffect is now ONLY for listening to real-time auth changes (client-side login/logout).
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user && session.user.id !== user?.id) {
        setUser(session.user);
        await fetchProfile(session.user);
      } else if (!session?.user && user) {
        setUser(null);
        setProfile(null);
        setCartCount(0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]); // Rerun only if the user object changes.
>>>>>>> 451345e (added forgot password)

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