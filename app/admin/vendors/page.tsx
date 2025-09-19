import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Store, Search, MoreHorizontal, Eye, CheckCircle, XCircle, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { AdminSidebar } from "@/components/admin-sidebar"

interface Vendor {
  id: string
  business_name: string
  business_email: string
  business_description: string | null
  is_verified: boolean
  commission_rate: number
  created_at: string
  profiles: {
    first_name: string
    last_name: string
    email: string
  }
}

export default async function AdminVendorsPage() {
  const supabase = await createClient()

  // Check authentication and admin status
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

  // Get all vendors
  const { data: vendors } = await supabase
    .from("vendors")
    .select(
      `
      *,
      profiles (first_name, last_name, email)
    `,
    )
    .order("created_at", { ascending: false })

  const getStatusColor = (isVerified: boolean) => {
    return isVerified ? "default" : "secondary"
  }

  const getStatusIcon = (isVerified: boolean) => {
    return isVerified ? CheckCircle : AlertTriangle
  }

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Vendor Management</h1>
              <p className="text-muted-foreground">Manage vendor applications and accounts</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input placeholder="Search vendors..." className="pl-10" />
                </div>
                <Button variant="outline">Filter</Button>
              </div>
            </CardContent>
          </Card>

          {/* Vendors Table */}
          <Card>
            <CardHeader>
              <CardTitle>All Vendors ({vendors?.length || 0})</CardTitle>
              <CardDescription>Manage vendor accounts and verification status</CardDescription>
            </CardHeader>
            <CardContent>
              {vendors && vendors.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Business</TableHead>
                      <TableHead>Commission</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-[70px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors.map((vendor) => {
                      const StatusIcon = getStatusIcon(vendor.is_verified)
                      return (
                        <TableRow key={vendor.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                                <Store className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {vendor.profiles.first_name} {vendor.profiles.last_name}
                                </p>
                                <p className="text-sm text-muted-foreground">{vendor.profiles.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{vendor.business_name}</p>
                              <p className="text-sm text-muted-foreground">{vendor.business_email}</p>
                            </div>
                          </TableCell>
                          <TableCell>{vendor.commission_rate}%</TableCell>
                          <TableCell>
                            <Badge
                              variant={getStatusColor(vendor.is_verified)}
                              className="flex items-center gap-1 w-fit"
                            >
                              <StatusIcon className="h-3 w-3" />
                              {vendor.is_verified ? "Verified" : "Pending"}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(vendor.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                  <Link href={`/admin/vendors/${vendor.id}`}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                  </Link>
                                </DropdownMenuItem>
                                {!vendor.is_verified && (
                                  <DropdownMenuItem>
                                    <CheckCircle className="mr-2 h-4 w-4" />
                                    Approve Vendor
                                  </DropdownMenuItem>
                                )}
                                {vendor.is_verified && (
                                  <DropdownMenuItem className="text-destructive">
                                    <XCircle className="mr-2 h-4 w-4" />
                                    Suspend Vendor
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <Store className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No vendors yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Vendor applications will appear here once users register.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
