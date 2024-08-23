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
                className="btn btn-ghost btn-sm w-1/2 text-warning"
                onClick={() => showModal(dialogId)}
            >
                <SquarePen className="size-4" /> Edit
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
