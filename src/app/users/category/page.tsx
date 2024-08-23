import AddCategoryButton from '@/components/buttons/categoryButtons/AddCategoryButton'
import { authUserSessionServer, findLoggedUser } from '@/utils/auth-utils'
import prisma from '@/libs/prisma'
import Link from 'next/link'
import CategoryCollapse from '@/components/CategoryCollapse'
import { ArrowRight } from 'lucide-react'

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    const categoryDB = await prisma.category.findMany({
        where: { userId: loggedUser?.userId },
        include: {
            tasks: true,
        },
    })

    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {categoryDB.length == 0 && (
                <p className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-medium opacity-50">
                    No category to display.
                </p>
            )}
            {categoryDB.map((data) => {
                const completedTasks = data.tasks.filter(
                    (task) => task.status === 'Completed'
                ).length

                const completedTaskPercentage = data.tasks.length
                    ? (completedTasks * 100) / data.tasks.length
                    : 0
                return (
                    <div
                        className="card w-full bg-base-100 shadow"
                        key={data.categoryId}
                    >
                        <div className="card-body">
                            <div className="flex justify-between">
                                <div className="flex flex-col gap-1">
                                    <h2 className="card-title w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-lg sm:text-xl">
                                        {data.categoryName}
                                    </h2>
                                    <p className="text-sm sm:text-base">
                                        Total task: {data.tasks.length}
                                    </p>
                                </div>
                                <Link
                                    href={`category/${data.categoryId}`}
                                    className="btn btn-square btn-sm"
                                >
                                    <ArrowRight className="size-5" />
                                </Link>
                            </div>
                            <div className="card-actions mt-2 flex-col items-center">
                                <CategoryCollapse
                                    categoryId={data.categoryId}
                                    categoryName={data.categoryName}
                                />
                                <div className="flex w-full flex-col gap-1 border-t border-base-content/10 pt-2">
                                    <span className="flex items-center justify-between text-sm">
                                        <p className="w-full">Progress</p>
                                        <p>
                                            {completedTaskPercentage.toFixed(0)}
                                            %
                                        </p>
                                    </span>
                                    <progress
                                        className="progress progress-success w-full"
                                        value={completedTaskPercentage}
                                        max="100"
                                    ></progress>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12">
                <AddCategoryButton
                    userId={loggedUser?.userId}
                    version={loggedUser?.version}
                    dialogId={`addCategoryModal-${loggedUser?.userId}`}
                    // upgradeDialogId={`upgradeModalCategoryUsage-${loggedUser?.userId}`}
                    categoryLength={categoryDB.length}
                />
            </div>
        </div>
    )
}

export default Page
