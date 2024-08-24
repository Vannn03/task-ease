import { CircleCheck } from 'lucide-react'

interface SuccessfulToastProps {
    toast: boolean
    description: string
}

const SuccessfulToast = ({ toast, description }: SuccessfulToastProps) => {
    return (
        <div
            className={`${toast ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'} fixed bottom-6 left-1/2 z-50 w-72 -translate-x-1/2 rounded bg-base-100 shadow-lg transition-all`}
        >
            <div className="flex items-center gap-2 px-6 py-4 text-sm text-success sm:text-base">
                <CircleCheck />
                <span>{description} successful!</span>
            </div>
        </div>
    )
}

export default SuccessfulToast
