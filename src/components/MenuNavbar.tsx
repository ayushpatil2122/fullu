"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

export default function MenuNavbar() {
  const categories = [
    "Starter", "Veg", "Paneer", "Chicken", "Eggs", "Mutton",
    "Roti", "Dal", "Rice", "Thali", "Chinese", "Drinks", "cart"
  ]

  // Get the current pathname
  const pathname = usePathname()
  // Extract the category from the pathname
  const currentCategory = pathname.split("/").pop() || "Veg"

  // Set the active category based on the current route
  const [activeCategory, setActiveCategory] = useState(currentCategory)

  // Update the activeCategory state when the route changes
  useEffect(() => {
    setActiveCategory(currentCategory)
  }, [currentCategory])

  return (
    <div className="p-4 pb-8">
      <div className="grid grid-cols-6 sm:grid-cols-4 gap-2">
        {categories.map((category) => (
          <Link href={`${category}`} key={category} className="w-full">
            <button
              onClick={() => setActiveCategory(category)}
              className={`w-full py-2 text-sm font-medium border rounded-lg text-center transition-all duration-200 ${
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
  )
}