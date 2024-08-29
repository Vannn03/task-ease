const Loading = () => {
    return (
        <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 lg:flex-row">
            {/* Skeleton for the Calendar Date */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:flex-col lg:justify-start">
                <div className="top-24 lg:sticky">
                    <div className="skeleton h-72 w-72 rounded-lg sm:h-80 sm:w-80"></div>
                </div>
                <div className="stats stats-horizontal top-[28rem] rounded sm:stats-vertical lg:stats-horizontal lg:sticky">
                    <div className="stat">
                        <div className="skeleton h-4 w-12 rounded"></div>
                        <div className="skeleton mt-2 h-8 w-16 rounded"></div>
                    </div>
                    <div className="stat">
                        <div className="skeleton h-4 w-12 rounded"></div>
                        <div className="skeleton mt-2 h-8 w-16 rounded"></div>
                    </div>
                    <div className="stat">
                        <div className="skeleton h-4 w-12 rounded"></div>
                        <div className="skeleton mt-2 h-8 w-16 rounded"></div>
                    </div>
                </div>
            </div>

            {/* Skeleton for the Task List */}
            <div className="flex h-fit w-full flex-col gap-4 rounded bg-base-100 p-4">
                {Array(3)
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between rounded-lg border bg-base-100 p-3"
                        >
                            <span className="flex gap-2">
                                <div className="skeleton mt-[2px] h-6 w-6 rounded-full"></div>
                                <span className="flex flex-col">
                                    <div className="skeleton h-4 w-12 rounded"></div>
                                    <div className="skeleton mt-2 h-4 w-32 rounded"></div>
                                </span>
                            </span>
                            <div className="skeleton h-8 w-8 rounded-full"></div>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Loading
