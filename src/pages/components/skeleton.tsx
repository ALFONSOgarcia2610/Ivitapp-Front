"use client";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCards() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <Card className="w-full max-w-sm text-center shadow-lg">
        <CardHeader className="pt-8">
          <div className="flex justify-center">
            <Skeleton className="h-24 w-24 rounded-full" />
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-4 w-2/3 mx-auto" />
          <Skeleton className="h-3 w-1/2 mx-auto" />
        </CardContent>
      </Card>
    </div>
  );
}
