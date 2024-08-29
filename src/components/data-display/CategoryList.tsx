'use client'

import { useState } from 'react'
import Link from 'next/link'
import DeleteCategoryButton from '../buttons/categoryButtons/DeleteCategoryButton'
import { usePathname } from 'next/navigation'

interface Category {
    categoryId: string
    categoryName: string
    tasks: {
        status: string
    }[]
}

interface CategoryListProps {
    userId?: string
    categoryDB: Category[]
}

const CategoryList = ({ userId, categoryDB }: CategoryListProps) => {
    const pathname = usePathname()
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])

    const handleCheckboxChange = (
        categoryId: string,
        event: React.MouseEvent
    ) => {
        event.stopPropagation() // Prevent the Link from being triggered

        setSelectedCategories((prevSelected) =>
            prevSelected.includes(categoryId)
                ? prevSelected.filter((id) => id !== categoryId)
                : [...prevSelected, categoryId]
        )
    }

    return (
        <>
            {pathname == '/users/category' && (
                <DeleteCategoryButton
                    selectedCategories={selectedCategories}
                    dialogId={`deleteCategoryModal-${userId}`}
                />
            )}
            {categoryDB.map((data) => {
                const completedTasks = data.tasks.filter(
                    (task) => task.status === 'Completed'
                ).length

                const completedTaskPercentage = data.tasks.length
                    ? (completedTasks * 100) / data.tasks.length
                    : 0

                return (
                    <div
                        key={data.categoryId}
                        className="card w-full rounded-lg bg-base-100 shadow transition-all hover:-translate-y-2 hover:shadow-lg"
                    >
                        <Link href={`category/${data.categoryId}`}>
                            <div className="card-body">
                                <div className="flex flex-col">
                                    <div className="flex items-center justify-between gap-2">
                                        <h2 className="truncate text-lg font-semibold sm:text-xl">
                                            {data.categoryName}
                                        </h2>
                                        {pathname == '/users/category' && (
                                            <input
                                                type="checkbox"
                                                className="checkbox-error checkbox"
                                                checked={selectedCategories.includes(
                                                    data.categoryId
                                                )}
                                                onClick={(e) =>
                                                    handleCheckboxChange(
                                                        data.categoryId,
                                                        e
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                    <p className="text-sm opacity-75 sm:text-base">
                                        Total task: {data.tasks.length}
                                    </p>
                                </div>
                                <div className="card-actions mt-2 flex-col items-center">
                                    <div className="flex w-full flex-col gap-1 pt-2">
                                        <span className="flex items-center justify-between text-sm">
                                            <p className="w-full">Progress</p>
                                            <p>
                                                {completedTaskPercentage.toFixed(
                                                    0
                                                )}
                                                %
                                            </p>
                                        </span>
                                        <progress
                                            className="progress progress-success w-full"
                                            value={completedTaskPercentage}
                                            max="100"
                                        ></progress>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default CategoryList
