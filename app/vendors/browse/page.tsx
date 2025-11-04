import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Package, Users } from "lucide-react"
import Link from "next/link"

export default function VendorsBrowsePage() {
  const vendors = [
    {
      id: 1,
      name: "TechGear Pro",
      description: "Premium electronics and gadgets",
      rating: 4.8,
      reviews: 1250,
      location: "San Francisco, CA",
      products: 156,
      followers: 8900,
      verified: true,
      image: "/tech-store-logo.png",
    },
    {
      id: 2,
      name: "Fashion Forward",
      description: "Trendy clothing and accessories",
      rating: 4.6,
      reviews: 890,
      location: "New York, NY",
      products: 234,
      followers: 12400,
      verified: true,
      image: "/fashion-store-logo.png",
    },
    {
      id: 3,
      name: "Home & Garden Plus",
      description: "Everything for your home and garden",
      rating: 4.7,
      reviews: 567,
      location: "Austin, TX",
      products: 89,
      followers: 3200,
      verified: false,
      image: "/home-garden-store-logo.jpg",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Our Vendors</h1>
        <p className="text-muted-foreground text-lg">
          Discover trusted sellers offering quality products across various categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <Card key={vendor.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 relative">
                <img
                  src={vendor.image || "/placeholder.svg"}
                  alt={vendor.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                {vendor.verified && (
                  <Badge className="absolute -top-1 -right-1 bg-green-500 text-white px-2 py-1 text-xs">✓</Badge>
                )}
              </div>
              <CardTitle className="text-xl">{vendor.name}</CardTitle>
              <CardDescription>{vendor.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{vendor.rating}</span>
                  <span className="text-muted-foreground">({vendor.reviews})</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{vendor.location}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-1">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.products} Products</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{vendor.followers.toLocaleString()} Followers</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button asChild className="flex-1">
                  <Link href={`/vendors/${vendor.id}`}>View Store</Link>
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Follow
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Want to become a vendor?</h2>
        <p className="text-muted-foreground mb-6">Join thousands of successful sellers on our platform</p>
        <Button asChild size="lg">
          <Link href="/vendor/register">Start Selling Today</Link>
        </Button>
      </div>
    </div>
  )
}
