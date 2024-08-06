import AddCategoryButton from '@/components/categoryButtons/AddCategoryButton'
import DeleteCategoryButton from '@/components/categoryButtons/DeleteCategoryButton'
import EditCategoryButton from '@/components/categoryButtons/EditCategoryButton'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import Link from 'next/link'
import { IoMdArrowForward } from 'react-icons/io'

const Page = async () => {
    const user = await authUserSessionServer()
    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    const categoryDB = await prisma.category.findMany({
        where: { userId: userDB?.userId },
    })

    return (
        <div className="w-full p-8">
            <h1 className="text-3xl">Categories</h1>

            <hr className="mb-6 mt-3" />

            <div className="grid grid-cols-4 gap-6">
                {categoryDB.map(async (data) => {
                    const taskDB = await prisma.task.findMany({
                        where: { categoryId: data.categoryId },
                    })
                    const finishedTaskDB = await prisma.task.findMany({
                        where: {
                            categoryId: data.categoryId,
                            status: 'Completed',
                        },
                    })
                    return (
                        <div
                            key={data.categoryId}
                            className="card w-96 bg-base-200"
                        >
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <h2 className="card-title w-full overflow-x-hidden text-ellipsis text-nowrap">
                                        {data.categoryName}
                                    </h2>
                                    <Link href={`/category/${data.categoryId}`}>
                                        <IoMdArrowForward className="text-xl" />
                                    </Link>
                                </div>
                                <p>
                                    {finishedTaskDB.length}/{taskDB.length} Task
                                    Completed
                                </p>
                                <div className="card-actions justify-end">
                                    <DeleteCategoryButton
                                        categoryId={data.categoryId}
                                        categoryName={data.categoryName}
                                        dialogId={`deleteCategoryModal-${data.categoryId}`}
                                    />
                                    <EditCategoryButton
                                        categoryId={data.categoryId}
                                        categoryName={data.categoryName}
                                        dialogId={`editCategoryModal-${data.categoryId}`}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}

                <AddCategoryButton
                    userId={userDB?.userId}
                    dialogId={`addCategoryModal-${userDB?.userId}`}
                />
            </div>
        </div>
    )
}

export default Page
