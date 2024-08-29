'use client'

import useDeleteTask from '@/hooks/task/useDeleteTask'
import { showModal } from '@/utils/modal'
import { Trash2 } from 'lucide-react'
import DeleteModal from '@/components/utilities/Modals/DeleteModal'

interface DeletedTaskProps {
    taskId?: string
    dialogId: string
    taskDescription: string
    setToggleDrawer: React.Dispatch<React.SetStateAction<boolean>>
}

const DeleteTaskButton = ({
    taskId,
    dialogId,
    taskDescription,
    setToggleDrawer,
}: DeletedTaskProps) => {
    const { loading, handleDeleteButton } = useDeleteTask({
        taskId,
        setToggleDrawer,
    })

    return (
        <>
            <button
                className="btn btn-ghost w-1/2 text-error"
                onClick={() => showModal(dialogId)}
            >
                <Trash2 className="size-4" /> Delete
            </button>

            <DeleteModal
                dialogId={dialogId}
                title="Delete task"
                value={taskDescription}
                description="task?"
                handleDeleteButton={handleDeleteButton}
                loading={loading}
            />
        </>
    )
}

export default DeleteTaskButton
