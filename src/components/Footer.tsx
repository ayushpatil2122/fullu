import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-[#FF6B2B]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                  <path d="M7 2v20" />
                  <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                </svg>
              </div>
              <span className="text-xl font-bold">Hotel Kolhapuri</span>
            </div>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consect adipiscing elit aliquam mauris.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>
          </div>

          {/* Menu Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Menu</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Menu', 'Menu Single', 'Menu (Ecommerce)', 'Menu Single (Ecommerce)', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#FF6B2B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="font-bold text-lg mb-4">Utility Pages</h3>
            <ul className="space-y-3">
              {['Start here', 'Style guide', '404 Not found', 'Password protected', 'Licenses', 'Changelog'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 hover:text-[#FF6B2B]">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link 
              href="#" 
              className="inline-block mt-4 text-[#FF6B2B] hover:text-[#FF6B2B]/80 border-b-2 border-[#FF6B2B]"
            >
              Browse More Templates
            </Link>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-[#FFF5F2] p-4 rounded-lg">
                <div className="bg-[#FF6B2B] p-2 rounded-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email:</div>
                  <Link href="mailto:contact@duper.com" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                    contact@duper.com
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#FFF5F2] p-4 rounded-lg">
                <div className="bg-[#FF6B2B] p-2 rounded-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Phone:</div>
                  <Link href="tel:(414)687-5892" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
                    (414) 687 - 5892
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t text-center text-gray-600">
          <p>
            Copyright © Duper Burgers | Designed by{' '}
            <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
              BRIX Templates
            </Link>
            {' '}- Powered by{' '}
            <Link href="#" className="text-[#FF6B2B] hover:text-[#FF6B2B]/80">
              Webflow
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

