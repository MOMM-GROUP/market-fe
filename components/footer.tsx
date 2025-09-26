import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-muted py-12 px-4 mt-auto">
      <div className="center-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://momm.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                About MOMM
              </a>
              <a
                href="https://momm.com/careers"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                Careers
              </a>
              <a
                href="https://momm.com/press"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                Press
              </a>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 MOMM Market. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
