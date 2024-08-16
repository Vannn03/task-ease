import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface EditModalProps {
    dialogId: string
    title: string
    handleInputChange: any
    placeholder?: string
    value: string
    handleEditButton: any
    loading: boolean
    children?: React.ReactNode
}

const EditModal: React.FC<EditModalProps> = ({
    dialogId,
    title,
    handleInputChange,
    placeholder,
    value,
    handleEditButton,
    loading,
    children,
}) => {
    return (
        <dialog id={dialogId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="text-lg font-bold">{title}</h3>
                {children}
                <input
                    type="text"
                    className="input input-bordered mt-2 w-full"
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    value={value}
                />
                <div className="modal-action">
                    <form method="dialog" className="flex items-center">
                        <button className="btn">Cancel</button>
                        <button
                            className="btn btn-warning ml-4"
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
