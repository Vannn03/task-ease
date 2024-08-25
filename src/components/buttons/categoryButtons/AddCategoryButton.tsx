'use client'

import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import useAddCategory from '@/hooks/category/useAddCategory'
import { Plus } from 'lucide-react'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'
import AddModal from '@/components/utilities/Modals/AddModal'
import { usePathname } from 'next/navigation'
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
    const pathname = usePathname()

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
                className={`btn btn-info z-40 ${pathname == '/users/category' ? 'btn-circle shadow-lg sm:btn-lg' : 'btn-outline'}`}
                onClick={handleButtonClick}
            >
                <Plus
                    className={`${pathname == '/users/category' ? 'size-5 sm:size-6' : 'size-4 sm:size-5'}`}
                />
                {pathname == '/users/dashboard' && (
                    <>Create your first category</>
                )}
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
