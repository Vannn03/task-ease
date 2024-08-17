'use client'

import useAddTask from '@/hooks/task/useAddTask'
import SuccessfulToast from '@/components/utilities/toasts/SuccessfulToast'
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
        <div className="flex flex-row flex-wrap items-center gap-2 lg:gap-4">
            <input
                type="date"
                placeholder="Type here"
                className="input input-md input-bordered flex-auto basis-1/3 lg:basis-1/5"
                onChange={handleDateChange}
                value={taskDate}
            />
            <input
                type="time"
                placeholder="Type here"
                className="input input-md input-bordered flex-auto basis-1/3 lg:basis-1/5"
                onChange={handleTimeChange}
                value={taskTime}
            />
            <input
                type="text"
                placeholder="Enter your task..."
                className="input input-md input-bordered flex-auto basis-1/3 lg:basis-1/2"
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
