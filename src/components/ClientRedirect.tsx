'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const ClientRedirect = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/users/dashboard')
        }, 2000) // Adjust delay time as needed
    }, [router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <span className="loading loading-spinner loading-md text-warning"></span>
                <p className="ml-2">Logging in...</p>
            </div>
        )
    }

    return null
}

export default ClientRedirect
