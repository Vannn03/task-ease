'use client'

import { useState } from 'react'
import axios from 'axios'
import DeleteTaskButton from '../taskButtons/DeleteTaskButton'
import EditTaskButton from '../taskButtons/EditTaskButton'

interface TaskData {
    taskId: number
    taskDescription: string
    status: string
}

const TaskCheckbox: React.FC<TaskData> = ({
    taskId,
    taskDescription,
    status,
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

        if (response.status === 200) {
            console.log(newStatus)
        }
    }

    return (
        <>
            <div className="flex gap-2">
                <input
                    type="checkbox"
                    className="checkbox-accent checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                />
                <p className={`${isChecked && 'line-through'}`}>
                    {taskDescription}
                </p>
            </div>
            <div className="flex gap-4">
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
