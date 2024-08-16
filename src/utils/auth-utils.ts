import { auth } from '@/auth'
import prisma from '@/libs/prisma'
import { User } from 'next-auth'
import { getSession } from 'next-auth/react'

export const authUserSessionClient = async () => {
    const session = await getSession()
    return session?.user
}

export const authUserSessionServer = async () => {
    const session = await auth()
    return session?.user
}

export const findLoggedUser = async (user: User | undefined) => {
    return await prisma.user.findFirst({
        where: { email: user?.email as string },
    })
}