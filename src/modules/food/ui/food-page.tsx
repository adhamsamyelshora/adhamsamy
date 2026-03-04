import { FoodService } from '../service/food.service';

const service = new FoodService();

export async function FoodPage({ userId }: { userId: string }) {
  const [foods, meals, totals] = await Promise.all([service.listFoods(userId), service.listMeals(userId), service.dailyTotals(userId)]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Food Tracking</h2>
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded border p-3">Calories: {totals.calories.toFixed(1)}</div>
        <div className="rounded border p-3">Protein: {totals.protein.toFixed(1)}g</div>
        <div className="rounded border p-3">Carbs: {totals.carbs.toFixed(1)}g</div>
        <div className="rounded border p-3">Fat: {totals.fat.toFixed(1)}g</div>
      </div>
      <div className="rounded border p-4">
        <h3 className="mb-2 font-medium">Reusable foods</h3>
        <ul className="list-disc pl-6">{foods.map((food) => <li key={food.id}>{food.name} ({food.calories} kcal)</li>)}</ul>
      </div>
      <div className="rounded border p-4">
        <h3 className="mb-2 font-medium">Meals</h3>
        <ul className="space-y-2">{meals.map((meal) => <li key={meal.id}>{meal.mealType} - {new Date(meal.date).toLocaleDateString()} ({meal.items.length} items)</li>)}</ul>
      </div>
    </div>
  );
}
