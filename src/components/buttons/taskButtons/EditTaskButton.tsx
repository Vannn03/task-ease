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
    deadline: Date
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const EditTaskButton = ({
    taskId,
    dialogId,
    taskDescription,
    deadline,
    setToggleDrawer,
}: EditTaskProps) => {
    const {
        newtaskDescription,
        setNewTaskDescription,
        newTaskDate,
        setNewTaskDate,
        newTaskTime,
        setNewTaskTime,
        toast,
        loading,
        handleInputChange,
        handleEditButton,
    } = useEditTask({ taskId, taskDescription, deadline, setToggleDrawer })

    return (
        <>
            <button
                className="btn btn-warning w-1/2"
                onClick={() => showModal(dialogId)}
            >
                <SquarePen className="size-4" /> Edit
            </button>
            <EditModal
                dialogId={dialogId}
                title="Edit task"
                handleInputChange={handleInputChange(setNewTaskDescription)}
                placeholder={taskDescription}
                value={newtaskDescription}
                newTaskDate={newTaskDate}
                newTaskTime={newTaskTime}
                handleEditButton={handleEditButton}
                loading={loading}
            >
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="input input-md input-bordered mt-2 w-full"
                        onChange={handleInputChange(setNewTaskDate)}
                        value={newTaskDate}
                    />
                    <input
                        type="time"
                        className="input input-md input-bordered mt-2 w-full"
                        onChange={handleInputChange(setNewTaskTime)}
                        value={newTaskTime}
                    />
                </div>
            </EditModal>

            <SuccessfulToast toast={toast} description="Update task" />
        </>
    )
}

export default EditTaskButton
