import { WeightRepository } from '../repository/weight.repository';
import { weightSchema } from '../validators/weight';

const repository = new WeightRepository();

export class WeightService {
  list(userId: string) {
    return repository.list(userId);
  }

  create(userId: string, payload: unknown) {
    const input = weightSchema.parse(payload);
    return repository.create(userId, { date: new Date(input.date), weightKg: input.weightKg, notes: input.notes });
  }

  async trend(userId: string) {
    const entries = await repository.list(userId);
    const window = 3;
    return entries.map((entry, index) => {
      const chunk = entries.slice(Math.max(0, index - window + 1), index + 1);
      const avg = chunk.reduce((sum, current) => sum + current.weightKg, 0) / chunk.length;
      return { ...entry, movingAverage: Number(avg.toFixed(2)) };
    });
  }
}
