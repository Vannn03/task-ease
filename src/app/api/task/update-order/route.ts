import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function PUT(request: NextRequest) {
    const { tasks } = await request.json()

    try {
        const updateTaskOrder = tasks.map((task: any, index: number) =>
            prisma.task.update({
                where: { taskId: task.taskId },
                data: { order: index }
            })
        )

        await Promise.all(updateTaskOrder)

        return NextResponse.json({ status: 200, isUpdated: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ status: 500, isUpdated: false })
    }
}