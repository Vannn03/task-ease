'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

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
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setLoading(true)

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
            setLoading(false)
            const modal = document.getElementById(
                dialogId
            ) as HTMLDialogElement | null
            if (modal) {
                modal.close()
            }
            setNewCategoryName('')
            router.refresh()
        }
    }

    return (
        <>
            <button className="btn btn-warning" onClick={showModal}>
                Edit
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
                        <form method="dialog" className="flex items-center">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-warning ml-4"
                                onClick={handleEditButton}
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
        </>
    )
}

export default EditCategoryButton
