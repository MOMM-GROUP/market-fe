interface ShopifyOrder {
  id: number
  order_number: string
  name: string
  email: string
  phone: string | null
  created_at: string
  updated_at: string
  cancelled_at: string | null
  closed_at: string | null
  processed_at: string
  financial_status: string
  fulfillment_status: string | null
  total_price: string
  subtotal_price: string
  total_tax: string
  total_discounts: string
  currency: string
  shipping_address: any
  billing_address: any
  line_items: Array<{
    id: number
    variant_id: number
    title: string
    quantity: number
    sku: string
    variant_title: string | null
    vendor: string
    fulfillment_service: string
    product_id: number
    requires_shipping: boolean
    taxable: boolean
    gift_card: boolean
    name: string
    variant_inventory_management: string
    properties: any[]
    product_exists: boolean
    fulfillable_quantity: number
    grams: number
    price: string
    total_discount: string
    fulfillment_status: string | null
    price_set: any
    total_discount_set: any
    discount_allocations: any[]
    duties: any[]
    admin_graphql_api_id: string
    tax_lines: any[]
  }>
  shipping_lines: Array<{
    id: number
    carrier_identifier: string | null
    code: string | null
    delivery_category: string | null
    discounted_price: string
    discounted_price_set: any
    phone: string | null
    price: string
    price_set: any
    requested_fulfillment_service_id: string | null
    source: string
    title: string
    tax_lines: any[]
    carrier_service: any
    discount_allocations: any[]
  }>
  fulfillments: Array<{
    id: number
    order_id: number
    status: string
    created_at: string
    service: string
    updated_at: string
    tracking_company: string | null
    shipment_status: string | null
    location_id: number
    line_items: any[]
    tracking_number: string | null
    tracking_numbers: string[]
    tracking_url: string | null
    tracking_urls: string[]
    receipt: any
    name: string
  }>
}

export class ShopifyAPI {
  private shopDomain: string
  private accessToken: string

  constructor(shopDomain: string, accessToken: string) {
    this.shopDomain = shopDomain
    this.accessToken = accessToken
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `https://${this.shopDomain}.myshopify.com/admin/api/2023-10${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "X-Shopify-Access-Token": this.accessToken,
        "Content-Type": "application/json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`Shopify API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async getOrders(
    params: {
      limit?: number
      since_id?: string
      created_at_min?: string
      created_at_max?: string
      updated_at_min?: string
      updated_at_max?: string
      status?: "open" | "closed" | "cancelled" | "any"
      financial_status?:
        | "authorized"
        | "pending"
        | "paid"
        | "partially_paid"
        | "refunded"
        | "voided"
        | "partially_refunded"
        | "any"
      fulfillment_status?: "shipped" | "partial" | "unshipped" | "any"
    } = {},
  ) {
    const queryParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })

