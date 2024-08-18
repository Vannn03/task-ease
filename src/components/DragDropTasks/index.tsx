'use client'

import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'
import TaskCheckbox from './TaskCheckbox'

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
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided) => (
                    <div
                        className="tasks flex flex-col gap-4"
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
                                        className="flex items-center justify-between rounded bg-base-100 px-4 py-3"
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <TaskCheckbox
                                            dragHandleProps={
                                                provided.dragHandleProps as DraggableProvidedDragHandleProps
                                            }
                                            taskId={data.taskId}
                                            taskDescription={
                                                data.taskDescription
                                            }
                                            status={data.status}
                                            deadline={data.deadline}
                                            categoryId={
                                                data.category?.categoryId
                                            }
                                            categoryName={
                                                data.category?.categoryName
                                            }
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
    )
}

export default DragDropTasks
