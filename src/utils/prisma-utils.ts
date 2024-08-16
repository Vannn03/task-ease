import prisma from "@/libs/prisma"
import { User } from "next-auth"

export const findLoggedUser = async (user: User | undefined) => {
    return await prisma.user.findFirst({
        where: { email: user?.email as string },
    })
}