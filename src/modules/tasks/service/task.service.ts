import { TaskRepository } from '../repository/task.repository';
import { taskSchema } from '../validators/task';

const repository = new TaskRepository();

export class TaskService {
  list(userId: string) {
    return repository.list(userId);
  }

  create(userId: string, payload: unknown) {
    const input = taskSchema.parse(payload);
    return repository.create(
      userId,
      {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate ? new Date(input.dueDate) : undefined,
        priority: input.priority,
        status: input.status,
        taskType: input.taskType,
        reminderAt: input.reminderAt ? new Date(input.reminderAt) : undefined
      },
      input.tags
    );
  }

  async views(userId: string) {
    const tasks = await repository.list(userId);
    const now = new Date();
    return {
      today: tasks.filter((task) => task.dueDate && task.dueDate.toDateString() === now.toDateString()),
      upcoming: tasks.filter((task) => task.dueDate && task.dueDate > now && task.status !== 'done'),
      overdue: tasks.filter((task) => task.dueDate && task.dueDate < now && task.status !== 'done'),
      completed: tasks.filter((task) => task.status === 'done')
    };
  }
}
