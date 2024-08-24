'use client'

import useDeleteCompletedTask from '@/hooks/task/useDeleteCompletedTask'
import { showModal } from '@/utils/modal'
import { Trash2 } from 'lucide-react'

interface DeleteCompletedTaskProps {
    categoryId?: string
    dialogId: string
    finishedTaskLength: number
}

const DeleteCompletedTaskButton = ({
    categoryId,
    dialogId,
    finishedTaskLength,
}: DeleteCompletedTaskProps) => {
    const { loading, handleDeleteButton } = useDeleteCompletedTask(categoryId)

    return (
        <>
            <button
                className={`btn btn-ghost btn-sm sm:btn-md ${finishedTaskLength == 0 ? 'btn-disabled' : 'text-error'}`}
                onClick={() => showModal(dialogId)}
            >
                <Trash2 className="size-4 sm:size-5" /> Delete checked task
            </button>

            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="font-bold sm:text-lg">
                        Delete checked task
                    </h3>
                    <p className="pt-2 text-sm sm:text-base">
                        Are you sure you want to delete all checked task?
                    </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn btn-ghost text-error">
                                Cancel
                            </button>
                            <button
                                className="btn btn-error ml-4"
                                onClick={(e) => handleDeleteButton(e, dialogId)}
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

export default DeleteCompletedTaskButton
