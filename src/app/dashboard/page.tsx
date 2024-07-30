import AddCategoryButton from '@/components/categoryButtons/AddCategoryButton'
import UpgradeButton from '@/components/UpgradeButton'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'

interface taskType {
    taskId: string
    taskDescription: string
    status: string
}

const Page = async () => {
    const user = await authUserSessionServer()
    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    return (
        <div>
            {/* <AddCategoryButton userId={userDB?.userId} />

            <div className="fixed bottom-12 right-14">
                <UpgradeButton userId={userDB?.userId} />
            </div> */}
        </div>
    )
}

export default Page
