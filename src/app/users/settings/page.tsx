import ProfileUpdate from '@/components/ProfileUpdate'
import ThemeController from '@/components/ThemeController'
// import UpgradeButton from '@/components/buttons/UpgradeButton'
// import UpgradeModal from '@/components/utilities/Modals/UpgradeModal'
import { findLoggedUser, authUserSessionServer } from '@/utils/auth-utils'
import { ReactElement, Suspense } from 'react'
import Loading from './loading'

type SettingsDataProps = {
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
                    {/* <span className="badge badge-neutral text-xs">
                        {loggedUser?.version}
                    </span> */}
                </>
            ),
            description: 'Upgrade your account for more features.',
            action: (
                // <UpgradeButton
                //     userId={loggedUser?.userId}
                //     version={loggedUser?.version}
                // />
                <button className="btn btn-disabled">Coming soon</button>
            ),
        },
        {
            title: 'Interface themes',
            description: 'Select or customize your UI theme.',
            action: (
                <ThemeController
                // upgradeDialogId={`upgradeModalThemeController-${loggedUser?.userId}`}
                // version={loggedUser?.version}
                />
            ),
        },
    ]

    return (
        <Suspense fallback={<Loading />}>
            <main className="mx-auto flex w-full flex-col p-4 sm:p-6 lg:w-[75dvw] 2xl:w-[50dvw]">
                {settingsData.map((data, index) => (
                    <section
                        key={index}
                        className={`flex flex-col justify-between gap-4 ${index > 0 && 'border-t border-base-content/10'} py-8 md:flex-row`}
                    >
                        <div>
                            <h1 className="flex items-center gap-2 text-sm font-medium sm:text-base">
                                {data.title}
                            </h1>
                            <p className="text-xs opacity-75 sm:text-sm">
                                {data.description}
                            </p>
                        </div>
                        {data.action}
                    </section>
                ))}

                {/* <UpgradeModal
                userId={loggedUser?.userId}
                version={loggedUser?.version}
                upgradeDialogId={`upgradeModalThemeController-${loggedUser?.userId}`}
                title={'Theme customization feature is locked'}
                description={'This feature is not available on free version'}
            /> */}
            </main>
        </Suspense>
    )
}

export default Page
