'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <button
            className="btn btn-square btn-warning btn-sm"
            onClick={() => router.back()}
        >
            <ChevronLeft className="size-5" />
        </button>
    )
}

export default BackButton
