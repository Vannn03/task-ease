'use client'

import axiosInstance from '@/utils/axiosInstance'
import { MouseEvent, useEffect } from 'react'
import { GiUpgrade } from 'react-icons/gi'

const UpgradeButton = (userId?: string) => {
    useEffect(() => {
        const snapScript = 'https://app.sandbox.midtrans.com/snap/snap.js'
        const clientKey = process.env.NEXT_PUBLIC_CLIENT

        if (!clientKey) {
            console.error('Client key is not defined')
            return
        }

        const script = document.createElement('script')
        script.src = snapScript
        script.setAttribute('data-client-key', clientKey)
        script.async = true

        document.body.appendChild(script)

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script)
            }
        }
    }, [])

    const upgrade = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        const response = await axiosInstance.post('/api/token', {
            orderId: userId,
            grossAmount: 50000,
        })

        window.snap.pay(response.data.token)
    }

    return (
        <>
            <button className="font-medium text-primary" onClick={upgrade}>
                <GiUpgrade /> Premium Upgrade
            </button>
        </>
    )
}

export default UpgradeButton
