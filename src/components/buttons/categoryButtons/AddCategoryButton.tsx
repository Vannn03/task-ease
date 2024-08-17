'use client'

import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import useAddCategory from '@/hooks/category/useAddCategory'
import { Plus } from 'lucide-react'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface addCategoryProps {
    userId?: string
    dialogId: string
}

const AddCategoryButton = ({ userId, dialogId }: addCategoryProps) => {
    const { categoryName, toast, loading, handleInputChange, handleAddButton } =
        useAddCategory(userId)

    return (
        <>
            <button
                className="btn btn-circle btn-primary btn-lg z-40 shadow-lg"
                onClick={() => showModal(dialogId)}
            >
                <Plus />
            </button>
            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Add new Category</h3>
                    <label className="form-control w-full">
                        <input
                            type="text"
                            placeholder="Category name"
                            className="input input-md input-bordered mt-2 w-full"
                            onChange={handleInputChange}
                            value={categoryName}
                        />
                        <div className="label">
                            <span className="label-text-alt">
                                Between 3 - 20 characters.
                            </span>
                        </div>
                    </label>

                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn btn-ghost text-error">
                                Cancel
                            </button>
                            <button
                                className={`${categoryName.length < 3 || categoryName.length > 20 ? 'btn-disabled' : 'btn-info'} btn ml-4`}
                                onClick={(e) => handleAddButton(e, dialogId)}
                            >
                                {loading ? <ButtonLoader /> : <>Create</>}
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

            <SuccessfulToast
                toast={toast}
                description="Category created"
                alertType="alert-success"
            />
        </>
    )
}

export default AddCategoryButton
