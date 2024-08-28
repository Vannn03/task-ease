import prisma from '@/libs/prisma'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import AddCategoryButton from '../buttons/categoryButtons/AddCategoryButton'

interface CategoryListProps {
    userId?: string
    version?: string
}

const CategoryList = async ({ userId, version }: CategoryListProps) => {
    console.time('CATEGORY LIST')
    const categoryDB = await prisma.category.findMany({
        where: { userId: userId },
        select: {
            categoryId: true,
            categoryName: true,
            tasks: {
                select: {
                    status: true,
                },
            },
        },
        take: 4,
    })
    console.timeEnd('CATEGORY LIST')

    return (
        <>
            {categoryDB.length == 0 ? (
                <AddCategoryButton
                    userId={userId}
                    version={version}
                    dialogId={`addCategoryModal-${userId}`}
                    // upgradeDialogId={`upgradeModalCategoryUsage-${loggedUser?.userId}`}
                    categoryLength={categoryDB.length}
                />
            ) : (
                <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                    {categoryDB.map((data) => {
                        const completedTasks = data.tasks.filter(
                            (task) => task.status === 'Completed'
                        ).length

                        const completedTaskPercentage = data.tasks.length
                            ? (completedTasks * 100) / data.tasks.length
                            : 0
                        return (
                            <div
                                className="card w-full rounded bg-base-200/50"
                                key={data.categoryId}
                            >
                                <div className="px-5 py-4 sm:card-body">
                                    <span className="flex items-center justify-between gap-2">
                                        <h2 className="truncate font-medium sm:text-lg">
                                            {data.categoryName}
                                        </h2>
                                        <Link
                                            href={`/users/category/${data.categoryId}`}
                                            className="btn btn-square btn-ghost btn-sm opacity-50"
                                        >
                                            <ArrowRight className="size-5 sm:size-6" />
                                        </Link>
                                    </span>
                                    <div className="card-actions pt-2">
                                        <span className="flex w-full flex-col gap-1">
                                            <p className="text-sm sm:text-base">
                                                {completedTaskPercentage.toFixed(
                                                    0
                                                )}
                                                %
                                            </p>
                                            <progress
                                                className="progress progress-success w-full"
                                                value={completedTaskPercentage}
                                                max="100"
                                            ></progress>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default CategoryList
