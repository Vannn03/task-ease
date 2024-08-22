'use client'

import useDeleteCategory from '@/hooks/category/useDeleteCategory'
import { showModal } from '@/utils/modal'
import DeleteModal from '@/components/utilities/Modals/DeleteModal'
import { Trash2 } from 'lucide-react'

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
                className="btn btn-ghost btn-sm w-1/2 text-error"
                onClick={() => showModal(dialogId)}
            >
                <Trash2 className="size-4" /> Delete
            </button>

            <DeleteModal
                dialogId={dialogId}
                title="Delete category"
                value={categoryName}
                description={
                    'category? All tasks in this category will also be deleted.'
                }
                handleDeleteButton={handleDeleteButton}
                loading={loading}
            />
        </>
    )
}

export default DeleteCategoryButton
