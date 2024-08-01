'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteCategoryData {
    dialogId: string
    categoryId?: string
    categoryName?: string
}

const DeleteCategoryButton: React.FC<DeleteCategoryData> = ({
    categoryId,
    dialogId,
    categoryName,
}) => {
    const [loading, setLoading] = useState(false)

    const showModal = () => {
        const modal = document.getElementById(
            dialogId
        ) as HTMLDialogElement | null
        if (modal) {
            modal.showModal()
        }
    }

    const router = useRouter()

    const handleDeleteButton = async (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.preventDefault()

        setLoading(true)

        const response = await axios.delete('/api/category', {
            data: { categoryId },
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
            router.push('/dashboard')
            router.refresh()
        }
    }

    return (
        <>
            <button className="btn btn-error" onClick={showModal}>
                Delete Category
            </button>

            {/*  */}
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">
                        Delete Category &apos;{categoryName}&apos;
                    </h3>
                    <p className="py-4">
                        Are you sure you want to delete this category?
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

export default DeleteCategoryButton
