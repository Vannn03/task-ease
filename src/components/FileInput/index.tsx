'use client'

import { useEdgeStore } from '@/libs/edgestore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SingleImageDropzone } from './SingleImageDropzone'
import axiosInstance from '@/utils/axiosInstance'
import { updateProfileSchema } from '@/libs/zod'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface ProfilePictureInputProps {
    userId?: string
    userName?: string
    email: string
}

type FormErrors = {
    userNameValidation?: string
}

const ProfilePictureInput = ({
    userId,
    userName,
    email,
}: ProfilePictureInputProps) => {
    const [newUserName, setNewUserName] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<FormErrors>({})
    const [file, setFile] = useState<File>()
    const { edgestore } = useEdgeStore()
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserName(e.target.value)
    }

    const handleSubmitButton = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)

        // Validate input
        const result = updateProfileSchema.safeParse({ userName: newUserName })

        if (!result.success) {
            const fieldErrors = result.error.format()
            setErrors({
                userNameValidation: fieldErrors.userName?._errors[0],
            })
            setLoading(false)
            return
        }

        setErrors({})

        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
            })

            const userImage = res.url

            try {
                const response = await axiosInstance.put('/api/user', {
                    userId,
                    userName: newUserName,
                    userImage,
                })

                if (response.status === 200) {
                    router.refresh()
                }
            } catch (error) {
                console.error('Error updating profile:', error)
            } finally {
                setLoading(false)
            }
        } else {
            try {
                const response = await axiosInstance.put('/api/user', {
                    userId,
                    userName: newUserName,
                })

                if (response.status === 200) {
                    router.refresh()
                }
            } catch (error) {
                console.error('Error updating profile:', error)
            } finally {
                setLoading(false)
            }
        }
        setLoading(false)
    }

    return (
        <div className="flex flex-col justify-center gap-2">
            <SingleImageDropzone
                width={250}
                height={250}
                value={file}
                dropzoneOptions={{
                    maxSize: 1024 * 1024 * 1, // 1 MB
                }}
                onChange={(file) => setFile(file)}
            />

            <form
                onSubmit={handleSubmitButton}
                noValidate
                className="flex w-full flex-col gap-2"
            >
                <label className="form-control w-full max-w-xs">
                    <input
                        type="text"
                        placeholder={userName}
                        className={`input input-bordered ${errors.userNameValidation ? 'input-error' : 'input-bordered'} w-full max-w-xs`}
                        onChange={handleInputChange}
                    />
                    {errors.userNameValidation && (
                        <div className="label">
                            <span className="label-text-alt text-error">
                                {errors.userNameValidation}
                            </span>
                        </div>
                    )}
                </label>
                <label className="form-control w-full max-w-xs">
                    <input
                        type="email"
                        value={email}
                        className={`input input-bordered w-full max-w-xs`}
                        disabled
                    />
                </label>
                <button type="submit" className="btn btn-success mt-2">
                    {loading ? <ButtonLoader /> : <>Update profile</>}
                </button>
            </form>
        </div>
    )
}

export default ProfilePictureInput
