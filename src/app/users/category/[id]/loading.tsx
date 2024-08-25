const Loading = () => {
    return (
        <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6 xl:flex-row">
            <div className="top-24 z-40 flex h-fit w-full flex-col gap-4 rounded bg-base-100 p-4 shadow xl:sticky xl:w-[40rem]">
                <div className="flex items-center gap-2">
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                    <div className="skeleton h-6 w-32 rounded"></div>
                </div>

                <div className="stats stats-horizontal">
                    {Array(3)
                        .fill(0)
                        .map((_, index) => (
                            <div className="stat" key={index}>
                                <div className="stat-title skeleton h-4 w-12 rounded"></div>
                                <div
                                    className={`stat-value skeleton h-8 w-12 rounded ${index == 1 && 'text-success'} ${
                                        index == 2 && 'text-warning'
                                    }`}
                                ></div>
                            </div>
                        ))}
                </div>
            </div>

            <div className="flex w-full flex-col gap-4">
                <div className="z-40 flex items-center justify-between border-b border-base-content/10 bg-base-200 pb-4">
                    <div className="skeleton h-8 w-24 rounded"></div>
                    <div className="skeleton h-8 w-24 rounded"></div>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center">
                    <div className="skeleton mb-2 h-8 w-full rounded"></div>
                    <div className="skeleton mb-2 h-8 w-full rounded"></div>
                    <div className="skeleton h-8 w-full rounded"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading
