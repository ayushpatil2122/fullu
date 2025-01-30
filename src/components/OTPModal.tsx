import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface OTPModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => Promise<void>
}

export function OTPModal({ isOpen, onClose, onVerify }: OTPModalProps) {
  const [otp, setOtp] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onVerify(otp)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="mb-4"
          />
          <Button type="submit">Verify</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

