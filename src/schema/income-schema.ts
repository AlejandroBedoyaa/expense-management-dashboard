import { z } from "zod";

export const schema = z.object({
    id: z.string(),
    source: z.string(),
    amount: z.string(),
    income_date: z.string(),
    description: z.string(),
    created_at: z.string(),
});
