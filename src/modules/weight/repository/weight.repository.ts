import { prisma } from '@/lib/prisma';

export class WeightRepository {
  list(userId: string) {
    return prisma.weightEntry.findMany({ where: { userId }, orderBy: { date: 'asc' } });
  }

  create(userId: string, data: { date: Date; weightKg: number; notes?: string }) {
    return prisma.weightEntry.create({ data: { userId, ...data } });
  }
}
