import { describe, expect, it } from 'vitest';
import { toCsv } from '@/server/core/export';

describe('food export', () => {
  it('creates csv content for food logs', () => {
    const csv = toCsv([{ date: '2024-01-01', mealType: 'lunch', name: 'Rice', calories: 200 }]);
    expect(csv.split('\n')).toHaveLength(2);
  });
});
