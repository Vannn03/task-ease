import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface EditModalProps {
    dialogId: string
    title: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value: string
    newTaskDate?: string
    newTaskTime?: string
    handleEditButton: (
        e: React.MouseEvent<HTMLButtonElement>,
        dialogId: string
    ) => void
    loading: boolean
    children?: React.ReactNode
}

const EditModal: React.FC<EditModalProps> = ({
    dialogId,
    title,
    handleInputChange,
    placeholder,
    value,
    newTaskDate,
    newTaskTime,
    handleEditButton,
    loading,
    children,
}) => {
    const isTask = !!newTaskDate && !!newTaskTime // Checks if it's a task
    const isCategory = !newTaskDate && !newTaskTime // Checks if it's a category

    const isTaskButtonDisabled =
        isTask && (value === '' || newTaskDate === '' || newTaskTime === '')
    const isCategoryButtonDisabled =
        isCategory && (value.length < 3 || value.length > 20)

    const buttonClass =
        isTaskButtonDisabled || isCategoryButtonDisabled
            ? 'btn-disabled'
            : 'btn-warning'

    return (
        <dialog id={dialogId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
                <input
                    type="text"
                    className="input input-md input-bordered mt-2 w-full"
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    value={value}
                />
                <div className="modal-action">
                    <form method="dialog" className="flex items-center">
                        <button className="btn btn-ghost text-error">
                            Cancel
                        </button>
                        <button
                            className={`btn ${buttonClass} ml-4`}
                            onClick={(e) => handleEditButton(e, dialogId)}
                        >
                            {loading ? <ButtonLoader /> : <>Update</>}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default EditModal
