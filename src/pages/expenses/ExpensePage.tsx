import { DataTable } from "@/components/expenses/expense-table"
import { useExpenses } from "@/hooks/useExpenses";

function ExpensePage() {

    const { data, isLoading, error } = useExpenses();
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const expenses = data?.expenses ?? [];

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={expenses} />
        </div>
    );
}

export default ExpensePage;
