import DeleteCategoryButton from '@/components/categoryButtons/DeleteCategoryButton'
import EditCategoryButton from '@/components/categoryButtons/EditCategoryButton'
import DragDropTasks from '@/components/DragDropTasks'
import AddTaskButton from '@/components/taskButtons/AddTaskButton'
import prisma from '@/libs/prisma'
import { Task } from '@prisma/client'

interface Params {
    id: string
}

interface PageProps {
    params: Params
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const taskDB: Task[] = await prisma.task.findMany({
        where: { categoryId: params.id },
        orderBy: { order: 'asc' },
    })

    const categoryDB = await prisma.category.findFirst({
        where: { categoryId: params.id },
    })

    return (
        <div className="w-full p-8">
            <div className="flex items-center justify-between border-b bg-base-100 pb-4">
                <h1 className="text-2xl font-semibold">
                    {categoryDB?.categoryName}
                </h1>
                <div className="flex gap-2">
                    <EditCategoryButton
                        categoryId={categoryDB?.categoryId}
                        categoryName={categoryDB?.categoryName}
                        dialogId={`editCategoryModal-${categoryDB?.categoryId}`}
                    />
                    <DeleteCategoryButton
                        categoryId={categoryDB?.categoryId}
                        categoryName={categoryDB?.categoryName}
                        dialogId={`deleteCategoryModal-${categoryDB?.categoryId}`}
                    />
                </div>
            </div>

            <div className="hide-scrollbar h-[86.4dvh] overflow-y-scroll">
                <AddTaskButton categoryId={categoryDB?.categoryId} />
                <DragDropTasks taskDB={taskDB} />
            </div>
        </div>
    )
}

export default Page
