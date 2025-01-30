import prisma from "@/lib/db"
import { type NextRequest, NextResponse } from "next/server"

const formatTableNumber = (tableNumber: number | string): string => {
  return String(tableNumber).padStart(2, "0");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tableNumber, otp } = body

    if (!tableNumber || !otp) {
      return NextResponse.json({ error: "Table number and OTP are required" }, { status: 400 })
    }

    const formattedTableNumber = formatTableNumber(tableNumber)

    const storedOtp = await prisma.otp.findFirst({
      where: { tableNumber: formattedTableNumber },
    })

    if (!storedOtp) {
      return NextResponse.json({ error: "No OTP found for this table" }, { status: 404 })
    }

    if (storedOtp.otp !== otp) {
      return NextResponse.json({ error: "Invalid OTP" }, { status: 400 })
    }

    return NextResponse.json({ message: "OTP verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error while verifying OTP:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}
