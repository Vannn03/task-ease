const Loading = () => {
    return (
        <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                    <div className="skeleton h-8 w-8 rounded-full"></div>
                </div>
                <div className="skeleton h-8 w-1/2"></div>
            </div>

            <div className="flex flex-row flex-wrap items-center gap-2 lg:gap-4">
                <div className="skeleton h-10 w-1/3 lg:w-1/5"></div>
                <div className="skeleton h-10 w-1/3 lg:w-1/5"></div>
                <div className="skeleton h-10 w-full lg:w-1/2"></div>
                <div className="skeleton h-10 w-full lg:w-auto"></div>
            </div>

            <div role="tablist" className="tabs tabs-bordered relative">
                <div className="tab-lifted tab skeleton h-10 w-20"></div>
                <div className="tab-content skeleton h-40 w-full"></div>
                <div className="tab-lifted tab skeleton h-10 w-24"></div>
                <div className="tab-content skeleton h-40 w-full"></div>
            </div>
        </div>
    )
}

export default Loading
