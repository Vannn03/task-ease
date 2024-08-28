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

type StatisticType = {
    title: string
    value: number
}

const Page = async ({ params }: PageProps) => {
    console.time('STATISTIC DETAIL CATEGORY')
    const taskDB = await prisma.task.findMany({
        where: { categoryId: params.id },
        select: {
            taskId: true,
            taskDescription: true,
            status: true,
            deadline: true,
        },
        orderBy: { order: 'asc' },
    })
    console.timeEnd('STATISTIC DETAIL CATEGORY')

    // console.time('FINISHED TASK DETAIL CATEGORY')
    // const finishedTaskDB = await prisma.task.findMany({
    //     where: { categoryId: params.id, status: 'Completed' },
    //     select: {
    //         taskId: true,
    //     },
    //     orderBy: { order: 'asc' },
    // })
    // console.timeEnd('FINISHED TASK DETAIL CATEGORY')

    const categoryDB = await prisma.category.findFirst({
        where: { categoryId: params.id },
    })

    const statisticData: StatisticType[] = [
        {
            title: 'Total',
            value: taskDB.length,
        },
        {
            title: 'Completed',
            value: taskDB.filter((task) => task.status == 'Completed').length,
        },
        {
            title: 'Incompleted',
            value: taskDB.filter((task) => task.status == 'Incomplete').length,
        },
    ]

    return (
        <Suspense fallback={<Loading />}>
            <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
                <div className="top-24 z-40 flex h-fit w-full flex-col gap-4 rounded bg-base-100 p-4 shadow xl:sticky xl:w-[40rem]">
                    <div className="flex items-center gap-2">
                        <BackButton />
                        <h1 className="text-lg font-semibold sm:text-xl lg:text-2xl">
                            {categoryDB?.categoryName}
                        </h1>
                    </div>

                    <div className="stats stats-horizontal">
                        {statisticData.map((data, index) => (
                            <div className="stat" key={index}>
                                <div className="text-xs opacity-50 sm:text-base">
                                    {data.title}
                                </div>
                                <div
                                    className={`text-xl font-bold sm:text-3xl ${index == 1 && 'text-success'} ${index == 2 && 'text-warning'}`}
                                >
                                    {data.value}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex w-full flex-col gap-4">
                    <div className="z-40 flex items-center justify-between border-b border-base-content/10 bg-base-200 pb-4">
                        <AddTaskButton
                            categoryId={categoryDB?.categoryId}
                            dialogId={`addTaskModal-${categoryDB?.categoryId}`}
                        />

                        {/* <DeleteCompletedTaskButton
                            categoryId={categoryDB?.categoryId}
                            dialogId={`deleteCompletedTaskModal-${categoryDB?.categoryId}`}
                            finishedTaskLength={finishedTaskDB.length}
                        /> */}
                    </div>
                    {taskDB.length == 0 ? (
                        <p className="text-center font-medium opacity-50">
                            No task found
                        </p>
                    ) : (
                        <DragDropTasks taskDB={taskDB} />
                    )}
                </div>
            </div>
        </Suspense>
    )
}

export default Page
