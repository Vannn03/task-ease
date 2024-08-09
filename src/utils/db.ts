import prisma from '@/libs/prisma'
const bcrypt = require('bcryptjs')

export async function getUserFromDb(email: string, password: string) {
    const user = await prisma.user.findFirst({
        where: { email: email },
    })

    const comparePassword = await bcrypt.compare(password, user?.password)

    if (comparePassword) {
        console.log('Passwords match! User authenticated.')
        return user
    } else {
        console.log('Passwords do not match! Authentication failed.')
        return null
    }
}
