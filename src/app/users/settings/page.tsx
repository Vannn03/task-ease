import ProfilePictureInput from '@/components/FileInput'
import ThemeController from '@/components/ThemeController/ThemeController'
import UpgradeButton from '@/components/buttons/UpgradeButton/UpgradeButton'
import { authUserSessionServer } from '@/libs/auth-libs'
import prisma from '@/libs/prisma'

interface SettingsDataProps {
    title: string
    description: string
    action: any
}

const Page = async () => {
    const user = await authUserSessionServer()

    const userDB = await prisma.user.findFirst({
        where: { email: user?.email as string },
    })

    const settingsData: SettingsDataProps[] = [
        {
            title: 'User profile',
            description: 'Update your profile.',
            action: (
                <ProfilePictureInput
                    userId={userDB?.userId}
                    userName={userDB?.userName}
                    email={userDB?.email as string}
                />
            ),
        },
        {
            title: 'Version',
            description: 'Upgrade your version for additional features.',
            action: <UpgradeButton userId={userDB?.userId} />,
        },
        {
            title: 'Interface themes',
            description: 'Select or customize your UI theme.',
            action: <ThemeController />,
        },
    ]

    return (
        <main className="mx-auto w-[50vw] p-8">
            {settingsData.map((data, index) => (
                <section key={index} className="flex justify-between py-4">
                    <div>
                        <h1 className="font-medium">{data.title}</h1>
                        <p className="opacity-50">{data.description}</p>
                    </div>
                    <div>{data.action}</div>
                </section>
            ))}
        </main>
    )
}

export default Page
