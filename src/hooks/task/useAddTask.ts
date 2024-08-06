import axiosInstance from '@/utils/axiosInstance'
import { getISODateTime } from '@/utils/datetime'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useAddTask = (categoryId?: string) => {
    const [taskDate, setTaskDate] = useState('')
    const [taskTime, setTaskTime] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDate(e.target.value)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskTime(e.target.value)
    }

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
            deadline: getISODateTime(taskDate, taskTime)
        })

        if (response.status === 200) {
            setTaskDescription('')
            setTaskDate('')
            setTaskTime('')
            router.refresh()
            
            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000);
        }

        setLoading(false)
    }
  return {
    taskDate,
    taskTime,
    taskDescription,
    toast,
    loading,
    handleDateChange,
    handleTimeChange,
    handleInputChange,
    handleAddButton
  }
}

export default useAddTask