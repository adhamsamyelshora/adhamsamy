import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class TaskRepository {
  list(userId: string) {
    return prisma.task.findMany({ where: { userId }, include: { tags: { include: { tag: true } } }, orderBy: { dueDate: 'asc' } });
  }

  async create(userId: string, input: Prisma.TaskUncheckedCreateInput, tags: string[]) {
    return prisma.task.create({
      data: {
        ...input,
        userId,
        tags: {
          create: tags.map((name) => ({
            tag: {
              connectOrCreate: {
                where: { userId_name: { userId, name } },
                create: { userId, name }
              }
            }
          }))
        }
      }
    });
  }
}
