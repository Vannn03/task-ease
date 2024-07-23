'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'

interface EditTaskData {
    taskId: number
    dialogId: string
    taskDescription: string
}

const EditTaskButton: React.FC<EditTaskData> = ({
    taskId,
    dialogId,
    taskDescription,
}) => {
    const [newtaskDescription, setNewTaskDescription] = useState('')
    const router = useRouter()

    const handleInputChange = (e: any) => {
        setNewTaskDescription(e.target.value)
    }

    const showModal = () => {
        const modal = document.getElementById(
            dialogId
        ) as HTMLDialogElement | null
        if (modal) {
            modal.showModal()
        }
    }

    const handleEditButton = async () => {
        const response = await axios.put(
            '/api/task',
            {
                taskId,
                taskDescription: newtaskDescription,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (response.status === 200) {
            setNewTaskDescription('')
            router.refresh()
        }
    }

    return (
        <>
            <button className="btn btn-outline btn-warning" onClick={showModal}>
                <FaRegEdit />
            </button>
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">
                        Edit Task "{taskDescription}"
                    </h3>
                    <input
                        type="text"
                        placeholder="Description"
                        className="input input-bordered mt-2 w-full"
                        onChange={handleInputChange}
                    />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-warning ml-4"
                                onClick={handleEditButton}
                            >
                                Update Task
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default EditTaskButton
