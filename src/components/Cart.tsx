"use client"

import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus, History } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { removeFromCart, updateQuantity, clearCart, resetNewItemsCount } from "@/store/cartSlice"
import type { CartProps, OrderItem } from "@/lib/types"
import type { RootState } from "@/store/store"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import prisma from "@/lib/db"

export default function Cart({ tableNumber }: CartProps) {
  const dispatch = useDispatch()
  const orders = useSelector((state: RootState) => state.cart.items[tableNumber] || [])
  
  const [wsConnected, setWsConnected] = useState(false)
  const [showOtpModal, setShowOtpModal] = useState(false)
  const [showOrderHistoryModal, setShowOrderHistoryModal] = useState(false)
  const [otp, setOtp] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [orderHistory, setOrderHistory] = useState<OrderItem[]>([])
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  const { toast } = useToast()
  const ws = useRef<WebSocket | null>(null)

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return

    ws.current = new WebSocket("wss://ws-production-7739.up.railway.app/")
    ws.current.onopen = () => setWsConnected(true)
    ws.current.onclose = () => {
      setWsConnected(false)
      setTimeout(connectWebSocket, 3000)
    }
    ws.current.onerror = () => setWsConnected(false)
  }

  useEffect(() => {
    dispatch(resetNewItemsCount());
  }, [dispatch]);

  useEffect(() => {
    connectWebSocket()
    checkTableVerification()
    return () => ws.current?.close()
  }, [])

  const checkTableVerification = async () => {
    const tblNo = "0" + tableNumber
    const response = await fetch(`/api/secure?tableNumber=${tblNo}`, {
      method : 'GET'
    })
    const verified = await response.json();
    return verified;
  }

  const fetchOrderHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const response = await fetch(`/api/order?tableNumber=${tableNumber}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch order history')
      }
      const history = await response.json()
      setOrderHistory(history)
    } catch (error) {
      console.error("Error fetching order history:", error)
      toast({
        title: "Error",
        description: "Failed to load order history",
        variant: "destructive"
      })
    } finally {
      setIsLoadingHistory(false)
    }
  }

  function generateRandomString() {
    return Math.random().toString(36).substring(2, 8);
  }

  const verifyOtp = async () => {
    setVerifying(true)
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableNumber,
          otp
        }),
      })

      const data = await response.json();

      // if the otp is correct
      if (response.ok) {
        toast({
          title: "Success",
          description: "OTP verified successfully",
        })

        const tblNo = "0" + tableNumber
        //make that table secure 
        const response = await fetch(`/api/secure?tableNumber=${tblNo}`, {
          method : 'PATCH'
        })

        const allocatedId = generateRandomString();
        //save a random id in db and user localstorage
        await fetch('/api/allocate', {
          method : 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableNumber : tableNumber,
            allocatedId : allocatedId
          }),
        })

        localStorage.setItem('allocatedId', allocatedId);

        if(response.ok) {
          setShowOtpModal(false)
          sendOrderToAdmin()
        }
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      })
    } finally {
      setVerifying(false)
      setOtp("")
    }
  }

  const saveOrderToDatabase = async () => {
    try {
      for (const item of orders) {
        const response = await fetch('/api/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item: item.name,
            tableNumber,
            price: item.price,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity
          })
        })

        if (!response.ok) {
          throw new Error('Failed to save order')
        }
      }
      return true
    } catch (error) {
      console.error("Error saving order to database:", error)
      toast({
        title: "Error",
        description: "Failed to save order to database",
        variant: "destructive"
      })
      return false
    }
  }

  const handleSendToAdmin = async () => {
    const isVerified = await checkTableVerification();
    console.log(isVerified)

    if (!isVerified) {
      setShowOtpModal(true)
      return
    }

    const response = await fetch(`/api/allocate?tableNumber=${tableNumber}`);
    const allocatedId = await response.json();
    const storageAllocatedId = localStorage.getItem('allocatedId');

    if(allocatedId !== storageAllocatedId) {
      throw new Error('User Can not order food')
    }

    const savedSuccessfully = await saveOrderToDatabase()
    
    if (savedSuccessfully) {
      sendOrderToAdmin()
    }
  }

  const sendOrderToAdmin = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "admin_order_update",
          tableNumber,
          orders,
        })
      )
      toast({
        title: "Order Sent!",
        description: `Order from Table ${tableNumber} has been sent to the admin.`,
      })
      dispatch(clearCart(tableNumber))
    } else {
      toast({
        title: "Connection Error",
        description: "Failed to send order. WebSocket is not connected.",
        variant: "destructive",
      })
    }
  }

  const handleRemoveOrder = (name: string) => {
    dispatch(removeFromCart({ name, tableNumber }))
  }

  const handleUpdateQuantity = (name: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ name, tableNumber, quantity: newQuantity }))
    }
  }

  const handleClearOrder = () => {
    dispatch(clearCart(tableNumber))
  }

  const totalAmount = orders.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <div className="space-y-4">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Table {tableNumber} Order</span>
              <div className="flex items-center gap-2">
                <span 
                  className={`h-2 w-2 rounded-full ${
                    wsConnected ? "bg-green-500" : "bg-red-500"
                  }`} 
                />
                <Button 
                  variant="outline" 
                  onClick={() => {
                    fetchOrderHistory()
                    setShowOrderHistoryModal(true)
                  }}
                  aria-label="View Order History"
                >
                  <History className="h-4 w-4 mr-2" /> Order History
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={handleClearOrder} 
                  disabled={orders.length === 0}
                >
                  Clear Order
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No items in cart</p>
            ) : (
              <div className="space-y-4">
                {orders.map((item) => (
                  <div
                    key={item.name}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleUpdateQuantity(item.name, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm px-2">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleUpdateQuantity(item.name, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm text-gray-500 ml-2">
                          × ₹{item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveOrder(item.name)}
                        aria-label={`Remove ${item.name} from order`}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 font-medium">
                  <span>Total Amount:</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-center pt-4">
                  <Button 
                    variant="default" 
                    onClick={handleSendToAdmin} 
                    className="bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300 py-3 px-6 rounded-md text-base font-semibold w-full md:w-auto"
                  >
                    Order Now
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Table</DialogTitle>
            <DialogDescription>
              Please enter the OTP provided by the admin to verify this table.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              type="text"
              maxLength={6}
            />
            <Button 
              className="w-full" 
              onClick={verifyOtp}
              disabled={verifying || !otp}
            >
              {verifying ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Order History Modal */}
      <Dialog open={showOrderHistoryModal} onOpenChange={setShowOrderHistoryModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order History for Table {tableNumber}</DialogTitle>
            <DialogDescription>
              Recent orders for this table
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {isLoadingHistory ? (
              <div className="text-center py-4">Loading order history...</div>
            ) : orderHistory.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No previous orders found
              </div>
            ) : (
              <ScrollArea className="h-[300px] pr-4">
                {orderHistory.map((order, index) => (
                  <div 
                    key={index} 
                    className="border-b last:border-b-0 py-2 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{order.item}</span>
                      <div className="text-sm text-gray-500">
                        {order.quantity} × ₹{order.price.toFixed(2)}
                      </div>
                    </div>
                    <span className="font-medium">
                      ₹{(order.quantity * order.price).toFixed(2)}
                    </span>
                  </div>
                ))}
              </ScrollArea>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}