import { DataTable } from "@/components/incomes/income-table"
import { useIncomes } from "@/hooks/useIncomes";
import { SkeletonTable } from "@/components/skeletons/skeleton-table";
import { EmptyError } from "@/components/empty/empty-error";
import { incomeSchema } from "@/schema/income-schema";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { toast } from "sonner";

function IncomePage() {

    const { data, isLoading, error } = useIncomes();
    if (error) return <div>Error: {error.message}</div>;

    const incomes = data?.incomes ?? incomeSchema.array().parse([]);
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <div className="flex items-center justify-end px-4 lg:px-6">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="dark:text-foreground"
                    onClick={() => { toast.info('On development') }}
                    >
                    <IconPlus />
                        <span className="hidden lg:inline">Add Item</span>
                    </Button>
                </div>
            </div>
            {isLoading ? (
                <SkeletonTable />
            ) : error ? (
                <EmptyError />
            ) : (
                <DataTable data={incomes} />
            )}
        </div>
    );
}

export default IncomePage;
