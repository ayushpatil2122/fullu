'use client'
import { useState } from "react";
import Link from "next/link";

export default function MenuNavbar() {
  const categories = ["Veg", "NonVeg", "Roti", "Rice", "Thali", "Chinese", "cart"];

  const [activeCategory, setActiveCategory] = useState("Veg");


  return (
    <div className=" p-6">
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold mb-2">Browse our menu</h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod
          tempor incididunt ut labore et dolore.
        </p>
      </header>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <Link href={`${category}`} key={category}>
            <button
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-200 ${
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
  );
}
