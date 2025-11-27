import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export function SkeletonChartArea() {
    return (
        <Card className="@container/card">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>
            </CardHeader>
            <CardContent>
                <Skeleton className="h-[300px] w-full rounded-lg" />
                <div className="mt-4 flex justify-center gap-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-3 w-3 rounded-full" />
                        <Skeleton className="h-4 w-16" />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
