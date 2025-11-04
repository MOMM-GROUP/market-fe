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
            <p className="text-muted-foreground">Building a marketplace where values matter and everyone benefits.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Company</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                About Us
              </Link>
              <Link href="/how-it-works" className="block text-muted-foreground hover:text-foreground">
                How It Works
              </Link>
              <Link href="/roadmap" className="block text-muted-foreground hover:text-foreground">
                Roadmap
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Get Involved</h4>
            <div className="space-y-2 text-sm">
              <Link href="/journey" className="block text-muted-foreground hover:text-foreground">
                Get Started
              </Link>
              <Link href="/investors" className="block text-muted-foreground hover:text-foreground">
                Invest
              </Link>
              <Link href="/contributors" className="block text-muted-foreground hover:text-foreground">
                Contribute
              </Link>
              <Link href="/vendor/register" className="block text-muted-foreground hover:text-foreground">
                Become a Vendor
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Connect</h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://discord.gg/PptvudG7jb"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                Discord
              </a>
              <a
                href="https://linkedin.com/company/momm-group"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/mommgroupofficial/#"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-muted-foreground hover:text-foreground"
              >
                Instagram
              </a>
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
