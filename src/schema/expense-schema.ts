import { z } from "zod";

export const expenseSchema = z.object({
    id: z.string(),
    payment_concept: z.string(),
    note: z.string().optional(),
    category: z.string(),
    subtotal: z.number(),
    tax: z.number(),
    total: z.number(),
    payment_date: z.string(),
    file_name: z.string().optional(),
    created_at: z.string()
});

export const monthlyExpensesSchema = z.object({
    month: z.string(),
    year: z.string(),
    total_expenses: z.number(),
    previous_month_total: z.number(),
    percentage_change: z.number(),
    improvement: z.boolean()
});