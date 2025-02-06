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

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tableNumber = parseInt(searchParams.get('tableNumber') ?? '0');

        if (isNaN(tableNumber)) {
            return NextResponse.json(
                { error: "Invalid table number" },
                { status: 400 }
            );
        }

        const orders = await prisma.order.findMany({
            where: {
                tableNumber: tableNumber
            },
            orderBy: {
                id: 'desc'  // Get latest orders first
            }
        });

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json(
            { error: "Error while fetching orders" },
            { status: 500 }
        );
    }
}

// export async function GET(request: NextRequest) {
//     try {
//         const body = await request.json();
//         const tableNumber = parseInt(body.tableNumber);

//         console.log(body);
  
//         if (isNaN(tableNumber)) {
//             return NextResponse.json(
//                 { error: "Invalid table number" },
//                 { status: 400 }
//             );
//         }
  
//         const orders = await prisma.order.findMany({
//             where: {
//                 tableNumber: tableNumber
//             },
//             orderBy: {
//                 createdAt: 'desc'  // Get latest orders first
//             }
//         });
  
//         return NextResponse.json(orders);
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         return NextResponse.json(
//             { error: "Error while fetching orders" },
//             { status: 500 }
//         );
//     }
//   }
  