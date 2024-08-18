import axiosInstance from '@/utils/axiosInstance'
import { closeModal} from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

const useDeleteTask = (taskId?: string) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDeleteButton = useCallback(async (
        e: React.MouseEvent<HTMLButtonElement>,
        dialogId: string
    ) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.delete('/api/task', {
            data: { taskId },
        })

        try {
            if (response.status === 200) {
                closeModal(dialogId)
                router.refresh()
            }    
        } catch (error) {
            console.error('error deleting task', error)
        } finally {
            setLoading(false)
        }
    }, [router, taskId])
  return {
    loading, handleDeleteButton
  }
}

export default useDeleteTask