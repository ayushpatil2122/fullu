// app/api/orders/[tableNumber]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
      const body = await request.json();
      console.log(body);
      const tableNumber = parseInt(body.tableNumber);

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
              createdAt: 'desc'  // Get latest orders first
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



// export async function PATCH(
//     request: NextRequest,
//     { params }: { params: { tableNumber: string } }
//   ) {
//     try {
//       const tableNumber = parseInt(params.tableNumber);
//       const body = await request.json();
//       const { quantity, orderId } = body;
  
      
//       if (!quantity || quantity < 1 || !orderId) {
//         return NextResponse.json(
//           { error: 'Invalid quantity or orderId provided' },
//           { status: 400 }
//         );
//       }
//         const currentOrder = await prisma.order.findUnique({
//         where: { id: orderId },
//       });
  
//       if (!currentOrder) {
//         return NextResponse.json(
//           { error: 'Order not found' },
//           { status: 404 }
//         );
//       }
        
//       const newTotalPrice = currentOrder.price * quantity;
  
//       const updatedOrder = await prisma.order.update({
//         where: { id: orderId },
//         data: {
//           quantity: quantity,
//           totalPrice: newTotalPrice,
//         },
//       });
  
//       return NextResponse.json(updatedOrder);
//     } catch (error) {
//       console.error('Error updating order:', error);
//       return NextResponse.json(
//         { error: 'Failed to update order' },
//         { status: 500 }
//       );
//     }
//   }
  
  

// export async function DELETE(
//     request: NextRequest,
//     { params }: { params: { tableNumber: string } }
// ) {
//     try {
//         const tableNumber = parseInt(params.tableNumber);

//         if (isNaN(tableNumber)) {
//             return NextResponse.json(
//                 { error: "Invalid table number" },
//                 { status: 400 }
//             );
//         }

//         await prisma.order.deleteMany({
//             where: { tableNumber }
//         });

//         return NextResponse.json({ success: true });
//     } catch (error) {
//         console.error("Error clearing orders:", error);
//         return NextResponse.json(
//             { error: "Error while clearing orders" },
//             { status: 500 }
//         );
//     }
// }
