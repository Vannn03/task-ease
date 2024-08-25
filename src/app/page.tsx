import { authUserSessionServer } from '@/utils/auth-utils'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import SignUp from '@/components/SignUp'
import PageLoader from '@/components/utilities/Loaders/PageLoader'

const Home = async () => {
    const user = await authUserSessionServer()

    user && redirect('/users/dashboard')

    return (
        <Suspense fallback={<PageLoader />}>
            <SignUp />
        </Suspense>
    )
}

export default Home
