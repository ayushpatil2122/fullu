import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { item, tableNumber, price, quantity, totalPrice } = await request.json();

        // Validate input
        if (
            !item || typeof item !== "string" ||
            typeof tableNumber !== "number" ||
            typeof price !== "number" ||
            typeof quantity !== "number" ||
            typeof totalPrice !== "number"
        ) {
            return NextResponse.json(
                { error: "Invalid input data" },
                { status: 400 }
            );
        }

        // Create order
        const order = await prisma.order.create({
            data: { item, tableNumber, price, quantity, totalPrice }
        });

        return NextResponse.json(order, { status: 201 }); // Resource created
    } catch (error) {
        console.error("Order creation error:", error);
        return NextResponse.json(
            { error: "Error while creating order" },
            { status: 500 }
        );
    }
}
