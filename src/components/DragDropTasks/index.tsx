'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axiosInstance from '@/utils/axiosInstance'
import TaskCheckbox from './TaskCheckbox'

const DragDropTasks = ({ taskDB }: any) => {
    const router = useRouter()
    const [tasks, updateTasks] = useState(taskDB)

    useEffect(() => {
        updateTasks(taskDB)
    }, [taskDB])

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return
        const items = Array.from(tasks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        updateTasks(items)

        await axiosInstance.put('/api/task/update-order', { tasks: items })
        router.refresh()
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided: any) => (
                    <div
                        className="tasks flex flex-col gap-4"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks.map((data: any, index: number) => (
                            <Draggable
                                key={data.taskId}
                                draggableId={data.taskId}
                                index={index}
                            >
                                {(provided: any) => (
                                    <div
                                        className="flex items-center justify-between rounded bg-base-100 px-4 py-3"
                                        {...provided.draggableProps}
                                        ref={provided.innerRef}
                                    >
                                        <TaskCheckbox
                                            dragHandleProps={{
                                                ...provided.dragHandleProps,
                                            }}
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
