import { authUserSessionServer } from '@/libs/auth-libs'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Home = async () => {
    const user = await authUserSessionServer()

    if (user) {
        redirect('/users/dashboard')
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Welcome to TaskEase</h1>
                    <p className="py-6">
                        A simple To-Do List website to simplify your life.
                    </p>
                    <Link
                        href={'/signup'}
                        className="btn btn-primary btn-wide mt-4"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
