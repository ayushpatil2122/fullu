import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest) {
    const {name, testRating, quntityRating, easyToUseRating, accuracyRating, comment} = await request.json();

    const feedback = await prisma.feedback.create({
        data : {
            name : name,
            testRating : testRating,
            quntityRating : quntityRating,
            easyToUseRating : easyToUseRating,
            accuracyRating : accuracyRating,
            comment : comment
        }
    })

    return NextResponse.json(feedback, { status: 201 });
}