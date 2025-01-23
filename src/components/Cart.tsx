'use client'

import { useEffect, useState, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus, Minus } from 'lucide-react'
import { CartProps, WebSocketMessage } from '@/lib/types'
import { OrderItem } from '@/lib/types'



export default function Cart({ tableNumber }: CartProps) {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [wsConnected, setWsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      setWsConnected(true);
    };

    ws.current.onclose = () => {
      console.log('WebSocket disconnected');
      setWsConnected(false);
      // Attempt to reconnect after 3 seconds
      setTimeout(connectWebSocket, 3000);
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
      setWsConnected(false);
    };

    ws.current.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketMessage = JSON.parse(event.data);
        if (data.type === 'connection') {
          console.log('Connection status:', data.status);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
  };

  const broadcastOrderUpdate = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({
        type: 'order_update',
        tableNumber,
        orders
      }));
    }
  };

  const sendOrdersToAdmin = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      const message: WebSocketMessage = {
        type: 'admin_order_update',
        tableNumber,
        orders
      };
      ws.current.send(JSON.stringify(message));
      console.log('Sent admin_order_update:', message);
    } else {
      console.error('WebSocket is not connected. Unable to send admin_order_update.');
    }
  };

  useEffect(() => {
    connectWebSocket();
    fetchOrders();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [tableNumber]);

  // Broadcast orders when they change
  useEffect(() => {
    if (orders.length > 0) {
      broadcastOrderUpdate();
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/order/${tableNumber}`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data: OrderItem[] = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveOrder = async (orderId: number) => {
    try {
      const response = await fetch(`/api/order/${tableNumber}?orderId=${orderId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove order');
      await fetchOrders();
    } catch (error) {
      console.error('Error removing order:', error);
    }
  };

  const handleUpdateQuantity = async (orderId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    try {
      const response = await fetch(`/api/order/${tableNumber}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          orderId,
          quantity: newQuantity 
        }),
      });

      if (!response.ok) throw new Error('Failed to update quantity');
      await fetchOrders();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleClearOrder = async () => {
    try {
      const response = await fetch(`/api/order/${tableNumber}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to clear orders');
      await fetchOrders();
    } catch (error) {
      console.error('Error clearing orders:', error);
    }
  };

  const totalAmount = orders.reduce((sum, item) => sum + item.totalPrice, 0);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Table {tableNumber} Order</span>
            <div className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${wsConnected ? 'bg-green-500' : 'bg-red-500'}`} />
              <Button
                variant="destructive"
                onClick={handleClearOrder}
                disabled={orders.length === 0}
              >
                Clear Order
              </Button>
              <Button
                variant="default"
                onClick={sendOrdersToAdmin}
                disabled={orders.length === 0}
              >
                Send to Admin
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
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <h3 className="font-medium">{item.item}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm px-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm text-gray-500 ml-2">
                        × ₹{item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">₹{item.totalPrice.toFixed(2)}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOrder(item.id)}
                      aria-label={`Remove ${item.item} from order`}
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

