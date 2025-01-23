'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from "react"
import { menuItems } from "@/lib/types"


export default function SpecialsMenu() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(2)
  
  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(window.innerWidth < 768 ? 1 : 2)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + itemsPerPage) >= menuItems.length ? 0 : prevIndex + itemsPerPage
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? menuItems.length - itemsPerPage : prevIndex - itemsPerPage
    )
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Today's specials menu</h2>
        
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-[#FF6B2B] text-white rounded-full p-2 hover:bg-[#FF6B2B]/90 transition-colors"
            aria-label="Previous item"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` }}
            >
              {menuItems.map((item) => (
                <div key={item.id} className={`w-full md:w-1/2 flex-shrink-0 px-2 md:px-4`}>
                  <Card className="overflow-hidden">
                    <div className="relative">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={300}
                        className="w-full h-[200px] object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-white px-2 py-1 rounded-full text-sm font-bold border-2">
                      ₹ {item.price} 
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-[#FF6B2B] text-white rounded-full p-2 hover:bg-[#FF6B2B]/90 transition-colors"
            aria-label="Next item"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="rounded-full px-8 py-6 h-auto text-lg border-2 hover:bg-gray-100"
          >
            Browse all menu
          </Button>
        </div>
      </div>
    </section>
  )
}

