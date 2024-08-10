'use client'

import { signUpSchema } from '@/libs/zod'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Page = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<{
        userName?: string
        email?: string
        password?: string
    }>({})
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

    const handleAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        const result = signUpSchema.safeParse({ userName, email, password })

        if (!result.success) {
            const fieldErrors = result.error.format()
            setErrors({
                userName: fieldErrors.userName?._errors[0],
                email: fieldErrors.email?._errors[0],
                password: fieldErrors.password?._errors[0],
            })
            setLoading(false)
            return
        }

        setErrors({})

        const response = await axiosInstance.post('/api/user', {
            userName,
            email,
            password,
            version: 'Free',
        })

        if (response.status === 200) {
            router.push('/api/auth/signin')
        }
        setLoading(false)
    }

    return (
        <div className="flex h-dvh w-full items-center justify-center">
            <form
                onSubmit={handleAddButton}
                noValidate
                className="flex flex-col gap-1"
            >
                <label className="form-control w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Username"
                        className={`input input-bordered ${errors.userName ? 'input-error' : 'input-bordered'} w-full max-w-xs`}
                        onChange={handleUserChange}
                    />
                    <div className="label">
                        {errors.userName && (
                            <span className="label-text-alt text-error">
                                {errors.userName}
                            </span>
                        )}
                    </div>
                </label>
                <label className="form-control w-full max-w-xs">
                    <input
                        type="email"
                        placeholder="Email"
                        className={`input input-bordered ${errors.email ? 'input-error' : 'input-bordered'} w-full max-w-xs`}
                        onChange={handleEmailChange}
                    />
                    <div className="label">
                        {errors.email && (
                            <span className="label-text-alt text-error">
                                {errors.email}
                            </span>
                        )}
                    </div>
                </label>
                <label className="form-control w-full max-w-xs">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`input input-bordered ${errors.password ? 'input-error' : 'input-bordered'} w-full max-w-xs`}
                        onChange={handlePasswordChange}
                    />
                    <div className="label">
                        {errors.password && (
                            <span className="label-text-alt text-error">
                                {errors.password}
                            </span>
                        )}
                    </div>
                </label>
                <button type="submit" className="btn btn-primary mt-2">
                    {loading ? (
                        <span className="loading loading-infinity loading-lg"></span>
                    ) : (
                        <>Sign Up</>
                    )}
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
