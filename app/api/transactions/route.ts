import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//     try {
//         const transactions = await prisma.transactions.findMany()
//         return NextResponse.json(transactions, {status: 200})
//     } catch (error) {
//         return NextResponse.json({error: 'Failed to get transactions'}, {status: 400})
//     }
// }

export async function POST(request: NextRequest) {
    try {
        // pend auth

        const body = await request.json();
        const newTransaction = await prisma.transactions.create({
            data: {
                description: body.description,
                amount: body.amount,
                paymentMethod: body.paymentMethod || null,
                referenceNo: body.referenceNo || null,
            }
        })

        const serializedTransaction = {
            ...newTransaction,
            amount: Number(newTransaction.amount)
        };

        return NextResponse.json(serializedTransaction, {status: 201})
    } catch (error) {
        return NextResponse.json(`${error}`, {status: 500})
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const reqId = parseInt(searchParams.get('id') || '');
    
        if (!reqId) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        } else {
            const deleteTransaction = await prisma.transactions.delete({
                where: {id: reqId}
            })
    
            return NextResponse.json("Deleted succesfully", {status: 200})
        }
    } catch (error) {
        return NextResponse.json("Failed to delete", {status: 400})
    }
}