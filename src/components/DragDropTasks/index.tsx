'use client'

import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import TaskCheckbox from '@/components/TaskCheckbox'
import { useState } from 'react'
import axios from 'axios'

const DragDropTasks = ({ taskDB }: any) => {
    const [tasks, updateTasks] = useState(taskDB)

    const handleOnDragEnd = async (result: any) => {
        if (!result.destination) return
        const items = Array.from(tasks)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        updateTasks(items)

        await axios.put('/api/task/updateOrder', { tasks: items })
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
                {(provided: any) => (
                    <div
                        className="tasks flex flex-col gap-2"
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
                                        className="flex items-center justify-between rounded bg-base-200 px-4 py-2"
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
