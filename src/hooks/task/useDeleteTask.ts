import axiosInstance from '@/utils/axiosInstance'
import { closeModal} from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useDeleteTask = (taskId?: string) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDeleteButton = async (
        e: React.MouseEvent<HTMLButtonElement>,
        dialogId: string
    ) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.delete('/api/task', {
            data: { taskId },
        })

        if (response.status === 200) {
            setLoading(false)
            closeModal(dialogId)
            router.refresh()
        }
    }
  return {
    loading, handleDeleteButton
  }
}

export default useDeleteTask