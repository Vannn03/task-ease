import axiosInstance from '@/utils/axiosInstance'
import { closeModal } from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

const useEditTask = (taskId?: string) => {
    const [newtaskDescription, setNewTaskDescription] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskDescription(e.target.value)
    }

    const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.put('/api/task', {
            taskId,
            taskDescription: newtaskDescription,
        })

        if (response.status === 200) {
            setLoading(false)
            closeModal(dialogId)
            setNewTaskDescription('')
            router.refresh()

            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000);
        }
    }
  return {
    toast, loading, handleInputChange, handleEditButton
  }
}

export default useEditTask