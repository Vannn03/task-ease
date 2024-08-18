import axiosInstance from '@/utils/axiosInstance'
import { closeModal} from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

const useDeleteCompletedTask = (categoryId?: string) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDeleteButton = useCallback(async (
        e: React.MouseEvent<HTMLButtonElement>,
        dialogId: string
    ) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.delete('/api/task/check-box', {
            data: { categoryId, status: "Completed" },
        })

        try {
            if (response.status === 200) {
                closeModal(dialogId)
                router.refresh()
            }   
        } catch (error) {
            console.error('error deleting completed task', error)
        } finally {
            setLoading(false)
        }
    }, [categoryId, router])
  return {
    loading, handleDeleteButton
  }
}

export default useDeleteCompletedTask