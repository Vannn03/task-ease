import { authUserSessionServer } from '@/utils/auth-utils'
import Link from 'next/link'

const Home = async () => {
    const user = await authUserSessionServer()

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to TaskEase</h1>
                    <p className="py-6">
                        A simple To-Do List website to simplify your life.
                    </p>
                    <Link
                        href={`${user ? '/users/dashboard' : '/api/auth/signin'}`}
                        className="btn btn-outline btn-primary btn-wide mt-4"
                    >
                        Sign in
                    </Link>
                    <Link
                        href={'/signup'}
                        className="btn btn-primary btn-wide mt-4"
                    >
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
