import { z } from "zod";

export const schema = z.object({
    balance: z.number(),
    balance_percentage: z.number(),
    total_incomes: z.number(),
    total_expenses: z.number(),
    month: z.string(),
    year: z.string()
});

export const balanceChartDataSchema = z.array(
    z.object({
        date: z.string(),
        income: z.number(),
        expense: z.number()
    })
);