import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['todo', 'in_progress', 'done']).default('todo'),
  taskType: z.enum(['personal', 'work']),
  reminderAt: z.string().datetime().optional(),
  tags: z.array(z.string()).default([])
});
