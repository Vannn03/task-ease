'use client'

import { showModal } from '@/utils/modal'
import { IoIosAddCircle } from 'react-icons/io'
import SuccessfulToast from '../toasts/SuccessfulToast'
import useAddCategory from '@/hooks/category/useAddCategory'

interface addedCategoryType {
    userId?: string
    dialogId: string
}

const AddCategoryButton: React.FC<addedCategoryType> = ({
    userId,
    dialogId,
}) => {
    const { categoryName, toast, loading, handleInputChange, handleAddButton } =
        useAddCategory(userId)

    return (
        <>
            <button
                className="btn card btn-outline btn-primary h-full w-96 cursor-pointer"
                onClick={() => showModal(dialogId)}
            >
                <div className="card-body flex flex-col items-center justify-center">
                    <IoIosAddCircle className="text-7xl" />
                    <h1 className="card-title">Add New</h1>
                </div>
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
                        value={categoryName}
                    />
                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn">Cancel</button>
                            <button
                                className={`${categoryName === '' ? 'btn-disabled' : 'btn-primary'} btn ml-4`}
                                onClick={(e) => handleAddButton(e, dialogId)}
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

            <SuccessfulToast
                toast={toast}
                description="Category created"
                alertType="alert-success"
            />
        </>
    )
}

export default AddCategoryButton
