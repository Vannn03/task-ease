import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'
import { useState } from 'react'

interface UseCheckTaskProps {
    taskId: string
    status: string
}

const useCheckTask = ({taskId, status}: UseCheckTaskProps) => {
    const router = useRouter()
    const [isChecked, setIsChecked] = useState(status === 'Completed')

    const handleCheckboxChange = async () => {
        const newCheckedStatus = !isChecked
        setIsChecked(!isChecked)

        const newStatus = newCheckedStatus ? 'Completed' : 'Incomplete'

        const response = await axiosInstance.put('/api/task/checkbox', {
            taskId,
            status: newStatus,
        })

        if (response.status === 200) {
            router.refresh()
        }
    }
  return {
    isChecked,
    handleCheckboxChange
  }
}

export default useCheckTask