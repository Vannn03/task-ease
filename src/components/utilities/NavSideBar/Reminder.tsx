import { showModal } from '@/utils/modal'
import dayjs from 'dayjs'
import { Bell, X } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
// import UpgradeModal from '../Modals/UpgradeModal'

interface Task {
    taskId: string
    taskDescription: string
    status: string
    order: number
    deadline: Date
    createdAt: Date
    updatedAt: Date
    category: {
        categoryId: string
        categoryName: string
    }
}

interface ReminderProps {
    taskDB: Task[]
    // userId?: string
    // version?: string
}

const Reminder = ({
    taskDB,
    // userId, version
}: ReminderProps) => {
    const [notifications, setNotifications] = useState<Task[]>([])

    useEffect(() => {
        // Retrieve dismissed notifications from localStorage
        const dismissedNotifications: string[] =
            JSON.parse(
                localStorage.getItem('dismissedNotifications') || '[]'
            ) || []

        // Filter tasks based on their deadlines and whether they are dismissed
        const upcomingTasks = taskDB.filter((task) => {
            const timeUntilDeadline = dayjs(task.deadline).diff(
                dayjs(),
                'minute'
            )
            return (
                timeUntilDeadline <= 60 &&
                timeUntilDeadline > 0 &&
                !dismissedNotifications.includes(task.taskId)
            )
        })

        setNotifications(upcomingTasks)
    }, [taskDB])

    const closeNotification = useCallback((taskId: string) => {
        // Update notifications state
        setNotifications((prevNotifications) =>
            prevNotifications.filter((task) => task.taskId !== taskId)
        )

        // Update dismissed notifications in localStorage
        const dismissedNotifications: string[] =
            JSON.parse(
                localStorage.getItem('dismissedNotifications') || '[]'
            ) || []
        dismissedNotifications.push(taskId)
        localStorage.setItem(
            'dismissedNotifications',
            JSON.stringify(dismissedNotifications)
        )
    }, [])

    return (
        <>
            <div className="dropdown dropdown-end">
                <div className="indicator">
                    {notifications.length > 0 && (
                        <span className="badge indicator-item badge-warning">
                            {notifications.length}
                        </span>
                    )}
                    <button
                        tabIndex={0}
                        className="btn btn-circle btn-ghost btn-sm"
                        // onClick={() =>
                        //     version == 'Free' &&
                        //     showModal(`upgradeModalReminder-${userId}`)
                        // }
                    >
                        <Bell className="size-5 sm:size-6" />
                    </button>
                </div>

                {/* {version !== 'Free' && ( */}
                <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] w-64 rounded-box bg-base-100 p-4 shadow-lg sm:w-72"
                >
                    {notifications.length > 0 ? (
                        notifications.map((task) => (
                            <div
                                key={task.taskId}
                                className="flex items-center justify-between gap-2 rounded-lg p-2 transition-colors hover:bg-base-200"
                            >
                                <Link
                                    href={`/users/category/${task.category?.categoryId}`}
                                    className="flex flex-col"
                                >
                                    <span className="max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium">
                                        {task.taskDescription}
                                    </span>
                                    <span className="text-xs opacity-75">
                                        Deadline:{' '}
                                        {dayjs(task.deadline).format(
                                            'DD MMM, HH:mm'
                                        )}
                                    </span>
                                </Link>
                                <button
                                    onClick={() =>
                                        closeNotification(task.taskId)
                                    }
                                    className="btn btn-square btn-ghost btn-sm opacity-50"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="p-2 text-center">
                            <span className="text-sm font-medium opacity-75">
                                No upcoming tasks
                            </span>
                        </div>
                    )}
                </ul>
                {/* )} */}
            </div>

            {/* <UpgradeModal
                userId={userId}
                version={version}
                upgradeDialogId={`upgradeModalReminder-${userId}`}
                title={'Reminder notification feature is locked'}
                description={'This feature is not available on free version'}
            /> */}
        </>
    )
}

export default Reminder
