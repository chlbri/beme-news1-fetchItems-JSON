import { createMachine } from 'xstate';
import { Context, Events } from './machine.types';

export const machine = createMachine({
  predictableActionArguments: true,
  preserveActionOrder: true,
  tsTypes: {} as import('./machine.typegen').Typegen0,
  schema: {
    context: {} as Context,
    events: {} as Events,
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
                    actions: 'setQuery',
                  },
                  {
                    target: '#table.cache.fetch',
                    actions: 'setQuery',
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
                    actions: 'setQuery',
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
                  cond: 'queryIsDefined',
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
                          cond: 'itemsAreCached',
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
                          cond: 'itemsAreCached',
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
});
