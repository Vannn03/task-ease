import { getISODateTimeLocale } from '@/utils/datetime'
import { BookText, CalendarClock, ClipboardList } from 'lucide-react'
import DeleteTaskButton from '@/components/buttons/taskButtons/DeleteTaskButton'
import EditTaskButton from '@/components/buttons/taskButtons/EditTaskButton'
import Link from 'next/link'

interface TaskDrawerProps {
    taskId?: string
    taskDescription: string
    deadline: Date
    categoryId?: string
    categoryName?: string
    toggleDrawer: boolean
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
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
    toggleDrawer,
    setToggleDrawer,
}: TaskDrawerProps) => {
    const taskDrawerData: TaskDrawerDataType[] = [
        {
            icon: <BookText className="size-5 opacity-75" />,
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
            icon: <ClipboardList className="size-5 opacity-75" />,
            title: 'Description',
            content: `${taskDescription}`,
        },
        {
            icon: <CalendarClock className="size-5 opacity-75" />,
            title: 'Deadline',
            content: `${getISODateTimeLocale(deadline, 'ddd, D MMM YYYY')}, ${getISODateTimeLocale(deadline, 'HH:mm')}`,
        },
    ]

    return (
        <>
            <div
                className={`${toggleDrawer ? 'pointer-events-auto opacity-50' : 'pointer-events-none opacity-0'} fixed right-0 top-0 z-50 h-full w-full bg-neutral transition-all`}
                onClick={() => setToggleDrawer(false)}
            />

            <aside
                className={`fixed top-0 z-50 h-full w-[20rem] bg-base-100 sm:w-[28rem] ${toggleDrawer ? 'right-0' : '-right-[28rem]'} p-6 transition-all`}
            >
                <div className="flex h-full flex-col justify-between">
                    <div className="text-base-content">
                        {taskDrawerData.map((data, index) => (
                            <div
                                key={index}
                                className="flex gap-4 border-t py-4"
                            >
                                {data.icon}
                                <span className="flex flex-col">
                                    <h1 className="text-sm font-medium opacity-75">
                                        {data.title}
                                    </h1>
                                    <p className="break-words">
                                        {data.content}
                                    </p>
                                </span>
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
