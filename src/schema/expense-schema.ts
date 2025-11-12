import { z } from "zod";

export const schema = z.object({
    id: z.string(),
    payment_concept: z.string(),
    note: z.string().optional(),
    category: z.string(),
    subtotal: z.number(),
    tax: z.number(),
    total: z.number(),
    payment_date: z.string(),
    created_at: z.string()
});
