import { useState, useCallback } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { closeModal } from '@/utils/modal';
import { useRouter } from 'next/navigation';

const useAddCategory = (userId?: string) => {
    const [categoryName, setCategoryName] = useState('');
    const [toast, setToast] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    }, []);

    const handleAddButton = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement>, dialogId: string) => {
            e.preventDefault();

            setLoading(true);

            try {
                const response = await axiosInstance.post('/api/category', {
                    userId,
                    categoryName,
                });

                if (response.status === 200) {
                    closeModal(dialogId);
                    setCategoryName('');
                    router.refresh();
                    setToast(true);
                    const toastTimer = setTimeout(() => setToast(false), 3000);

                    // Cleanup timer on unmount
                    return () => clearTimeout(toastTimer);
                }
            } catch (error) {
                console.error('Error adding category:', error);
            } finally {
                setLoading(false);
            }
        },
        [categoryName, userId, router]
    );

    return {
        categoryName,
        toast,
        loading,
        handleInputChange,
        handleAddButton,
    };
};

export default useAddCategory;
