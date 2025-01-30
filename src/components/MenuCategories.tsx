"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function MenuCategories() {
  const categories = [
    {
      title: "Starter",
      description: "Begin your culinary journey with our exquisite appetizers.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M3.5 14.5s1.5 2 8.5 2 8.5-2 8.5-2" />
          <path d="M11 4c2.5 0 3.5 1.5 3.5 1.5" />
        </svg>
      ),
    },
    {
      title: "Main Dishes",
      description: "Savor our chef's signature creations and hearty entrees.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          <path d="M6 12h12" />
        </svg>
      ),
    },
    {
      title: "Drinks",
      description: "Quench your thirst with our refreshing beverage selection.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          <path d="M6 2v2a6 6 0 0 0 12 0V2" />
          <path d="M5 10h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" />
          <path d="M15 14v3" />
          <path d="M9 14v3" />
        </svg>
      ),
    },
    {
      title: "Desserts",
      description: "Indulge in our heavenly sweet treats to end your meal.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-12 h-12">
          <path d="M5 8h14" />
          <path d="M12 2v6" />
          <path d="M5 14a7 7 0 0 0 14 0H5z" />
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
          {categories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-lg  transition-shadow duration-300"
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
                <Link href="#" className="group">
                  Browse Category
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
