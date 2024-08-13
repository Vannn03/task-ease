'use client'

import useEditTask from '@/hooks/task/useEditTask'
import { showModal } from '@/utils/modal'
import SuccessfulToast from '../../utilities/toasts/SuccessfulToast'
import { Pencil } from 'lucide-react'
import EditModal from '../../utilities/Modals/EditModal'

interface EditTaskProps {
    taskId: string
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
        toast,
        loading,
        handleInputChange,
        handleEditButton,
    } = useEditTask(taskId)

    return (
        <>
            <button
                className="btn btn-ghost text-warning"
                onClick={() => showModal(dialogId)}
            >
                <Pencil />
            </button>
            <EditModal
                dialogId={dialogId}
                title="Edit task"
                handleInputChange={handleInputChange}
                placeholder={taskDescription}
                value={newtaskDescription}
                handleEditButton={handleEditButton}
                loading={loading}
            />

            <SuccessfulToast
                toast={toast}
                description="Task updated"
                alertType="alert-warning"
            />
        </>
    )
}

export default EditTaskButton
