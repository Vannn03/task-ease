const Loading = () => {
    return (
        <main className="mx-auto flex w-full flex-col p-4 sm:p-6 lg:w-[75dvw] 2xl:w-[50dvw]">
            {/* Skeleton for Profile Update */}
            <section className="flex flex-col justify-between gap-4 border-t border-base-content/10 py-8 md:flex-row">
                <div>
                    <h1 className="text-sm font-medium sm:text-base">
                        <span className="skeleton block h-6 w-20"></span>
                    </h1>
                    <p className="text-xs opacity-75 sm:text-sm">
                        <span className="skeleton mt-2 block h-4 w-40"></span>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="skeleton h-64 w-64"></div>
                    <form className="flex w-full flex-col gap-2">
                        <span className="skeleton block h-12 w-full"></span>
                        <span className="skeleton block h-12 w-full"></span>
                    </form>
                </div>
            </section>

            <section className="flex flex-col justify-between gap-4 border-t border-base-content/10 py-8 md:flex-row">
                <div>
                    <h1 className="text-sm font-medium sm:text-base">
                        <span className="skeleton block h-6 w-20"></span>
                    </h1>
                    <p className="text-xs opacity-75 sm:text-sm">
                        <span className="skeleton mt-2 block h-4 w-40"></span>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="skeleton h-10 w-32"></div>
                </div>
            </section>

            {/* Skeleton for Interface Themes */}
            <section className="flex flex-col justify-between gap-4 border-t border-base-content/10 py-8 md:flex-row">
                <div>
                    <h1 className="text-sm font-medium sm:text-base">
                        <span className="skeleton block h-6 w-20"></span>
                    </h1>
                    <p className="text-xs opacity-75 sm:text-sm">
                        <span className="skeleton mt-2 block h-4 w-40"></span>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="skeleton h-12 w-12 rounded-full"></div>
                </div>
            </section>
        </main>
    )
}

export default Loading
