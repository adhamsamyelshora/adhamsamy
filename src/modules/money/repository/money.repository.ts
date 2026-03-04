import { prisma } from '@/lib/prisma';

export class MoneyRepository {
  listTransactions(userId: string) {
    return prisma.transaction.findMany({ where: { userId }, include: { category: true, account: true }, orderBy: { date: 'desc' } });
  }
  createTransaction(userId: string, data: Parameters<typeof prisma.transaction.create>[0]['data']) {
    return prisma.transaction.create({ data: { ...data, userId } });
  }
  listBudgets(userId: string) {
    return prisma.budget.findMany({ where: { userId }, include: { category: true } });
  }
  createBudget(userId: string, data: { month: Date; categoryId: string; limit: number }) {
    return prisma.budget.upsert({
      where: { userId_month_categoryId: { userId, month: data.month, categoryId: data.categoryId } },
      create: { userId, ...data },
      update: { limit: data.limit }
    });
  }
  listCategories(userId: string) {
    return prisma.category.findMany({ where: { userId }, orderBy: { name: 'asc' } });
  }
}
