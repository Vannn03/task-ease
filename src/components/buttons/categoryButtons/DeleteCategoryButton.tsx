'use client'

import useDeleteCategory from '@/hooks/category/useDeleteCategory'
import { showModal } from '@/utils/modal'
import DeleteModal from '@/components/utilities/Modals/DeleteModal'
import { Trash2 } from 'lucide-react'

interface DeleteCategoryProps {
    dialogId: string
    selectedCategories: string[]
}

const DeleteCategoryButton = ({
    dialogId,
    selectedCategories,
}: DeleteCategoryProps) => {
    const { loading, handleDeleteButton } =
        useDeleteCategory(selectedCategories)

    return (
        <>
            <button
                className={`btn btn-circle btn-error fixed bottom-24 right-8 z-40 shadow-lg sm:btn-lg sm:bottom-32 sm:right-12 ${selectedCategories.length == 0 ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'} transition-all`}
                onClick={() => showModal(dialogId)}
            >
                <Trash2 className="size-5 sm:size-6" />
            </button>

            <DeleteModal
                dialogId={dialogId}
                title="Delete checked categories"
                description={
                    'many categories? All tasks in the categories will also be deleted.'
                }
                handleDeleteButton={handleDeleteButton}
                loading={loading}
            />
        </>
    )
}

export default DeleteCategoryButton
