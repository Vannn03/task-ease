'use client'

import useEditCategory from '@/hooks/category/useEditCategory'
import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import EditModal from '@/components/utilities/Modals/EditModal'
import { SquarePen } from 'lucide-react'

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
    } = useEditCategory({ categoryId, categoryName })

    return (
        <>
            <a
                className="btn btn-circle btn-warning btn-sm sm:btn-md"
                onClick={() => showModal(dialogId)}
            >
                <SquarePen className="size-4 sm:size-5" />
            </a>
            <EditModal
                dialogId={dialogId}
                title="Edit category"
                handleInputChange={handleInputChange}
                placeholder={categoryName}
                value={newCategoryName}
                handleEditButton={handleEditButton}
                loading={loading}
            />

            <SuccessfulToast toast={toast} description="Update category" />
        </>
    )
}

export default EditCategoryButton
