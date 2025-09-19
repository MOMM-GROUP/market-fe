import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Store, Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin-sidebar"

interface AdminStats {
  totalUsers: number
  totalVendors: number
  pendingVendors: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Check if user is authenticated and is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "admin") {
    redirect("/")
  }

  // Get admin statistics
  const { count: totalUsers } = await supabase.from("profiles").select("*", { count: "exact" })

  const { count: totalVendors } = await supabase.from("vendors").select("*", { count: "exact" })

  const { count: pendingVendors } = await supabase
    .from("vendors")
    .select("*", { count: "exact" })
    .eq("is_verified", false)

  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact" })

  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact" })

  const { data: revenueData } = await supabase.from("orders").select("total_amount")

  const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.total_amount), 0) || 0

  // Get recent activities
  const { data: recentVendors } = await supabase
    .from("vendors")
    .select("*, profiles(first_name, last_name, email)")
    .order("created_at", { ascending: false })
    .limit(5)

  const { data: recentOrders } = await supabase
    .from("orders")
    .select("*, profiles(first_name, last_name)")
    .order("created_at", { ascending: false })
    .limit(5)

  const stats: AdminStats = {
    totalUsers: totalUsers || 0,
    totalVendors: totalVendors || 0,
    pendingVendors: pendingVendors || 0,
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    totalRevenue,
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your marketplace platform</p>
            </div>
            <div className="flex items-center gap-4">
              {stats.pendingVendors > 0 && (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {stats.pendingVendors} Pending Approvals
                </Badge>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsers}</div>
                <p className="text-xs text-muted-foreground">Registered users</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalVendors}</div>
                <p className="text-xs text-muted-foreground">Active vendors</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Vendors</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingVendors}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Listed products</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">Platform revenue</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Vendor Applications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Vendor Applications</CardTitle>
                    <CardDescription>Latest vendor registration requests</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentVendors?.map((vendor) => (
                      <div key={vendor.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <Store className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{vendor.business_name}</p>
                            <p className="text-xs text-muted-foreground">{vendor.profiles?.email}</p>
                          </div>
                        </div>
                        <Badge variant={vendor.is_verified ? "default" : "secondary"}>
                          {vendor.is_verified ? "Verified" : "Pending"}
                        </Badge>
                      </div>
                    ))}
                    <Link href="/admin/vendors">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Vendors
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Recent Orders */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest customer orders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOrders?.map((order) => (
                      <div key={order.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">#{order.order_number}</p>
                            <p className="text-xs text-muted-foreground">
                              {order.profiles?.first_name} {order.profiles?.last_name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">${order.total_amount}</p>
                          <Badge variant="outline" className="text-xs">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Link href="/admin/orders">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Orders
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/admin/vendors?filter=pending">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                        <Clock className="h-6 w-6" />
                        <span className="text-sm">Review Vendors</span>
                      </Button>
                    </Link>
                    <Link href="/admin/products">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                        <Package className="h-6 w-6" />
                        <span className="text-sm">Manage Products</span>
                      </Button>
                    </Link>
                    <Link href="/admin/orders">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                        <ShoppingCart className="h-6 w-6" />
                        <span className="text-sm">View Orders</span>
                      </Button>
                    </Link>
                    <Link href="/admin/analytics">
                      <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                        <TrendingUp className="h-6 w-6" />
                        <span className="text-sm">View Analytics</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vendors">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Management</CardTitle>
                  <CardDescription>Manage vendor applications and accounts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Vendor Management</h3>
                    <p className="text-muted-foreground mb-4">
                      Review vendor applications, manage accounts, and monitor vendor performance.
                    </p>
                    <Link href="/admin/vendors">
                      <Button>Go to Vendor Management</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Monitor and manage all platform orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Order Management</h3>
                    <p className="text-muted-foreground mb-4">
                      View all orders, track fulfillment status, and resolve customer issues.
                    </p>
                    <Link href="/admin/orders">
                      <Button>Go to Order Management</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Analytics</CardTitle>
                  <CardDescription>Comprehensive platform performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Platform Analytics</h3>
                    <p className="text-muted-foreground mb-4">
                      View detailed analytics about platform performance, user engagement, and revenue trends.
                    </p>
                    <Button disabled>Coming Soon</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
