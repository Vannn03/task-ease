'use client'

import useCheckTask from '@/hooks/task/useCheckTask'
import DeleteTaskButton from '../taskButtons/DeleteTaskButton'
import EditTaskButton from '../taskButtons/EditTaskButton'
import { MdDragIndicator } from 'react-icons/md'
import {
    getDateFromISODateTimeLocale,
    getTimeFromISODateTimeLocale,
} from '@/utils/datetime'

interface TaskData {
    taskId: string
    taskDescription: string
    status: 'Completed' | 'Incomplete'
    deadline: string
    dragHandleProps: any
}

const TaskCheckbox: React.FC<TaskData> = ({
    taskId,
    taskDescription,
    status,
    deadline,
    dragHandleProps,
}) => {
    const { isChecked, handleCheckboxChange } = useCheckTask({ taskId, status })

    return (
        <>
            <div className="flex items-center gap-4">
                <div {...dragHandleProps}>
                    <MdDragIndicator className="cursor-grab text-lg" />
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
