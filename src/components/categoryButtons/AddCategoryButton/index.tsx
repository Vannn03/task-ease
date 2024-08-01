'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface addedCategoryType {
    userId?: string
    dialogId: string
}

const AddCategoryButton: React.FC<addedCategoryType> = ({
    userId,
    dialogId,
}) => {
    const [categoryName, setCategoryName] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: any) => {
        setCategoryName(e.target.value)
    }

    const handleAddButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setLoading(true)

        const response = await axios.post(
            '/api/category',
            {
                userId,
                categoryName,
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
            setCategoryName('')
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
            <button
                className="btn btn-outline btn-info w-full"
                onClick={showModal}
            >
                Create New Category
            </button>
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">New Category</h3>
                    <input
                        type="text"
                        placeholder="Category name"
                        className="input input-bordered mt-2 w-full"
                        onChange={handleInputChange}
                    />
                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn">Cancel</button>
                            <button
                                className="btn btn-success ml-4"
                                onClick={handleAddButton}
                            >
                                {loading ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>Create</>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default AddCategoryButton
