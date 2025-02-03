"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export function useTableNumber(urlTableNumber: number) {
  const [tableNumber, setTableNumber] = useState<number | null>(null)
  const router = useRouter()
  const pathname = usePathname() // Get the current route path

  useEffect(() => {
    const storedTableNumber = localStorage.getItem("tableNumber")

    if (storedTableNumber) {
      const parsedTableNumber = Number.parseInt(storedTableNumber, 10)
      setTableNumber(parsedTableNumber)

      // Only redirect if the current route is not a category-specific route
      if (parsedTableNumber !== urlTableNumber && !pathname.includes("/menu/")) {
        router.replace(`/table/${parsedTableNumber}/menu/Veg`)
      }
    } else {
      localStorage.setItem("tableNumber", urlTableNumber.toString())
      setTableNumber(urlTableNumber)
    }
  }, [urlTableNumber, router, pathname])

  return tableNumber
}