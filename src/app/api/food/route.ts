import { NextResponse } from 'next/server';
import { requireUserId } from '@/server/auth/session';
import { FoodService } from '@/modules/food/service/food.service';

const service = new FoodService();

export async function GET() {
  const userId = await requireUserId();
  const [foods, meals, totals] = await Promise.all([service.listFoods(userId), service.listMeals(userId), service.dailyTotals(userId)]);
  return NextResponse.json({ foods, meals, totals });
}

export async function POST(req: Request) {
  const userId = await requireUserId();
  const body = await req.json();
  if ('mealType' in body) {
    const meal = await service.createMeal(userId, body);
    return NextResponse.json(meal);
  }
  const food = await service.createFood(userId, body);
  return NextResponse.json(food);
}
