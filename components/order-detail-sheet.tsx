"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ExternalLink,
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Calendar,
  DollarSign,
  Store,
  ShoppingBag,
  Globe,
  Copy,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderDetailSheetProps {
  orderId: string
  children: React.ReactNode
}

interface OrderDetail {
  id: string
  external_order_id: string
  external_order_number: string
  platform_type: string
  customer_name: string
  customer_email: string
  customer_phone: string
  shipping_address: any
  billing_address: any
  order_status: string
  payment_status: string
  fulfillment_status: string
  total_amount: number
  currency: string
  tax_amount: number
  shipping_amount: number
  discount_amount: number
  order_date: string
  shipped_date: string
  delivered_date: string
  tracking_number: string
  tracking_url: string
  platform_order_url: string
  raw_data: any
  notes: string
  platform_connections: {
    store_name: string
    platform_type: string
  }
  external_order_items: Array<{
    id: string
    product_name: string
    product_sku: string
    variant_title: string
    quantity: number
    unit_price: number
    total_price: number
    product_image_url: string
    product_url: string
    fulfillment_status: string
  }>
}

const PLATFORM_ICONS = {
  shopify: Store,
  etsy: ShoppingBag,
  amazon: Package,
  woocommerce: Globe,
}

const PLATFORM_COLORS = {
  shopify: "bg-green-100 text-green-700 border-green-200",
  etsy: "bg-orange-100 text-orange-700 border-orange-200",
  amazon: "bg-blue-100 text-blue-700 border-blue-200",
  woocommerce: "bg-purple-100 text-purple-700 border-purple-200",
}

export function OrderDetailSheet({ orderId, children }: OrderDetailSheetProps) {
  const [order, setOrder] = useState<OrderDetail | null>(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    if (open && orderId) {
      fetchOrderDetails()
    }
  }, [open, orderId])

  const fetchOrderDetails = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("external_orders")
        .select(
          `
          *,
          platform_connections (store_name, platform_type),
          external_order_items (*)
        `,
        )
        .eq("id", orderId)
        .single()

      if (error) throw error
      setOrder(data)
    } catch (error) {
      console.error("Error fetching order details:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const getStatusBadge = (status: string, type: "order" | "payment" | "fulfillment") => {
    const variants: Record<string, any> = {
      // Order status
      pending: "secondary",
      processing: "default",
      shipped: "outline",
      delivered: "default",
      cancelled: "destructive",
      // Payment status
      paid: "default",
      unpaid: "secondary",
      refunded: "outline",
      // Fulfillment status
      fulfilled: "default",
      unfulfilled: "secondary",
      partial: "outline",
    }

    return (
      <Badge variant={variants[status] || "secondary"} className="capitalize">
        {status}
      </Badge>
    )
  }

  const getPlatformIcon = (platformType: string) => {
    const Icon = PLATFORM_ICONS[platformType as keyof typeof PLATFORM_ICONS] || Store
    const colorClass = PLATFORM_COLORS[platformType as keyof typeof PLATFORM_COLORS] || "bg-gray-100 text-gray-700"

    return (
      <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colorClass)}>
        <Icon className="h-4 w-4" />
      </div>
    )
  }

  const formatAddress = (address: any) => {
    if (!address) return "No address provided"

    const parts = [
      address.address1,
      address.address2,
      address.city,
      address.province,
      address.zip,
      address.country,
    ].filter(Boolean)

    return parts.join(", ")
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-3">
            {order && getPlatformIcon(order.platform_type)}
            <div>
              <div className="flex items-center gap-2">
                <span>
                  {order?.platform_connections.platform_type} Order {order?.external_order_number}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(order?.external_order_number || "", "order_number")}
                >
                  {copied === "order_number" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground font-normal">{order?.platform_connections.store_name}</p>
            </div>
          </SheetTitle>
          <SheetDescription>
            {order && (
              <div className="flex items-center gap-4 mt-2">
                {getStatusBadge(order.order_status, "order")}
                {getStatusBadge(order.payment_status, "payment")}
                {getStatusBadge(order.fulfillment_status, "fulfillment")}
              </div>
            )}
          </SheetDescription>
        </SheetHeader>

        {loading ? (
          <div className="space-y-4 mt-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-muted rounded animate-pulse" />
            ))}
          </div>
        ) : order ? (
          <ScrollArea className="h-[calc(100vh-120px)] mt-6">
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="flex gap-2">
                <Button asChild size="sm">
                  <a href={order.platform_order_url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View on {order.platform_type}
                  </a>
                </Button>
                {order.tracking_url && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={order.tracking_url} target="_blank" rel="noopener noreferrer">
                      <Truck className="h-4 w-4 mr-2" />
                      Track Package
                    </a>
                  </Button>
                )}
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="raw">Raw Data</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  {/* Order Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <DollarSign className="h-5 w-5" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span>${(order.total_amount - order.tax_amount - order.shipping_amount).toFixed(2)}</span>
                      </div>
                      {order.discount_amount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Discount:</span>
                          <span>-${order.discount_amount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>Shipping:</span>
                        <span>${order.shipping_amount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax:</span>
                        <span>${order.tax_amount.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span>
                          ${order.total_amount.toFixed(2)} {order.currency}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Line Items */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Package className="h-5 w-5" />
                        Items ({order.external_order_items.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {order.external_order_items.map((item) => (
                        <div key={item.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                            {item.product_image_url ? (
                              <img
                                src={item.product_image_url || "/placeholder.svg"}
                                alt={item.product_name}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Package className="h-6 w-6 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium">{item.product_name}</h4>
                                {item.variant_title && (
                                  <p className="text-sm text-muted-foreground">{item.variant_title}</p>
                                )}
                                {item.product_sku && (
                                  <p className="text-xs text-muted-foreground">SKU: {item.product_sku}</p>
                                )}
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${item.total_price.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">
                                  ${item.unit_price.toFixed(2)} × {item.quantity}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              {getStatusBadge(item.fulfillment_status, "fulfillment")}
                              {item.product_url && (
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={item.product_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    View Product
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Timeline */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <div>
                          <p className="font-medium">Order Placed</p>
                          <p className="text-sm text-muted-foreground">{new Date(order.order_date).toLocaleString()}</p>
                        </div>
                      </div>
                      {order.shipped_date && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                          <div>
                            <p className="font-medium">Shipped</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.shipped_date).toLocaleString()}
                            </p>
                            {order.tracking_number && (
                              <p className="text-sm text-muted-foreground">
                                Tracking: {order.tracking_number}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => copyToClipboard(order.tracking_number, "tracking")}
                                  className="ml-2 h-auto p-0"
                                >
                                  {copied === "tracking" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                      {order.delivered_date && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <div>
                            <p className="font-medium">Delivered</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.delivered_date).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="customer" className="space-y-4">
                  {/* Customer Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Customer Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        {order.customer_phone && (
                          <p className="text-sm text-muted-foreground">{order.customer_phone}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Addresses */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Shipping Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-line">{formatAddress(order.shipping_address)}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          Billing Address
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-line">{formatAddress(order.billing_address)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Notes */}
                  {order.notes && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Order Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm whitespace-pre-line">{order.notes}</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                <TabsContent value="raw" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Raw Platform Data</CardTitle>
                      <CardDescription>
                        Complete order data received from {order.platform_type} API for debugging purposes
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <pre className="text-xs bg-muted p-4 rounded-lg overflow-auto max-h-96">
                        {JSON.stringify(order.raw_data || {}, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        ) : (
          <div className="flex items-center justify-center h-32">
            <p className="text-muted-foreground">Order not found</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
