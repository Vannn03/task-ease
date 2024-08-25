import ClientRedirect from '@/components/ClientRedirect'
import SignUp from '@/components/SignUp'
import PageLoader from '@/components/utilities/Loaders/PageLoader'
import { authUserSessionServer } from '@/utils/auth-utils'
import { Suspense } from 'react'

const Home = async () => {
    const user = await authUserSessionServer()

    if (user) {
        // Instead of redirecting directly, pass the user to the client component
        return <ClientRedirect />
    }

    return (
        <Suspense fallback={<PageLoader />}>
            <SignUp />
        </Suspense>
    )
}

export default Home
