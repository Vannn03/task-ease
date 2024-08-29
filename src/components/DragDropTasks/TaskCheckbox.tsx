'use client'

import useCheckTask from '@/hooks/task/useCheckTask'
import { getISODateTimeLocale } from '@/utils/datetime'
import { GripVertical, Settings2 } from 'lucide-react'

interface Task {
    taskId: string
    taskDescription: string
    status: string
    deadline: Date
    category?: {
        categoryId: string
        categoryName: string
    }
}

interface TaskCheckboxProps {
    taskId?: string
    taskDescription: string
    status: string
    deadline: Date
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedTask: (task: Task) => void
    data: Task
}

const TaskCheckbox = ({
    taskId,
    taskDescription,
    status,
    deadline,
    setToggleDrawer,
    setSelectedTask,
    data,
}: TaskCheckboxProps) => {
    const { isChecked, handleCheckboxChange } = useCheckTask({ taskId, status })

    const handleTaskClick = (task: Task) => {
        setSelectedTask(task)
        setToggleDrawer(true)
    }

    return (
        <div className="flex items-center justify-between rounded bg-base-200 px-3 py-2 transition-colors hover:bg-base-100 sm:px-4 sm:py-3">
            <div className="flex items-center gap-4">
                <div>
                    <GripVertical className="size-5 cursor-grab opacity-50 sm:size-6" />
                </div>
                <input
                    type="checkbox"
                    aria-label="Checkbox"
                    className="checkbox checkbox-sm sm:checkbox-md"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className="flex flex-col gap-1">
                    <p
                        className={`${isChecked && 'line-through'} max-w-40 truncate text-sm sm:max-w-52 sm:text-base md:max-w-96`}
                    >
                        {taskDescription}
                    </p>
                    <div className="flex items-center gap-2 opacity-75">
                        <span
                            className={`badge badge-sm rounded sm:badge-md ${isChecked ? 'badge-success' : 'badge-warning'}`}
                        >
                            {getISODateTimeLocale(deadline, 'MMMM D, YYYY')}
                        </span>
                        <span
                            className={`badge badge-sm rounded sm:badge-md ${isChecked ? 'badge-success' : 'badge-warning'}`}
                        >
                            {getISODateTimeLocale(deadline, 'HH:mm')}
                        </span>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-square btn-ghost btn-sm sm:btn-md"
                onClick={() => handleTaskClick(data)}
            >
                <Settings2 className="size-5 opacity-50 sm:size-6" />
            </button>
        </div>
    )
}

export default TaskCheckbox
