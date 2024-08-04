'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

const Page = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
    }
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleAddButton = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const response = await axios.post(
            '/api/user',
            {
                userName,
                email,
                password,
                version: 'Free',
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (response.status === 200) {
            setUserName('')
            setEmail('')
            setPassword('')
            router.push('/api/auth/signin')
        }
    }

    return (
        <div className="flex h-dvh w-full items-center justify-center">
            <form onSubmit={handleAddButton} className="flex flex-col gap-2">
                <input
                    type="text"
                    placeholder="Username"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleUserChange}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handleEmailChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input input-bordered w-full max-w-xs"
                    onChange={handlePasswordChange}
                />
                <button type="submit" className="btn btn-primary mt-2">
                    Sign Up
                </button>
                <div className="divider">OR</div>
                <Link href={'/api/auth/signin'} className="btn btn-ghost">
                    Sign In
                </Link>
            </form>
        </div>
    )
}

export default Page
