import ProfileUpdate from '@/components/ProfileUpdate'
import ThemeController from '@/components/ThemeController'
import UpgradeButton from '@/components/buttons/UpgradeButton'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { ReactElement } from 'react'

interface SettingsDataProps {
    title: string | ReactElement
    description: string
    action: ReactElement
}

const Page = async () => {
    const user = await authUserSessionServer()

    const loggedUser = await findLoggedUser(user)

    const settingsData: SettingsDataProps[] = [
        {
            title: 'User profile',
            description: 'Update your profile.',
            action: (
                <ProfileUpdate
                    userId={loggedUser?.userId}
                    userName={loggedUser?.userName}
                />
            ),
        },
        {
            title: (
                <>
                    <p>Version</p>
                    <span className="badge badge-neutral text-xs">
                        {loggedUser?.version}
                    </span>
                </>
            ),
            description: 'Upgrade your account for more features.',
            action: <UpgradeButton userId={loggedUser?.userId} />,
        },
        {
            title: 'Interface themes',
            description: 'Select or customize your UI theme.',
            action: <ThemeController />,
        },
    ]

    return (
        <main className="mx-auto w-full p-6 lg:w-[75dvw] 2xl:w-[50dvw]">
            <hr />
            {settingsData.map((data, index) => (
                <section
                    key={index}
                    className="flex flex-col justify-between gap-4 border-t py-8 md:flex-row"
                >
                    <div>
                        <h1 className="flex items-center gap-2 font-medium">
                            {data.title}
                        </h1>
                        <p className="text-sm opacity-75">{data.description}</p>
                    </div>
                    {data.action}
                </section>
            ))}
        </main>
    )
}

export default Page
