import prisma from '@/libs/prisma'
import {
    getDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
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
                        <th>Date</th>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {limitedTask.length == 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center">
                                No task to display.
                            </td>
                        </tr>
                    ) : (
                        limitedTask.map((data: any) => (
                            <tr key={data.taskId}>
                                <td>
                                    {getDateFromISODateTimeLocale(
                                        data.deadline
                                    )}
                                </td>
                                <td>{data.taskDescription}</td>
                                <td className="link-hover link">
                                    <Link href={`category/${data.categoryId}`}>
                                        {data.category.categoryName}
                                    </Link>
                                </td>
                                <td>
                                    {getTimeFromISODateTimeLocale(
                                        data.deadline
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
