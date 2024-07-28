'use client'

import { signIn } from 'next-auth/react'
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
            router.push('/home')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email
                <input name="email" type="email" required />
            </label>
            <label>
                Password
                <input name="password" type="password" required />
            </label>
            <button type="submit">Sign In</button>
        </form>
    )
}

export default Page
