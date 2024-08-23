'use client'

import { useEdgeStore } from '@/libs/edgestore'
import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'
import { SingleImageDropzone } from './SingleImageDropzone'
import axiosInstance from '@/utils/axiosInstance'
import { updateProfileSchema } from '@/libs/zod'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'

interface ProfileUpdateProps {
    userId?: string
    userName?: string
}

type FormErrors = {
    userNameValidation?: string
}

const ProfileUpdate = ({ userId, userName }: ProfileUpdateProps) => {
    const [newUserName, setNewUserName] = useState(userName || '')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [file, setFile] = useState<File | undefined>()
    const [toast, setToast] = useState(false)
    const { edgestore } = useEdgeStore()
    const router = useRouter()

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewUserName(e.target.value)
        },
        []
    )

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            setLoading(true)

            // Validate input
            const result = updateProfileSchema.safeParse({
                userName: newUserName,
            })

            if (!result.success) {
                setErrors({
                    userNameValidation:
                        result.error.format().userName?._errors[0],
                })
                setLoading(false)
                return
            }

            setErrors({})

            try {
                let userImage
                if (file) {
                    const res = await edgestore.publicFiles.upload({ file })
                    userImage = res.url
                }

                const response = await axiosInstance.put('/api/user', {
                    userId,
                    userName: newUserName,
                    userImage,
                })

                if (response.status === 200) {
                    router.refresh()
                    setToast(true)
                    setTimeout(() => setToast(false), 3000)
                }
            } catch (error) {
                console.error('Error updating profile:', error)
            } finally {
                setLoading(false)
            }
        },
        [edgestore, file, newUserName, router, userId]
    )

    const userIcon = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
        >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
    )

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <SingleImageDropzone
                width={250}
                height={250}
                value={file}
                dropzoneOptions={{ maxSize: 1024 * 1024 }} // 1 MB
                onChange={setFile}
            />

            <form
                onSubmit={handleSubmit}
                noValidate
                className="flex w-full flex-col gap-2"
            >
                <label
                    className={`input input-md input-bordered flex items-center gap-2 ${errors.userNameValidation ? 'input-error' : ''}`}
                >
                    {userIcon}
                    <input
                        type="text"
                        placeholder={userName}
                        className="grow"
                        onChange={handleInputChange}
                        value={newUserName}
                    />
                </label>
                {errors.userNameValidation && (
                    <p className="text-sm text-red-500">
                        {errors.userNameValidation}
                    </p>
                )}
                <button type="submit" className="btn btn-warning mt-2">
                    {loading ? <ButtonLoader /> : 'Update profile'}
                </button>
            </form>

            <SuccessfulToast toast={toast} description="Update profile" />
        </div>
    )
}

export default ProfileUpdate
