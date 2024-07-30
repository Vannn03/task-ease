'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface EditCategoryData {
    dialogId: string
    categoryId?: string
    categoryName?: string
}

const EditCategoryButton: React.FC<EditCategoryData> = ({
    categoryId,
    dialogId,
    categoryName,
}) => {
    const [newCategoryName, setNewCategoryName] = useState('')
    const router = useRouter()

    const handleInputChange = (e: any) => {
        setNewCategoryName(e.target.value)
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
            '/api/category',
            {
                categoryId,
                categoryName: newCategoryName,
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (response.status === 200) {
            setNewCategoryName('')
            router.refresh()
        }
    }

    return (
        <>
            <button className="btn btn-warning" onClick={showModal}>
                Edit Category
            </button>
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Edit Category</h3>
                    <input
                        type="text"
                        className="input input-bordered mt-2 w-full"
                        onChange={handleInputChange}
                        placeholder={categoryName}
                    />
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-warning ml-4"
                                onClick={handleEditButton}
                            >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default EditCategoryButton
