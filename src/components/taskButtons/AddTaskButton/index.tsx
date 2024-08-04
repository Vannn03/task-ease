'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface AddTaskProps {
    categoryId?: string
}

const AddTaskButton: React.FC<AddTaskProps> = ({ categoryId }) => {
    const [taskDescription, setTaskDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskDescription(e.target.value)
    }

    const handleAddButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        setLoading(true)

        const response = await axios.post(
            '/api/task',
            {
                categoryId,
                taskDescription,
                status: 'Incomplete',
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        )

        if (response.status === 200) {
            setLoading(false)
            setTaskDescription('')
            router.refresh()
        }
    }

    return (
        <div className="flex items-center gap-4">
            <input
                type="text"
                placeholder="Enter your task..."
                className="input input-bordered w-full"
                onChange={handleInputChange}
            />
            <button
                className={`btn btn-wide ${taskDescription == '' ? 'btn-disabled' : 'btn-outline btn-info'}`}
                onClick={handleAddButton}
            >
                {loading ? (
                    <span className="loading loading-spinner"></span>
                ) : (
                    <>Create New Task</>
                )}
            </button>
        </div>
    )
}

export default AddTaskButton
