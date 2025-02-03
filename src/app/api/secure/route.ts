import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {    
    try {
        const searchParams = request.nextUrl.searchParams;
        const tableNumber = (searchParams.get('tableNumber') ?? '0')
        const response = await prisma.secure.findFirst({
            where: { tableNumber : tableNumber }
        });

        if(response?.isVerified) {
            return NextResponse.json(true);
        } else {
            return NextResponse.json(false);
        }
        
        
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch record', details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


export async function PATCH(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const tableNumber = (searchParams.get('tableNumber') ?? '0')
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

