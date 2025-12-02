import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { useMonthlyBalance, useBalanceChartData, useTotalBalance } from "@/hooks/useBalances"
import { useMonthlyExpenses } from "@/hooks/useExpenses"
import { useMonthlyIncomes } from "@/hooks/useIncomes"
import { SkeletonCard } from "@/components/skeletons/skeleton-card"
import { SkeletonChartArea } from "@/components/skeletons/skeleton-chartArea"

function DashboardPage() {
    const { data: balanceData, isLoading: balanceLoading, error: balanceError } = useMonthlyBalance();
    const { data: expensesData, isLoading: expensesLoading, error: expensesError } = useMonthlyExpenses();
    const { data: incomesData, isLoading: incomesLoading, error: incomesError } = useMonthlyIncomes();
    const { data: balanceChartData, isLoading: balanceChartLoading, error: balanceChartError } = useBalanceChartData();
    const { data: totalBalanceData, isLoading: totalBalanceLoading, error: totalBalanceError } = useTotalBalance();
    
    const isLoadingCards = balanceLoading || expensesLoading || incomesLoading || totalBalanceLoading;
    
    if (balanceError) return <div>Error: {balanceError.message}</div>;
    if (expensesError) return <div>Error: {expensesError.message}</div>;
    if (incomesError) return <div>Error: {incomesError.message}</div>;
    if (balanceChartError) return <div>Error: {balanceChartError.message}</div>;
    if (totalBalanceError) return <div>Error: {totalBalanceError.message}</div>;
    
    const balances = balanceData?.balance ?? [];
    const incomes = incomesData?.monthly_incomes ?? 0;
    const expenses = expensesData?.monthly_expenses ?? 0;
    const chartData = balanceChartData?.data ?? [];
    const totalBalance = totalBalanceData?.total_balance ?? 0;
    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {isLoadingCards ? (
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : (
                <SectionCards 
                    balances={balances}
                    incomes={incomes}
                    expenses={expenses}
                    totalBalance={totalBalance}
                />
            )}
            <div className="px-4 lg:px-6">
                {balanceChartLoading ? (
                    <SkeletonChartArea />
                ) : (
                    <ChartAreaInteractive data={chartData} />
                )}
            </div>
        </div>
    );
}

export default DashboardPage;
