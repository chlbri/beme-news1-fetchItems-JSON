import { assign } from '@xstate/immer';
import { assignObject } from 'core';
import { createMachine, send } from 'xstate';
import { escalate } from 'xstate/lib/actions';
import { _queryIsCached } from './functions';
import { Context, Events, Services } from './types';

//TODO: Stringify items 
//TODO: Build current items only
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
        invoke: {
          src: 'cache',
          id: 'cache',
          onDone: [
            {
              target: 'work',
              actions: [
                'setItems',
                'setItemIDs',
                'setQuery',
                'addQueryToCache',
              ],
            },
          ],
          onError: [
            {
              target: 'work',
              actions: 'escalateCacheError',
            },
          ],
        },
      },
      config: {
        description:
          'Everything you need to configure before running anything',
        initial: 'environment',
        states: {
          error: {
            on: {
              RINIT: {
                target: '#table.config',
              },
            },
          },
          optional: {
            description: 'A specific config (optional) you want to add',
            invoke: {
              src: 'optional',
              id: 'optional',
              onError: [
                {
                  target: 'error',
                  actions: 'escalateConfigError',
                },
              ],
              onDone: [
                {
                  target: '#table.cache',
                },
              ],
            },
          },
          environment: {
            invoke: {
              src: 'getEnVariables',
              id: 'getEnVariables',
              onDone: [
                {
                  target: 'optional',
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
                  actions: 'escalateDataError',
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
                    internal: false,
                  },
                },
              },
              ready: {
                description: 'Ready for commands',
                on: {
                  'CQRS/SEND/CREATE': {
                    target: 'resetCache',
                    actions: 'cqrs/create',
                  },
                  'CQRS/SEND/UPDATE': {
                    target: 'resetCache',
                    actions: 'cqrs/update',
                  },
                  'CQRS/SEND/QUERY': {
                    target: 'cacheQuery',
                    actions: ['setQuery', 'addQueryToCache'],
                  },
                  'CQRS/SEND/REMOVE': {
                    target: 'resetCache',
                    actions: 'cqrs/remove',
                  },
                  'CQRS/SEND/DELETE': {
                    target: 'resetCache',
                    actions: 'cqrs/delete',
                  },
                  'CQRS/SEND/MORE': {
                    target: 'cacheMore',
                    actions: ['setQuery', 'addQueryToCache'],
                  },
                  'CQRS/SEND/REFETCH': {
                    target: 'busy',
                    actions: 'cqrs/refetch',
                  },
                },
              },
              resetCache: {
                always: {
                  target: 'busy',
                  actions: 'resetQueriesCache',
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
                        entry: 'cqrs/query',
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
                    entry: 'cqrs/query',
                    type: 'final',
                  },
                },
                onDone: {
                  target: 'busy',
                },
              },
              cacheMore: {
                exit: 'removeLastQuery',
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
                        entry: 'cqrs/more',
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
                    entry: 'cqrs/more',
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
              'setDefaultPage',
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
      itemsAreCached: context => {
        const items = context.cqrs?.items;
        return !!items && items?.size > 0;
      },
      queryIsCached: ({ cqrs }) => {
        return _queryIsCached(cqrs);
      },
    },
    actions: {
      setEnVariables: assign((context, { data }) => {
        context.environment = data;
      }),
      escalateEnvError: escalate('ENVIRONMENT_ERROR'),
      escalateConfigError: escalate('CONFIG_ERROR'),
      setItems: assign((context, event) => {
        const items = new Set(event.data?.items);
        assignObject(context.cqrs?.items, items);
      }),
      addItems: assign((context, event) => {
        const items = event.data?.items ?? [];
        const _items = context.cqrs?.items;
        items.forEach(item => _items?.add(item));
      }),
      setItemIDs: assign(context => {
        const items = context.cqrs?.items?.values();
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const itemIDs = Array.from(items!).map(item => item.id);
        context.cqrs = {
          ...context.cqrs,
          itemIDs,
        };
      }),
      setQuery: assign((context, event) => {
        const currentQuery = event.data?.query;
        context.cqrs = {
          ...context.cqrs,
          currentQuery,
        };
      }),
      addQueryToCache: assign((context, event) => {
        const _query = event.data?.query;
        if (!_query) return;
        const query = JSON.stringify(_query);
        const caches = context.cqrs?.caches;
        const ids = context.cqrs?.itemIDs;
        if (!ids) return;
        caches?.push({ ids, query });
      }),
      escalateCacheError: escalate((_, { data }) => data),

      // #region CQRS
      'cqrs/query': send(
        context => {
          const query = context.cqrs?.currentQuery;
          return { type: 'QUERY', query };
        },
        {
          to: 'cqrs',
        },
      ),

      'cqrs/more': send(
        context => {
          const query = context.cqrs?.currentQuery;
          return { type: 'MORE', query };
        },
        {
          to: 'cqrs',
        },
      ),

      'cqrs/create': send((_, { data }) => {
        return { type: 'CREATE', data };
      }),

      'cqrs/update': send((_, { data }) => {
        return { type: 'UPDATE', data };
      }),

      'cqrs/delete': send((_, { data }) => {
        return { type: 'DELETE', data };
      }),

      'cqrs/remove': send((_, { data }) => {
        return { type: 'REMOVE', data };
      }),
      // #endregion

      // #region Pagination
      'pagination/firstPage': assign(context => {
        context.pagination = {
          ...context.pagination,
          currentPage: 0,
        };
      }),

      'pagination/lastPage': assign(context => {
        const totalPages = context.pagination?.totalPages ?? 1;
        context.pagination = {
          ...context.pagination,
          currentPage: totalPages - 1,
        };
      }),

      'pagination/nextPage': assign(context => {
        const currentPage = (context.pagination?.currentPage ?? -1) + 1;
        context.pagination = {
          ...context.pagination,
          currentPage,
        };
      }),

      'pagination/previousPage': assign(context => {
        const currentPage = (context.pagination?.currentPage ?? 1) - 1;
        context.pagination = {
          ...context.pagination,
          currentPage,
        };
      }),

      'pagination/goto': assign((context, event) => {
        const page = event.data?.page ?? 0;
        context.pagination = {
          ...context.pagination,
          currentPage: page,
        };
      }),

      // #endregion
    },
  },
);
