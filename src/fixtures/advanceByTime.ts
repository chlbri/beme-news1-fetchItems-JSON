import { vi } from 'vitest';

export async function advanceByTime(ms: number) {
  await Promise.resolve();
  return vi.advanceTimersByTime(ms);
}
