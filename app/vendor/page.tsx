import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, Star, AlertCircle } from "lucide-react"
import Link from "next/link"
import { VendorSidebar } from "@/components/vendor-sidebar"

interface VendorStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  averageRating: number
}

export default async function VendorDashboard() {
  const supabase = await createClient()

  // Check if user is authenticated and is a vendor
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (profile?.role !== "vendor") {
    redirect("/")
  }

  // Get vendor data
  const { data: vendor } = await supabase.from("vendors").select("*").eq("user_id", user.id).single()

  if (!vendor) {
    redirect("/vendor/setup")
  }

  // Get vendor statistics
  const { count: totalProducts } = await supabase
    .from("products")
    .select("*", { count: "exact" })
    .eq("vendor_id", vendor.id)

  const { count: totalOrders } = await supabase
    .from("order_items")
    .select("*", { count: "exact" })
    .eq("vendor_id", vendor.id)

  const { data: revenueData } = await supabase.from("order_items").select("total_price").eq("vendor_id", vendor.id)

  const totalRevenue = revenueData?.reduce((sum, item) => sum + Number(item.total_price), 0) || 0

  // Get recent products
  const { data: recentProducts } = await supabase
    .from("products")
    .select("*")
    .eq("vendor_id", vendor.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Get recent orders
  const { data: recentOrders } = await supabase
    .from("order_items")
    .select(
      `
      *,
      orders (
        id,
        order_number,
        status,
        created_at,
        customer_id
      ),
      products (name, featured_image_url)
    `,
    )
    .eq("vendor_id", vendor.id)
    .order("created_at", { ascending: false })
    .limit(5)

  const stats: VendorStats = {
    totalProducts: totalProducts || 0,
    totalOrders: totalOrders || 0,
    totalRevenue,
    averageRating: 4.8, // This would come from reviews calculation
  }

  return (
    <div className="flex min-h-screen bg-background">
      <VendorSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {vendor.business_name}</p>
            </div>
            <div className="flex items-center gap-4">
              {!vendor.is_verified && (
                <Badge variant="outline" className="text-amber-600 border-amber-600">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Pending Verification
                </Badge>
              )}
              <Link href="/vendor/products/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground">Active listings</p>
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
                <p className="text-xs text-muted-foreground">Gross earnings</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.averageRating}</div>
                <p className="text-xs text-muted-foreground">Customer satisfaction</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Products */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Products</CardTitle>
                    <CardDescription>Your latest product listings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentProducts?.map((product) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <Package className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{product.name}</p>
                            <p className="text-xs text-muted-foreground">${product.price}</p>
                          </div>
                        </div>
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    ))}
                    <Link href="/vendor/products">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Products
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
                    {recentOrders?.map((orderItem) => (
                      <div key={orderItem.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                            <ShoppingCart className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">#{orderItem.orders.order_number}</p>
                            <p className="text-xs text-muted-foreground">{orderItem.products.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">${orderItem.total_price}</p>
                          <Badge variant="outline" className="text-xs">
                            {orderItem.orders.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    <Link href="/vendor/orders">
                      <Button variant="outline" className="w-full bg-transparent">
                        View All Orders
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <Card>
                <CardHeader>
                  <CardTitle>Product Management</CardTitle>
                  <CardDescription>Manage your product listings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Manage Your Products</h3>
                    <p className="text-muted-foreground mb-4">
                      Add, edit, and manage your product listings from the products section.
                    </p>
                    <Link href="/vendor/products">
                      <Button>Go to Products</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>Track and manage customer orders</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Manage Your Orders</h3>
                    <p className="text-muted-foreground mb-4">
                      View and process customer orders, update shipping status, and more.
                    </p>
                    <Link href="/vendor/orders">
                      <Button>Go to Orders</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Insights</CardTitle>
                  <CardDescription>Track your business performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Business Analytics</h3>
                    <p className="text-muted-foreground mb-4">
                      View detailed analytics about your sales, customers, and product performance.
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
