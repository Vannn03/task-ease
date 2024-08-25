'use client'

import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'
import { signUpSchema } from '@/libs/zod'
import axiosInstance from '@/utils/axiosInstance'
import { Alert } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FormErrors = {
    userName?: string
    email?: string
    password?: string
    emailTaken?: boolean
}

const SignUp = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const router = useRouter()

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value)
        }

    const handleAddButton = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        // Validate input
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

        // Check if email is taken
        try {
            const response = await axiosInstance.post('/api/user/check-email', {
                email,
            })

            if (response.data.isExist) {
                setErrors({
                    emailTaken: true,
                })
                setLoading(false)
                return
            } else {
                setErrors({})
            }
        } catch (error) {
            console.error('Error checking email:', error)
            setLoading(false)
            return
        }

        // Register the user
        try {
            const response = await axiosInstance.post('/api/user', {
                userName,
                email,
                password,
                version: 'Free',
            })

            if (response.status === 200) {
                setSuccessAlert(true)
                router.push('/api/auth/signin')
            }
        } catch (error) {
            console.error('Error creating user:', error)
        } finally {
            setLoading(false)
        }
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
                onSubmit={handleAddButton}
                noValidate
                className="flex w-64 flex-col items-center gap-2"
            >
                <label className="form-control w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Username"
                        className={`input input-md ${errors.userName ? 'input-error' : 'input-bordered'} w-full`}
                        onChange={handleInputChange(setUserName)}
                    />
                    {errors.userName && (
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.userName}
                            </span>
                        </div>
                    )}
                </label>
                <label className="form-control w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        className={`input input-md ${errors.email ? 'input-error' : 'input-bordered'} ${errors.emailTaken ? 'input-warning' : 'input-bordered'} w-full`}
                        onChange={handleInputChange(setEmail)}
                    />
                    {errors.email && !errors.emailTaken && (
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.email}
                            </span>
                        </div>
                    )}
                </label>
                <label className="form-control w-full">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`input input-md ${errors.password ? 'input-error' : 'input-bordered'} w-full`}
                        onChange={handleInputChange(setPassword)}
                    />
                    {errors.password && (
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.password}
                            </span>
                        </div>
                    )}
                </label>
                <div
                    className={`${errors.emailTaken ? 'block w-full' : 'hidden'}`}
                >
                    <Alert severity="warning">Email is already taken!</Alert>
                </div>
                <div className={`${successAlert ? 'block w-full' : 'hidden'}`}>
                    <Alert severity="success">Sign In Successful</Alert>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary btn-block mt-2"
                >
                    {loading ? <ButtonLoader /> : <>Sign up</>}
                </button>
                <div className="divider">OR</div>
                <Link
                    href={'/api/auth/signin'}
                    className="btn btn-ghost btn-block"
                >
                    Sign in
                </Link>
            </form>
        </div>
    )
}

export default SignUp
