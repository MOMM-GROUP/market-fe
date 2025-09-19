import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, Mail, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function VendorHelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Vendor Help Center</h1>
            <p className="text-xl text-muted-foreground">Get the support you need to succeed on our platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Getting Started
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• How to set up your vendor account</li>
                  <li>• Adding your first products</li>
                  <li>• Setting up payment methods</li>
                  <li>• Understanding our fee structure</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Managing Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Processing new orders</li>
                  <li>• Updating order status</li>
                  <li>• Handling returns and refunds</li>
                  <li>• Shipping best practices</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Product Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Creating compelling product listings</li>
                  <li>• Managing inventory levels</li>
                  <li>• Setting competitive prices</li>
                  <li>• Using high-quality images</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Account & Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Understanding payment schedules</li>
                  <li>• Viewing sales analytics</li>
                  <li>• Managing tax information</li>
                  <li>• Account verification process</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6">Need More Help?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Mail className="h-4 w-4" />
                  Email Support
                </Button>
              </Link>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <Phone className="h-4 w-4" />
                Call: 1-800-VENDOR
              </Button>
              <Button className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
