import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Lock, Sparkles, Users, ShoppingBag } from "lucide-react"

export default async function EarlyAccessPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, check if they already have access
  if (user?.email) {
    // Bypass for contributors
    if (user.email.includes("contributor-")) {
      redirect("/products")
    }

    // Check waitlist
    const { data: accessRecord } = await supabase
      .from("early_access_waitlist")
      .select("access_granted")
      .eq("email", user.email)
      .single()

    if (accessRecord?.access_granted) {
      redirect("/products")
    }
  }

  async function handleSubmit(formData: FormData) {
    "use server"

    const supabase = await createClient()
    const email = formData.get("email") as string
    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const interestedIn: string[] = []

    if (formData.get("shopping")) interestedIn.push("shopping")
    if (formData.get("selling")) interestedIn.push("selling")
    if (formData.get("building")) interestedIn.push("building")

    // Insert into waitlist
    const { error } = await supabase.from("early_access_waitlist").insert({
      email,
      first_name: firstName,
      last_name: lastName,
      interested_in: interestedIn,
      access_granted: false,
    })

    if (error) {
      console.error("[v0] Error adding to waitlist:", error)
    }

    redirect("/early-access/thank-you")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-teal-600" />
          </div>
          <CardTitle className="text-3xl font-bold">Join the Movement</CardTitle>
          <CardDescription className="text-lg">
            MOMM is launching soon. Be among the first to experience economic justice through commerce.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold">Shop Ethically</h3>
              <p className="text-sm text-muted-foreground">Verified ethical products</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold">Build Together</h3>
              <p className="text-sm text-muted-foreground">Earn profit share</p>
            </div>
            <div className="text-center space-y-2">
              <div className="mx-auto w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="font-semibold">Early Access</h3>
              <p className="text-sm text-muted-foreground">Be first to join</p>
            </div>
          </div>

          {/* Signup Form */}
          <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>

            <div className="space-y-3">
              <Label>I'm interested in:</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="shopping" name="shopping" />
                  <label
                    htmlFor="shopping"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Shopping for ethical products
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="selling" name="selling" />
                  <label
                    htmlFor="selling"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Selling my products as a vendor
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="building" name="building" />
                  <label
                    htmlFor="building"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Contributing to build the platform
                  </label>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" size="lg">
              Join the Waitlist
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">We'll notify you when we launch. No spam, ever.</p>
        </CardContent>
      </Card>
    </div>
  )
}
