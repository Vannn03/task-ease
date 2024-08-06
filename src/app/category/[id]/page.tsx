import BackButton from '@/components/BackButton/BackButton'
import DragDropTasks from '@/components/DragDropTasks/DragDropTasks'
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

    const finishedTaskDB: Task[] = await prisma.task.findMany({
        where: { categoryId: params.id, status: 'Completed' },
        orderBy: { order: 'asc' },
    })

    const categoryDB = await prisma.category.findFirst({
        where: { categoryId: params.id },
    })

    return (
        <div className="flex w-full flex-col gap-6 p-8">
            <div className="flex flex-col gap-4">
                <BackButton />
                <h1 className="text-3xl font-bold">
                    {categoryDB?.categoryName}
                </h1>
            </div>

            <AddTaskButton categoryId={categoryDB?.categoryId} />

            <div role="tablist" className="tabs tabs-lifted h-fit">
                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="All"
                    defaultChecked
                />
                <div
                    role="tabpanel"
                    className="tab-content rounded-box border-base-300 bg-base-100 p-6"
                >
                    {taskDB.length == 0 ? (
                        <p>No task found</p>
                    ) : (
                        <DragDropTasks taskDB={taskDB} />
                    )}
                </div>

                <input
                    type="radio"
                    name="my_tabs_2"
                    role="tab"
                    className="tab"
                    aria-label="Completed"
                />
                <div
                    role="tabpanel"
                    className="tab-content rounded-box border-base-300 bg-base-100 p-6"
                >
                    {finishedTaskDB.length == 0 ? (
                        <p>No completed task found</p>
                    ) : (
                        <DragDropTasks taskDB={finishedTaskDB} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
