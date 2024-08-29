const Loading = () => {
    return (
        <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {/* Skeleton for cards */}
            {Array(4)
                .fill(0)
                .map((_, index) => (
                    <div
                        className="card w-full rounded-lg bg-base-100 shadow"
                        key={index}
                    >
                        <div className="card-body">
                            <div className="flex flex-col">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="skeleton h-6 w-32 rounded"></div>
                                    <div className="skeleton h-8 w-8 rounded-xl"></div>
                                </div>
                                <div className="skeleton mt-2 h-4 w-20 rounded"></div>
                            </div>
                            <div className="card-actions mt-2 flex-col items-center">
                                <div className="flex w-full flex-col gap-1 pt-2">
                                    <span className="flex items-center justify-between gap-60 text-sm">
                                        <p className="skeleton h-4 w-16 rounded"></p>
                                        <p className="skeleton h-4 w-8 rounded"></p>
                                    </span>
                                    <span className="skeleton h-2 w-full rounded-full"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            {/* Skeleton for Add Category Button */}
            <div className="fixed bottom-8 right-8 sm:bottom-12 sm:right-12">
                <div className="skeleton h-12 w-12 rounded-full"></div>
            </div>
        </div>
    )
}

export default Loading
