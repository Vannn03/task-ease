'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

interface FileInputProps {
    userId?: string
}

const FileInput = ({ userId }: FileInputProps) => {
    const [userImage, setUserImage] = useState<File | null>(null)
    const router = useRouter()

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setUserImage(e.target.files[0])
        }
    }

    const handleSubmitButton = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!userImage) return

        const formData = new FormData()
        formData.append('userId', userId || '')
        formData.append('userImage', userImage)

        const response = await axios.put('/api/user', formData)

        if (response.status === 200) {
            setUserImage(null)
            router.refresh()
        }
    }

    return (
        <form
            onSubmit={handleSubmitButton}
            className="flex flex-col justify-center gap-2"
        >
            <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
                onChange={handleFileInputChange}
            />

            <button className="btn btn-success" type="submit">
                Save Profile Image
            </button>
        </form>
    )
}

export default FileInput
