'use client'

import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import useAddCategory from '@/hooks/category/useAddCategory'
import { Plus } from 'lucide-react'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'
import AddModal from '@/components/utilities/Modals/AddModal'
// import UpgradeModal from '@/components/utilities/Modals/UpgradeModal'

interface addCategoryProps {
    userId?: string
    version?: string
    dialogId: string
    // upgradeDialogId?: string
    categoryLength: number
}

const AddCategoryButton = ({
    userId,
    version,
    dialogId,
    // upgradeDialogId,
    categoryLength,
}: addCategoryProps) => {
    const { categoryName, toast, loading, handleInputChange, handleAddButton } =
        useAddCategory(userId)

    const handleButtonClick = () => {
        // if (version == 'Free') {
        //     if (categoryLength == 5) {
        //         showModal(upgradeDialogId as string)
        //     } else if (categoryLength < 5) {
        //         showModal(dialogId)
        //     }
        // } else if (version == 'Premium') {
        showModal(dialogId)
        // }
    }

    return (
        <>
            <button
                className="btn btn-circle btn-primary btn-lg z-40 shadow-lg"
                onClick={handleButtonClick}
            >
                <Plus />
            </button>

            {/* <UpgradeModal
                userId={userId}
                version={version}
                upgradeDialogId={upgradeDialogId}
                title={'Limited category usage'}
                description={'Your category usage has reached its limit'}
            /> */}

            <AddModal
                dialogId={dialogId}
                title="Add new category"
                handleInputChange={handleInputChange}
                placeholder="Category name"
                value={categoryName}
                handleAddButton={handleAddButton}
                loading={loading}
            />

            <SuccessfulToast toast={toast} description="Add category" />
        </>
    )
}

export default AddCategoryButton
