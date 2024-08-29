import AddCategoryButton from '@/components/buttons/categoryButtons/AddCategoryButton'
import { authUserSessionServer, findLoggedUser } from '@/utils/auth-utils'
import prisma from '@/libs/prisma'
import { Suspense } from 'react'
import Loading from './loading'
import CategoryList from '@/components/data-display/CategoryList'

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    console.time('CATEGORY PAGE')
    const categoryDB = await prisma.category.findMany({
        where: { userId: loggedUser?.userId },
        select: {
            categoryId: true,
            categoryName: true,
            tasks: {
                select: {
                    status: true,
                },
            },
        },
    })
    console.timeEnd('CATEGORY PAGE')

    return (
        <Suspense fallback={<Loading />}>
            <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {categoryDB.length == 0 && (
                    <p className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center opacity-75">
                        No category to display
                    </p>
                )}
                <CategoryList
                    categoryDB={categoryDB}
                    userId={loggedUser?.userId}
                />
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
        </Suspense>
    )
}

export default Page
