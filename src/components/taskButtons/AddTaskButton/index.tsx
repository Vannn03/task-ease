'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface AddTaskData {
    dialogId: string
    categoryId: number
    categoryName: string
}

const AddTaskButton: React.FC<AddTaskData> = ({
    dialogId,
    categoryId,
    categoryName,
}) => {
    const [taskDescription, setTaskDescription] = useState('')
    const router = useRouter()

    const handleInputChange = (e: any) => {
        setTaskDescription(e.target.value)
    }

    const handleAddButton = async () => {
        const response = await axios.post(
            '/api/task',
            {
                categoryId,
                taskDescription,
                status: 'Incomplete',
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (response.status === 200) {
            setTaskDescription('')
            router.refresh()
        }
    }

    const showModal = () => {
        const modal = document.getElementById(
            dialogId
        ) as HTMLDialogElement | null
        if (modal) {
            modal.showModal()
        }
    }

    return (
        <>
            <button className="btn btn-outline btn-info" onClick={showModal}>
                Create New Task
            </button>
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">
                        New Task in "{categoryName}" Category
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
                                className="btn btn-success ml-4"
                                onClick={handleAddButton}
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddTaskButton
