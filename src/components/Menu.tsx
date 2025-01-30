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
import { Minus, Plus } from "lucide-react"
import type React from "react"

interface MenuProps {
  submenu: string
  tableNumber: number
}

const Menu: React.FC<MenuProps> = ({ submenu, tableNumber }) => {
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
    (item: MenuItem) => {
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
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredItems.map((item) => (
          <Card key={item.name} className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="bg-gray-50 p-3 sm:p-4">
              <CardTitle className="text-lg sm:text-xl font-semibold">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4">
                <p className="text-base sm:text-lg font-bold text-green-600 mb-2 sm:mb-0">₹{item.price.toFixed(2)}</p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.name, false)}
                    disabled={!quantities[item.name]}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                  <span className="w-6 sm:w-8 text-center text-sm sm:text-base" aria-live="polite" aria-atomic="true">
                    {quantities[item.name] || 0}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(item.name, true)}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
              <Button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white transition-colors duration-300 text-xs sm:text-sm py-1 sm:py-2"
                onClick={() => handleAddToOrder(item)}
                disabled={!quantities[item.name]}
                aria-label={`Add ${item.name} to order`}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Menu