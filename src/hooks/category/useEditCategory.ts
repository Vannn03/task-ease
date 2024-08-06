import axiosInstance from "@/utils/axiosInstance"
import { closeModal } from "@/utils/modal"
import { useRouter } from "next/navigation"
import { ChangeEvent, useState } from "react"

const useEditCategory = (categoryId?: string) => {
    const [newCategoryName, setNewCategoryName] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value)
    }

    const handleEditButton = async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
        e.preventDefault()
        
        setLoading(true)

        const response = await axiosInstance.put('/api/category', {
            categoryId,
            categoryName: newCategoryName,
        })

        if (response.status === 200) {
            setLoading(false)

            closeModal(dialogId)
            
            setNewCategoryName('')

            router.refresh()

            setToast(true)
            setTimeout(() => {
                setToast(false)
            }, 3000)
        }
    }
  return {
    toast,
    loading,
    handleInputChange,
    handleEditButton
}
  
}

export default useEditCategory