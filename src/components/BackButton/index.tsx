'use client'

import { useRouter } from 'next/navigation'
import { IoMdArrowBack } from 'react-icons/io'

const BackButton = () => {
    const router = useRouter()
    return (
        <div
            className="flex cursor-pointer items-center gap-2"
            onClick={() => router.back()}
        >
            <IoMdArrowBack /> Go Back
        </div>
    )
}

export default BackButton
