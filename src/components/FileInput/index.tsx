'use client'

import { useEdgeStore } from '@/libs/edgestore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SingleImageDropzone } from './SingleImageDropzone'
import axiosInstance from '@/utils/axiosInstance'

interface ProfilePictureInputProps {
    userId?: string
}

const ProfilePictureInput = ({ userId }: ProfilePictureInputProps) => {
    const [file, setFile] = useState<File>()
    const [progress, setProgress] = useState(0)
    const { edgestore } = useEdgeStore()
    const router = useRouter()

    const handleSubmitButton = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        if (file) {
            const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                    setProgress(progress)
                },
            })

            const userImage = res.url

            const response = await axiosInstance.put('/api/user', {
                userId,
                userImage,
            })

            if (response.status === 200) {
                setProgress(0)
                router.refresh()
            }
        }
    }

    return (
        <div className="flex flex-col justify-center gap-2">
            <SingleImageDropzone
                width={200}
                height={200}
                value={file}
                dropzoneOptions={{
                    maxSize: 1024 * 1024 * 1, // 1 MB
                }}
                onChange={(file) => setFile(file)}
            />

            <progress
                className="progress w-full"
                value={progress}
                max="100"
            ></progress>

            <button className="btn btn-success" onClick={handleSubmitButton}>
                Upload
            </button>
        </div>
    )
}

export default ProfilePictureInput
