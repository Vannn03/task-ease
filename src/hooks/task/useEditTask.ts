import axiosInstance from '@/utils/axiosInstance'
import { getISODateTime } from '@/utils/datetime'
import { closeModal } from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { ChangeEvent, useState } from 'react'

const useEditTask = (taskId?: string) => {
    const [newtaskDescription, setNewTaskDescription] = useState('')
    const [newTaskDate, setNewTaskDate] = useState('')
    const [newTaskTime, setNewTaskTime] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskDescription(e.target.value)
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskDate(e.target.value)
    }

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTime(e.target.value)
    }

    const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.put('/api/task', {
            taskId,
            taskDescription: newtaskDescription,
            deadline: getISODateTime(newTaskDate, newTaskTime)
        })

        if (response.status === 200) {
            closeModal(dialogId)
            setNewTaskDescription('')
            router.refresh()
            
            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000);
        }
        setLoading(false)
    }
  return {
    newtaskDescription, newTaskDate, newTaskTime, toast, loading, handleInputChange, handleDateChange, handleTimeChange, handleEditButton
  }
}

export default useEditTask