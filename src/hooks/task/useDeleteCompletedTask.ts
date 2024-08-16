import axiosInstance from '@/utils/axiosInstance'
import { closeModal} from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useDeleteCompletedTask = (categoryId?: string) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDeleteButton = async (
        e: React.MouseEvent<HTMLButtonElement>,
        dialogId: string
    ) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.delete('/api/task/check-box', {
            data: { categoryId, status: "Completed" },
        })

        if (response.status === 200) {
            closeModal(dialogId)
            router.refresh()
        }
        setLoading(false)
    }
  return {
    loading, handleDeleteButton
  }
}

export default useDeleteCompletedTask