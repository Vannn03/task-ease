// import AddCategoryButton from '@/components/categoryButtons/AddCategoryButton'
// import AddTaskButton from '@/components/taskButtons/AddTaskButton'
// import DeleteCategoryButton from '@/components/categoryButtons/DeleteCategoryButton'
// import EditCategoryButton from '@/components/categoryButtons/EditCategoryButton'
// import TaskCheckbox from '@/components/TaskCheckbox'
// import prisma from '@/libs/prisma'
// import UpgradeButton from '@/components/UpgradeButton'

// interface categoryType {
//     categoryId: number
//     categoryName: string
// }

// interface taskType {
//     taskId: number
//     taskDescription: string
//     status: string
// }

const Page = async () => {
    return (
        <div>
            {/* <section className="my-12 flex flex-col gap-8">
                {categoryDB.map(async (data) => {
                    const taskDB: taskType[] = await prisma.task.findMany({
                        where: { categoryId: data.categoryId },
                    })

                    return (
                        <div
                            key={data.categoryId}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-semibold">
                                    {data.categoryName}
                                </h1>
                                <div className="flex gap-2">
                                    <DeleteCategoryButton
                                        categoryId={data.categoryId}
                                        categoryName={data.categoryName}
                                        dialogId={`deleteCategoryModal-${data.categoryId}`}
                                    />
                                    <EditCategoryButton
                                        categoryId={data.categoryId}
                                        categoryName={data.categoryName}
                                        dialogId={`editCategoryModal-${data.categoryId}`}
                                    />
                                    <AddTaskButton
                                        categoryId={data.categoryId}
                                        categoryName={data.categoryName}
                                        dialogId={`addTaskModal-${data.categoryId}`}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                {taskDB.map((data2) => (
                                    <span
                                        key={data2.taskId}
                                        className="flex items-center justify-between border-b py-2"
                                    >
                                        <TaskCheckbox
                                            taskId={data2.taskId}
                                            taskDescription={
                                                data2.taskDescription
                                            }
                                            status={data2.status}
                                        />
                                    </span>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </section>

            <AddCategoryButton userId={userDB?.userId} />

            <div className="fixed bottom-12 right-14">
                <UpgradeButton userId={userDB?.userId} />
            </div>

            <div className="fixed bottom-12 right-1/2">
                {userDB?.version == 'Premium' ? (
                    <div>Premium</div>
                ) : (
                    <div>Standard</div>
                )}
            </div> */}
        </div>
    )
}

export default Page
