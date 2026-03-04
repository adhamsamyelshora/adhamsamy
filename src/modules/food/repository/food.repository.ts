import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class FoodRepository {
  createFood(data: Prisma.FoodUncheckedCreateInput) {
    return prisma.food.create({ data });
  }

  listFoods(userId: string) {
    return prisma.food.findMany({ where: { userId }, orderBy: { name: 'asc' } });
  }

  createMeal(data: Prisma.MealUncheckedCreateInput & { items: Prisma.MealItemCreateWithoutMealInput[] }) {
    return prisma.meal.create({ data: { userId: data.userId, date: data.date, mealType: data.mealType, items: { create: data.items } }, include: { items: true } });
  }

  listMeals(userId: string) {
    return prisma.meal.findMany({ where: { userId }, include: { items: true }, orderBy: { date: 'desc' } });
  }
}
