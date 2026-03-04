import { NextResponse } from 'next/server';
import { FoodService } from '@/modules/food/service/food.service';
import { requireUserId } from '@/server/auth/session';
import { toCsv } from '@/server/core/export';

const service = new FoodService();

export async function GET(req: Request) {
  const userId = await requireUserId();
  const format = new URL(req.url).searchParams.get('format') ?? 'json';
  const meals = await service.listMeals(userId);
  if (format === 'csv') {
    const rows = meals.flatMap((meal) =>
      meal.items.map((item) => ({ date: meal.date.toISOString(), mealType: meal.mealType, name: item.name, calories: item.calories }))
    );
    return new NextResponse(toCsv(rows), { headers: { 'Content-Type': 'text/csv' } });
  }
  return NextResponse.json(meals);
}
