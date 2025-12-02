import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { z } from "zod"
import { schema, totalBalanceSchema } from "@/schema/balance-schema";
import { monthlyExpensesSchema } from "@/schema/expense-schema";
import { monthlyIncomesSchema } from "@/schema/income-schema";

interface SectionCardsProps {
  balances?: z.infer<typeof schema>;
  incomes?: z.infer<typeof monthlyIncomesSchema>;
  expenses?: z.infer<typeof monthlyExpensesSchema>;
  totalBalance?: z.infer<typeof totalBalanceSchema>;
}

export function SectionCards({ 
  balances,
  incomes,
  expenses,
  totalBalance,
}: SectionCardsProps) {

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {(balances?.balance ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(balances?.balance_percentage ?? 0) >= 0  
              ? (<><IconTrendingUp className="text-green-500" />+{(balances?.balance_percentage ?? 0).toFixed(2)}%</>)
              : (<><IconTrendingDown className="text-red-500" />-{(balances?.balance_percentage ?? 0).toFixed(2)}%</>)
              }
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {(balances?.balance_percentage ?? 0) >= 0  
            ? (<>Trending up this month <IconTrendingUp className="size-4 text-green-500" /></>)
            : (<>Down this month <IconTrendingDown className="size-4 text-red-500" /></>)
            }
          </div>
          <div className="text-muted-foreground">
            Balance for the current month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Expenses</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {(expenses?.total_expenses ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(expenses?.improvement)  
              ? (<><IconTrendingDown className="text-green-500" />{(expenses?.percentage_change ?? 0).toFixed(2)}%</>)
              : (<><IconTrendingUp className="text-red-500" />+{(expenses?.percentage_change ?? 0).toFixed(2)}%</>)
              }
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {(expenses?.improvement)  
            ? (<>Waste down from last month <IconTrendingDown className="size-4 text-green-500" /></>)
            : (<>Waste up from last month <IconTrendingUp className="size-4 text-red-500" /></>)
            }
          </div>
          <div className="text-muted-foreground">
            Expenses from the current month
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Monthly Incomes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {(incomes?.total_incomes ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {(incomes?.improvement)  
              ? (<><IconTrendingUp className="text-green-500" />+{(incomes?.percentage_change ?? 0).toFixed(2)}%</>)
              : (<><IconTrendingDown className="text-red-500" />{(incomes?.percentage_change ?? 0).toFixed(2)}%</>)
              }
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {(incomes?.improvement)  
            ? (<>More incomes this month <IconTrendingUp className="size-4 text-green-500" /></>)
            : (<>Less incomes this month <IconTrendingDown className="size-4 text-red-500" /></>)
            }
          </div>
          <div className="text-muted-foreground">Incomes for the current month</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {(totalBalance?.total_balance ?? 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +X.X%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            XXXXXXXX <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">Card on develop</div>
        </CardFooter>
      </Card>
    </div>
  )
}
