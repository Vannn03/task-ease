'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface addedCategoryType {
    userId?: string
}

const AddCategoryButton: React.FC<addedCategoryType> = ({ userId }) => {
    const [categoryName, setCategoryName] = useState('')
    const router = useRouter()

    const handleInputChange = (e: any) => {
        setCategoryName(e.target.value)
    }

    const handleAddButton = async () => {
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
            setCategoryName('')
            router.refresh()
        }
    }

    const showModal = () => {
        const modal = document.getElementById(
            'addCategoryModal'
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
                id={'addCategoryModal'}
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

export default AddCategoryButton
