
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.cache": { type: "done.invoke.cache"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.cqrs": { type: "done.invoke.cqrs"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getEnVariables": { type: "done.invoke.getEnVariables"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.optional": { type: "done.invoke.optional"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.cache": { type: "error.platform.cache"; data: unknown };
"error.platform.cqrs": { type: "error.platform.cqrs"; data: unknown };
"error.platform.getEnVariables": { type: "error.platform.getEnVariables"; data: unknown };
"error.platform.optional": { type: "error.platform.optional"; data: unknown };
"xstate.after(DISPLAY_TIME)#table.work.pagination.busy": { type: "xstate.after(DISPLAY_TIME)#table.work.pagination.busy" };
"xstate.after(THROTTLE_TIME)#table.work.cqrs.busy": { type: "xstate.after(THROTTLE_TIME)#table.work.cqrs.busy" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          "cache": "done.invoke.cache";
"cqrs": "done.invoke.cqrs";
"getEnVariables": "done.invoke.getEnVariables";
"optional": "done.invoke.optional";
        };
        missingImplementations: {
          actions: "addToPreviousQuery" | "cqrs/firstPage" | "cqrs/goto" | "cqrs/lastPage" | "cqrs/nextPage" | "cqrs/previousPage" | "cqrs/refetch" | "cqrs/reverseItemsOrder" | "escalateDataError" | "pagination/setCanFetchMoreNext" | "pagination/setCanFetchMorePrevious" | "pagination/setHasNextPage" | "pagination/setHasPreviousPage" | "removeLastQuery" | "resetQueriesCache" | "setAllTotal" | "setCurrentItems" | "setDefaultPage" | "setPageSize" | "setTotal" | "setTotalPages";
          delays: "DISPLAY_TIME" | "THROTTLE_TIME";
          guards: never;
          services: "cache" | "cqrs" | "getEnVariables" | "optional";
        };
        eventsCausingActions: {
          "addItems": "CQRS/RECEIVE/MORE";
"addQueryToCache": "CQRS/SEND/MORE" | "CQRS/SEND/QUERY" | "done.invoke.cache";
"addToPreviousQuery": "" | "done.state.table.work.cqrs.cacheMore" | "error.platform.cqrs" | "xstate.stop";
"cqrs/create": "CQRS/SEND/CREATE";
"cqrs/delete": "CQRS/SEND/DELETE";
"cqrs/firstPage": "PAGINATION/GOTO_FIRST_PAGE";
"cqrs/goto": "PAGINATION/GOTO";
"cqrs/lastPage": "PAGINATION/GOTO_LAST_PAGE";
"cqrs/more": "";
"cqrs/nextPage": "PAGINATION/GOTO_NEXT_PAGE";
"cqrs/previousPage": "PAGINATION/GOTO_PREVIOUS_PAGE";
"cqrs/query": "";
"cqrs/refetch": "CQRS/SEND/REFETCH";
"cqrs/remove": "CQRS/SEND/REMOVE";
"cqrs/reverseItemsOrder": "CQRS/REVERSE_ORDER";
"cqrs/update": "CQRS/SEND/UPDATE";
"escalateCacheError": "error.platform.cache";
"escalateConfigError": "error.platform.optional";
"escalateDataError": "error.platform.cqrs";
"escalateEnvError": "error.platform.getEnVariables";
"pagination/firstPage": "PAGINATION/GOTO_FIRST_PAGE";
"pagination/goto": "PAGINATION/GOTO";
"pagination/lastPage": "PAGINATION/GOTO_LAST_PAGE";
"pagination/nextPage": "PAGINATION/GOTO_NEXT_PAGE";
"pagination/previousPage": "PAGINATION/GOTO_PREVIOUS_PAGE";
"pagination/setCanFetchMoreNext": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.cache" | "error.platform.cache";
"pagination/setCanFetchMorePrevious": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.cache" | "error.platform.cache";
"pagination/setHasNextPage": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.cache" | "error.platform.cache";
"pagination/setHasPreviousPage": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.cache" | "error.platform.cache";
"removeLastQuery": "done.state.table.work.cqrs.cacheMore" | "error.platform.cqrs" | "xstate.stop";
"resetQueriesCache": "";
"setAllTotal": "CQRS/RECEIVE/ALL_TOTAL";
"setCurrentItems": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "xstate.after(DISPLAY_TIME)#table.work.pagination.busy" | "xstate.stop";
"setDefaultPage": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.cache" | "error.platform.cache";
"setEnVariables": "done.invoke.getEnVariables";
"setItemIDs": "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.cache";
"setItems": "CQRS/RECEIVE/ITEMS" | "done.invoke.cache";
"setPageSize": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.cache" | "error.platform.cache";
"setQuery": "CQRS/SEND/MORE" | "CQRS/SEND/QUERY" | "done.invoke.cache";
"setTotal": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.cache" | "error.platform.cache";
"setTotalPages": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.cache" | "error.platform.cache";
        };
        eventsCausingDelays: {
          "DISPLAY_TIME": "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.cache" | "error.platform.cache";
"THROTTLE_TIME": "" | "CQRS/SEND/REFETCH" | "done.invoke.cache" | "done.state.table.work.cqrs.cacheMore" | "done.state.table.work.cqrs.cacheQuery" | "error.platform.cache";
        };
        eventsCausingGuards: {
          "itemsAreCached": "";
"queryIsCached": "";
        };
        eventsCausingServices: {
          "cache": "done.invoke.optional";
"cqrs": "done.invoke.cache" | "error.platform.cache";
"getEnVariables": "error.platform.cqrs" | "xstate.init";
"optional": "done.invoke.getEnVariables";
        };
        matchesStates: "cache" | "config" | "config.environment" | "config.error" | "config.optional" | "work" | "work.cqrs" | "work.cqrs.busy" | "work.cqrs.cacheMore" | "work.cqrs.cacheMore.check" | "work.cqrs.cacheMore.produce" | "work.cqrs.cacheMore.produce.check" | "work.cqrs.cacheMore.produce.items" | "work.cqrs.cacheMore.produce.send" | "work.cqrs.cacheMore.send" | "work.cqrs.cacheQuery" | "work.cqrs.cacheQuery.check" | "work.cqrs.cacheQuery.produce" | "work.cqrs.cacheQuery.produce.check" | "work.cqrs.cacheQuery.produce.items" | "work.cqrs.cacheQuery.produce.send" | "work.cqrs.cacheQuery.send" | "work.cqrs.ready" | "work.cqrs.resetCache" | "work.pagination" | "work.pagination.busy" | "work.pagination.ready" | { "config"?: "environment" | "error" | "optional";
"work"?: "cqrs" | "pagination" | { "cqrs"?: "busy" | "cacheMore" | "cacheQuery" | "ready" | "resetCache" | { "cacheMore"?: "check" | "produce" | "send" | { "produce"?: "check" | "items" | "send"; };
"cacheQuery"?: "check" | "produce" | "send" | { "produce"?: "check" | "items" | "send"; }; };
"pagination"?: "busy" | "ready"; }; };
        tags: never;
      }
  