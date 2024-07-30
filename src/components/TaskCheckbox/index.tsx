'use client'

import { useState } from 'react'
import axios from 'axios'
import DeleteTaskButton from '../taskButtons/DeleteTaskButton'
import EditTaskButton from '../taskButtons/EditTaskButton'
import { MdDragIndicator } from 'react-icons/md'

interface TaskData {
    taskId: string
    taskDescription: string
    status: string
    dragHandleProps: any
}

const TaskCheckbox: React.FC<TaskData> = ({
    taskId,
    taskDescription,
    status,
    dragHandleProps,
}) => {
    const [isChecked, setIsChecked] = useState(status === 'Completed')

    const handleCheckboxChange = async () => {
        const newCheckedStatus = !isChecked
        setIsChecked(!isChecked)

        const newStatus = newCheckedStatus ? 'Completed' : 'Incomplete'

        const response = await axios.put(
            '/api/task/checkbox',
            {
                taskId,
                status: newStatus,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )
    }

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
                <p className={`${isChecked && 'line-through'}`}>
                    {taskDescription}
                </p>
            </div>
            <div className="flex gap-2">
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
