import { getISODateTimeLocale } from '@/utils/datetime'
import { BookText, Calendar, ClipboardList, Clock, Eye } from 'lucide-react'
import { useState } from 'react'
import DeleteTaskButton from './buttons/taskButtons/DeleteTaskButton'
import EditTaskButton from './buttons/taskButtons/EditTaskButton'
import Link from 'next/link'

interface TaskDrawerProps {
    taskId?: string
    taskDescription: string
    deadline: Date
    categoryId?: string
    categoryName?: string
}

type TaskDrawerDataType = {
    icon: React.ReactElement
    title: string
    content: string | React.ReactElement
}

const TaskDrawer = ({
    taskId,
    taskDescription,
    deadline,
    categoryId,
    categoryName,
}: TaskDrawerProps) => {
    const [toggleDrawer, setToggleDrawer] = useState(false)

    const taskDrawerData: TaskDrawerDataType[] = [
        {
            icon: <BookText className="size-5" />,
            title: 'Category',
            content: (
                <Link
                    href={`/users/category/${categoryId}`}
                    className="link-hover link"
                >
                    {categoryName}
                </Link>
            ),
        },
        {
            icon: <ClipboardList className="size-5" />,
            title: 'Description',
            content: `${taskDescription}`,
        },
        {
            icon: <Calendar className="size-5" />,
            title: 'Date',
            content: `${getISODateTimeLocale(deadline, 'dddd, D MMMM YYYY')}`,
        },
        {
            icon: <Clock className="size-5" />,
            title: 'Time',
            content: `${getISODateTimeLocale(deadline, 'HH:mm')}`,
        },
    ]

    return (
        <>
            <div
                className={`${toggleDrawer ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} fixed right-0 top-0 z-50 h-full w-full bg-neutral/75 transition-all`}
                onClick={() => setToggleDrawer(false)}
            />

            <button
                className="btn btn-ghost"
                onClick={() => setToggleDrawer((prev) => !prev)}
            >
                <Eye />
            </button>

            <aside
                className={`fixed top-0 z-50 h-full w-[20rem] bg-base-100 sm:w-[28rem] ${toggleDrawer ? 'right-0' : '-right-[28rem]'} p-6 transition-all`}
            >
                <div className="flex h-full flex-col justify-between">
                    <div className="text-base-content">
                        {taskDrawerData.map((data, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-1 border-t py-4"
                            >
                                <span className="flex items-center gap-2">
                                    <span>{data.icon}</span>
                                    <h1 className="font-medium">
                                        {data.title}
                                    </h1>
                                </span>
                                <p className="break-words text-sm">
                                    {data.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <EditTaskButton
                            taskId={taskId}
                            taskDescription={taskDescription}
                            deadline={deadline}
                            dialogId={`editTaskModal-${taskId}`}
                        />
                        <DeleteTaskButton
                            taskId={taskId}
                            taskDescription={taskDescription}
                            dialogId={`deleteTaskModal-${taskId}`}
                        />
                    </div>
                </div>
            </aside>
        </>
    )
}

export default TaskDrawer
