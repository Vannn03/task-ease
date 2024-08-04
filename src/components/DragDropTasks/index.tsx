'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import TaskCheckbox from '@/components/TaskCheckbox'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

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

        await axios.put('/api/task/updateOrder', { tasks: items })
        router.refresh()
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided: any) => (
                    <div
                        className="tasks hide-scrollbar flex h-[66.5dvh] flex-col gap-4 overflow-y-scroll"
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
                                        className="flex items-center justify-between rounded-lg border p-2"
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
