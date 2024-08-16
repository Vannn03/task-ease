'use client'

import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter()
    return (
        <button
            className="btn btn-square btn-outline"
            onClick={() => router.back()}
        >
            <ChevronLeft />
        </button>
    )
}

export default BackButton
