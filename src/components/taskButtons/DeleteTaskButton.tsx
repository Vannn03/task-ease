'use client'

import useDeleteTask from '@/hooks/task/useDeleteTask'
import { showModal } from '@/utils/modal'
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
    const { loading, handleDeleteButton } = useDeleteTask(taskId)

    return (
        <>
            <button
                className="btn btn-ghost btn-sm text-error"
                onClick={() => showModal(dialogId)}
            >
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

export default DeleteTaskButton
