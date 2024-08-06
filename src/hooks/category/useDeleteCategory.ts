import { useState } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import { closeModal } from '@/utils/modal'
import { useRouter } from 'next/navigation'

const useDeleteCategory = (categoryId?: string) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleDeleteButton = async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.delete('/api/category', {
            data: { categoryId },
        })

        if (response.status === 200) {    
            closeModal(dialogId)
            router.refresh()
        }
        setLoading(false)
    }

    return {
        loading,
        handleDeleteButton,
    }
}

export default useDeleteCategory
