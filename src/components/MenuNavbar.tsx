"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart } from "lucide-react"
import { useAppSelector } from "@/hooks/useAppSelector"

export default function MenuNavbar() {
  const categories = [
    "All", "Beverages", "Fries", "Hot", "Sandwich", "Momos", "Mocktails"
  ]
  
  const pathname = usePathname()
  const currentCategory = pathname.split("/").pop() || "Veg"
  const [activeCategory, setActiveCategory] = useState(currentCategory)
  const newItemsCount = useAppSelector((state) => state.cart.newItemsCount);
  
  useEffect(() => {
    setActiveCategory(currentCategory)
  }, [currentCategory])
  
  return (
    <div className="relative">
      <div className="p-4 pb-8">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {categories.map((category) => (
            <Link href={`${category}`} key={category} className="w-full">
              <button
                onClick={() => setActiveCategory(category)}
                className={`w-full py-1 sm:py-2 text-xs sm:text-lg font-medium border rounded-lg text-center transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-orange-500 text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            </Link>
          ))}
        </div>
      </div>
      
      <Link href="cart" className="fixed bottom-6 right-6 z-50">
        <button
          className="relative bg-orange-500 text-white p-4 rounded-xl shadow-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center w-28 backdrop-blur-sm"
          aria-label="View Cart"
        >
          <div className="gap-2 flex items-center">
            <ShoppingCart className="w-6 h-6" />
            <span className="font-medium">Cart</span>
          </div>
          {newItemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
              {newItemsCount}
            </span>
          )}
        </button>
      </Link>
    </div>
  )
}