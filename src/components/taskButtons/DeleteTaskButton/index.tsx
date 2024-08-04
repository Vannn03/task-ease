'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'

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
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const showModal = () => {
        const modal = document.getElementById(
            dialogId
        ) as HTMLDialogElement | null
        if (modal) {
            modal.showModal()
        }
    }

    const handleDeleteButton = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        setLoading(true)

        const response = await axios.delete('/api/task', {
            data: { taskId },
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.status === 200) {
            setLoading(false)
            const modal = document.getElementById(
                dialogId
            ) as HTMLDialogElement | null
            if (modal) {
                modal.close()
            }
            router.refresh()
        }
    }

    return (
        <>
            <button className="btn btn-error btn-sm" onClick={showModal}>
                <FaRegTrashCan />
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
                        <form method="dialog" className="flex items-center">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-error ml-4"
                                onClick={handleDeleteButton}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>Delete</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default DeleteTaskButton
