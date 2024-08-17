'use client'

import useEditTask from '@/hooks/task/useEditTask'
import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import { SquarePen } from 'lucide-react'
import EditModal from '@/components/utilities/Modals/EditModal'

interface EditTaskProps {
    taskId?: string
    dialogId: string
    taskDescription: string
}

const EditTaskButton = ({
    taskId,
    dialogId,
    taskDescription,
}: EditTaskProps) => {
    const {
        newtaskDescription,
        newTaskDate,
        newTaskTime,
        toast,
        loading,
        handleInputChange,
        handleDateChange,
        handleTimeChange,
        handleEditButton,
    } = useEditTask(taskId)

    return (
        <>
            <button
                className="w btn btn-warning w-1/2"
                onClick={() => showModal(dialogId)}
            >
                <SquarePen className="size-5" /> Edit
            </button>
            <EditModal
                dialogId={dialogId}
                title="Edit task"
                handleInputChange={handleInputChange}
                placeholder={taskDescription}
                value={newtaskDescription}
                handleEditButton={handleEditButton}
                loading={loading}
            >
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="input input-bordered mt-2 w-full"
                        onChange={handleDateChange}
                        placeholder={newTaskDate}
                    />
                    <input
                        type="time"
                        className="input input-bordered mt-2 w-full"
                        onChange={handleTimeChange}
                        placeholder={newTaskTime}
                    />
                </div>
            </EditModal>

            <SuccessfulToast
                toast={toast}
                description="Task updated"
                alertType="alert-warning"
            />
        </>
    )
}

export default EditTaskButton
