'use client'

import useEditTask from '@/hooks/task/useEditTask'
import { showModal } from '@/utils/modal'
import { FaRegEdit } from 'react-icons/fa'
import SuccessfulToast from '../toasts/SuccessfulToast'

interface EditTaskData {
    taskId: string
    dialogId: string
    taskDescription: string
}

const EditTaskButton: React.FC<EditTaskData> = ({
    taskId,
    dialogId,
    taskDescription,
}) => {
    const { toast, loading, handleInputChange, handleEditButton } =
        useEditTask(taskId)

    return (
        <>
            <button
                className="btn btn-ghost btn-sm text-warning"
                onClick={() => showModal(dialogId)}
            >
                <FaRegEdit />
            </button>
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit Task</h3>
                    <input
                        type="text"
                        placeholder={taskDescription}
                        className="input input-bordered mt-2 w-full"
                        onChange={handleInputChange}
                    />
                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-warning ml-4"
                                onClick={(e) => handleEditButton(e, dialogId)}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>Update</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            <SuccessfulToast
                toast={toast}
                description="Task updated"
                alertType="alert-warning"
            />
        </>
    )
}

export default EditTaskButton
