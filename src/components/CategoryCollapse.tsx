'use client'

import { ChevronDown } from 'lucide-react'
import EditCategoryButton from './buttons/categoryButtons/EditCategoryButton'
import { useState } from 'react'
import DeleteCategoryButton from './buttons/categoryButtons/DeleteCategoryButton'

interface CategoryCollapseProps {
    categoryId?: string
    categoryName: string
}

const CategoryCollapse = ({
    categoryId,
    categoryName,
}: CategoryCollapseProps) => {
    const [toggle, setToggle] = useState(false)

    return (
        <div
            className="flex w-full flex-col gap-2"
            onMouseEnter={() => setToggle(true)}
            onMouseLeave={() => setToggle(false)}
        >
            <div
                className={`max-h-0 overflow-hidden transition-all duration-500 ${toggle ? 'max-h-52' : ''} flex items-center`}
            >
                <EditCategoryButton
                    categoryId={categoryId}
                    categoryName={categoryName}
                    dialogId={`editCategoryModal-${categoryId}`}
                />
                <DeleteCategoryButton
                    categoryId={categoryId}
                    categoryName={categoryName}
                    dialogId={`deleteCategoryModal-${categoryId}`}
                />
            </div>
            <div className="flex cursor-pointer justify-center opacity-50">
                <ChevronDown
                    className={`size-5 transition-transform duration-300 ${toggle ? 'rotate-180' : 'rotate-0'}`}
                />
            </div>
        </div>
    )
}

export default CategoryCollapse
