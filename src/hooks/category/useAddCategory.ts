import { useState } from 'react'
import axiosInstance from '@/utils/axiosInstance'
import { closeModal } from '@/utils/modal'
import { useRouter } from 'next/navigation'

const useAddCategory = (userId?: string) => {
    const [categoryName, setCategoryName] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value)
    }

    const handleAddButton = async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
        e.preventDefault()

        setLoading(true)

        const response = await axiosInstance.post('/api/category', {
            userId,
            categoryName,
        })

        if (response.status === 200) {
            setLoading(false)

            closeModal(dialogId)

            setCategoryName('')

            router.refresh()
            
            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000)
        }
    }

    return {
        categoryName,
        toast,
        loading,
        handleInputChange,
        handleAddButton,
    }
}

export default useAddCategory
