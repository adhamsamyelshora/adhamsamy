import { describe, expect, it } from 'vitest';
import { toCsv } from '@/server/core/export';

describe('toCsv', () => {
  it('serializes rows', () => {
    const csv = toCsv([{ name: 'A', calories: 10 }]);
    expect(csv).toContain('name,calories');
    expect(csv).toContain('"A","10"');
  });
});
