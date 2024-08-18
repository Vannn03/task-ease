import axiosInstance from "@/utils/axiosInstance"
import { closeModal } from "@/utils/modal"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface UseEditCategoryProps {
    categoryId?: string
    categoryName?: string
}

const useEditCategory = ({categoryId,  categoryName}: UseEditCategoryProps) => {
    const [newCategoryName, setNewCategoryName] = useState('')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (categoryName) {
            setNewCategoryName(categoryName)
        }
    }, [categoryName])

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNewCategoryName(e.target.value)
    }, [])

    const handleEditButton = useCallback(async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
        e.preventDefault()
        
        setLoading(true)

        const response = await axiosInstance.put('/api/category', {
            categoryId,
            categoryName: newCategoryName,
        })

        try {
            
            if (response.status === 200) { 
                closeModal(dialogId)  
                setNewCategoryName('') 
                router.refresh() 
                setToast(true)
                const toastTimer = setTimeout(() => setToast(false), 3000);

                // Cleanup timer on unmount
                return () => clearTimeout(toastTimer);
            }
        } catch (error) {
            console.error('Error editing category:', error)
        } finally {
            setLoading(false)

        }
    }, [categoryId, newCategoryName, router])
  return {
    newCategoryName,
    toast,
    loading,
    handleInputChange,
    handleEditButton
}
  
}

export default useEditCategory