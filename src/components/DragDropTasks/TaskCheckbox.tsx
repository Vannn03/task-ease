'use client'

import useCheckTask from '@/hooks/task/useCheckTask'
import DeleteTaskButton from '../buttons/taskButtons/DeleteTaskButton'
import EditTaskButton from '../buttons/taskButtons/EditTaskButton'
import {
    getDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'
import { GripVertical } from 'lucide-react'

interface TaskCheckboxProps {
    taskId: string
    taskDescription: string
    status: string
    deadline: Date
    dragHandleProps: any
}

const TaskCheckbox = ({
    taskId,
    taskDescription,
    status,
    deadline,
    dragHandleProps,
}: TaskCheckboxProps) => {
    const { isChecked, handleCheckboxChange } = useCheckTask({ taskId, status })

    return (
        <>
            <div className="flex items-center gap-4">
                <div {...dragHandleProps}>
                    <GripVertical className="cursor grab" />
                </div>
                <input
                    type="checkbox"
                    aria-label="Checkbox"
                    className="checkbox-success checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <div className="flex flex-col">
                    <p className={`${isChecked && 'line-through'}`}>
                        {taskDescription}
                    </p>
                    <p className="text-sm">
                        {getDateFromISODateTimeLocale(deadline)} |{' '}
                        {getTimeFromISODateTimeLocale(deadline)}
                    </p>
                </div>
            </div>
            <div className="flex items-center">
                <EditTaskButton
                    taskId={taskId}
                    taskDescription={taskDescription}
                    dialogId={`editTaskModal-${taskId}`}
                />
                <DeleteTaskButton
                    taskId={taskId}
                    taskDescription={taskDescription}
                    dialogId={`deleteTaskModal-${taskId}`}
                />
            </div>
        </>
    )
}

export default TaskCheckbox
