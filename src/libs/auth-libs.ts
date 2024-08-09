import { auth } from '@/auth'
import { getSession } from 'next-auth/react'

export const authUserSessionClient = async () => {
    const session = await getSession()
    return session?.user
}

export const authUserSessionServer = async () => {
    const session = await auth()
    return session?.user
}