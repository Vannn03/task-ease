import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

const midtransClient = require('midtrans-client')

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT,
})


export async function POST(request: NextRequest) {
    const { orderId, grossAmount } = await request.json()

    let parameter = {
        transaction_details: {
            order_id: orderId,
            gross_amount: grossAmount,
        },
    }

    const updateUserVersion = await prisma.user.update({
        where: {userId: orderId},
        data: {version: "Premium"}
    })

    const token = await snap.createTransactionToken(parameter)

    return NextResponse.json({token})
}
