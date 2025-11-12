import { DataTable } from "@/components/incomes/income-table"
import { useIncomes } from "@/hooks/useIncomes";

function IncomePage() {

    const { data, isLoading, error } = useIncomes();
    if (isLoading) return <div>Cargando...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const incomes = data?.incomes ?? [];
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <DataTable data={incomes} />
        </div>
    );
}

export default IncomePage;
