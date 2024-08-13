import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface DeleteModalProps {
    dialogId: string
    title: string
    value?: string
    handleDeleteButton: any
    loading: boolean
}

const DeleteModal = ({
    dialogId,
    title,
    value,
    handleDeleteButton,
    loading,
}: DeleteModalProps) => {
    return (
        <dialog id={dialogId} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="text-lg font-bold text-base-content">
                    {title} &apos;{value}&apos;
                </h3>
                <p className="py-4 text-base-content">
                    Are you sure you want to delete this task?
                </p>
                <div className="modal-action">
                    <form method="dialog" className="flex items-center">
                        <button className="btn btn-ghost text-error">
                            Cancel
                        </button>
                        <button
                            className="btn btn-error ml-4"
                            onClick={(e) => handleDeleteButton(e, dialogId)}
                        >
                            {loading ? <ButtonLoader /> : <>Delete</>}
                        </button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default DeleteModal
