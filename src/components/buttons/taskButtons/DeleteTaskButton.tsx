'use client'

import useDeleteTask from '@/hooks/task/useDeleteTask'
import { showModal } from '@/utils/modal'
import { Trash2 } from 'lucide-react'
import DeleteModal from '../../utilities/Modals/DeleteModal'

interface DeletedTaskProps {
    taskId: string
    dialogId: string
    taskDescription: string
}

const DeleteTaskButton = ({
    taskId,
    dialogId,
    taskDescription,
}: DeletedTaskProps) => {
    const { loading, handleDeleteButton } = useDeleteTask(taskId)

    return (
        <>
            <button
                className="btn btn-ghost text-error"
                onClick={() => showModal(dialogId)}
            >
                <Trash2 className="size-5" />
            </button>

            <DeleteModal
                dialogId={dialogId}
                title="Delete task"
                value={taskDescription}
                handleDeleteButton={handleDeleteButton}
                loading={loading}
            />
        </>
    )
}

export default DeleteTaskButton
