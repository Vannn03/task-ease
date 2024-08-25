const Loading = () => {
    return (
        <div className="z-40 flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
            {/* Skeleton for the Recent Category section */}
            <div className="flex w-full flex-col gap-4 sm:gap-6">
                <div className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                    <div className="flex items-center justify-between">
                        <div className="skeleton h-6 w-1/4 rounded"></div>
                        <div className="skeleton h-6 w-20 rounded"></div>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className="skeleton h-24 w-full rounded-lg"
                            ></div>
                        ))}
                    </div>
                </div>

                {/* Skeleton for the Task Overview section */}
                <div className="flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow">
                    <div className="skeleton h-6 w-1/4 rounded"></div>
                    <div className="skeleton h-80 w-full rounded-lg"></div>
                </div>
            </div>

            {/* Skeleton for the Calendar section */}
            <div className="relative flex flex-col gap-4 rounded-lg bg-base-100 p-4 shadow sm:min-w-96">
                <div className="skeleton h-6 w-1/4 rounded"></div>
                <div className="skeleton h-96 w-full rounded-lg"></div>
                <div className="skeleton h-16 w-full rounded-lg"></div>
                <div className="skeleton h-16 w-full rounded-lg"></div>
                <div className="skeleton h-16 w-full rounded-lg"></div>
            </div>
        </div>
    )
}

export default Loading
