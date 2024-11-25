import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Hero Image */}
      <div className="w-full h-[80vh] relative overflow-hidden">
        <Image
          src="/assets/hero.jpg"
          alt="Hotel Kolhapuri hero image"
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 text-center -mt-16 relative z-10">
        {/* Logo */}
        <div className="bg-[#FF6B2B] rounded-full w-32 h-32 mx-auto flex items-center justify-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
            <path d="M7 2v20" />
            <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
          </svg>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Hotel Kolhapuri</h1>
        <p className="text-lg text-gray-600 mb-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit velit nibh
          <br />
          neque ultrices potenti aenean commodo
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#FF6B2B] hover:bg-[#FF6B2B]/90 text-white font-semibold px-8 py-3 rounded-full">
            Order online
          </Button>
          <Link href="/menu/Veg">
            <Button size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-3 rounded-full border-2 border-gray-300">
              Browse menu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

