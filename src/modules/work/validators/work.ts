import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1),
  status: z.string().min(1)
});

export const timesheetSchema = z.object({
  projectId: z.string(),
  date: z.string().datetime(),
  hours: z.number().positive(),
  description: z.string().optional()
});

export const workNoteSchema = z.object({
  projectId: z.string().optional(),
  title: z.string().min(1),
  content: z.string().min(1)
});
