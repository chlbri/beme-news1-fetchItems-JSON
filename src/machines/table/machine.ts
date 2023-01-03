import { assign } from '@xstate/immer';
import { assignObject } from 'core';
import { createMachine, send } from 'xstate';
import { escalate } from 'xstate/lib/actions';
import { _queryIsCached } from './functions';
import { Context, Events, Services } from './types';

export const TableItems = createMachine(
  {
    predictableActionArguments: true,
    preserveActionOrder: true,
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      context: {} as Context,
      events: {} as Events,
      services: {} as Services,
    },
    context: {},

    id: 'table',
    initial: 'config',
    states: {
      cache: {
        initial: 'browser',
        states: {
          browser: {
            initial: 'items',
            states: {
              items: {
                invoke: {
                  src: 'getItems',
                  id: 'getItems',
                  onDone: [
                    {
                      target: 'query',
                      actions: ['setItems', 'setItemIDs'],
                    },
                  ],
                  onError: [
                    {
                      target: 'query',
                      actions: 'escalateBrowserItemsError',
                    },
                  ],
                },
              },
              query: {
                invoke: {
                  src: 'getRegisteredQuery',
                  id: 'getRegisteredQuery',
                  onDone: [
                    {
                      target: '#table.work',
                      cond: 'itemsAreDefined',
                      actions: 'setCurrentQuery',
                    },
                    {
                      target: '#table.cache.fetch',
                      actions: 'setCurrentQuery',
                    },
                  ],
                  onError: [
                    {
                      target: '#table.cache.fetch',
                      actions: 'escalateRegisteredErrorQuery',
                    },
                  ],
                },
              },
            },
          },
          fetch: {
            initial: 'items',
            states: {
              items: {
                invoke: {
                  src: 'fetchItems',
                  id: 'fetchItems',
                  onDone: [
                    {
                      target: 'checkQuery',
                      actions: ['setItems', 'setItemIDs'],
                    },
                  ],
                  onError: [
                    {
                      target: 'checkQuery',
                      actions: 'escalateFetchItemsError',
                    },
                  ],
                },
              },
              query: {
                invoke: {
                  src: 'fetchRegisteredQuery',
                  id: 'fetchRegisteredQuery',
                  onDone: [
                    {
                      target: '#table.work',
                      actions: 'setCurrentQuery',
                    },
                  ],
                  onError: [
                    {
                      target: '#table.work',
                      actions: 'escalateFetchRegisteredQueryError',
                    },
                  ],
                },
              },
              checkQuery: {
                always: [
                  {
                    target: '#table.work',
                    cond: 'queryIsCached',
                  },
                  {
                    target: 'query',
                  },
                ],
              },
            },
          },
        },
      },
      config: {
        initial: 'environment',
        states: {
          environment: {
            invoke: {
              src: 'getRequiredEnVariables',
              id: 'getRequiredEnVariables',
              onDone: [
                {
                  target: 'other',
                  actions: 'setEnVariables',
                },
              ],
              onError: [
                {
                  target: 'error',
                  actions: 'escalateEnvError',
                },
              ],
            },
          },
          other: {
            invoke: {
              src: 'otherConfig',
              id: 'otherConfig',
              onDone: [
                {
                  target: '#table.cache.browser',
                },
              ],
              onError: [
                {
                  target: 'error',
                  actions: 'escalateConfigError',
                },
              ],
            },
          },
          error: {
            on: {
              RINIT: {
                target: '#table.config',
              },
            },
          },
        },
      },
      work: {
        states: {
          cqrs: {
            invoke: {
              src: 'cqrs',
              id: 'cqrs',
              onError: [
                {
                  target: '#table.config.error',
                  actions: 'escalateDataerror',
                },
              ],
            },
            initial: 'busy',
            states: {
              busy: {
                after: {
                  THROTTLE_TIME: {
                    target: '#table.work.cqrs.ready',
                    actions: [],
                  },
                },
              },
              ready: {
                description: 'Ready for commands',
                on: {
                  'CQRS/SEND/CREATE': {
                    target: 'resetCache',
                  },
                  'CQRS/SEND/UPDATE': {
                    target: 'resetCache',
                  },
                  'CQRS/SEND/QUERY': {
                    target: 'cacheQuery',
                    actions: 'setCurrentQuery',
                  },
                  'CQRS/SEND/REMOVE': {
                    target: 'resetCache',
                  },
                  'CQRS/SEND/DELETE': {
                    target: 'resetCache',
                  },
                  'CQRS/SEND/MORE': {
                    target: 'cacheMore',
                    actions: 'setCurrentQuery',
                  },
                  'CQRS/SEND/REFETCH': {
                    target: 'busy',
                    actions: 'sendCurrentQuery',
                  },
                },
              },
              resetCache: {
                entry: 'resetQueriesCache',
                always: {
                  target: 'busy',
                },
              },
              cacheQuery: {
                initial: 'check',
                states: {
                  check: {
                    always: [
                      {
                        target: 'produce',
                        cond: 'queryIsCached',
                      },
                      {
                        target: 'send',
                      },
                    ],
                  },
                  produce: {
                    initial: 'check',
                    states: {
                      check: {
                        always: [
                          {
                            target: 'items',
                            cond: 'itemsAreDefined',
                          },
                          {
                            target: 'send',
                          },
                        ],
                      },
                      send: {
                        entry: 'sendCurrentQuery',
                        type: 'final',
                      },
                      items: {
                        entry: 'setCurrentItems',
                        type: 'final',
                      },
                    },
                    type: 'final',
                  },
                  send: {
                    entry: 'sendCurrentQuery',
                    type: 'final',
                  },
                },
                onDone: {
                  target: 'busy',
                },
              },
              cacheMore: {
                exit: 'removeLastQueryMore',
                initial: 'check',
                states: {
                  check: {
                    exit: 'addToPreviousQuery',
                    always: [
                      {
                        target: 'produce',
                        cond: 'queryIsCached',
                      },
                      {
                        target: 'send',
                      },
                    ],
                  },
                  produce: {
                    initial: 'check',
                    states: {
                      check: {
                        always: [
                          {
                            target: 'items',
                            cond: 'itemsAreDefined',
                          },
                          {
                            target: 'send',
                          },
                        ],
                      },
                      send: {
                        entry: 'sendQueryMore',
                        type: 'final',
                      },
                      items: {
                        entry: 'setCurrentItems',
                        type: 'final',
                      },
                    },
                    type: 'final',
                  },
                  send: {
                    entry: 'sendQueryMore',
                    type: 'final',
                  },
                },
                onDone: {
                  target: 'busy',
                },
              },
            },
            on: {
              'CQRS/REVERSE_ORDER': {
                actions: 'cqrs/reverseItemsOrder',
              },
            },
          },
          pagination: {
            entry: [
              'setTotal',
              'setTotalPages',
              'setDefaultCurrentItems',
              'setPageSize',
            ],
            initial: 'busy',
            states: {
              busy: {
                entry: [
                  'pagination/setHasNextPage',
                  'pagination/setHasPreviousPage',
                  'pagination/setCanFetchMoreNext',
                  'pagination/setCanFetchMorePrevious',
                ],
                exit: 'setCurrentItems',
                after: {
                  DISPLAY_TIME: {
                    target: '#table.work.pagination.ready',
                    actions: [],
                    internal: false,
                  },
                },
              },
              ready: {
                on: {
                  'PAGINATION/GOTO_NEXT_PAGE': {
                    target: 'busy',
                    actions: ['pagination/nextPage', 'cqrs/nextPage'],
                  },
                  'PAGINATION/GOTO_PREVIOUS_PAGE': {
                    target: 'busy',
                    actions: [
                      'pagination/previousPage',
                      'cqrs/previousPage',
                    ],
                  },
                  'PAGINATION/GOTO': {
                    target: 'busy',
                    actions: ['pagination/goto', 'cqrs/goto'],
                  },
                  'PAGINATION/GOTO_FIRST_PAGE': {
                    target: 'busy',
                    actions: ['pagination/firstPage', 'cqrs/firstPage'],
                  },
                  'PAGINATION/GOTO_LAST_PAGE': {
                    target: 'busy',
                    actions: ['pagination/lastPage', 'cqrs/lastPage'],
                  },
                },
              },
            },
            on: {
              'CQRS/RECEIVE/ITEMS': {
                target: 'pagination',
                actions: ['setItems', 'setItemIDs'],
                internal: false,
              },
              'CQRS/RECEIVE/ALL_TOTAL': {
                target: 'pagination',
                actions: 'setAllTotal',
                internal: false,
              },
              'CQRS/RECEIVE/MORE': {
                target: 'pagination',
                actions: ['addItems', 'setItemIDs'],
                internal: false,
              },
            },
          },
        },
        type: 'parallel',
      },
    },
  },
  {
    guards: {
      itemsAreDefined: context => {
        const items = context.cqrs?.items;
        return !!items && items?.length > 0;
      },
      queryIsCached: ({ cqrs }) => {
        return _queryIsCached(cqrs);
      },
    },
    actions: {
      setItems: assign((context, event) => {
        assignObject(context.cqrs?.items, event.data);
      }),
      setItemIDs: assign(context => {
        const itemIDs = context.cqrs?.items?.map(item => item.id);
        context.cqrs = {
          ...context.cqrs,
          itemIDs,
        };
      }),
      escalateBrowserItemsError: escalate('BROWSER_ITEMS_ERROR'),
      escalateRegisteredErrorQuery: escalate('REGISTERED_ERROR_QUERY'),
      escalateFetchItemsError: escalate('FETCH_ITEMS_ERROR'),
      escalateFetchRegisteredQueryError: escalate('FETCH_ERROR_QUERY'),
      setCurrentQuery: assign((context, event) => {
        const currentQuery = event.data;
        context.cqrs = {
          ...context.cqrs,
          currentQuery,
        };
      }),
      sendCurrentQuery: send(
        context => {
          const query = context.cqrs?.currentQuery;
          return { type: 'QUERY', query };
        },
        {
          to: 'cqrs',
        },
      ),
      sendQueryMore: send(
        context => {
          const query = context.cqrs?.currentQuery;
          return { type: 'MORE', query };
        },
        {
          to: 'cqrs',
        },
      ),
    },
  },
);
