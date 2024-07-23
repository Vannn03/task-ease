import prisma from "@/libs/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { categoryId, taskDescription, status } = await request.json()

    const data = {categoryId, taskDescription, status}

    const createTask = await prisma.task.create( {
        data
    })

    if (!createTask)
        return NextResponse.json({ status: 500, isCreated: false })
    else return NextResponse.json({ status: 200, isCreated: true })
}

export async function PUT(request: NextRequest) {
    const { taskId, taskDescription } = await request.json()

    const updateTask = await prisma.task.update({
        where: {taskId: taskId},
        data: {taskDescription: taskDescription}
    })

    if (!updateTask)
        return NextResponse.json({ status: 500, isUpdated: false })
    else return NextResponse.json({ status: 200, isUpdated: true })
}

export async function DELETE(request: NextRequest) {
    const { taskId } = await request.json()

    const deleteTask = await prisma.task.delete({
        where: {taskId: taskId}
    })

    if (!deleteTask)
        return NextResponse.json({ status: 500, isdeleted: false })
    else return NextResponse.json({ status: 200, isdeleted: true })
}