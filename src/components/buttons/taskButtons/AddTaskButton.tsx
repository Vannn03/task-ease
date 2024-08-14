'use client'

import useAddTask from '@/hooks/task/useAddTask'
import SuccessfulToast from '../../utilities/toasts/SuccessfulToast'
import ButtonLoader from '@/components/utilities/Loaders/ButtonLoader'

interface AddTaskProps {
    categoryId?: string
}

const AddTaskButton = ({ categoryId }: AddTaskProps) => {
    const {
        taskDate,
        taskTime,
        taskDescription,
        toast,
        loading,
        handleDateChange,
        handleTimeChange,
        handleInputChange,
        handleAddButton,
    } = useAddTask(categoryId)

    return (
        <div className="flex flex-col items-center gap-4 lg:flex-row lg:flex-wrap">
            <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full lg:flex-auto lg:basis-1/4"
                onChange={handleDateChange}
                value={taskDate}
            />
            <input
                type="time"
                placeholder="Type here"
                className="input input-bordered w-full lg:flex-auto lg:basis-1/4"
                onChange={handleTimeChange}
                value={taskTime}
            />
            <input
                type="text"
                placeholder="Enter your task..."
                className="input input-bordered w-full lg:flex-auto lg:basis-1/4"
                onChange={handleInputChange}
                value={taskDescription}
            />
            <button
                className={`btn btn-block ${taskDescription == '' || taskDate == '' || taskTime == '' ? 'btn-disabled' : 'btn-outline btn-info'}`}
                onClick={(e) => handleAddButton(e)}
            >
                {loading ? <ButtonLoader /> : <>Create New Task</>}
            </button>

            <SuccessfulToast
                toast={toast}
                description="Task created"
                alertType="alert-success"
            />
        </div>
    )
}

export default AddTaskButton
