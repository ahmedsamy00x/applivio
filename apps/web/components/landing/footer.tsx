import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Github, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-zinc-950 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Applivio</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-400">
              The AI-powered job application tracker that works as hard as you do.
            </p>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Product</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white">Features</Link></li>
              <li><Link href="#" className="hover:text-white">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white">Changelog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Company</h3>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="mb-4 text-sm font-semibold">Connect</h3>
            <div className="flex space-x-4 text-zinc-400">
              <Link href="#" className="hover:text-white">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="hover:text-white">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
        
        <Separator className="my-8 bg-zinc-800" />
        
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p className="text-sm text-zinc-500">
            © 2024 Applivio Inc. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
