import Link from 'next/link';
import { DashboardService } from '../service/dashboard.service';

const service = new DashboardService();

export async function DashboardWidgets({ userId }: { userId: string }) {
  const data = await service.get(userId);
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Home dashboard</h2>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded border p-4">Today calories: {data.calories.calories.toFixed(0)}</div>
        <div className="rounded border p-4">Current weight: {data.weightCurrent?.weightKg ?? 'N/A'}kg</div>
        <div className="rounded border p-4">Tasks due today: {data.tasksToday}</div>
        <div className="rounded border p-4">This month spending vs budget: {data.spendingMonth.toFixed(2)} / {data.budgetMonth.toFixed(2)}</div>
        <div className="rounded border p-4">Work hours this week: {data.workHoursWeek.toFixed(1)}</div>
      </div>
      <div className="flex gap-3">
        <Link className="underline" href="/api/export/food?format=csv">Export Food CSV</Link>
        <Link className="underline" href="/api/export/finance?format=json">Export Finance JSON</Link>
      </div>
    </div>
  );
}
