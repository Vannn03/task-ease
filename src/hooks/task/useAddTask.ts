import axiosInstance from '@/utils/axiosInstance'
import { getISODateTime } from '@/utils/datetime'
import { closeModal } from '@/utils/modal'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface useAddTaskProps {
    categoryId?: string
    dialogId: string
}

const useAddTask = ({categoryId, dialogId}: useAddTaskProps) => {
    const [taskDate, setTaskDate] = useState('')
    const [taskTime, setTaskTime] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = useCallback(
        (setter: React.Dispatch<React.SetStateAction<string>>) =>
            (e: React.ChangeEvent<HTMLInputElement>) => {
                setter(e.target.value)
            },
        []
    )

    const handleAddButton = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault()

            setLoading(true)

            const response = await axiosInstance.post('/api/task', {
                categoryId,
                taskDescription,
                status: 'Incomplete',
                deadline: getISODateTime(taskDate, taskTime),
            })

            try {
                if (response.status === 200) {
                    closeModal(dialogId)
                    setTaskDescription('')
                    setTaskDate('')
                    setTaskTime('')
                    router.refresh()
                    setToast(true)
                    const toastTimer = setTimeout(() => setToast(false), 3000)

                    // Cleanup timer on unmount
                    return () => clearTimeout(toastTimer)
                }
            } catch (error) {
                console.error('error adding task', error)
            } finally {
                setLoading(false)
            }
        },
        [categoryId, router, taskDate, taskTime, taskDescription, dialogId]
    )
    return {
        taskDate,
        setTaskDate,
        taskTime,
        setTaskTime,
        taskDescription,
        setTaskDescription,
        toast,
        loading,
        handleInputChange,
        handleAddButton,
    }
}

export default useAddTask
