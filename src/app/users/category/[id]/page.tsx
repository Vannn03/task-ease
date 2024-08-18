import BackButton from '@/components/buttons/BackButton'
import DragDropTasks from '@/components/DragDropTasks'
import AddTaskButton from '@/components/buttons/taskButtons/AddTaskButton'
import DeleteCompletedTaskButton from '@/components/buttons/taskButtons/DeleteCompletedTaskButton'
import prisma from '@/libs/prisma'
import { Suspense } from 'react'
import Loading from './loading'

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
        include: {
            category: true,
        },
    })

    const finishedTaskDB = await prisma.task.findMany({
        where: { categoryId: params.id, status: 'Completed' },
        orderBy: { order: 'asc' },
    })

    const categoryDB = await prisma.category.findFirst({
        where: { categoryId: params.id },
    })

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4">
                        <BackButton />
                        <DeleteCompletedTaskButton
                            categoryId={categoryDB?.categoryId}
                            dialogId={`deleteCompletedTaskModal-${categoryDB?.categoryId}`}
                            finishedTaskLength={finishedTaskDB.length}
                        />
                    </div>
                    <h1 className="text-xl font-semibold sm:text-2xl lg:text-3xl">
                        {categoryDB?.categoryName}
                    </h1>
                </div>

                <AddTaskButton categoryId={categoryDB?.categoryId} />

                <div role="tablist" className="tabs tabs-bordered relative">
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
        </Suspense>
    )
}

export default Page
