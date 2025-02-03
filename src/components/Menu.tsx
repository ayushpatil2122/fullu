"use client"

import { toast } from "@/hooks/use-toast"
import type { MenuItem } from "@/lib/types"
import type { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "./ui/button"
import { addToCart, updateQuantity } from "@/store/cartSlice"
import { menuData } from "./data"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { useState, useCallback } from "react"
import {  Minus, Plus, Search } from "lucide-react"
import type React from "react"
import { useCartStore } from "@/store/cartStore"

interface MenuProps {
  submenu: string
  tableNumber: number
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

type OrderItem = {
  name: string;
  price: number;
}

const Menu: React.FC<MenuProps> = ({ submenu, tableNumber }) => {
  const { totalItems } = useCartStore()
  const cartItems = useSelector((state: RootState) => state.cart.items[tableNumber] || [])
  const dispatch = useDispatch()
  const items = menuData[submenu as keyof typeof menuData] || []
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({})
  const [searchQuery, setSearchQuery] = useState("")

  const handleQuantityChange = useCallback((itemName: string, increment: boolean) => {
    setQuantities((prev) => {
      const currentQuantity = prev[itemName] || 0
      const newQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1)
      return { ...prev, [itemName]: newQuantity }
    })
  }, [])

  const handleAddToOrder = useCallback(
    (item: OrderItem) => {
      const quantity = quantities[item.name] || 0
      if (quantity === 0) {
        toast({
          title: "Cannot add to order",
          description: "Please select a quantity greater than zero.",
          variant: "destructive",
        })
        return
      }

      const existingItem = cartItems.find((cartItem) => cartItem.name === item.name)
      if (existingItem) {
        dispatch(updateQuantity({ name: item.name, tableNumber, quantity: existingItem.quantity + quantity }))
      } else {
        dispatch(
          addToCart({
            item: {
              name: item.name,
              price: Number(item.price),
              quantity,
            },
            tableNumber,
          }),
        )
      }

      toast({
        title: "Item added to cart",
        description: `Added ${quantity} ${item.name}(s) to your cart.`,
      })
      setQuantities((prev) => ({ ...prev, [item.name]: 0 }))
    },
    [cartItems, dispatch, quantities, tableNumber],
  )

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-8 px-2">
      <div className="relative w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder=" Find your favorite dishes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full bg-white shadow-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm transition-all duration-300"
        />
      </div>
    </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <Card
  key={item.name}
  className="overflow-hidden transition-shadow duration-300 hover:shadow-md rounded-lg border border-gray-200"
>
            {/* Header */}
            <CardHeader className="bg-gray-50 p-4 ">
              <CardTitle className="text-lg font-semibold  font-lexend-deca text-gray-900">{item.name}</CardTitle>
            </CardHeader>
      
            {/* Content */}
            <CardContent className="p-4 flex flex-col space-y-3">
              {/* Price, Quantity, and Add to Cart in the Same Row */}
              <div className="flex items-center justify-between w-full">
                {/* Price */}
                <p className="text-lg font-bold text-gray-800 font-lexend-deca">
                  ₹{Number(item.price).toFixed(2)}
                </p>
      
                {/* Quantity Selector */}
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.name, false)}
                    disabled={!quantities[item.name]}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center text-base font-medium">{quantities[item.name] || 0}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.name, true)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
      
                {/* Add to Cart Button */}
                <Button
                  className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 py-2 px-4 rounded-md text-sm"
                  onClick={() => handleAddToOrder({
                    name: item.name,
                    price: Number(item.price)
                  })}
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
    </div>
  )
}

export default Menu