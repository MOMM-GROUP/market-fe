export interface UnifiedOrder {
  platform_connection_id: string
  vendor_id: string
  external_order_id: string
  external_order_number: string
  platform_type: string
  customer_name: string
  customer_email: string
  customer_phone?: string | null
  shipping_address?: any
  billing_address?: any
  order_status: string
  payment_status: string
  fulfillment_status: string
  total_amount: number
  currency: string
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  order_date: string
  shipped_date?: string | null
  delivered_date?: string | null
  tracking_number?: string | null
  tracking_url?: string | null
  platform_order_url: string
  raw_data: any
  notes?: string
  line_items: UnifiedOrderItem[]
}

export interface UnifiedOrderItem {
  external_item_id: string
  product_name: string
  product_sku?: string | null
  variant_title?: string | null
  quantity: number
  unit_price: number
  total_price: number
  product_image_url?: string | null
  product_url?: string | null
  fulfillment_status: string
}

export interface PlatformConnection {
  id: string
  vendor_id: string
  platform_type: string
  platform_store_id: string
  store_name: string
  access_token?: string
  refresh_token?: string
  webhook_secret?: string
  is_active: boolean
  last_sync_at?: string | null
  sync_status: string
  sync_error?: string | null
}

export abstract class BasePlatformAPI {
  protected connection: PlatformConnection

  constructor(connection: PlatformConnection) {
    this.connection = connection
  }

  abstract getOrders(params?: any): Promise<any[]>
  abstract getOrder(orderId: string): Promise<any>
  abstract transformOrder(platformOrder: any, vendorId: string, connectionId: string): UnifiedOrder
  abstract updateOrderFulfillment?(orderId: string, fulfillmentData: any): Promise<any>
  abstract createFulfillment?(orderId: string, fulfillmentData: any): Promise<any>

  // Common webhook verification method
  verifyWebhook(payload: string, signature: string): boolean {
    if (!this.connection.webhook_secret) {
      return false
    }

    // Implementation would depend on the platform's webhook signature method
    // This is a placeholder for the actual verification logic
    return true
  }

  // Common error handling
  protected handleAPIError(error: any, context: string) {
    console.error(`${this.connection.platform_type} API Error in ${context}:`, error)
    throw new Error(`${this.connection.platform_type} API Error: ${error.message}`)
  }
}
