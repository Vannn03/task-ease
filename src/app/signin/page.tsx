'use client'

import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { FormEvent } from 'react'

const Page = () => {
    const router = useRouter()

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        })

        if (result?.error) {
            console.error(result.error)
        } else {
            router.push('/dashboard')
        }
    }

    return (
        <div className="flex h-dvh w-full items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className="btn btn-primary mt-2">
                    Sign In
                </button>
                <div className="divider">OR</div>
                <Link href={'/signup'} className="btn btn-ghost">
                    Sign Up
                </Link>
            </form>
        </div>
    )
}

export default Page
