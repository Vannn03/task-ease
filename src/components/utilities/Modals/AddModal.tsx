import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface AddModalProps {
    dialogId: string
    title: string
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    value: string
    taskDate?: string
    taskTime?: string
    handleAddButton: (
        e: React.MouseEvent<HTMLButtonElement>,
        dialogId: string
    ) => void
    loading: boolean
    children?: React.ReactNode
}

const AddModal: React.FC<AddModalProps> = ({
    dialogId,
    title,
    handleInputChange,
    placeholder,
    value,
    taskDate,
    taskTime,
    handleAddButton,
    loading,
    children,
}) => {
    const isTask = !!taskDate && !!taskTime // Checks if it's a task
    const isCategory = !taskDate && !taskTime // Checks if it's a category

    const isTaskButtonDisabled =
        (isTask && value === '') || taskDate === '' || taskTime === ''
    const isCategoryButtonDisabled =
        isCategory && (value.length < 3 || value.length > 20)

    const buttonClass =
        isTaskButtonDisabled || isCategoryButtonDisabled
            ? 'btn-disabled'
            : 'btn-info'

    return (
        <dialog id={dialogId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-semibold sm:text-lg">{title}</h3>
                <label className="form-control w-full">
                    {children}
                    <input
                        type="text"
                        placeholder={placeholder}
                        className="input input-md input-bordered mt-2 w-full"
                        onChange={handleInputChange}
                        value={value}
                    />
                </label>

                <div className="modal-action">
                    <form method="dialog" className="flex items-center">
                        <button className="btn btn-ghost text-error">
                            Cancel
                        </button>
                        <button
                            className={`${buttonClass} btn ml-4`}
                            onClick={(e) => handleAddButton(e, dialogId)}
                        >
                            {loading ? <ButtonLoader /> : <>Create</>}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default AddModal
