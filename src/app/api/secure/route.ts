import { NextRequest } from "next/server";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {    
    try {
        const searchParams = request.nextUrl.searchParams;
        const tableNumber = (searchParams.get('tableNumber') ?? '0').padStart(2, "0");
        console.log(`Attempting to find table number: ${tableNumber}`);
        const response = await prisma.secure.findFirst({
            where: { tableNumber }
        });
        
        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Failed to fetch record', details: error.message },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}