'use client'

import { Alert } from '@/libs/mui'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
    const router = useRouter()
    const [errorAlert, setErrorAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            setErrorAlert(true)
        } else {
            setErrorAlert(false)
            setSuccessAlert(true)
            router.push('/users/dashboard')
            router.refresh()
        }
        setLoading(false)
    }

    return (
        <div className="flex h-dvh w-full items-center justify-center">
            <div
                className="fixed left-1/2 top-8 flex -translate-x-1/2 cursor-pointer items-center gap-2"
                onClick={() => router.push('/')}
            >
                <img src="/logo.svg" alt="..." className="size-8" />
                <h1 className="text-2xl font-semibold">TaskEase</h1>
            </div>
            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-64 flex-col gap-2"
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-md input-bordered w-full"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-md input-bordered w-full"
                />
                <div className={`${errorAlert ? 'block' : 'hidden'}`}>
                    <Alert severity="error">Invalid Credentials</Alert>
                </div>
                <div className={`${successAlert ? 'block' : 'hidden'}`}>
                    <Alert severity="success">Sign In Successful</Alert>
                </div>
                <button type="submit" className="btn btn-primary mt-2">
                    {loading ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        <>Sign in</>
                    )}
                </button>
                <div className="divider">OR</div>
                <Link href={'/signup'} className="btn btn-ghost">
                    Sign up
                </Link>
            </form>
        </div>
    )
}

export default Page
