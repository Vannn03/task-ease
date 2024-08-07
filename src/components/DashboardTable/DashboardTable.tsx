import {
    getDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
import Link from 'next/link'

const DashboardTable = ({ taskDB }: any) => {
    const limitedTask = taskDB.slice(0, 5)

    return (
        <div className="overflow-x-auto">
            <table className="table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Task</th>
                        <th>Category</th>
                        <th>Deadline</th>
                    </tr>
                </thead>
                <tbody>
                    {limitedTask.map((data: any) => (
                        <tr key={data.taskId}>
                            <td>
                                {getDateFromISODateTimeLocale(data.deadline)}
                            </td>
                            <td>{data.taskDescription}</td>
                            <td className="link-hover link">
                                <Link href={`/category/${data.categoryId}`}>
                                    {data.category.categoryName}
                                </Link>
                            </td>
                            <td>
                                {getTimeFromISODateTimeLocale(data.deadline)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DashboardTable
