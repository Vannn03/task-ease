import UpgradeButton from '@/components/buttons/UpgradeButton'

interface UpgradeModalProps {
    userId?: string
    version?: string
    upgradeDialogId?: string
    title: string
    description: string
}

const UpgradeModal = ({
    userId,
    version,
    upgradeDialogId,
    title,
    description,
}: UpgradeModalProps) => {
    return (
        <dialog
            id={upgradeDialogId}
            className="modal modal-bottom sm:modal-middle"
        >
            <div className="modal-box">
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2">
                    {description}, consider upgrading to premium to receive
                    these following benefits:
                </p>
                <div className="modal-action">
                    <form method="dialog" className="flex items-center">
                        <button className="btn btn-ghost text-error">
                            Later
                        </button>
                        <UpgradeButton userId={userId} version={version} />
                    </form>
                </div>
            </div>
        </dialog>
    )
}

export default UpgradeModal
