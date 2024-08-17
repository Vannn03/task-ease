import axiosInstance from '@/utils/axiosInstance'
import { getISODateTime } from '@/utils/datetime'
import { closeModal } from '@/utils/modal'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface UseEditTaskProps {
    taskId?: string
    taskDescription: string
    deadline?: Date
}

const useEditTask = ({taskId, taskDescription, deadline}: UseEditTaskProps) => {
    const [newtaskDescription, setNewTaskDescription] = useState('')
    const [newTaskDate, setNewTaskDate] = useState('')
    const [newTaskTime, setNewTaskTime] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (taskDescription) {
            setNewTaskDescription(taskDescription)
        }
        if (deadline) {
            const date = dayjs(deadline)
            setNewTaskDate(date.format('YYYY-MM-DD'))
            setNewTaskTime(date.format('HH:mm'))
        }
    }, [taskDescription, deadline])

    const handleInputChange =
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setter(e.target.value)
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
            setNewTaskDate('')
            setNewTaskTime('')
            router.refresh()
            
            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000);
        }
        setLoading(false)
    }
  return {
    newtaskDescription, setNewTaskDescription, newTaskDate, setNewTaskDate, newTaskTime, setNewTaskTime, toast, loading, handleInputChange, handleEditButton
  }
}

export default useEditTask