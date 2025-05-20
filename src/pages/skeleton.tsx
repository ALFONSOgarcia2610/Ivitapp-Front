import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCards() {
    return (
        <div className="">
            <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className=""
                    >
                        <div className="grid grid-cols-2 items-center gap-4 p-1">
                            <Skeleton className="h-8 w-full rounded-md" />

                            <div className="grid gap-1 w-full">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </div>
                        </div>

                        <div className="p-1 space-y-2">
                            <Skeleton className="h-30 w-full" />

                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-4 gap-4">
                        <Skeleton className="h-10 w-full col-end-3" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <div className="p-1">
                    <Skeleton className="h-60 w-full" />
                </div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4 p-1 ">
                <Skeleton className="h-50 w-full" />
                <div className="grid gap-1 col-span-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>

        </div>
    );
}
