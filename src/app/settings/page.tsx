import FileInput from '@/components/FileInput'
import ThemeController from '@/components/ThemeController'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'
import { CgProfile } from 'react-icons/cg'

interface SettingsDataProps {
    title: string
    description: any
}

const Page = async () => {
    const user = await authUserSessionServer()

    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    const settingsData: SettingsDataProps[] = [
        {
            title: 'Username',
            description: userDB?.userName,
        },
        {
            title: 'Email',
            description: userDB?.email,
        },
        {
            title: 'Version',
            description: userDB?.version,
        },
        {
            title: 'Themes',
            description: <ThemeController />,
        },
    ]

    return (
        <div className="mx-auto w-[800px]">
            <h1 className="text-3xl font-semibold">Settings</h1>
            <hr className="mt-2" />
            <div className="flex flex-col items-center justify-center gap-2 py-4">
                {userDB?.userImage === null ? (
                    <CgProfile className="text-9xl" />
                ) : (
                    <img src={userDB?.userImage} alt="..." />
                )}
                <FileInput userId={userDB?.userId} />
            </div>
            <div className="rounded-xl bg-base-200 p-4">
                {settingsData.map((data, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between py-2"
                    >
                        <h1 className="font-medium">{data.title}</h1>
                        <div>{data.description}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page
