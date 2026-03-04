import { FoodService } from '@/modules/food/service/food.service';
import { MoneyService } from '@/modules/money/service/money.service';
import { TaskService } from '@/modules/tasks/service/task.service';
import { WeightService } from '@/modules/weight/service/weight.service';
import { WorkService } from '@/modules/work/service/work.service';

const food = new FoodService();
const money = new MoneyService();
const tasks = new TaskService();
const weight = new WeightService();
const work = new WorkService();

export class DashboardService {
  async get(userId: string) {
    const [totals, weights, taskViews, monthly, workDash] = await Promise.all([
      food.dailyTotals(userId),
      weight.trend(userId),
      tasks.views(userId),
      money.monthlyReport(userId),
      work.dashboard(userId)
    ]);

    return {
      calories: totals,
      weightCurrent: weights[weights.length - 1] ?? null,
      tasksToday: taskViews.today.length,
      spendingMonth: monthly.expenses,
      budgetMonth: monthly.budgets.reduce((sum, b) => sum + b.limit, 0),
      workHoursWeek: workDash.hoursWeek
    };
  }
}
