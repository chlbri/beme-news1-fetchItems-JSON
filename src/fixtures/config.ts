import { afterAll, beforeAll, vi } from 'vitest';
import { MEDIA_STACK_APIKEY, MEDIA_STACK_API_URL } from './constants';



export function useTestConfig() {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });
}

export function useEnvDefined() {
  beforeAll(() => {
    process.env = {
      MEDIA_STACK_APIKEY,
      MEDIA_STACK_API_URL,
    };
  });

  afterAll(() => {
    process.env = {};
  });
}

export function useEnvUndefined() {
  beforeAll(() => {
    process.env = {};
  });
  afterAll(() => {
    process.env = {
      MEDIA_STACK_APIKEY,
      MEDIA_STACK_API_URL,
    };
  });
}
