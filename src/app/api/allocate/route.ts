import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(request : NextRequest) {
    const body = await request.json();
    const { tableNumber, allocatedId } = body;

    const response = await prisma.idAllocated.create({
        data: {
            tableNumber : String(tableNumber),
            allocatedId : String(allocatedId)
        }
    });

    return Response.json(response);
}

export async function GET(request : NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const tableNumber = (searchParams.get('tableNumber') ?? '0');

    const response = await prisma.idAllocated.findFirst({
        where: {
            tableNumber: tableNumber
        }
    });

    if (!response) {
        return Response.json(null);
    }

    return Response.json(response.allocatedId);
}