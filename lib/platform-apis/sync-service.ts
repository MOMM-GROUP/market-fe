import { createClient } from "@/lib/supabase/server"
import { ShopifyAPI } from "./shopify"
import type { BasePlatformAPI, UnifiedOrder, PlatformConnection } from "./base"

export class PlatformSyncService {
  private supabase = createClient()

  async syncVendorOrders(vendorId: string, platformType?: string) {
    try {
      // Get all active connections for the vendor
      const { data: connections, error } = await this.supabase
        .from("platform_connections")
        .select("*")
        .eq("vendor_id", vendorId)
        .eq("is_active", true)
        .eq(platformType ? "platform_type" : "platform_type", platformType || "platform_type")

      if (error) throw error

      const syncResults = []

      for (const connection of connections || []) {
        const result = await this.syncConnection(connection)
        syncResults.push(result)
      }

      return syncResults
    } catch (error) {
      console.error("Error syncing vendor orders:", error)
      throw error
    }
  }

  async syncConnection(connection: PlatformConnection) {
    const logId = await this.createSyncLog(connection.id, "incremental")

    try {
      // Update connection sync status
      await this.supabase.from("platform_connections").update({ sync_status: "syncing" }).eq("id", connection.id)

      const api = this.createPlatformAPI(connection)

      // Get orders since last sync
      const lastSync = connection.last_sync_at
        ? new Date(connection.last_sync_at)
        : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 days ago

      const orders = await api.getOrders({
        updated_at_min: lastSync.toISOString(),
        limit: 250,
      })

      let ordersProcessed = 0
      let ordersCreated = 0
      let ordersUpdated = 0

      for (const platformOrder of orders) {
        const unifiedOrder = api.transformOrder(platformOrder, connection.vendor_id, connection.id)

        // Check if order already exists
        const { data: existingOrder } = await this.supabase
          .from("external_orders")
          .select("id")
          .eq("platform_connection_id", connection.id)
          .eq("external_order_id", unifiedOrder.external_order_id)
          .single()

        if (existingOrder) {
          // Update existing order
          await this.updateExternalOrder(existingOrder.id, unifiedOrder)
          ordersUpdated++
        } else {
          // Create new order
          await this.createExternalOrder(unifiedOrder)
          ordersCreated++
        }

        ordersProcessed++
      }

      // Update connection with successful sync
      await this.supabase
        .from("platform_connections")
        .update({
          sync_status: "success",
          last_sync_at: new Date().toISOString(),
          sync_error: null,
        })
        .eq("id", connection.id)

      // Complete sync log
      await this.completeSyncLog(logId, "success", ordersProcessed, ordersCreated, ordersUpdated)

      return {
        success: true,
        ordersProcessed,
        ordersCreated,
        ordersUpdated,
      }
    } catch (error) {
      console.error(`Error syncing connection ${connection.id}:`, error)

      // Update connection with error status
      await this.supabase
        .from("platform_connections")
        .update({
          sync_status: "error",
          sync_error: error instanceof Error ? error.message : "Unknown error",
        })
        .eq("id", connection.id)

      // Complete sync log with error
      await this.completeSyncLog(logId, "error", 0, 0, 0, error instanceof Error ? error.message : "Unknown error")

      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  private createPlatformAPI(connection: PlatformConnection): BasePlatformAPI {
    switch (connection.platform_type) {
      case "shopify":
        if (!connection.access_token) {
          throw new Error("Shopify access token not found")
        }
        return new ShopifyAPI(connection.platform_store_id, connection.access_token)

      case "etsy":
        // TODO: Implement Etsy API
        throw new Error("Etsy API not yet implemented")

      case "amazon":
        // TODO: Implement Amazon API
        throw new Error("Amazon API not yet implemented")

      case "woocommerce":
        // TODO: Implement WooCommerce API
        throw new Error("WooCommerce API not yet implemented")

      default:
        throw new Error(`Unsupported platform type: ${connection.platform_type}`)
    }
  }

  private async createExternalOrder(order: UnifiedOrder) {
    const { data: createdOrder, error } = await this.supabase
      .from("external_orders")
      .insert({
        platform_connection_id: order.platform_connection_id,
        vendor_id: order.vendor_id,
        external_order_id: order.external_order_id,
        external_order_number: order.external_order_number,
        platform_type: order.platform_type,
        customer_name: order.customer_name,
        customer_email: order.customer_email,
        customer_phone: order.customer_phone,
        shipping_address: order.shipping_address,
        billing_address: order.billing_address,
        order_status: order.order_status,
        payment_status: order.payment_status,
        fulfillment_status: order.fulfillment_status,
        total_amount: order.total_amount,
        currency: order.currency,
        tax_amount: order.tax_amount,
        shipping_amount: order.shipping_amount,
        discount_amount: order.discount_amount,
        order_date: order.order_date,
        shipped_date: order.shipped_date,
        delivered_date: order.delivered_date,
        tracking_number: order.tracking_number,
        tracking_url: order.tracking_url,
        platform_order_url: order.platform_order_url,
        raw_data: order.raw_data,
        notes: order.notes,
      })
      .select("id")
      .single()

    if (error) throw error

    // Create order items
    if (order.line_items.length > 0) {
      const orderItems = order.line_items.map((item) => ({
        external_order_id: createdOrder.id,
        external_item_id: item.external_item_id,
        product_name: item.product_name,
        product_sku: item.product_sku,
        variant_title: item.variant_title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        product_image_url: item.product_image_url,
        product_url: item.product_url,
        fulfillment_status: item.fulfillment_status,
      }))

      const { error: itemsError } = await this.supabase.from("external_order_items").insert(orderItems)

      if (itemsError) throw itemsError
    }

    return createdOrder
  }

  private async updateExternalOrder(orderId: string, order: UnifiedOrder) {
    const { error } = await this.supabase
      .from("external_orders")
      .update({
        order_status: order.order_status,
        payment_status: order.payment_status,
        fulfillment_status: order.fulfillment_status,
        shipped_date: order.shipped_date,
        delivered_date: order.delivered_date,
        tracking_number: order.tracking_number,
        tracking_url: order.tracking_url,
        raw_data: order.raw_data,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId)

    if (error) throw error

    // Update order items if needed
    // This is a simplified approach - in production, you'd want to handle item updates more carefully
    const { error: deleteError } = await this.supabase
      .from("external_order_items")
      .delete()
      .eq("external_order_id", orderId)

    if (deleteError) throw deleteError

    if (order.line_items.length > 0) {
      const orderItems = order.line_items.map((item) => ({
        external_order_id: orderId,
        external_item_id: item.external_item_id,
        product_name: item.product_name,
        product_sku: item.product_sku,
        variant_title: item.variant_title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: item.total_price,
        product_image_url: item.product_image_url,
        product_url: item.product_url,
        fulfillment_status: item.fulfillment_status,
      }))

      const { error: itemsError } = await this.supabase.from("external_order_items").insert(orderItems)

      if (itemsError) throw itemsError
    }
  }

  private async createSyncLog(connectionId: string, syncType: string) {
    const { data, error } = await this.supabase
      .from("sync_logs")
      .insert({
        platform_connection_id: connectionId,
        sync_type: syncType,
        status: "started",
      })
      .select("id")
      .single()

    if (error) throw error
    return data.id
  }

  private async completeSyncLog(
    logId: string,
    status: string,
    ordersProcessed: number,
    ordersCreated: number,
    ordersUpdated: number,
    errorMessage?: string,
  ) {
    const { error } = await this.supabase
      .from("sync_logs")
      .update({
        status,
        orders_processed: ordersProcessed,
        orders_created: ordersCreated,
        orders_updated: ordersUpdated,
        error_message: errorMessage,
        completed_at: new Date().toISOString(),
      })
      .eq("id", logId)

    if (error) throw error
  }
}
