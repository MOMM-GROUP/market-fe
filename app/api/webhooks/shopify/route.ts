import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { ShopifyAPI } from "@/lib/platform-apis/shopify"
import { PlatformSyncService } from "@/lib/platform-apis/sync-service"
import crypto from "crypto"

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-shopify-hmac-sha256")
    const topic = request.headers.get("x-shopify-topic")
    const shopDomain = request.headers.get("x-shopify-shop-domain")

    if (!signature || !topic || !shopDomain) {
      return NextResponse.json({ error: "Missing required headers" }, { status: 400 })
    }

    const supabase = await createClient()

    // Find the platform connection for this shop
    const { data: connection, error } = await supabase
      .from("platform_connections")
      .select("*")
      .eq("platform_type", "shopify")
      .eq("platform_store_id", shopDomain.replace(".myshopify.com", ""))
      .eq("is_active", true)
      .single()

    if (error || !connection) {
      console.error("Platform connection not found for shop:", shopDomain)
      return NextResponse.json({ error: "Connection not found" }, { status: 404 })
    }

    // Verify webhook signature
    if (connection.webhook_secret) {
      const calculatedSignature = crypto.createHmac("sha256", connection.webhook_secret).update(body).digest("base64")

      if (calculatedSignature !== signature) {
        console.error("Invalid webhook signature")
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const orderData = JSON.parse(body)

    // Handle different webhook topics
    switch (topic) {
      case "orders/create":
      case "orders/updated":
      case "orders/paid":
      case "orders/cancelled":
      case "orders/fulfilled":
        await handleOrderWebhook(connection, orderData, topic)
        break

      default:
        console.log(`Unhandled webhook topic: ${topic}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Shopify webhook error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

async function handleOrderWebhook(connection: any, orderData: any, topic: string) {
  try {
    const supabase = await createClient()
    const api = new ShopifyAPI(connection.platform_store_id, connection.access_token)

    // Transform the order data
    const unifiedOrder = api.transformOrder(orderData, connection.vendor_id, connection.id)

    // Check if order already exists
    const { data: existingOrder } = await supabase
      .from("external_orders")
      .select("id")
      .eq("platform_connection_id", connection.id)
      .eq("external_order_id", unifiedOrder.external_order_id)
      .single()

    const syncService = new PlatformSyncService()

    if (existingOrder) {
      // Update existing order
      await syncService["updateExternalOrder"](existingOrder.id, unifiedOrder)
      console.log(`Updated order ${unifiedOrder.external_order_number} via webhook`)
    } else {
      // Create new order
      await syncService["createExternalOrder"](unifiedOrder)
      console.log(`Created order ${unifiedOrder.external_order_number} via webhook`)
    }

    // Log the webhook event
    await supabase.from("sync_logs").insert({
      platform_connection_id: connection.id,
      sync_type: "webhook",
      status: "success",
      orders_processed: 1,
      orders_created: existingOrder ? 0 : 1,
      orders_updated: existingOrder ? 1 : 0,
      completed_at: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error handling order webhook:", error)

    // Log the webhook error
    const supabase = await createClient()
    await supabase.from("sync_logs").insert({
      platform_connection_id: connection.id,
      sync_type: "webhook",
      status: "error",
      error_message: error instanceof Error ? error.message : "Unknown error",
      completed_at: new Date().toISOString(),
    })
  }
}
