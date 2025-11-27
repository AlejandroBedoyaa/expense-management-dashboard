import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty"

export function EmptyError() {
    return (
        <Empty>
            <EmptyHeader>
                <EmptyTitle>Error trying to load data</EmptyTitle>
                <EmptyDescription>
                    The page you&apos;re looking is unavailable.
                </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
                <EmptyDescription>
                    Try later
                </EmptyDescription>
            </EmptyContent>
        </Empty>
    )
}
