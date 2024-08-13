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

export async function PUT(request: NextRequest) {
    const { userId, userName, userImage } = await request.json()

    const updateTask = await prisma.user.update({
        where: {userId: userId},
        data: {userName: userName, userImage: userImage}
    })

    if (!updateTask)
        return NextResponse.json({ status: 500, isUpdated: false })
    else return NextResponse.json({ status: 200, isUpdated: true })
}