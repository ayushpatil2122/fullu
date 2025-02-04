"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { menuItems } from "@/lib/types"

// This would typically come from an API or database
const bestSellerItems = [
  {
    id: 1,
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce",
    price: 350,
    image: "/butt-chick.jpg",
    rating: 4.8,
    soldCount: 1500,
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description: "Grilled cottage cheese with spices and vegetables",
    price: 280,
    image: "/paneer-tikka.jpg",
    rating: 4.6,
    soldCount: 1200,
  },
  {
    id: 3,
    name: "Biryani",
    description: "Fragrant rice dish with aromatic spices and meat or vegetables",
    price: 320,
    image: "/biryani.jpg",
    rating: 4.9,
    soldCount: 1800,
  },
  {
    id: 4,
    name: "Masala Dosa",
    description: "Crispy fermented crepe filled with spiced potatoes",
    price: 180,
    image: "/masala-dosa.jpg",
    rating: 4.7,
    soldCount: 1400,
  },
]

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(2)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const handleResize = useCallback(() => {
    if (window.innerWidth < 640) {
      setItemsPerPage(1)
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(2)
    } else {
      setItemsPerPage(3)
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= menuItems.length ? 0 : prevIndex + 1))
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1))
  }, [])
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide()
    }

    if (touchStart - touchEnd < -75) {
      prevSlide()
    }
  }

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#FF6B2B]">Our Best Sellers</h2>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 z-10 bg-[#FF6B2B] text-white rounded-full p-2 hover:bg-[#FF6B2B]/90 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:ring-opacity-50"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {menuItems.map((item) => (
                <div key={item.id} className={`w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-4`}>
                  <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={600}
                        height={400}
                        className="w-full h-[200px] sm:h-[250px] object-cover"
                        loading="lazy"
                      />
                      <Badge className="absolute top-2 left-2 bg-[#FF6B2B] text-white">Best Seller</Badge>
                      <div className="absolute bottom-2 right-2 bg-white px-3 py-1 rounded-full text-sm font-bold border-2 border-[#FF6B2B] text-[#FF6B2B]">
                        ₹{item.price}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{item.name}</h3>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-semibold">{4.5}</span>
                        </div>
                        <span className="text-sm text-gray-500">"1000"+ sold</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 z-10 bg-[#FF6B2B] text-white rounded-full p-2 hover:bg-[#FF6B2B]/90 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#FF6B2B] focus:ring-opacity-50"
            aria-label="Next item"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
