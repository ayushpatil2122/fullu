'use client'

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from 'lucide-react'
import { menuData } from "./data"
import { useToast } from "@/hooks/use-toast"

type MenuItem = {
  name: string
  price: number
  description: string
}

export default function Menu({ submenu, tableNumber }: { submenu: string, tableNumber: number }) {
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const { toast } = useToast()

  const menuItems = useMemo(() => menuData[submenu as keyof typeof menuData] || [], [submenu])

  const handleQuantityChange = (itemName: string, increment: boolean) => {
    setQuantities(prev => {
      const currentQuantity = prev[itemName] || 0
      const newQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1)
      return { ...prev, [itemName]: newQuantity }
    })
  }

  const handleAddToOrder = async (item: MenuItem) => {
    const quantity = quantities[item.name] || 0
    if (quantity === 0) {
      toast({
        title: "Cannot add to order",
        description: "Please select a quantity greater than zero.",
        variant: "destructive",
      })
      return
    }

    const totalPrice : number = quantity * item.price

    try {
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          item: item.name,
          tableNumber: tableNumber,
          price: item.price,
          quantity: quantity,
          totalPrice: totalPrice
        })
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Order submitted successfully",
          description: `Added ${quantity} ${item.name}(s) to your order.`,
        })
        // Reset quantity after successful order
        setQuantities(prev => ({ ...prev, [item.name]: 0 }))
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit order')
      }
    } catch (error) {
      console.error("Error submitting order:", error)
      toast({
        title: "Failed to place order",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item) => (
        <Card key={item.name}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{item.name}</span>
              <span className="text-lg font-normal">₹{item.price.toFixed(2)}</span>
            </CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(item.name, false)}
                disabled={!quantities[item.name]}
                aria-label={`Decrease quantity of ${item.name}`}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center" aria-live="polite" aria-atomic="true">
                {quantities[item.name] || 0}
              </span>
              <Button
                variant="outline" 
                size="icon"
                onClick={() => handleQuantityChange(item.name, true)}
                aria-label={`Increase quantity of ${item.name}`}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => handleAddToOrder(item)}
                disabled={!quantities[item.name]}
                aria-label={`Add ${item.name} to order`}
              >
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

