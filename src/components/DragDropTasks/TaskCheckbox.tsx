'use client'

import useCheckTask from '@/hooks/task/useCheckTask'
import { getISODateTimeLocale } from '@/utils/datetime'
import { CalendarClock, Eye, GripVertical } from 'lucide-react'
import {
    DraggableProvidedDraggableProps,
    DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd'

interface TaskCheckboxProps {
    taskId?: string
    taskDescription: string
    status: string
    deadline: Date
    dragHandleProps: DraggableProvidedDragHandleProps
    draggableProps: DraggableProvidedDraggableProps
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const TaskCheckbox = ({
    taskId,
    taskDescription,
    status,
    deadline,
    dragHandleProps,
    draggableProps,
    setToggleDrawer,
}: TaskCheckboxProps) => {
    const { isChecked, handleCheckboxChange } = useCheckTask({ taskId, status })

    return (
        <div
            className="flex items-center justify-between rounded bg-base-200 px-3 py-2 transition-colors hover:bg-base-100 sm:px-4 sm:py-3"
            {...draggableProps}
        >
            <div className="flex items-center gap-4">
                <div {...dragHandleProps}>
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
                onClick={() => setToggleDrawer((prev) => !prev)}
            >
                <Eye className="size-5 opacity-50 sm:size-6" />
            </button>
        </div>
    )
}

export default TaskCheckbox
