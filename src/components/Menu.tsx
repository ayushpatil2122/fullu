'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "./ui/button"
import { Minus, Plus } from "lucide-react"
import { useMemo, useState } from "react"
import { toast } from '@/hooks/use-toast'


const menuData = {
  Veg : [
      { name: "Akha Masur", price: 140, description: "Akha Masur" },
      { name: "Masur Kolhapuri", price: 160, description: "Masur Kolhapuri" },
      { name: "Masur Lasuni", price: 170, description: "Masur Lasuni" },
      { name: "Rajma Masala", price: 140, description: "Rajma Masala" },
      { name: "Chana Masala", price: 150, description: "Chana Masala" },
      { name: "Green Peas Masala", price: 150, description: "Green Peas Masala" },
      { name: "Shev Bhaji", price: 150, description: "Shev Bhaji" },
      { name: "Soyabin Masala", price: 150, description: "Soyabin Masala" },
      { name: "Baigan Masala", price: 150, description: "Baigan Masala" },
      { name: "Bhendi Masala", price: 150, description: "Bhendi Masala" },
      { name: "Bhendi Fry", price: 150, description: "Bhendi Fry" },
      { name: "Aloo Matar", price: 150, description: "Aloo Matar" },
      { name: "Aloo Gobi", price: 160, description: "Aloo Gobi" },
      { name: "Aloo Jira", price: 160, description: "Aloo Jira" },
      { name: "Aloo Palak", price: 160, description: "Aloo Palak" },
      { name: "Aloo Methi", price: 160, description: "Aloo Methi" },
      { name: "Kaju Masala", price: 230, description: "Kaju Masala" },
      { name: "Kaju Matar", price: 250, description: "Kaju Matar" },
      { name: "Kaju Shev", price: 310, description: "Kaju Shev" },
      { name: "Kaju Paneer Handi", price: 310, description: "Kaju Paneer Handi" },
      { name: "Pane Palak", price: 140, description: "Pane Palak" },
      { name: "Palak Matar", price: 160, description: "Palak Matar" },
      { name: "Palak Paneer", price: 190, description: "Palak Paneer" },
      { name: "Palak Mushroom", price: 210, description: "Palak Mushroom" },
      { name: "Methi Masala", price: 140, description: "Methi Masala" },
      { name: "Methi Matar", price: 160, description: "Methi Matar" },
      { name: "Methi Paneer", price: 190, description: "Methi Paneer" },
      { name: "Methi Malai", price: 210, description: "Methi Malai" },
      { name: "Mushroom Masala", price: 210, description: "Mushroom Masala" },
      { name: "Mushroom Paneer", price: 230, description: "Mushroom Paneer" },
      { name: "Mushroom Kadhal", price: 230, description: "Mushroom Kadhal" },
      { name: "Mix Veg", price: 160, description: "Mix Veg" },
      { name: "Veg Kolhapuri", price: 220, description: "Veg Kolhapuri" },
      { name: "Veg Handi", price: 220, description: "Veg Handi" },
      { name: "Veg Kadhal", price: 220, description: "Veg Kadhal" },
      { name: "Veg Hydrabadi", price: 220, description: "Veg Hydrabadi" },
      { name: "Veg Jajpuri", price: 220, description: "Veg Jajpuri" },
      { name: "Veg Kofta", price: 150, description: "Veg Kofta" },
      { name: "Veg Bhuna", price: 150, description: "Veg Bhuna" },
      { name: "Veg Maratha", price: 150, description: "Veg Maratha" },
      { name: "Matki Masala", price: 150, description: "Matki Masala" },
      { name: "Matki Curry", price: 160, description: "Matki Curry" },
      { name: "Aloo Matki", price: 160, description: "Aloo Matki" },
      { name: "Paneer Masala", price: 140, description: "Paneer Masala" },
      { name: "Paneer Butter Masala", price: 170, description: "Paneer Butter Masala" },
      { name: "Paneer Makhanwala", price: 180, description: "Paneer Makhanwala" },
      { name: "Paneer Mattar", price: 180, description: "Paneer Mattar" },
      { name: "Paneer Kolhapuri", price: 220, description: "Paneer Kolhapuri" },
      { name: "Paneer Tikka Masala", price: 240, description: "Paneer Tikka Masala" },
      { name: "Paneer Bhurji Dry", price: 180, description: "Paneer Bhurji Dry" },
      { name: "Paneer Bhurji Gravy", price: 230, description: "Paneer Bhurji Gravy" },
      { name: "Paneer Kofta", price: 250, description: "Paneer Kofta" },
      { name: "Paneer Handi", price: 120, description: "Paneer Handi" },
      { name: "Dal Fry", price: 140, description: "Dal Fry" },
      { name: "Butter Dal Fry", price: 160, description: "Butter Dal Fry" },
      { name: "Dal Kolhapuri", price: 190, description: "Dal Kolhapuri" },
      { name: "Dal Tadka", price: 210, description: "Dal Tadka" },
  ],
  NonVeg : [
    { name: "Anda Boil", price: 70, description: "Anda Boil" },
    { name: "Anda Omlet", price: 90, description: "Anda Omlet" },
    { name: "Anda Bhurji", price: 130, description: "Anda Bhurji" },
    { name: "Anda Masala", price: 150, description: "Anda Masala" },
    { name: "Anda Kolhapuri", price: 160, description: "Anda Kolhapuri" },
    { name: "Anda Hyderabadi", price: 160, description: "Anda Hyderabadi" },
    { name: "Anda Biryani", price: 170, description: "Anda Biryani" },
    { name: "Chicken Biryani (Half)", price: 230, description: "Chicken Biryani (Half)" },
    { name: "Chicken Hyderabadi Biryani", price: 250, description: "Chicken Hyderabadi Biryani" },
    { name: "Mutton Biryani", price: 290, description: "Mutton Biryani" },
    { name: "Mutton Malvani", price: 350, description: "Mutton Malvani" },
    { name: "Chicken Sukha", price: 365, description: "Chicken Sukha" },
    { name: "Chicken Hyderabadi", price: 370, description: "Chicken Hyderabadi" },
    { name: "Chicken Malvani", price: 375, description: "Chicken Malvani" },
    { name: "Chicken Handi", price: 410, description: "Chicken Handi" },
    { name: "Mutton Sukha", price: 470, description: "Mutton Sukha" },
    { name: "Mutton Kolhapuri", price: 470, description: "Mutton Kolhapuri" },
    { name: "Mutton Hyderabadi", price: 470, description: "Mutton Hyderabadi" },
    { name: "Mutton Handi", price: 495, description: "Mutton Handi" },
    { name: "Chicken Kolhapuri", price: 590, description: "Chicken Kolhapuri" }
  ],


  Roti : [
    { name: "Chapati", price: 12, description: "Chapati" },
    { name: "Butter Chapati", price: 15, description: "Butter Chapati" },
    { name: "Roti", price: 15, description: "Roti" },
    { name: "Butter Roti", price: 22, description: "Butter Roti" },
    { name: "Naan", price: 40, description: "Naan" },
    { name: "Butter Naan", price: 45, description: "Butter Naan" },
    { name: "Garlic Butter Naan", price: 55, description: "Garlic Butter Naan" },
    { name: "Kulcha", price: 40, description: "Kulcha" },
    { name: "Butter Kulcha", price: 45, description: "Butter Kulcha" },
    { name: "Paratha", price: 45, description: "Paratha" },
    { name: "Butter Paratha", price: 50, description: "Butter Paratha" }
  ],
  Rice : [
  { name: "Plain Rice", price: 80, description: "Plain Rice" },
  { name: "Jeera Rice", price: 90, description: "Jeera Rice" },
  { name: "Dal Khichadi", price: 150, description: "Dal Khichadi" },
  { name: "Green Peas Pulav", price: 160, description: "Green Peas Pulav" },
  { name: "Veg Biryani", price: 160, description: "Veg Biryani" },
  { name: "Veg Pulav", price: 170, description: "Veg Pulav" },
  { name: "Paneer Biryani", price: 170, description: "Paneer Biryani" },
  { name: "Veg Hyderabadi Biryani", price: 180, description: "Veg Hyderabadi Biryani" },
  { name: "Paneer Pulav", price: 180, description: "Paneer Pulav" },
  { name: "Mushroom Biryani", price: 210, description: "Mushroom Biryani" },
  { name: "Kaju Biryani", price: 210, description: "Kaju Biryani" }
],
Thali : [
  { name: "Green Peas Thali", price: 140, description: "Green Peas, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Akkha Masur Thali", price: 140, description: "Akkha Masur, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Shev Bhaji Thali", price: 150, description: "Shevbhaji, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Bhendi Masala Thali", price: 150, description: "Bhendi Masala, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Baigan Masala Thali", price: 150, description: "Baigan Masala, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Mix Veg Thali", price: 150, description: "Mix Veg, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Alu Mutter Thali", price: 150, description: "Alu Mutter, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Paneer Masala Thali", price: 150, description: "Paneer, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Soyabin Thali", price: 150, description: "Soyabin, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Matki Thali", price: 150, description: "Matki, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Rajma Thali", price: 150, description: "Rajma, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
  { name: "Chana Masala Thali", price: 150, description: "Chana Masala, 3 Chapati / 2 Roti, Dal Vati, Jeera Rice, Tak Vati" },
],
Chinese : [
  { name: "Veg Manchurian", price: 170, description: "Veg Manchurian" },
  { name: "Veg Chilli", price: 170, description: "Veg Chilli" },
  { name: "Veg 65", price: 170, description: "Veg 65" },
  { name: "Paneer Manchurian", price: 210, description: "Paneer Manchurian" },
  { name: "Paneer Chilli", price: 210, description: "Paneer Chilli" },
  { name: "Paneer 65", price: 210, description: "Paneer 65" },
  { name: "Chicken Manchurian", price: 220, description: "Chicken Manchurian" },
  { name: "Chicken Chilli", price: 200, description: "Chicken Chilli" },
  { name: "Chicken 65", price: 200, description: "Chicken 65" },
  { name: "Anda Manchurian", price: 200, description: "Anda Manchurian" },
  { name: "Anda Chilli", price: 200, description: "Anda Chilli" },
  { name: "Anda 65", price: 200, description: "Anda 65" },
  { name: "Veg Manchow Soup", price: 110, description: "Veg Manchow Soup" },
  { name: "Veg Hot & Sour Soup", price: 110, description: "Veg Hot & Sour Soup" },
  { name: "Clear Soup", price: 110, description: "Clear Soup" },
  { name: "Chicken Manchow Soup", price: 140, description: "Chicken Manchow Soup" },
  { name: "Chicken Hot & Sour Soup", price: 140, description: "Chicken Hot & Sour Soup" },
  { name: "Chicken Clear Soup", price: 140, description: "Chicken Clear Soup" },
  { name: "Veg Fried Rice", price: 160, description: "Veg Fried Rice" },
  { name: "Veg Schezwan Rice", price: 170, description: "Veg Schezwan Rice" },
  { name: "Veg Triple Schezwan Rice", price: 250, description: "Veg Triple Schezwan Rice" },
  { name: "Anda Fried Rice", price: 180, description: "Anda Fried Rice" },
  { name: "Anda Schezwan Rice", price: 190, description: "Anda Schezwan Rice" },
  { name: "Anda Triple Schezwan Rice", price: 270, description: "Anda Triple Schezwan Rice" },
  { name: "Chicken Fried Rice", price: 220, description: "Chicken Fried Rice" },
  { name: "Chicken Schezwan Rice", price: 230, description: "Chicken Schezwan Rice" },
  { name: "Chicken Triple Schezwan Rice", price: 320, description: "Chicken Triple Schezwan Rice" },
  { name: "Veg Noodles", price: 160, description: "Veg Noodles" },
  { name: "Veg Schezwan Noodles", price: 170, description: "Veg Schezwan Noodles" },
  { name: "Veg Triple Schezwan Noodles", price: 250, description: "Veg Triple Schezwan Noodles" },
  { name: "Anda Noodles", price: 180, description: "Anda Noodles" },
  { name: "Anda Schezwan Noodles", price: 190, description: "Anda Schezwan Noodles" },
  { name: "Anda Triple Schezwan Noodles", price: 270, description: "Anda Triple Schezwan Noodles" },
  { name: "Chicken Noodles", price: 220, description: "Chicken Noodles" },
  { name: "Chicken Schezwan Noodles", price: 230, description: "Chicken Schezwan Noodles" },
  { name: "Chicken Triple Schezwan Noodles", price: 320, description: "Chicken Triple Schezwan Noodles" },
  { name: "Chicken Tandoor Half", price: 200, description: "Chicken Tandoor Half" },
  { name: "Chicken Lollipop Half", price: 120, description: "Chicken Lollipop Half" },
  { name: "Chicken Tandoor Full", price: 380, description: "Chicken Tandoor Full" },
  { name: "Chicken Lollipop Full", price: 160, description: "Chicken Lollipop Full" }
],

  NonVegThalis : [
  {
    name: "Egg Thali",
    price: 180,
    description: "Egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  },
  {
    name: "Mini Chicken Thali",
    price: 220,
    description: "Chicken masala, 3 chapatis or 2 rotis, mixed vegetable gravy, jeera rice"
  },
  {
    name: "Chicken Fry Thali",
    price: 240,
    description: "Chicken fry, egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  },
  {
    name: "Chicken Masala Thali",
    price: 240,
    description: "Chicken masala, egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  },
  {
    name: "Mutton Fry Thali",
    price: 340,
    description: "Mutton fry, egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  },
  {
    name: "Mutton Masala Thali",
    price: 340,
    description: "Mutton masala, egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  },
  {
    name: "Special Chicken Thali",
    price: 400,
    description: "Chicken fry, chicken masala, egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  },
  {
    name: "Special Mutton Thali",
    price: 510,
    description: "Mutton fry, mutton masala, egg curry, mixed vegetable gravy, jeera rice, 3 chapatis or 2 rotis"
  }
]
}

type MenuItem = {
  name: string
  price: number
  description: string
}

const MenuItemCard = ({ item, order, onOrder }: { item: MenuItem; order: number; onOrder: (name: string, increment: boolean) => void }) => (
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
          onClick={() => onOrder(item.name, false)}
          disabled={!order}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-8 text-center">{order}</span>
        <Button
          variant="outline" 
          size="icon"
          onClick={() => onOrder(item.name, true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button className="bg-orange-500">
          Add
        </Button>
      </div>
    </CardContent>
  </Card>
)

export default function Menu({ submenu }: { submenu: string }) {
  const [order, setOrder] = useState<{ [key: string]: number }>({})

  const handleOrder = (itemName: string, increment: boolean) => {
    setOrder(prevOrder => {
      const currentQuantity = prevOrder[itemName] || 0
      const newQuantity = increment ? currentQuantity + 1 : Math.max(0, currentQuantity - 1)
      
      const newOrder = {
        ...prevOrder,
        [itemName]: newQuantity
      }

      if (newQuantity === 0) {
        delete newOrder[itemName]
      }

      toast({
        title: increment ? "Item added to order" : "Item removed from order",
        description: `${itemName} has been ${increment ? 'added to' : 'removed from'} your order.`,
      })

      return newOrder
    })
  }

  const menuItems = useMemo(() => menuData[submenu as keyof typeof menuData] || [], [submenu])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {menuItems.map((item) => (
        <MenuItemCard
          key={item.name}
          item={item}
          order={order[item.name] || 0}
          onOrder={handleOrder}
        />
      ))}
    </div>
  )
}

