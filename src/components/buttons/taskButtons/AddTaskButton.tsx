'use client'

import useAddTask from '@/hooks/task/useAddTask'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
import { showModal } from '@/utils/modal'
import { Plus } from 'lucide-react'
import AddModal from '@/components/utilities/Modals/AddModal'

interface AddTaskProps {
    categoryId?: string
    dialogId: string
}

const AddTaskButton = ({ categoryId, dialogId }: AddTaskProps) => {
    const {
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
    } = useAddTask({ categoryId, dialogId })

    return (
        <>
            <button
                className="btn btn-primary btn-sm sm:btn-md"
                onClick={() => showModal(dialogId)}
            >
                <Plus className="size-4 sm:size-5" /> Add task
            </button>
            <AddModal
                dialogId={dialogId}
                title="Add new task"
                handleInputChange={handleInputChange(setTaskDescription)}
                placeholder={taskDescription}
                value={taskDescription}
                taskDate={taskDate}
                taskTime={taskTime}
                handleAddButton={handleAddButton}
                loading={loading}
            >
                <div className="flex gap-2">
                    <input
                        type="date"
                        className="input input-md input-bordered mt-2 w-full"
                        onChange={handleInputChange(setTaskDate)}
                        value={taskDate}
                    />
                    <input
                        type="time"
                        className="input input-md input-bordered mt-2 w-full"
                        onChange={handleInputChange(setTaskTime)}
                        value={taskTime}
                    />
                </div>
            </AddModal>

            <SuccessfulToast toast={toast} description="Add task" />
        </>
    )
}

export default AddTaskButton
