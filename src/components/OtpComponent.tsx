"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"

export function OtpComponent({selectedTable} : {selectedTable : string }) {
    const [otp, setOtp] = useState("")
    const [isVerifying, setIsVerifying] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()
  
  
    const formattedTableNumber = selectedTable.padStart(2, "0")
  
    useEffect(() => {
      const checkSecureStatus = async () => {
        try {
          const response = await fetch(`/api/secure/${formattedTableNumber}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
  
          const data = await response.json()
  
          if (response.ok && data.isVerified) {
            router.push(`/table/${formattedTableNumber}/menu/veg`)
          } else {
            setIsLoading(false)
          }
        } catch (error) {
          console.error("Error checking secure status:", error)
          setIsLoading(false)
        }
      }
  
      checkSecureStatus()
    }, [formattedTableNumber, router])
  
    const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setOtp(event.target.value)
    }
  
    const handleVerifyOtp = async () => {
      if (!otp || otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP")
        return
      }
  
      setIsVerifying(true)
  
      try {
        const response = await fetch("/api/otp/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tableNumber: formattedTableNumber,
            otp,
          }),
        })
  
        const data = await response.json()
  
        if (response.ok) {
          const secureResponse = await fetch(`/api/secure/${formattedTableNumber}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json",
            },
          })
  
          if (secureResponse.ok) {
            alert("OTP verified successfully")
            router.push(`/table/${formattedTableNumber}/menu/veg`)
          } else {
            const secureData = await secureResponse.json()
            alert(secureData.error || "Failed to update secure status")
          }
        } else {
          alert(data.error || "Failed to verify OTP")
        }
      } catch (error) {
        console.error("Error verifying OTP:", error)
        alert("An unexpected error occurred")
      } finally {
        setIsVerifying(false)
      }
    }
  
    if (isLoading) {
      return <div>Loading...</div>
    }
  
    return (
      <div className="mt-5 mb-5">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Enter OTP for Table {formattedTableNumber}</CardTitle>
            <CardDescription>Please enter the OTP to verify your table</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between">
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="\d{6}"
                  maxLength={6}
                  placeholder="000000"
                  className="text-center text-2xl tracking-widest"
                  value={otp}
                  onChange={handleOtpChange}
                />
              </div>
              <Button className="w-full" onClick={handleVerifyOtp} disabled={isVerifying}>
                {isVerifying ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
}