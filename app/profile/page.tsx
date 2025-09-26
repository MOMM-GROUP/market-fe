"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, ArrowLeft, Save, Package, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export default function ProfilePage() {
  const { user, profile, loading, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [localProfile, setLocalProfile] = useState(profile)
  const router = useRouter()
  const supabase = createClient()

  if (profile && localProfile?.id !== profile.id) {
    setLocalProfile(profile)
  }

  if (!loading && !user) {
    router.push("/auth/login")
    return null
  }

  if (!loading && profile?.role === "vendor") {
    router.push("/vendor/profile")
    return null
  }

  const handleSave = async () => {
    if (!localProfile || !user) return

    setSaving(true)

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: localProfile.first_name,
        last_name: localProfile.last_name,
        phone: localProfile.phone,
        address: localProfile.address,
        city: localProfile.city,
        state: localProfile.state,
        zip_code: localProfile.zip_code,
      })
      .eq("id", user.id)

    if (!error) {
      await refreshProfile()
      console.log("Profile updated successfully")
    }

    setSaving(false)
  }

  const updateProfile = (field: keyof typeof localProfile, value: string) => {
    if (!localProfile) return
    setLocalProfile({ ...localProfile, [field]: value })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your profile...</div>
      </div>
    )
  }

  if (!user || !localProfile) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
        <Link href="/auth/login">
          <Button>Sign In</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your account information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">
                    {localProfile.first_name} {localProfile.last_name}
                  </h3>
                  <p className="text-muted-foreground">{localProfile.email}</p>
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {localProfile.role}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Member since {new Date(localProfile.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{localProfile.email}</span>
                  </div>
                  {localProfile.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{localProfile.phone}</span>
                    </div>
                  )}
                  {localProfile.address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {localProfile.address}
                        {localProfile.city && `, ${localProfile.city}`}
                        {localProfile.state && `, ${localProfile.state}`}
                        {localProfile.zip_code && ` ${localProfile.zip_code}`}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/orders" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Package className="h-4 w-4 mr-2" />
                    View Orders
                  </Button>
                </Link>
                <Link href="/favorites" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Heart className="h-4 w-4 mr-2" />
                    My Favorites
                  </Button>
                </Link>
                <Link href="/cart" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Shopping Cart
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Profile Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={localProfile.first_name || ""}
                      onChange={(e) => updateProfile("first_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={localProfile.last_name || ""}
                      onChange={(e) => updateProfile("last_name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={localProfile.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed. Contact support if you need to update your email.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={localProfile.phone || ""}
                    onChange={(e) => updateProfile("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Address Information</h3>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      value={localProfile.address || ""}
                      onChange={(e) => updateProfile("address", e.target.value)}
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={localProfile.city || ""}
                        onChange={(e) => updateProfile("city", e.target.value)}
                        placeholder="New York"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={localProfile.state || ""}
                        onChange={(e) => updateProfile("state", e.target.value)}
                        placeholder="NY"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip_code">ZIP Code</Label>
                      <Input
                        id="zip_code"
                        value={localProfile.zip_code || ""}
                        onChange={(e) => updateProfile("zip_code", e.target.value)}
                        placeholder="10001"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6">
                  <Button onClick={handleSave} disabled={saving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
