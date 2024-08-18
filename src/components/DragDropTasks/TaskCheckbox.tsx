'use client'

import useCheckTask from '@/hooks/task/useCheckTask'
import { getISODateTimeLocale } from '@/utils/datetime'
import { GripVertical } from 'lucide-react'
import TaskDrawer from '@/components/TaskDrawer'
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd'

interface TaskCheckboxProps {
    taskId?: string
    taskDescription: string
    status: string
    deadline: Date
    categoryId?: string
    categoryName?: string
    dragHandleProps: DraggableProvidedDragHandleProps
}

const TaskCheckbox = ({
    taskId,
    taskDescription,
    status,
    deadline,
    categoryId,
    categoryName,
    dragHandleProps,
}: TaskCheckboxProps) => {
    const { isChecked, handleCheckboxChange } = useCheckTask({ taskId, status })

    return (
        <>
            <div className="flex items-center gap-4">
                <div {...dragHandleProps}>
                    <GripVertical className="cursor-grab" />
                </div>
                <input
                    type="checkbox"
                    aria-label="Checkbox"
                    className="checkbox-success checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className="flex flex-col">
                    <p
                        className={`${isChecked && 'line-through'} max-w-40 overflow-x-hidden text-ellipsis whitespace-nowrap sm:max-w-52 md:max-w-96`}
                    >
                        {taskDescription}
                    </p>
                    <p className="text-sm opacity-75">
                        {getISODateTimeLocale(deadline, 'D MMM')} |{' '}
                        {getISODateTimeLocale(deadline, 'HH:mm')}
                    </p>
                </div>
            </div>
            <TaskDrawer
                taskId={taskId}
                taskDescription={taskDescription}
                deadline={deadline}
                categoryId={categoryId}
                categoryName={categoryName}
            />
        </>
    )
}

export default TaskCheckbox
