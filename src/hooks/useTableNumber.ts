"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export function useTableNumber(urlTableNumber: number) {
  const [tableNumber, setTableNumber] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const storedTableNumber = localStorage.getItem("tableNumber")

    if (storedTableNumber) {
      const parsedTableNumber = Number.parseInt(storedTableNumber, 10)
      setTableNumber(parsedTableNumber)

      if (parsedTableNumber !== urlTableNumber) {
        router.replace(`/table/${parsedTableNumber}/menu/NonVeg`)
      }
    } else {
      localStorage.setItem("tableNumber", urlTableNumber.toString())
      setTableNumber(urlTableNumber)
    }
  }, [urlTableNumber, router])

  return tableNumber
}

