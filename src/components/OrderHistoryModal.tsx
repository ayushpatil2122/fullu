import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { OrderItem } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

interface OrderHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  tableNumber: number
}

export function OrderHistoryModal({ 
  isOpen, 
  onClose, 
  tableNumber 
}: OrderHistoryModalProps) {
  const [orderHistory, setOrderHistory] = useState<OrderItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchOrderHistory = async () => {
      if (!isOpen) return

      setIsLoading(true)
      try {
        const response = await fetch(`/api/orders?tableNumber=${tableNumber}`)
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
        setIsLoading(false)
      }
    }

    fetchOrderHistory()
  }, [isOpen, tableNumber])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Order History for Table {tableNumber}</DialogTitle>
          <DialogDescription>
            Recent orders for this table
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {isLoading ? (
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
  )
}