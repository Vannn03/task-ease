const Loading = () => {
    return (
        <div className="z-40 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
            <main className="flex w-full flex-col gap-4 sm:gap-6">
                {/* Latest Task Section Skeleton */}
                <section className="relative flex flex-col gap-2 rounded-2xl bg-base-100 p-4">
                    <div className="flex items-center gap-2">
                        <div className="skeleton h-6 w-1/3 rounded-lg"></div>
                    </div>
                    <div className="mt-2 space-y-2">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="skeleton h-4 w-1/6"></th>
                                        <th className="skeleton h-4 w-1/4"></th>
                                        <th className="skeleton h-4 w-1/5"></th>
                                        <th className="skeleton h-4 w-1/5"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Skeleton rows for tasks */}
                                    {[...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td className="skeleton h-4 w-1/6"></td>
                                            <td className="skeleton h-4 w-1/4"></td>
                                            <td className="skeleton h-4 w-1/5"></td>
                                            <td className="skeleton h-4 w-1/5"></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                {/* Category Overview Section Skeleton */}
                <section className="flex flex-col gap-2 rounded-2xl bg-base-100 p-4">
                    <div className="flex items-center gap-2">
                        <div className="skeleton h-6 w-1/3 rounded-lg"></div>
                    </div>
                    <div className="skeleton mt-4 h-40 w-full rounded-lg"></div>
                </section>
            </main>

            {/* Calendar Section Skeleton */}
            <aside className="relative flex flex-col rounded-2xl bg-base-100 p-4">
                <div className="mb-2 flex items-center gap-2">
                    <div className="skeleton h-6 w-1/3 rounded-lg"></div>
                </div>
                <div className="skeleton mb-4 h-64 rounded-lg"></div>
                <div className="space-y-4">
                    {/* Skeleton rows for calendar tasks */}
                    {[...Array(3)].map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between p-3"
                        >
                            <div className="flex gap-2">
                                <div className="skeleton h-4 w-4 rounded-full"></div>
                                <div className="flex flex-col gap-2">
                                    <div className="skeleton h-4 w-16 rounded-lg"></div>
                                    <div className="skeleton h-4 w-32 rounded-lg"></div>
                                </div>
                            </div>
                            <div className="skeleton h-4 w-8 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </aside>
        </div>
    )
}

export default Loading
