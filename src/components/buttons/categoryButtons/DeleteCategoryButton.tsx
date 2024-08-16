'use client'

import useDeleteCategory from '@/hooks/category/useDeleteCategory'
import { showModal } from '@/utils/modal'
import DeleteModal from '@/components/utilities/Modals/DeleteModal'

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
                className="btn btn-ghost btn-sm text-error"
                onClick={() => showModal(dialogId)}
            >
                Delete
            </button>

            <DeleteModal
                dialogId={dialogId}
                title="Delete category"
                value={categoryName}
                handleDeleteButton={handleDeleteButton}
                loading={loading}
            />
        </>
    )
}

export default DeleteCategoryButton
