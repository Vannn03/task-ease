import BackButton from '@/components/BackButton/BackButton'
import DragDropTasks from '@/components/DragDropTasks/DragDropTasks'
import AddTaskButton from '@/components/taskButtons/AddTaskButton'
import DeleteCompletedTaskButton from '@/components/taskButtons/DeleteCompletedTaskButton'
import prisma from '@/libs/prisma'

interface Params {
    id: string
}

interface PageProps {
    params: Params
}

const Page = async ({ params }: PageProps) => {
    const taskDB = await prisma.task.findMany({
        where: { categoryId: params.id },
        orderBy: { order: 'asc' },
    })

    const finishedTaskDB = await prisma.task.findMany({
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
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        {categoryDB?.categoryName}
                    </h1>
                    <DeleteCompletedTaskButton
                        categoryId={categoryDB?.categoryId}
                        dialogId={`deleteCompletedTaskModal-${categoryDB?.categoryId}`}
                    />
                </div>
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
