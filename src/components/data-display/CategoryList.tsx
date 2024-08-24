import { Category } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CategoryListProps {
    categoryDB: Category[]
}

const CategoryList = ({ categoryDB }: CategoryListProps) => {
    return (
        <>
            {categoryDB.length == 0 && (
                <p className="text-center opacity-75">No category to display</p>
            )}
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                {categoryDB.slice(0, 4).map((data) => (
                    <div
                        className="card w-full rounded bg-base-200"
                        key={data.categoryId}
                    >
                        <div className="px-4 py-3 sm:card-body">
                            <span className="flex items-center justify-between gap-2">
                                <h2 className="truncate sm:text-lg">
                                    {data.categoryName}
                                </h2>
                                <Link
                                    href={`/users/category/${data.categoryId}`}
                                    className="btn btn-circle btn-ghost btn-sm opacity-50 sm:btn-md"
                                >
                                    <ArrowRight className="size-5 sm:size-6" />
                                </Link>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CategoryList
