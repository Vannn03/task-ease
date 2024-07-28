'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleUserChange = (e: any) => {
        setUserName(e.target.value)
    }
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const handleAddButton = async () => {
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
            router.push('/home')
        }
    }

    return (
        <div>
            <form onSubmit={handleAddButton}>
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
                <button type="submit">Sign Up</button>
                <Link href={'/api/auth/signin'}>Sign In</Link>
            </form>
        </div>
    )
}

export default SignUp
