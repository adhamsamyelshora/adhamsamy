import { FoodRepository } from '../repository/food.repository';
import { mealSchema, foodSchema } from '../validators/food';

const repository = new FoodRepository();

export class FoodService {
  createFood(userId: string, payload: unknown) {
    const input = foodSchema.parse(payload);
    return repository.createFood({ userId, ...input });
  }

  listFoods(userId: string) {
    return repository.listFoods(userId);
  }

  async createMeal(userId: string, payload: unknown) {
    const input = mealSchema.parse(payload);
    return repository.createMeal({
      userId,
      date: new Date(input.date),
      mealType: input.mealType,
      items: input.items
    });
  }

  async dailyTotals(userId: string) {
    const meals = await repository.listMeals(userId);
    return meals.reduce(
      (acc, meal) => {
        meal.items.forEach((item) => {
          acc.calories += item.calories;
          acc.protein += item.protein;
          acc.carbs += item.carbs;
          acc.fat += item.fat;
        });
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  }

  listMeals(userId: string) {
    return repository.listMeals(userId);
  }
}
