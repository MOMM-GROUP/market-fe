"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OrderDetailSheet } from "@/components/order-detail-sheet"
import {
  ShoppingCart,
  DollarSign,
  Package,
  TrendingUp,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  ExternalLink,
  RefreshCw,
  Calendar,
  Store,
  ShoppingBag,
  Globe,
} from "lucide-react"
import { VendorSidebar } from "@/components/vendor-sidebar"
import { ConnectionManager } from "@/components/connection-manager"
import { cn } from "@/lib/utils"

interface DashboardStats {
  todayRevenue: number
  todayOrders: number
  pendingFulfillment: number
  weekRevenue: number
}

interface ExternalOrder {
  id: string
  external_order_number: string
  platform_type: string
  customer_name: string
  customer_email: string
  order_status: string
  payment_status: string
  fulfillment_status: string
  total_amount: number
  order_date: string
  platform_order_url: string
  platform_connections: {
    store_name: string
  }
}

const PLATFORM_ICONS = {
  shopify: Store,
  etsy: ShoppingBag,
  amazon: Package,
  woocommerce: Globe,
}

const PLATFORM_COLORS = {
  shopify: "bg-green-100 text-green-700",
  etsy: "bg-orange-100 text-orange-700",
  amazon: "bg-blue-100 text-blue-700",
  woocommerce: "bg-purple-100 text-purple-700",
}

export default function UnifiedOrdersPage() {
  const [vendor, setVendor] = useState<any>(null)
  const [stats, setStats] = useState<DashboardStats>({
    todayRevenue: 0,
    todayOrders: 0,
    pendingFulfillment: 0,
    weekRevenue: 0,
  })
  const [orders, setOrders] = useState<ExternalOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<ExternalOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [dateRange, setDateRange] = useState("today")
  const [syncing, setSyncing] = useState(false)

  const supabase = createClient()

  useEffect(() => {
    initializeDashboard()
  }, [])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, statusFilter, platformFilter])

  const initializeDashboard = async () => {
    try {
      // Get current user and vendor info
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

      const { data: vendorData } = await supabase.from("vendors").select("*").eq("user_id", user.id).single()

      if (!vendorData) return

      setVendor(vendorData)
      await Promise.all([fetchStats(vendorData.id), fetchOrders(vendorData.id)])
    } catch (error) {
      console.error("Error initializing dashboard:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async (vendorId: string) => {
    try {
      const today = new Date()
      const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
      const weekStart = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

      // Get today's stats
      const { data: todayOrders } = await supabase
        .from("external_orders")
        .select("total_amount")
        .eq("vendor_id", vendorId)
        .gte("order_date", todayStart.toISOString())

      // Get week's stats
      const { data: weekOrders } = await supabase
        .from("external_orders")
        .select("total_amount")
        .eq("vendor_id", vendorId)
        .gte("order_date", weekStart.toISOString())

      // Get pending fulfillment count
      const { count: pendingCount } = await supabase
        .from("external_orders")
        .select("*", { count: "exact" })
        .eq("vendor_id", vendorId)
        .in("fulfillment_status", ["unfulfilled", "partial"])

      const todayRevenue = todayOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0
      const weekRevenue = weekOrders?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0

      setStats({
        todayRevenue,
        todayOrders: todayOrders?.length || 0,
        pendingFulfillment: pendingCount || 0,
        weekRevenue,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  const fetchOrders = async (vendorId: string) => {
    try {
      const { data, error } = await supabase
        .from("external_orders")
        .select(
          `
          *,
          platform_connections (store_name)
        `,
        )
        .eq("vendor_id", vendorId)
        .order("order_date", { ascending: false })
        .limit(100)

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.external_order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.order_status === statusFilter)
    }

    // Platform filter
    if (platformFilter !== "all") {
      filtered = filtered.filter((order) => order.platform_type === platformFilter)
    }

    setFilteredOrders(filtered)
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      // Simulate sync process
      await new Promise((resolve) => setTimeout(resolve, 3000))
      if (vendor) {
        await Promise.all([fetchStats(vendor.id), fetchOrders(vendor.id)])
      }
    } catch (error) {
      console.error("Error syncing orders:", error)
    } finally {
      setSyncing(false)
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
      <div className={cn("w-6 h-6 rounded flex items-center justify-center", colorClass)}>
        <Icon className="h-3 w-3" />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <VendorSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="h-8 bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded animate-pulse" />
              ))}
            </div>
            <div className="h-96 bg-muted rounded animate-pulse" />
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <VendorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Unified Order Dashboard</h1>
              <p className="text-muted-foreground">Manage orders from all your connected platforms in one place</p>
            </div>
            <div className="flex items-center gap-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-32">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSync} disabled={syncing}>
                <RefreshCw className={cn("h-4 w-4 mr-2", syncing && "animate-spin")} />
                {syncing ? "Syncing..." : "Sync Now"}
              </Button>
            </div>
          </div>

          {/* Summary Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.todayRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">From all platforms</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.todayOrders}</div>
                <p className="text-xs text-muted-foreground">New orders today</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Fulfillment</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingFulfillment}</div>
                <p className="text-xs text-muted-foreground">Orders to fulfill</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">7-Day Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.weekRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="connections">Connections</TabsTrigger>
            </TabsList>

            <TabsContent value="orders" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search by Order ID, customer name, or email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-40">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={platformFilter} onValueChange={setPlatformFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Platforms</SelectItem>
                        <SelectItem value="shopify">Shopify</SelectItem>
                        <SelectItem value="etsy">Etsy</SelectItem>
                        <SelectItem value="amazon">Amazon</SelectItem>
                        <SelectItem value="woocommerce">WooCommerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Orders Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Orders ({filteredOrders.length})</CardTitle>
                  <CardDescription>All orders from your connected platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredOrders.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Source</TableHead>
                          <TableHead>Order ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="w-[70px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{getPlatformIcon(order.platform_type)}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.external_order_number}</p>
                                <p className="text-sm text-muted-foreground">{order.platform_connections.store_name}</p>
                              </div>
                            </TableCell>
                            <TableCell>{new Date(order.order_date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{order.customer_name}</p>
                                <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-medium">${order.total_amount}</span>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                {getStatusBadge(order.order_status, "order")}
                                {getStatusBadge(order.fulfillment_status, "fulfillment")}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <OrderDetailSheet orderId={order.id}>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                      <Eye className="mr-2 h-4 w-4" />
                                      View Details
                                    </DropdownMenuItem>
                                  </OrderDetailSheet>
                                  <DropdownMenuItem asChild>
                                    <a href={order.platform_order_url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="mr-2 h-4 w-4" />
                                      View on {order.platform_type}
                                    </a>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders found</h3>
                      <p className="text-muted-foreground mb-4">
                        {orders.length === 0
                          ? "Connect your platforms to start seeing orders here."
                          : "Try adjusting your filters to see more orders."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="connections">{vendor && <ConnectionManager vendorId={vendor.id} />}</TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
