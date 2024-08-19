'use client'

import { showModal } from '@/utils/modal'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import useAddCategory from '@/hooks/category/useAddCategory'
import { Plus } from 'lucide-react'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'
import UpgradeModal from '@/components/utilities/Modals/UpgradeModal'

interface addCategoryProps {
    userId?: string
    version?: string
    dialogId: string
    upgradeDialogId?: string
    categoryLength: number
}

const AddCategoryButton = ({
    userId,
    version,
    dialogId,
    upgradeDialogId,
    categoryLength,
}: addCategoryProps) => {
    const { categoryName, toast, loading, handleInputChange, handleAddButton } =
        useAddCategory(userId)

    const handleButtonClick = () => {
        if (version == 'Free') {
            if (categoryLength == 5) {
                showModal(upgradeDialogId as string)
            } else if (categoryLength < 5) {
                showModal(dialogId)
            }
        } else if (version == 'Premium') {
            showModal(dialogId)
        }
    }

    return (
        <>
            <button
                className="btn btn-circle btn-primary btn-lg z-40 shadow-lg"
                onClick={handleButtonClick}
            >
                <Plus />
            </button>

            <UpgradeModal
                userId={userId}
                version={version}
                upgradeDialogId={upgradeDialogId}
                title={'Limited category usage'}
                description={'Your category usage has reached its limit'}
            />

            <dialog
                id={dialogId}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box">
                    <h3 className="text-lg font-bold">Add new Category</h3>
                    <label className="form-control w-full">
                        <input
                            type="text"
                            placeholder="Category name"
                            className="input input-md input-bordered mt-2 w-full"
                            onChange={handleInputChange}
                            value={categoryName}
                        />
                        <div className="label">
                            <span className="label-text-alt">
                                Between 3 - 20 characters.
                            </span>
                        </div>
                    </label>

                    <div className="modal-action">
                        <form method="dialog" className="flex items-center">
                            <button className="btn btn-ghost text-error">
                                Cancel
                            </button>
                            <button
                                className={`${categoryName.length < 3 || categoryName.length > 20 ? 'btn-disabled' : 'btn-info'} btn ml-4`}
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
