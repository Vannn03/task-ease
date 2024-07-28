import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
    const { taskId, status } = await request.json()

    const updateTask = await prisma.task.update({
        where: {taskId: taskId},
        data: {status: status}
    })

    if (!updateTask)
        return NextResponse.json({ status: 500, isUpdated: false })
    else return NextResponse.json({ status: 200, isUpdated: true })
}