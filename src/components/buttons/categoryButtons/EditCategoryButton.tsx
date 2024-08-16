'use client'

import useEditCategory from '@/hooks/category/useEditCategory'
import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import EditModal from '@/components/utilities/Modals/EditModal'

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
            <a
                className="btn btn-ghost btn-sm text-warning"
                onClick={() => showModal(dialogId)}
            >
                Edit
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

            <SuccessfulToast
                toast={toast}
                description="Category updated"
                alertType="alert-warning"
            />
        </>
    )
}

export default EditCategoryButton
