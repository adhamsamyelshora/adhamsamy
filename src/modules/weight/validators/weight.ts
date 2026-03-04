import { z } from 'zod';

export const weightSchema = z.object({
  date: z.string().datetime(),
  weightKg: z.number().positive(),
  notes: z.string().optional()
});
