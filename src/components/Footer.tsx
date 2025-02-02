"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import FAQs from "./Faqs"
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  ArrowRight,
  QrCode,
  Utensils,
  ShoppingCart,
  CreditCard,
  ShieldCheck,
  Smile,
  Repeat,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

export default function Footer() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false)
  const [isFAQModalOpen, setIsFAQModalOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const howItWorksModalRef = useRef<HTMLDivElement>(null)
  const faqModalRef = useRef<HTMLDivElement>(null)

  const openHowItWorksModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsHowItWorksOpen(true)
  }

  const closeHowItWorksModal = () => setIsHowItWorksOpen(false)

  const openFAQModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsFAQModalOpen(true)
  }

  const closeFAQModal = () => setIsFAQModalOpen(false)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (howItWorksModalRef.current && !howItWorksModalRef.current.contains(event.target as Node)) {
        closeHowItWorksModal()
      }
      if (faqModalRef.current && !faqModalRef.current.contains(event.target as Node)) {
        closeFAQModal()
      }
    }

    if (isHowItWorksOpen || isFAQModalOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isHowItWorksOpen, isFAQModalOpen, closeFAQModal]) // Added closeFAQModal to dependencies

  const FooterSection = ({ title, items }: { title: string; items: string[] }) => (
    <div className="border-b border-gray-700 py-4 md:border-none">
      <button
        className="flex w-full items-center justify-between text-left font-bold text-lg mb-2 text-white md:cursor-default"
        onClick={() => toggleSection(title)}
      >
        {title}
        <span className="md:hidden">
          {expandedSection === title ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </span>
      </button>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <Link
              href="#"
              onClick={item === "How It Works" ? openHowItWorksModal : item === "FAQs" ? openFAQModal : undefined}
              className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
            >
              <ArrowRight className="h-4 w-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-8 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {/* Logo Section */}
          <div className="space-y-4">
            <div className="flex flex-col items-start gap-2">
              <span className="text-2xl font-bold text-white">Excuse Me!</span>
              <p className="text-gray-400 text-sm">Powered By: Midnight Solutions</p>
            </div>
            <p className="text-sm text-gray-400">
              Simplify your dining experience with QR-based ordering. Scan, order, and enjoy!
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, index) => (
                <Link key={index} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{Icon.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links" items={["How It Works", "FAQs", "Privacy Policy", "Terms of Service"]} />

          {/* Resources */}
          <FooterSection title="Resources" items={["Blog", "Support", "Developer API", "Changelog"]} />

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Contact us</h3>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  label: "Email:",
                  value: "midnightsolutions750@gmail.com",
                  href: "mailto:midnightsolutions750@gmail.com",
                },
                { icon: Phone, label: "Phone:", value: "+91 9423515112", href: "tel:+919423515112" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-300"
                >
                  <div className="bg-[#FF6B2B] p-2 rounded-lg">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{item.label}</div>
                    <Link
                      href={item.href}
                      className="text-sm text-white hover:text-[#FF6B2B] transition-colors duration-300"
                    >
                      {item.value}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>
            © Excuse Me! | Designed by{" "}
            <Link href="#" className="text-[#FF6B2B] hover:text-white transition-colors duration-300">
              Ayush Itkhede
            </Link>{" "}
            - Powered by{" "}
            <Link href="#" className="text-[#FF6B2B] hover:text-white transition-colors duration-300">
              Midnight Solutions
            </Link>
          </p>
        </div>
      </div>

      {/* How It Works Modal */}
      {isHowItWorksOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={howItWorksModalRef}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-auto relative max-h-[90vh] overflow-y-auto"
          >
            <button onClick={closeHowItWorksModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h2 className="text-xl font-bold text-[#FF6B2B] mb-4">How It Works</h2>
            <div className="space-y-4">
              {[
                { icon: QrCode, text: "Scan the QR code on your table." },
                { icon: Utensils, text: "Explore the menu and select your items." },
                { icon: ShoppingCart, text: "Open the cart and review your order." },
                { icon: CreditCard, text: "Place your order securely." },
                { icon: ShieldCheck, text: "The admin will provide an OTP for confirmation." },
                { icon: Smile, text: "Once the OTP is verified, your order is placed. Enjoy your meal!" },
                { icon: Repeat, text: "Reorder again without needing an OTP." },
              ].map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="bg-[#FF6B2B] p-2 rounded-full">
                    <step.icon className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-sm text-gray-700">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQs Modal */}
      {isFAQModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            ref={faqModalRef}
            className="bg-white rounded-lg p-6 max-w-md w-full mx-auto relative max-h-[90vh] overflow-y-auto"
          >
            <button onClick={closeFAQModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              &times;
            </button>
            <h2 className="text-xl font-bold text-[#FF6B2B] mb-4">FAQs</h2>
            <FAQs />
          </div>
        </div>
      )}
    </footer>
  )
}
