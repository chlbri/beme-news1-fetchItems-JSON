import { interpret } from '@bemedev/x-test';
import { beforeAll, describe, test, vi } from 'vitest';
import { FetchNewsMachine } from './machine';

const { start, matches, send, context, parentSend, stop } =
  interpret(FetchNewsMachine);

beforeAll(() => {
  const implementation = (input: any, init: any) =>
    import('node-fetch').then(({ default: fetch }) =>
      fetch(input as any, init as any),
    );
  global.fetch = vi.fn().mockImplementation(implementation);
});

describe.skipIf(process.env.GITHUB_ACTIONS !== 'true')(
  'Implemantation test',
  () => {
    test('#1 Start the machine', () => {
      start();
    });
  },
);
