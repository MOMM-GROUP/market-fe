import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, Search, MoreHorizontal, Eye, Package } from "lucide-react"
import Link from "next/link"

interface OrderItem {
  id: string
  quantity: number
  unit_price: number
  total_price: number
  created_at: string
  orders: {
    id: string
    order_number: string
    status: string
    created_at: string
    customer_id: string
    shipping_address: any
  } | null
  products: {
    name: string
    featured_image_url: string | null
  } | null
}

export default async function VendorOrdersPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // --- START: PERMISSIVE VENDOR DATA FETCHING ---

  // Step 1: Check if the user is a member of ANY vendor team.
  const { data: teamMember } = await supabase
    .from("team_members")
    .select("vendor_id")
    .eq("user_id", user.id)
    .limit(1) // We only need to know if at least one record exists
    .single()

  console.log("Vendor team member check:", teamMember)
  console.log("User ID:", user.id)
  console.log("vendor_id:", teamMember?.vendor_id)

  // If the user is not on ANY vendor team, they can't see vendor pages.
  if (!teamMember) {
    // This could be a customer or a vendor whose application is pending.
    redirect("/vendor/application-submitted")
  }

  // Step 2: Get ALL order items from ALL vendors for development purposes.
  // The specific vendor_id filter has been removed.
  const { data: orderItems } = await supabase
    .from("order_items")
    .select(
      `
      *,
      orders (
        id,
        order_number,
        status,
        created_at,
        customer_id,
        shipping_address
      ),
      products (name, featured_image_url)
    `,
    )
    .order("created_at", { ascending: false })

  // --- END: PERMISSIVE VENDOR DATA FETCHING ---

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "secondary"
      case "processing":
        return "default"
      case "shipped":
        return "outline"
      case "delivered":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders and fulfillment</p>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search orders..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Vendor Orders ({orderItems?.length || 0})</CardTitle>
            <CardDescription>Showing all orders across the platform for editing</CardDescription>
          </CardHeader>
          <CardContent>
            {orderItems && orderItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderItems
                    .filter((item) => item.orders && item.products) // Filter out items with missing relations
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">#{item.orders?.order_number}</p>
                            <p className="text-sm text-muted-foreground">Order ID: {item.orders?.id.slice(0, 8)}...</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted">
                              <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                                <Package className="h-5 w-5 text-primary/50" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{item.products?.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          <div>
                            <span className="font-medium">${item.total_price}</span>
                            <p className="text-sm text-muted-foreground">${item.unit_price} each</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(item.orders?.status)}>{item.orders?.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(item.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/vendor/orders/${item.orders?.id}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Package className="mr-2 h-4 w-4" />
                                Update Status
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
                <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-4">
                  Orders from customers will appear here once they start purchasing your products.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
