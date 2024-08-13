'use client'

import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'
import { signUpSchema } from '@/libs/zod'
import axiosInstance from '@/utils/axiosInstance'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FormErrors = {
    userName?: string
    email?: string
    password?: string
    emailTaken?: boolean
}

const Page = () => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
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
            const response = await axiosInstance.post('/api/user/checkEmail', {
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
                        onChange={handleInputChange(setUserName)}
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
                        className={`input input-bordered ${errors.email || errors.emailTaken ? 'input-error' : 'input-bordered'} w-full max-w-xs`}
                        onChange={handleInputChange(setEmail)}
                    />
                    <div className="label">
                        {errors.email && !errors.emailTaken && (
                            <span className="label-text-alt text-error">
                                {errors.email}
                            </span>
                        )}
                        {errors.emailTaken && (
                            <span className="label-text-alt text-error">
                                Email is already taken!
                            </span>
                        )}
                    </div>
                </label>
                <label className="form-control w-full max-w-xs">
                    <input
                        type="password"
                        placeholder="Password"
                        className={`input input-bordered ${errors.password ? 'input-error' : 'input-bordered'} w-full max-w-xs`}
                        onChange={handleInputChange(setPassword)}
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
                    {loading ? <ButtonLoader /> : <>Sign Up</>}
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
