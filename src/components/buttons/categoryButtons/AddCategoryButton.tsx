'use client'

import { showModal } from '@/utils/modal'
import SuccessfulToast from '../../utilities/toasts/SuccessfulToast'
import useAddCategory from '@/hooks/category/useAddCategory'
import { Plus } from 'lucide-react'
import { Fab } from '@/libs/mui'
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
            <Fab
                color="primary"
                aria-label="add"
                onClick={() => showModal(dialogId)}
            >
                <Plus />
            </Fab>
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
                            <button className="btn btn-ghost text-error">
                                Cancel
                            </button>
                            <button
                                className={`${categoryName === '' ? 'btn-disabled' : 'btn-info'} btn ml-4`}
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
