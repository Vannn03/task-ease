import axiosInstance from '@/utils/axiosInstance'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useAddTask = (categoryId?: string) => {
    const [taskDescription, setTaskDescription] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(e.target.value)
    }

    const handleAddButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.post('/api/task', {
            categoryId,
            taskDescription,
            status: 'Incomplete',
        })

        if (response.status === 200) {
            setLoading(false)
            setTaskDescription('')
            router.refresh()

            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000);
        }
    }
  return {
    taskDescription,
    toast,
    loading,
    handleInputChange,
    handleAddButton
  }
}

export default useAddTask