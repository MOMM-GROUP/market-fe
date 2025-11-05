import { createClient } from "@/lib/supabase/server"

export async function checkEarlyAccess(): Promise<{
  hasAccess: boolean
  email?: string
  isContributor?: boolean
}> {
  const supabase = await createClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) {
    return { hasAccess: false }
  }

  const email = user.email

  if (email.includes("contributor-")) {
    return { hasAccess: true, email, isContributor: true }
  }

  // Check if user has early access
  const { data: accessRecord } = await supabase
    .from("early_access_waitlist")
    .select("access_granted")
    .eq("email", email)
    .single()

  if (accessRecord?.access_granted) {
    return { hasAccess: true, email, isContributor: false }
  }

  return { hasAccess: false, email, isContributor: false }
}
