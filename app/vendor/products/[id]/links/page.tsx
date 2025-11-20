"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Plus, ExternalLink, MoreHorizontal, Edit, Trash2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import type { Product, ProductLink } from "@/lib/types"

const PLATFORMS = ["Amazon", "eBay", "Walmart", "Target", "Best Buy", "Etsy", "Shopify", "Other"]

const CURRENCIES = ["USD", "EUR", "GBP", "CAD", "AUD"]

export default function ProductLinksPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [links, setLinks] = useState<ProductLink[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<ProductLink | null>(null)
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    price: "",
    currency: "USD",
    is_available: true,
  })

  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchData()
  }, [params.id])

  const fetchData = async () => {
    try {
      // Fetch product details
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, name, price")
        .eq("id", params.id)
        .single()

      if (productError) {
        console.error("Error fetching product:", productError)
        return
      }

      setProduct(productData)

      // Fetch product links
      const { data: linksData, error: linksError } = await supabase
        .from("product_links")
        .select("*")
        .eq("product_id", params.id)
        .order("created_at", { ascending: false })

      if (linksError) {
        console.error("Error fetching links:", linksError)
        return
      }

      setLinks(linksData || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.platform || !formData.url || !formData.price) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      const linkData = {
        product_id: params.id,
        platform: formData.platform,
        url: formData.url,
        price: Number.parseFloat(formData.price),
        currency: formData.currency,
        is_available: formData.is_available,
        last_updated: new Date().toISOString(),
      }

      if (editingLink) {
        // Update existing link
        const { error } = await supabase.from("product_links").update(linkData).eq("id", editingLink.id)

        if (error) throw error
        toast.success("Link updated successfully")
      } else {
        // Create new link
        const { error } = await supabase.from("product_links").insert(linkData)

        if (error) throw error
        toast.success("Link added successfully")
      }

      setIsDialogOpen(false)
      setEditingLink(null)
      setFormData({
        platform: "",
        url: "",
        price: "",
        currency: "USD",
        is_available: true,
      })
      fetchData()
    } catch (error) {
      console.error("Error saving link:", error)
      toast.error("Failed to save link")
    }
  }

  const handleEdit = (link: ProductLink) => {
    setEditingLink(link)
    setFormData({
      platform: link.platform,
      url: link.url,
      price: link.price.toString(),
      currency: link.currency,
      is_available: link.is_available,
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (linkId: string) => {
    if (!confirm("Are you sure you want to delete this link?")) return

    try {
      const { error } = await supabase.from("product_links").delete().eq("id", linkId)

      if (error) throw error
      toast.success("Link deleted successfully")
      fetchData()
    } catch (error) {
      console.error("Error deleting link:", error)
      toast.error("Failed to delete link")
    }
  }

  const toggleAvailability = async (linkId: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from("product_links")
        .update({
          is_available: !isAvailable,
          last_updated: new Date().toISOString(),
        })
        .eq("id", linkId)

      if (error) throw error
      toast.success("Link status updated")
      fetchData()
    } catch (error) {
      console.error("Error updating link:", error)
      toast.error("Failed to update link status")
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/vendor/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Manage Purchase Links</h1>
            <p className="text-muted-foreground">{product?.name} - Add external purchase links for your product</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Link
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingLink ? "Edit" : "Add"} Purchase Link</DialogTitle>
                <DialogDescription>Add a link where customers can purchase this product</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="platform">Platform *</Label>
                  <Select
                    value={formData.platform}
                    onValueChange={(value) => setFormData({ ...formData, platform: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {PLATFORMS.map((platform) => (
                        <SelectItem key={platform} value={platform}>
                          {platform}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="url">Product URL *</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://..."
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => setFormData({ ...formData, currency: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_available: checked })}
                  />
                  <Label htmlFor="available">Available for purchase</Label>
                </div>
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">{editingLink ? "Update" : "Add"} Link</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Links Table */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Links ({links.length})</CardTitle>
            <CardDescription>Manage where customers can buy this product</CardDescription>
          </CardHeader>
          <CardContent>
            {links.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Platform</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead className="w-[70px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {links.map((link) => (
                    <TableRow key={link.id}>
                      <TableCell>
                        <div className="font-medium">{link.platform}</div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          {link.currency} {link.price.toFixed(2)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={link.is_available ? "default" : "secondary"}>
                            {link.is_available ? "Available" : "Unavailable"}
                          </Badge>
                          <Switch
                            checked={link.is_available}
                            onCheckedChange={() => toggleAvailability(link.id, link.is_available)}
                            size="sm"
                          />
                        </div>
                      </TableCell>
                      <TableCell>{new Date(link.last_updated).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline text-sm"
                        >
                          View Link
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(link)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(link.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
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
                <ExternalLink className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No purchase links yet</h3>
                <p className="text-muted-foreground mb-4">
                  Add links to external platforms where customers can buy this product.
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Link
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
