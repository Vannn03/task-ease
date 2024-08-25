'use client'

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'
import TaskCheckbox from './TaskCheckbox'
import TaskDrawer from './TaskDrawer'

interface Task {
    taskId: string
    taskDescription: string
    status: string
    deadline: Date
    category?: {
        categoryId: string
        categoryName: string
    }
}

interface DragDropTasksProps {
    taskDB: Task[]
}

const DragDropTasks = ({ taskDB }: DragDropTasksProps) => {
    const [toggleDrawer, setToggleDrawer] = useState(false)
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const router = useRouter()
    const [tasks, updateTasks] = useState<Task[]>(taskDB)

    useEffect(() => {
        updateTasks(taskDB)
    }, [taskDB])

    const handleOnDragEnd = async (result: DropResult) => {
        if (!result.destination) return

        const items = Array.from(tasks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        updateTasks(items)

        try {
            await axiosInstance.put('/api/task/update-order', { tasks: items })
            router.refresh()
        } catch (error) {
            console.error('Failed to update task order:', error)
        }
    }

    return (
        <>
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="tasks">
                    {(provided) => (
                        <div
                            className="tasks"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {tasks.map((data, index) => (
                                <Draggable
                                    key={data.taskId}
                                    draggableId={data.taskId}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <TaskCheckbox
                                                taskId={data.taskId}
                                                taskDescription={
                                                    data.taskDescription
                                                }
                                                status={data.status}
                                                deadline={data.deadline}
                                                setToggleDrawer={
                                                    setToggleDrawer
                                                }
                                                setSelectedTask={
                                                    setSelectedTask
                                                }
                                                data={data}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>

            {selectedTask && (
                <TaskDrawer
                    taskId={selectedTask.taskId}
                    taskDescription={selectedTask.taskDescription}
                    deadline={selectedTask.deadline}
                    categoryId={selectedTask?.category?.categoryId}
                    categoryName={selectedTask?.category?.categoryName}
                    toggleDrawer={toggleDrawer}
                    setToggleDrawer={setToggleDrawer}
                />
            )}
        </>
    )
}

export default DragDropTasks
