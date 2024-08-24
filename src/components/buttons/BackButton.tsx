'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()

    return (
        <button
            className="btn btn-circle btn-sm sm:btn-md"
            onClick={() => router.back()}
        >
            <ChevronLeft className="size-5 sm:size-6" />
        </button>
    )
}

export default BackButton
