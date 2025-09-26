"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Building2, Mail, Phone, MapPin, Calendar, Save, Globe, AlertCircle, User } from "lucide-react"
import { useRouter } from "next/navigation"

interface UserProfile {
  id: string
  email: string
  first_name: string
  last_name: string
  phone: string | null
  role: string
  created_at: string
}

interface VendorProfile {
  id: string
  user_id: string
  business_name: string
  business_description: string | null
  business_email: string | null
  business_phone: string | null
  business_address: string | null
  business_city: string | null
  business_state: string | null
  business_zip_code: string | null
  business_country: string | null
  business_url: string | null
  logo_url: string | null
  is_verified: boolean
  commission_rate: number | null
  created_at: string
  updated_at: string
}

export default function VendorProfilePage() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [vendorProfile, setVendorProfile] = useState<VendorProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const getProfiles = async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        router.push("/auth/login")
        return
      }

      setUser(authUser)

      // Get user profile
      const { data: profileData } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      if (!profileData || profileData.role !== "vendor") {
        router.push("/profile")
        return
      }

      setUserProfile({
        ...profileData,
        email: authUser.email!,
      })

      // Get vendor profile
      const { data: vendorData } = await supabase.from("vendors").select("*").eq("user_id", authUser.id).single()

      if (vendorData) {
        setVendorProfile(vendorData)
      }

      setLoading(false)
    }

    getProfiles()
  }, [supabase, router])

  const handleSaveUserProfile = async () => {
    if (!userProfile || !user) return

    setSaving(true)

    const { error } = await supabase
      .from("profiles")
      .update({
        first_name: userProfile.first_name,
        last_name: userProfile.last_name,
        phone: userProfile.phone,
      })
      .eq("id", user.id)

    if (!error) {
      console.log("User profile updated successfully")
    }

    setSaving(false)
  }

  const handleSaveVendorProfile = async () => {
    if (!vendorProfile || !user) return

    setSaving(true)

    const { error } = await supabase
      .from("vendors")
      .update({
        business_name: vendorProfile.business_name,
        business_description: vendorProfile.business_description,
        business_email: vendorProfile.business_email,
        business_phone: vendorProfile.business_phone,
        business_address: vendorProfile.business_address,
        business_city: vendorProfile.business_city,
        business_state: vendorProfile.business_state,
        business_zip_code: vendorProfile.business_zip_code,
        business_country: vendorProfile.business_country,
        business_url: vendorProfile.business_url,
        logo_url: vendorProfile.logo_url,
      })
      .eq("user_id", user.id)

    if (!error) {
      console.log("Vendor profile updated successfully")
    }

    setSaving(false)
  }

  const updateUserProfile = (field: keyof UserProfile, value: string) => {
    if (!userProfile) return
    setUserProfile({ ...userProfile, [field]: value })
  }

  const updateVendorProfile = (field: keyof VendorProfile, value: string) => {
    if (!vendorProfile) return
    setVendorProfile({ ...vendorProfile, [field]: value })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <main className="flex-1 p-8">
          <div className="text-center">Loading your profile...</div>
        </main>
      </div>
    )
  }

  if (!user || !userProfile) {
    return (
      <div className="flex min-h-screen bg-background">
        <main className="flex-1 p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You must be a verified vendor to access this page.</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Vendor Profile</h1>
            <p className="text-muted-foreground">Manage your personal and business information</p>
          </div>
          {vendorProfile && !vendorProfile.is_verified && (
            <Badge variant="outline" className="text-amber-600 border-amber-600">
              <AlertCircle className="h-3 w-3 mr-1" />
              Pending Verification
            </Badge>
          )}
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
                    {vendorProfile?.logo_url ? (
                      <img
                        src={vendorProfile.logo_url || "/placeholder.svg"}
                        alt="Business Logo"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <Building2 className="h-10 w-10 text-primary" />
                    )}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {userProfile.first_name} {userProfile.last_name}
                  </h3>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                  {vendorProfile && <p className="text-sm font-medium text-primary">{vendorProfile.business_name}</p>}
                  <Badge variant="secondary" className="mt-2 capitalize">
                    {userProfile.role}
                  </Badge>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Member since {new Date(userProfile.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{userProfile.email}</span>
                  </div>
                  {userProfile.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.phone}</span>
                    </div>
                  )}
                  {vendorProfile?.business_address && (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {vendorProfile.business_address}
                        {vendorProfile.business_city && `, ${vendorProfile.business_city}`}
                        {vendorProfile.business_state && `, ${vendorProfile.business_state}`}
                      </span>
                    </div>
                  )}
                  {vendorProfile?.business_url && (
                    <div className="flex items-center gap-2 text-sm">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <a
                        href={vendorProfile.business_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Business Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
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
                      value={userProfile.first_name || ""}
                      onChange={(e) => updateUserProfile("first_name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={userProfile.last_name || ""}
                      onChange={(e) => updateUserProfile("last_name", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={userProfile.email} disabled className="bg-muted" />
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed. Contact support if you need to update your email.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={userProfile.phone || ""}
                    onChange={(e) => updateUserProfile("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveUserProfile} disabled={saving} className="gap-2">
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Personal Info"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {vendorProfile ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="business_name">Business Name</Label>
                      <Input
                        id="business_name"
                        value={vendorProfile.business_name || ""}
                        onChange={(e) => updateVendorProfile("business_name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_description">Business Description</Label>
                      <Textarea
                        id="business_description"
                        value={vendorProfile.business_description || ""}
                        onChange={(e) => updateVendorProfile("business_description", e.target.value)}
                        placeholder="Tell customers about your business..."
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="business_email">Business Email</Label>
                        <Input
                          id="business_email"
                          type="email"
                          value={vendorProfile.business_email || ""}
                          onChange={(e) => updateVendorProfile("business_email", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business_phone">Business Phone</Label>
                        <Input
                          id="business_phone"
                          type="tel"
                          value={vendorProfile.business_phone || ""}
                          onChange={(e) => updateVendorProfile("business_phone", e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business_url">Business Website</Label>
                      <Input
                        id="business_url"
                        type="url"
                        value={vendorProfile.business_url || ""}
                        onChange={(e) => updateVendorProfile("business_url", e.target.value)}
                        placeholder="https://yourbusiness.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="logo_url">Logo URL</Label>
                      <Input
                        id="logo_url"
                        type="url"
                        value={vendorProfile.logo_url || ""}
                        onChange={(e) => updateVendorProfile("logo_url", e.target.value)}
                        placeholder="https://example.com/logo.png"
                      />
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Business Address</h3>

                      <div className="space-y-2">
                        <Label htmlFor="business_address">Street Address</Label>
                        <Input
                          id="business_address"
                          value={vendorProfile.business_address || ""}
                          onChange={(e) => updateVendorProfile("business_address", e.target.value)}
                          placeholder="123 Business Street"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="business_city">City</Label>
                          <Input
                            id="business_city"
                            value={vendorProfile.business_city || ""}
                            onChange={(e) => updateVendorProfile("business_city", e.target.value)}
                            placeholder="New York"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business_state">State</Label>
                          <Input
                            id="business_state"
                            value={vendorProfile.business_state || ""}
                            onChange={(e) => updateVendorProfile("business_state", e.target.value)}
                            placeholder="NY"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business_zip_code">ZIP Code</Label>
                          <Input
                            id="business_zip_code"
                            value={vendorProfile.business_zip_code || ""}
                            onChange={(e) => updateVendorProfile("business_zip_code", e.target.value)}
                            placeholder="10001"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="business_country">Country</Label>
                          <Input
                            id="business_country"
                            value={vendorProfile.business_country || ""}
                            onChange={(e) => updateVendorProfile("business_country", e.target.value)}
                            placeholder="United States"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={handleSaveVendorProfile} disabled={saving} className="gap-2">
                        <Save className="h-4 w-4" />
                        {saving ? "Saving..." : "Save Business Info"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Complete Your Vendor Setup</h3>
                    <p className="text-muted-foreground mb-4">
                      You need to complete your vendor registration to access business profile settings.
                    </p>
                    <Button onClick={() => router.push("/vendor/setup")}>Complete Setup</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
