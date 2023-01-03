import { assign } from '@xstate/immer';
import { send } from 'xstate';
import { machine } from './machine';

export const TableMachine = machine.withConfig({
  actions: {
    setItems: assign((context, {}) => {
      // context.cqrs.items = event.items;
    }),
    sendCurrentQuery: send(({}) => ({ type: 'QUERY' }), {
      to: 'cqrs',
    }),
    sendQueryMore: send(({}) => ({ type: 'MORE' }), {
      to: 'cqrs',
    }),
  },
});
