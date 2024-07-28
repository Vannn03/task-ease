import prisma from "@/libs/prisma"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    const { userId, categoryName } = await request.json()

    const data = {userId, categoryName}

    const createCategory = await prisma.category.create({ data })

    if (!createCategory)
        return NextResponse.json({ status: 500, isCreated: false })
    else return NextResponse.json({ status: 200, isCreated: true })
}

export async function PUT(request: NextRequest) {
    const { categoryId, categoryName } = await request.json()

    const updateCategory = await prisma.category.update({
        where: {categoryId: categoryId},
        data: {categoryName: categoryName}
    })

    if (!updateCategory)
        return NextResponse.json({ status: 500, isUpdated: false })
    else return NextResponse.json({ status: 200, isUpdated: true })
}

export async function DELETE(request: NextRequest) {
    const { categoryId } = await request.json()

    const deleteAllTask = await prisma.task.deleteMany({
        where: {categoryId: categoryId}
    })

    const deleteCategory = await prisma.category.delete({
        where: {categoryId: categoryId}
    })

    if (!deleteAllTask && !deleteCategory)
        return NextResponse.json({ status: 500, isdeleted: false })
    else return NextResponse.json({ status: 200, isdeleted: true })
}