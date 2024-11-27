import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export default function MenuCategories() {
  const categories = [
    {
      title: "Starter",
      description: "Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
          <path d="M3.5 14.5s1.5 2 8.5 2 8.5-2 8.5-2" />
          <path d="M11 4c2.5 0 3.5 1.5 3.5 1.5" />
        </svg>
      ),
      color: "text-[#FF6B2B]",
    },
    {
      title: "Main dishes",
      description: "Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12"
        >
          <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          <path d="M6 12h12" />
        </svg>
      ),
      color: "text-black",
    },
    {
      title: "Drinks",
      description: "Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12"
        >
          <path d="M6 2v2a6 6 0 0 0 12 0V2" />
          <path d="M5 10h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" />
          <path d="M15 14v3" />
          <path d="M9 14v3" />
        </svg>
      ),
      color: "text-black",
    },
    {
      title: "Desserts",
      description: "Lorem ipsum dolor sit amet conse ctetur adipiscing elit sed do.",
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="w-12 h-12"
        >
          <path d="M5 8h14" />
          <path d="M12 2v6" />
          <path d="M5 14a7 7 0 0 0 14 0H5z" />
        </svg>
      ),
      color: "text-[#FF6B2B]",
    },
  ]

  return (
    <section className="py-5 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Browse menu by category</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-[#FFF5F2] rounded-3xl p-8 flex flex-col items-center text-center"
            >
              <div className="mb-6">
                <div className="text-[#FF6B2B]">{category.icon}</div>
              </div>
              <h3 className={`text-2xl font-bold mb-4 ${category.color}`}>{category.title}</h3>
              <p className="text-gray-600 mb-6">{category.description}</p>
              <Link
                href="#"
                className="text-[#FF6B2B] font-semibold inline-flex items-center hover:opacity-80 transition-opacity"
              >
                Browse category
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
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

