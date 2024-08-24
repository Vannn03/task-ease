import prisma from '@/libs/prisma'
import { getISODateTimeLocale } from '@/utils/datetime'
import Link from 'next/link'

interface DashboardTableProps {
    userId?: string
}

const DashboardTable = async ({ userId }: DashboardTableProps) => {
    const latestTaskDB = await prisma.task.findMany({
        where: {
            category: {
                userId: userId,
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        include: {
            category: true,
        },
    })

    const limitedTask = latestTaskDB.slice(0, 5)

    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {limitedTask.length == 0 ? (
                        <tr>
                            <td
                                colSpan={4}
                                className="text-center font-medium opacity-50"
                            >
                                No task to display.
                            </td>
                        </tr>
                    ) : (
                        limitedTask.map((data: any) => (
                            <tr
                                key={data.taskId}
                                className="text-xs sm:text-sm"
                            >
                                <td className="max-w-28 overflow-x-hidden text-ellipsis whitespace-nowrap sm:max-w-48">
                                    {data.taskDescription}
                                </td>
                                <td className="link-hover link max-w-20 overflow-x-hidden text-ellipsis whitespace-nowrap sm:max-w-40">
                                    <Link href={`category/${data.categoryId}`}>
                                        {data.category.categoryName}
                                    </Link>
                                </td>
                                <td>
                                    {getISODateTimeLocale(
                                        data.deadline,
                                        'HH:mm'
                                    )}
                                    ,{' '}
                                    {getISODateTimeLocale(
                                        data.deadline,
                                        'D MMM'
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable
