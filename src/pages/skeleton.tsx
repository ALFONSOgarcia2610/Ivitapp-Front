import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCards() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="space-y-2 p-2 border rounded-md">
                        <div className="flex gap-4 items-center">
                            <Skeleton className="h-8 w-16 rounded-md" />
                            <div className="flex-1 space-y-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-3/4" />
                            </div>
                        </div>
                        <Skeleton className="h-32 w-full rounded-md" />
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 p-2">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-2">
                    {[...Array(4)].map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            </div>
            <div className="p-2">
                <Skeleton className="h-60 w-full rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 items-start">
                <Skeleton className="h-48 w-full rounded-md" />
                <div className="md:col-span-2 space-y-2">
                    {[...Array(9)].map((_, i) => (
                        <Skeleton key={i} className="h-4 w-full" />
                    ))}
                </div>
            </div>
        </div>
    );
}