    const data = await this.makeRequest(`/orders.json?${queryParams}`)
    return data.orders as ShopifyOrder[]
  }

  async getOrder(orderId: string) {
    const data = await this.makeRequest(`/orders/${orderId}.json`)
    return data.order as ShopifyOrder
  }

  async updateOrderFulfillment(
    orderId: string,
    fulfillmentId: string,
    trackingNumber?: string,
    trackingCompany?: string,
  ) {
    const updateData: any = {}

    if (trackingNumber) {
      updateData.tracking_number = trackingNumber
    }

    if (trackingCompany) {
      updateData.tracking_company = trackingCompany
    }

    const data = await this.makeRequest(`/orders/${orderId}/fulfillments/${fulfillmentId}.json`, {
      method: "PUT",
      body: JSON.stringify({
        fulfillment: updateData,
      }),
    })

    return data.fulfillment
  }

  async createFulfillment(
    orderId: string,
    lineItems: Array<{ id: number; quantity: number }>,
    trackingNumber?: string,
    trackingCompany?: string,
  ) {
    const fulfillmentData: any = {
      line_items: lineItems,
      notify_customer: true,
    }

    if (trackingNumber) {
      fulfillmentData.tracking_number = trackingNumber
    }

    if (trackingCompany) {
      fulfillmentData.tracking_company = trackingCompany
    }

    const data = await this.makeRequest(`/orders/${orderId}/fulfillments.json`, {
      method: "POST",
      body: JSON.stringify({
        fulfillment: fulfillmentData,
      }),
    })

    return data.fulfillment
  }

  // Transform Shopify order to our unified format
  transformOrder(shopifyOrder: ShopifyOrder, vendorId: string, connectionId: string) {
    return {
      platform_connection_id: connectionId,
      vendor_id: vendorId,
      external_order_id: shopifyOrder.id.toString(),
      external_order_number: shopifyOrder.name,
      platform_type: "shopify",
      customer_name:
        `${shopifyOrder.shipping_address?.first_name || ""} ${shopifyOrder.shipping_address?.last_name || ""}`.trim() ||
        "Unknown Customer",
      customer_email: shopifyOrder.email,
      customer_phone: shopifyOrder.phone,
      shipping_address: shopifyOrder.shipping_address,
      billing_address: shopifyOrder.billing_address,
      order_status: this.mapOrderStatus(
        shopifyOrder.financial_status,
        shopifyOrder.cancelled_at,
        shopifyOrder.closed_at,
      ),
      payment_status: this.mapPaymentStatus(shopifyOrder.financial_status),
      fulfillment_status: this.mapFulfillmentStatus(shopifyOrder.fulfillment_status),
      total_amount: Number.parseFloat(shopifyOrder.total_price),
      currency: shopifyOrder.currency,
      tax_amount: Number.parseFloat(shopifyOrder.total_tax),
      shipping_amount: shopifyOrder.shipping_lines.reduce((sum, line) => sum + Number.parseFloat(line.price), 0),
      discount_amount: Number.parseFloat(shopifyOrder.total_discounts),
      order_date: shopifyOrder.created_at,
      shipped_date: shopifyOrder.fulfillments.length > 0 ? shopifyOrder.fulfillments[0].created_at : null,
      tracking_number: shopifyOrder.fulfillments.length > 0 ? shopifyOrder.fulfillments[0].tracking_number : null,
      tracking_url: shopifyOrder.fulfillments.length > 0 ? shopifyOrder.fulfillments[0].tracking_url : null,
      platform_order_url: `https://${this.shopDomain}.myshopify.com/admin/orders/${shopifyOrder.id}`,
      raw_data: shopifyOrder,
      line_items: shopifyOrder.line_items.map((item) => ({
        external_item_id: item.id.toString(),
        product_name: item.name,
        product_sku: item.sku,
        variant_title: item.variant_title,
        quantity: item.quantity,
        unit_price: Number.parseFloat(item.price),
        total_price: Number.parseFloat(item.price) * item.quantity,
        product_image_url: null, // Would need additional API call to get product images
        product_url: `https://${this.shopDomain}.myshopify.com/products/${item.product_id}`,
        fulfillment_status: this.mapFulfillmentStatus(item.fulfillment_status),
      })),
    }
  }

  private mapOrderStatus(financialStatus: string, cancelledAt: string | null, closedAt: string | null): string {
    if (cancelledAt) return "cancelled"
    if (closedAt) return "delivered"

    switch (financialStatus) {
      case "pending":
        return "pending"
      case "authorized":
      case "paid":
        return "processing"
      default:
        return "pending"
    }
  }

  private mapPaymentStatus(financialStatus: string): string {
    switch (financialStatus) {
      case "paid":
        return "paid"
      case "pending":
        return "pending"
      case "refunded":
      case "partially_refunded":
        return "refunded"
      default:
        return "pending"
    }
  }

  private mapFulfillmentStatus(fulfillmentStatus: string | null): string {
    if (!fulfillmentStatus) return "unfulfilled"

    switch (fulfillmentStatus) {
      case "fulfilled":
        return "fulfilled"
      case "partial":
        return "partial"
      default:
        return "unfulfilled"
    }
  }
}
