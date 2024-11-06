import { Skeleton } from "@/components/ui/skeleton";

export const DetailProductSkeleton = () => {
    return (
        <div className="w-full max-w-[80rem] flex pt-5 md:flex-row flex-col">
            <aside className="w-full ">
                <div className="flex flex-col items-center gap-2 sticky top-[100px] select-none">
                    <Skeleton className="w-[380px] h-[380px] object-cover" />
                    <div className="mx-4 md:mx-0">
                        <div className="flex gap-2">
                            <Skeleton className="w-16 h-16 object-cover" />
                            <Skeleton className="w-16 h-16 object-cover" />
                            <Skeleton className="w-16 h-16 object-cover" />
                        </div>
                    </div>
                </div>
            </aside>
            <main className="flex flex-col gap-2 w-full px-4 md:px-0">
                <Skeleton className="w-1/2 h-6" />
                <div className="inline-flex space-x-2 w-full">
                    <Skeleton className="w-20 h-4" />
                    <Skeleton className="w-6 h-6" />
                    <Skeleton className="w-10 h-4" />
                </div>
                <Skeleton className="w-1/3 h-8" />
                <div className="space-x-1 flex items-center">
                    <Skeleton className="w-10 h-6" />
                    <Skeleton className="w-20 h-6" />
                </div>
                <Skeleton className="w-full h-px my-2" />
                <div className="flex flex-col">
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-full h-px my-2" />
                </div>
                <div className="flex flex-col gap-2">
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-1/3 h-4" />
                    <Skeleton className="w-full h-24" />
                </div>
                <Skeleton className="w-1/3 h-4" />
                <Skeleton className="w-full h-px my-2" />
                <div className="flex flex-row gap-4 w-full justify-between py-2">
                    <div className="flex flex-row gap-4">
                        <Skeleton className="w-12 h-12 rounded-full" />
                        <div className="flex flex-col gap-2 py-2">
                            <Skeleton className="w-20 h-4" />
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-16 h-4" />
                        </div>
                    </div>
                    <Skeleton className="w-24 h-8" />
                </div>
                <Skeleton className="w-full h-px my-2" />
                <div className="flex flex-col gap-2 py-2">
                    <Skeleton className="w-1/3 h-6" />
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-1/2 h-4" />
                </div>
                <Skeleton className="w-full h-px my-2" />
            </main>

            <aside className="w-[65%] hidden md:flex flex-col gap-4 pl-[2.5rem] pr-10 pt-0 pb-2">
                <div className="flex flex-col items-center gap-2 sticky top-[100px] select-none">
                    <Skeleton className="w-full h-12 rounded-lg" />
                    <div className="flex flex-col gap-4 w-full justify-between py-2 border border-green-600/60 rounded-lg p-4">
                        <Skeleton className="w-1/3 h-6" />
                        <Skeleton className="w-12 h-12 object-cover rounded-lg" />
                        <Skeleton className="w-full h-px my-2" />
                        <div className="flex gap-2 items-center">
                            <Skeleton className="w-8 h-8" />
                            <Skeleton className="w-8 h-8" />
                            <Skeleton className="w-1/4 h-6" />
                        </div>
                        <div className="flex justify-between items-end">
                            <Skeleton className="w-1/4 h-6" />
                            <div className="flex flex-col gap-2 items-end">
                                <Skeleton className="w-1/4 h-4" />
                                <Skeleton className="w-1/3 h-6" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Skeleton className="w-full h-10" />
                            <Skeleton className="w-full h-10" />
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
};
