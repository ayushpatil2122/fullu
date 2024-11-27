import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest)  {
    const {item, tableNumber, price, quantity, totalPrice} = await request.json();

    try {
        const order = await prisma.order.create({
            data : {
                item : item, 
                tableNumber : tableNumber, 
                price : price, 
                quantity : quantity,
                totalPrice : totalPrice
            }
        });

        console.log(order);
        return NextResponse.json(order);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { error: "Error while creating Order" },
            { status: 500 }
        );
    }
}