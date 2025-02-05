import { useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface OrderConfirmationProps {
  message: string;
  onClose: () => void;
}

export function OrderConfirmation({ message, onClose }: OrderConfirmationProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-full p-4 rounded-lg shadow-lg">
        <DialogHeader className="text-center">
          <CheckCircle2 className="h-10 w-10 text-green-500 mx-auto" />
          <DialogTitle className="text-lg font-semibold mt-2">Order Confirmed</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm text-gray-600">{message}</p>
        <Button onClick={onClose} className="w-full mt-4">
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
}
