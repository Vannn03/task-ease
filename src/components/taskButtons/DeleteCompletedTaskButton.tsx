'use client'

import useDeleteCompletedTask from '@/hooks/task/useDeleteCompletedTask'
import { showModal } from '@/utils/modal'

interface DeleteCompletedTaskProps {
    categoryId?: string
    dialogId: string
}

const DeleteCompletedTaskButton = ({
    categoryId,
    dialogId,
}: DeleteCompletedTaskProps) => {
    const { loading, handleDeleteButton } = useDeleteCompletedTask(categoryId)

    return (
        <>
            <button
                className="btn btn-outline btn-error"
                onClick={() => showModal(dialogId)}
            >
                Delete Completed Task
            </button>

            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Delete Completed Task</h3>
                    <p className="py-4">
                        Are you sure you want to delete all completed task?
                    </p>
                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn">Cancel</button>
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
