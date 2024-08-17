import AddCategoryButton from '@/components/buttons/categoryButtons/AddCategoryButton'
import DeleteCategoryButton from '@/components/buttons/categoryButtons/DeleteCategoryButton'
import EditCategoryButton from '@/components/buttons/categoryButtons/EditCategoryButton'
import { authUserSessionServer, findLoggedUser } from '@/utils/auth-utils'
import prisma from '@/libs/prisma'
import { Settings2 } from 'lucide-react'
import Link from 'next/link'

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
                        key={data.categoryId}
                        className="card w-full bg-base-100 transition-all hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <h2 className="card-title w-full overflow-x-hidden text-ellipsis whitespace-nowrap text-lg sm:text-xl">
                                    {data.categoryName}
                                </h2>

                                <div className="dropdown dropdown-end dropdown-bottom">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost m-1"
                                    >
                                        <Settings2 />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow-xl"
                                    >
                                        <EditCategoryButton
                                            categoryId={data.categoryId}
                                            categoryName={data.categoryName}
                                            dialogId={`editCategoryModal-${data.categoryId}`}
                                        />
                                        <DeleteCategoryButton
                                            categoryId={data.categoryId}
                                            categoryName={data.categoryName}
                                            dialogId={`deleteCategoryModal-${data.categoryId}`}
                                        />
                                    </ul>
                                </div>
                            </div>
                            <div className="card-actions mt-4 items-end justify-between">
                                <div
                                    className="radial-progress bg-base-200 text-success"
                                    style={
                                        {
                                            '--value': completedTaskPercentage,
                                            '--thickness': '.5rem',
                                        } as React.CSSProperties
                                    }
                                    role="progressbar"
                                >
                                    {completedTaskPercentage.toFixed(0)}%
                                </div>
                                <Link
                                    href={`category/${data.categoryId}`}
                                    className="btn"
                                >
                                    View Tasks
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })}
            <div className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12">
                <AddCategoryButton
                    userId={loggedUser?.userId}
                    dialogId={`addCategoryModal-${loggedUser?.userId}`}
                />
            </div>
        </div>
    )
}

export default Page
