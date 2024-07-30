'use client'

import axios from 'axios'
import { useEffect } from 'react'

interface UpgradePremiumData {
    userId?: string
}

const UpgradeButton: React.FC<UpgradePremiumData> = ({ userId }) => {
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

    const upgrade = async () => {
        const response = await axios.post(
            '/api/token',
            { orderId: userId, grossAmount: 50000 },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        )

        window.snap.pay(response.data.token)
    }

    return (
        <>
            <button className="btn btn-primary" onClick={upgrade}>
                Upgrade to Premium
            </button>
        </>
    )
}

export default UpgradeButton
