import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { PlatformSyncService } from "@/lib/platform-apis/sync-service"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get vendor info
    const { data: vendor, error: vendorError } = await supabase
      .from("vendors")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (vendorError || !vendor) {
      return NextResponse.json({ error: "Vendor not found" }, { status: 404 })
    }

    const body = await request.json()
    const { platform_type } = body

    const syncService = new PlatformSyncService()
    const results = await syncService.syncVendorOrders(vendor.id, platform_type)

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Sync orders API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
