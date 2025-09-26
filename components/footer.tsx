import { ShoppingCart, Github, MessageCircle, ExternalLink } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 mt-auto">
      <div className="center-content">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">MOMM Market</span>
            </div>
            <p className="text-muted-foreground">
              Your trusted marketplace connecting customers with verified vendors worldwide.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">MOMM</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Moral Oracle for Meaningful Markets
              <br />
              Building the future of verifiable commerce.
            </p>
            <div className="space-y-2 text-sm">
              <Link
                href="https://momm.group"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
              >
                Organization Website <ExternalLink className="h-3 w-3" />
              </Link>
              <Link href="#" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <Github className="h-3 w-3" />
                GitHub Organization
              </Link>
              <Link href="#" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <MessageCircle className="h-3 w-3" />
                Join Discord
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link href="#" className="block text-muted-foreground hover:text-foreground">
                → View Roadmap
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-foreground">
                → Learn About MOMM
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-foreground">
                → Investment Opportunity
              </Link>
              <Link href="#" className="block text-muted-foreground hover:text-foreground">
                → Join as Contributor
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Shop</h4>
            <div className="space-y-2 text-sm">
              <Link href="/categories" className="block text-muted-foreground hover:text-foreground">
                Categories
              </Link>
              <Link href="/products" className="block text-muted-foreground hover:text-foreground">
                All Products
              </Link>
              <Link href="/deals" className="block text-muted-foreground hover:text-foreground">
                Deals
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Vendors</h4>
            <div className="space-y-2 text-sm">
              <Link href="/vendor/register" className="block text-muted-foreground hover:text-foreground">
                Become a Vendor
              </Link>
              <Link href="/vendor/login" className="block text-muted-foreground hover:text-foreground">
                Vendor Login
              </Link>
              <Link href="/vendor/help" className="block text-muted-foreground hover:text-foreground">
                Vendor Help
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium">Follow Us:</span>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                LinkedIn
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Instagram
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Discord
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">&copy; 2025 MOMM Market. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
