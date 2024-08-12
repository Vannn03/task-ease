'use client'

import useDeleteCategory from '@/hooks/category/useDeleteCategory'
import { showModal } from '@/utils/modal'

interface DeleteCategoryProps {
    dialogId: string
    categoryId?: string
    categoryName?: string
}

const DeleteCategoryButton = ({
    categoryId,
    dialogId,
    categoryName,
}: DeleteCategoryProps) => {
    const { loading, handleDeleteButton } = useDeleteCategory(categoryId)

    return (
        <>
            <button
                className="btn btn-ghost text-error"
                onClick={() => showModal(dialogId)}
            >
                Delete
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
                                onClick={(e) => handleDeleteButton(e, dialogId)}
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
