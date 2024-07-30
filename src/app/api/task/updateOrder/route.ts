import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
    const { tasks } = await request.json()

    const updateTaskOrder = tasks.map((task: any, index: number) => {
        return prisma.task.updateMany({
            where: { taskId: task.taskId },
            data: { order: index }
        })
    })

    await Promise.all(updateTaskOrder)

    if (!updateTaskOrder)
        return NextResponse.json({ status: 500, isUpdated: false })
    else return NextResponse.json({ status: 200, isUpdated: true })
}