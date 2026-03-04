import { WeightService } from '../service/weight.service';

const service = new WeightService();

export async function WeightPage({ userId }: { userId: string }) {
  const entries = await service.trend(userId);
  const latest = entries[entries.length - 1];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Weight Tracking</h2>
      <div className="rounded border p-3">Current weight: {latest?.weightKg ?? 'N/A'} kg</div>
      <ul className="space-y-1 rounded border p-3">
        {entries.slice(-10).map((entry) => (
          <li key={entry.id}>{new Date(entry.date).toLocaleDateString()} - {entry.weightKg}kg (trend {entry.movingAverage}kg)</li>
        ))}
      </ul>
    </div>
  );
}
