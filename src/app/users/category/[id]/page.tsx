import BackButton from '@/components/buttons/BackButton'
import DragDropTasks from '@/components/DragDropTasks'
import AddTaskButton from '@/components/buttons/taskButtons/AddTaskButton'
import DeleteCompletedTaskButton from '@/components/buttons/taskButtons/DeleteCompletedTaskButton'
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
        <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <h1 className="text-3xl font-semibold">
                        {categoryDB?.categoryName}
                    </h1>
                </div>
                <DeleteCompletedTaskButton
                    categoryId={categoryDB?.categoryId}
                    dialogId={`deleteCompletedTaskModal-${categoryDB?.categoryId}`}
                    finishedTaskLength={finishedTaskDB.length}
                />
            </div>

            <AddTaskButton categoryId={categoryDB?.categoryId} />

            <div role="tablist" className="tabs tabs-bordered">
                <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="All"
                    defaultChecked
                />
                <div role="tabpanel" className="tab-content py-4">
                    {taskDB.length == 0 ? (
                        <p className="text-center font-medium opacity-50">
                            No task found
                        </p>
                    ) : (
                        <DragDropTasks taskDB={taskDB} />
                    )}
                </div>

                <input
                    type="radio"
                    name="my_tabs_1"
                    role="tab"
                    className="tab"
                    aria-label="Completed"
                />
                <div role="tabpanel" className="tab-content py-4">
                    {finishedTaskDB.length == 0 ? (
                        <p className="text-center font-medium opacity-50">
                            No completed task found
                        </p>
                    ) : (
                        <DragDropTasks taskDB={finishedTaskDB} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Page
