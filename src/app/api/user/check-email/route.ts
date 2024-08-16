import prisma from '@/libs/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { email } = await request.json()

    const emailExists = await prisma.user.findFirst({
        where: { email },
    })

    if (!emailExists) 
        return NextResponse.json({ isExist: false })
    else 
        return NextResponse.json({ isExist: true })
}