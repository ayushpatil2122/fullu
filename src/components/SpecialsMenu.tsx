"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { menuItems } from "@/lib/types"
import { Badge } from "@/components/ui/badge"


export default function SpecialsMenu() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)
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
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#FF6B2B]">Today's Special</h2>

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
                      <Badge className="absolute top-2 left-2 bg-[#FF6B2B] text-white">Special</Badge>
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
