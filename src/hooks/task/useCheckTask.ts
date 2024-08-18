import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'
import { useCallback, useState } from 'react'

interface UseCheckTaskProps {
    taskId?: string
    status: string
}

const useCheckTask = ({taskId, status}: UseCheckTaskProps) => {
    const router = useRouter()
    const [isChecked, setIsChecked] = useState(status === 'Completed')

    const handleCheckboxChange = useCallback(async () => {
        const newCheckedStatus = !isChecked
        setIsChecked(!isChecked)

        const newStatus = newCheckedStatus ? 'Completed' : 'Incomplete'

        const response = await axiosInstance.put('/api/task/check-box', {
            taskId,
            status: newStatus,
        })

        try {
            if (response.status === 200) {
                router.refresh()
            }
            
        } catch (error) {
            console.error('error toggling check task', error)
        }
    }, [isChecked, router, taskId])
  return {
    isChecked,
    handleCheckboxChange
  }
}

export default useCheckTask