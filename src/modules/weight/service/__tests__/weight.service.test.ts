import { describe, expect, it } from 'vitest';

function movingAvg(values: number[], window = 3) {
  return values.map((_, i) => {
    const chunk = values.slice(Math.max(0, i - window + 1), i + 1);
    return chunk.reduce((a, b) => a + b, 0) / chunk.length;
  });
}

describe('weight trend algorithm', () => {
  it('computes moving average', () => {
    expect(movingAvg([80, 79, 78, 77])).toEqual([80, 79.5, 79, 78]);
  });
});
