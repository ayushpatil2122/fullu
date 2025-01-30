"use client"
import { useState } from "react"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function MenuNavbar() {
  const categories = ["Veg","Paneer", "Chicken" , "Eggs", "Mutton", "Roti","Dal" , "Rice", "Thali", "Chinese"]

  const [activeCategory, setActiveCategory] = useState("Veg")

  return (
    <div className="p-6 pb-10">
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {categories.map((category) => (
          <Link href={`${category}`} key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-2 text-sm font-medium border rounded-lg transition-colors duration-200 ${
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
      <div className="fixed bottom-4 right-4 z-10">
        {" "}
        {/* Added z-10 to ensure the button stays on top */}
        <Link href="cart">
          <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors duration-200 flex items-center">
            <ShoppingCart className="mr-2" size={20} />
            Cart
          </button>
        </Link>
      </div>
    </div>
  )
}
