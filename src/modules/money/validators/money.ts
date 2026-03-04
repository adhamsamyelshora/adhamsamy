import { z } from 'zod';

export const transactionSchema = z.object({
  date: z.string().datetime(),
  amount: z.number(),
  type: z.enum(['income', 'expense', 'transfer']),
  categoryId: z.string().optional(),
  accountId: z.string().optional(),
  notes: z.string().optional()
});

export const budgetSchema = z.object({
  month: z.string().datetime(),
  categoryId: z.string(),
  limit: z.number().positive()
});
