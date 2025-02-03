// import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// export async function PATCH(
//     request: NextRequest,
//     { params }: { params: { tableNumber: string }}
// ) {
//     try {
//         const tableNumber = params.tableNumber.padStart(2, "0");
//         console.log(`Attempting to update table number: ${tableNumber}`);

//         const record = await prisma.secure.findFirst({
//             where: { tableNumber }
//         });
        
//         if (!record) {
//             console.log(`No record found for table number: ${tableNumber}`);
//             return NextResponse.json(
//                 { error: 'Record not found' },
//                 { status: 404 }
//             );
//         }
        
//         const updatedRecord = await prisma.secure.update({
//             where: { id: record.id },
//             data: { isVerified: true }
//         });

//         console.log(`Updated record:`, updatedRecord);

//         return NextResponse.json(
//             { message: "Table verified successfully", record: updatedRecord },
//             { status: 200 }
//         );
//     } catch (error : any) {
//         console.error('Error updating secure record:', error);
//         return NextResponse.json(
//             { error: 'Failed to update record', details: error.message },
//             { status: 500 }
//         );
//     } finally {
//         await prisma.$disconnect();
//     }
// }


// export async function GET(request: NextRequest, { params }: { params: { tableNumber: string } }) {    
//     try {
//         const tableNumber = params.tableNumber.padStart(2, "0");
//         console.log(`Attempting to find table number: ${tableNumber}`);
//         const response = await prisma.secure.findFirst({
//             where: { tableNumber }
//         });
        
//         return NextResponse.json(response);
//     } catch (error: any) {
//         return NextResponse.json(
//             { error: 'Failed to fetch record', details: error.message },
//             { status: 500 }
//         );
//     } finally {
//         await prisma.$disconnect();
//     }
// }

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const tableNumber = body.tableNumber.padStart(2, "0");
        console.log(`Attempting to update table number: ${tableNumber}`);

        const record = await prisma.secure.findFirst({
            where: { tableNumber }
        });
        
        if (!record) {
            console.log(`No record found for table number: ${tableNumber}`);
            return NextResponse.json(
                { error: 'Record not found' },
                { status: 404 }
            );
        }
        
        const updatedRecord = await prisma.secure.update({
            where: { id: record.id },
            data: { isVerified: true }
        });

        console.log(`Updated record:`, updatedRecord);

        return NextResponse.json(
            { message: "Table verified successfully", record: updatedRecord },
            { status: 200 }
        );
    } catch (error : any) {
        console.error('Error updating secure record:', error);
        return NextResponse.json(
            { error: 'Failed to update record', details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

