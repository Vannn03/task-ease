'use client'

import axios from 'axios'
import { FaTrash } from 'react-icons/fa6'

interface DeletedTaskData {
    taskId: string
    dialogId: string
    taskDescription: string
}

const DeleteTaskButton: React.FC<DeletedTaskData> = ({
    taskId,
    dialogId,
    taskDescription,
}) => {
    const showModal = () => {
        const modal = document.getElementById(
            dialogId
        ) as HTMLDialogElement | null
        if (modal) {
            modal.showModal()
        }
    }

    const handleDeleteButton = async () => {
        const response = await axios.delete('/api/task', {
            data: { taskId },
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.status === 200) {
            location.reload()
        }
    }

    return (
        <>
            <button className="btn btn-outline btn-error" onClick={showModal}>
                <FaTrash />
            </button>

            {/*  */}
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">
                        Delete Task &apos;{taskDescription}&apos;
                    </h3>
                    <p className="py-4">
                        Are you sure you want to delete this task?
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-error ml-4"
                                onClick={handleDeleteButton}
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteTaskButton
