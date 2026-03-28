import { z } from "zod";

export const createExpenseSchema = z.object({
  amount: z.coerce.number().positive(),
  memo: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const updateExpenseSchema = z.object({
  amount: z.number().positive().optional(),
  memo: z.string().optional(),
});