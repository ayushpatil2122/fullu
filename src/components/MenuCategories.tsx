"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"

export default function MenuCategories() {
  const params = useParams()
  const tableNumber = params.selectedTable

  const categoryMapping: { [key: string]: string } = {
    "Mocktails": "Mocktails",
    "Momos": "Momos",
    "Sandwich": "Sandwich",
    "Fries": "Fries",
  }

  const categories = [
    {
      title: "Mocktails",
      description: "Refresh yourself with our signature mocktails and beverages.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          {/* Mocktail glass with straw and garnish */}
          <path d="M8 2l8 0" />
          <path d="M12 2v4" />
          <path d="M6 6l12 0" />
          <path d="M7 6l2 16h6l2-16" />
          <path d="M4 6l3 5" />
          <path d="M20 6l-3 5" />
          <circle cx="12" cy="10" r="1" />
        </svg>
      ),
    },
    {
      title: "Momos",
      description: "Savor our delicious variety of steamed and fried momos.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          {/* Dumpling/momo shape */}
          <path d="M12 4c4.4 0 8 2.7 8 6s-3.6 6-8 6-8-2.7-8-6 3.6-6 8-6z" />
          <path d="M4 10s1.5 4 8 4 8-4 8-4" />
          <path d="M7 8s2-1 5-1 5 1 5 1" />
        </svg>
      ),
    },
    {
      title: "Sandwich",
      description: "Try our fresh and tasty grilled sandwich selections.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          {/* Sandwich layers */}
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
          <path d="M4 7c0-1 1-2 2-2h12c1 0 2 1 2 2" />
          <path d="M4 17c0 1 1 2 2 2h12c1 0 2-1 2-2" />
        </svg>
      ),
    },
    {
      title: "Fries",
      description: "Enjoy our crispy and flavorful french fries.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          {/* French fries in container */}
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M7 12V5" />
          <path d="M12 12V3" />
          <path d="M17 12V5" />
          <path d="M9 12V7" />
          <path d="M15 12V7" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-orange-50">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-4xl font-bold text-center mb-16 text-[#FF6B2B]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Browse Menu by Category
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {categories.map((category, index) => {
            const mappedCategory = categoryMapping[category.title] || category.title

            return (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-lg transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-6">
                  <div className="text-[#FF6B2B] bg-orange-50 p-4 rounded-full">{category.icon}</div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[#FF6B2B]">{category.title}</h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="text-[#FF6B2B] border-[#FF6B2B] hover:bg-white hover:text-[#FF6B2B] transition-colors duration-300"
                >
                  <Link href={`/table/${tableNumber}/menu/${mappedCategory}`} passHref>
                    Browse Category
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}