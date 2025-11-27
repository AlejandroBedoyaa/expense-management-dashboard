import { z } from "zod";

export const incomeSchema = z.object({
    id: z.string(),
    source: z.string(),
    amount: z.string(),
    income_date: z.string(),
    description: z.string(),
    created_at: z.string(),
});

export const monthlyIncomesSchema = z.object({
    month: z.string(),
    year: z.string(),
    total_incomes: z.number(),
    previous_month_total: z.number(),
    percentage_change: z.number(),
    improvement: z.boolean()
});