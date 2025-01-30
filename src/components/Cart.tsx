"use client";

import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import { CartProps } from "@/lib/types";
import { RootState } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function Cart({ tableNumber }: CartProps) {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.cart.items[tableNumber] || []);
  const [wsConnected, setWsConnected] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const { toast } = useToast();
  const ws = useRef<WebSocket | null>(null);

  // Existing WebSocket connection code...
  const connectWebSocket = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket("ws://localhost:8080");
    ws.current.onopen = () => setWsConnected(true);
    ws.current.onclose = () => {
      setWsConnected(false);
      setTimeout(connectWebSocket, 3000);
    };
    ws.current.onerror = () => setWsConnected(false);
  };

  useEffect(() => {
    connectWebSocket();
    checkTableVerification();
    return () => ws.current?.close();
  }, []);

  const checkTableVerification = async () => {
    const storedVerification = sessionStorage.getItem(`verified_${tableNumber}`);
    if (storedVerification === "true") {
      setIsVerified(true);
      return;
    }
  
    try {
      const response = await fetch(`/api/secure/${tableNumber}`);
      const data = await response.json();
      if (data?.isVerified) {
        setIsVerified(true);
        sessionStorage.setItem(`verified_${tableNumber}`, "true");
      }
    } catch (error) {
      console.error("Error checking table verification:", error);
      setIsVerified(false);
    }
  };
  

  const verifyOtp = async () => {
    setVerifying(true);
    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tableNumber,
          otp,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast({
          title: "Success",
          description: "OTP verified successfully",
        });
        setIsVerified(true);
        sessionStorage.setItem(`verified_${tableNumber}`, "true");
        setShowOtpModal(false);
        sendOrderToAdmin();
      } else {
        toast({
          title: "Error",
          description: data.error || "Invalid OTP",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP",
        variant: "destructive",
      });
    } finally {
      setVerifying(false);
      setOtp("");
    }
  };
  

  const broadcastOrderUpdate = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "order_update",
          tableNumber,
          orders
        })
      );
    }
  };

  useEffect(() => {
    if (orders.length > 0) {
      broadcastOrderUpdate();
    }
  }, [orders]);

  const handleSendToAdmin = async () => {
    if (orders.length === 0) {
      toast({
        title: "No items in the cart",
        description: "Please add some items before sending the order."
      });
      return;
    }

    if (!isVerified) {
      setShowOtpModal(true);
      return;
    }

    sendOrderToAdmin();
  };

  const sendOrderToAdmin = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "admin_order_update",
          tableNumber,
          orders
        })
      );
      toast({
        title: "Order Sent!",
        description: `Order from Table ${tableNumber} has been sent to the admin.`
      });
      dispatch(clearCart(tableNumber));
    } else {
      toast({
        title: "Connection Error",
        description: "Failed to send order. WebSocket is not connected.",
        variant: "destructive"
      });
    }
  };

  // Existing helper functions...
  const handleRemoveOrder = (name: string) => {
    dispatch(removeFromCart({ name, tableNumber }));
  };

  const handleUpdateQuantity = (name: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ name, tableNumber, quantity: newQuantity }));
    }
  };

  const handleClearOrder = () => {
    dispatch(clearCart(tableNumber));
  };

  const totalAmount = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="space-y-4">
        <Card className="shadow-sm">
          {/* Existing card content... */}
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
                {/* Order items rendering... */}
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
                  <Button variant="default" onClick={handleSendToAdmin}>
                    Send to Admin
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
    </>
  );
}