'use client'

import useEditCategory from '@/hooks/category/useEditCategory'
import { showModal } from '@/utils/modal'
import SuccessfulToast from '../toasts/SuccessfulToast'

interface EditCategoryProps {
    dialogId: string
    categoryId?: string
    categoryName?: string
}

const EditCategoryButton = ({
    categoryId,
    dialogId,
    categoryName,
}: EditCategoryProps) => {
    const {
        newCategoryName,
        toast,
        loading,
        handleInputChange,
        handleEditButton,
    } = useEditCategory(categoryId)

    return (
        <>
            <button
                className="btn btn-warning btn-sm"
                onClick={() => showModal(dialogId)}
            >
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
                        value={newCategoryName}
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
                description="Category updated"
                alertType="alert-warning"
            />
        </>
    )
}

export default EditCategoryButton
