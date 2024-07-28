import prisma from '@/libs/prisma'
import { saltAndHashPassword } from '@/utils/password'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { userName, email, password, version } = await request.json()

    const passwordHash = await saltAndHashPassword(password)

    const data = { userName, email, password: passwordHash, version }

    const createTask = await prisma.user.create({
        data,
    })

    if (!createTask) return NextResponse.json({ status: 500, isCreated: false })
    else return NextResponse.json({ status: 200, isCreated: true })
}
