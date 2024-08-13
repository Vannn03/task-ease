'use client'

import { CircleArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <div
            className="flex w-fit cursor-pointer items-center gap-2"
            onClick={() => router.back()}
        >
            <CircleArrowLeft /> Go Back
        </div>
    )
}

export default BackButton
