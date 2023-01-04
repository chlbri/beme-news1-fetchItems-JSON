import { createLogic } from '@bemedev/fsf';
import { CqrsContext, Query, QueryMore } from '../types';

type Events = Pick<CqrsContext, 'itemIDs' | 'caches'> & {
  query?: Query | QueryMore;
};

type Context = Pick<CqrsContext, 'caches'> & { currentQuery?: string };

export const logic = createLogic({
  context: {},
  initial: 'checkQuery',
  schema: {
    data: void 0,
    context: {} as Context,
    events: {} as Events | null,
  },
  states: {
    //TODO: Implement logic
  },
});
