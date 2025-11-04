import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-[#0F172A] py-12 px-4 mt-auto">
      <div className="center-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-teal-500 flex items-center justify-center">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">MOMM Market</span>
            </div>
            <p className="text-gray-400">Building a marketplace where values matter and everyone benefits.</p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">About MOMM</h4>
            <div className="space-y-2 text-sm">
              <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/how-it-works" className="block text-gray-400 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">For Everyone</h4>
            <div className="space-y-2 text-sm">
              <Link href="/marketplace" className="block text-gray-400 hover:text-white transition-colors">
                Shop Products
              </Link>
              <Link href="/investors" className="block text-gray-400 hover:text-white transition-colors">
                Invest
              </Link>
              <Link href="/contributors" className="block text-gray-400 hover:text-white transition-colors">
                Contribute
              </Link>
              <Link href="/brands" className="block text-gray-400 hover:text-white transition-colors">
                Brand Partnerships
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-white">Community</h4>
            <div className="space-y-2 text-sm">
              <a
                href="https://discord.gg/PptvudG7jb"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Discord
              </a>
              <a
                href="https://github.com/MOMM-GROUP"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/company/momm-group"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/mommgroupofficial/#"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">&copy; 2025 MOMM Market. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
