
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.cqrs": { type: "done.invoke.cqrs"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.fetchItems": { type: "done.invoke.fetchItems"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.fetchRegisteredQuery": { type: "done.invoke.fetchRegisteredQuery"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getItems": { type: "done.invoke.getItems"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getRegisteredQuery": { type: "done.invoke.getRegisteredQuery"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.getRequiredEnVariables": { type: "done.invoke.getRequiredEnVariables"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.otherConfig": { type: "done.invoke.otherConfig"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.cqrs": { type: "error.platform.cqrs"; data: unknown };
"error.platform.fetchItems": { type: "error.platform.fetchItems"; data: unknown };
"error.platform.fetchRegisteredQuery": { type: "error.platform.fetchRegisteredQuery"; data: unknown };
"error.platform.getItems": { type: "error.platform.getItems"; data: unknown };
"error.platform.getRegisteredQuery": { type: "error.platform.getRegisteredQuery"; data: unknown };
"error.platform.getRequiredEnVariables": { type: "error.platform.getRequiredEnVariables"; data: unknown };
"error.platform.otherConfig": { type: "error.platform.otherConfig"; data: unknown };
"xstate.after(DISPLAY_TIME)#table.work.pagination.busy": { type: "xstate.after(DISPLAY_TIME)#table.work.pagination.busy" };
"xstate.after(THROTTLE_TIME)#table.work.cqrs.busy": { type: "xstate.after(THROTTLE_TIME)#table.work.cqrs.busy" };
"xstate.init": { type: "xstate.init" };
"xstate.stop": { type: "xstate.stop" };
        };
        invokeSrcNameMap: {
          "cqrs": "done.invoke.cqrs";
"fetchItems": "done.invoke.fetchItems";
"fetchRegisteredQuery": "done.invoke.fetchRegisteredQuery";
"getItems": "done.invoke.getItems";
"getRegisteredQuery": "done.invoke.getRegisteredQuery";
"getRequiredEnVariables": "done.invoke.getRequiredEnVariables";
"otherConfig": "done.invoke.otherConfig";
        };
        missingImplementations: {
          actions: "addItems" | "addToPreviousQuery" | "cqrs/firstPage" | "cqrs/goto" | "cqrs/lastPage" | "cqrs/nextPage" | "cqrs/previousPage" | "cqrs/reverseItemsOrder" | "escalateConfigError" | "escalateDataerror" | "escalateEnvError" | "pagination/firstPage" | "pagination/goto" | "pagination/lastPage" | "pagination/nextPage" | "pagination/previousPage" | "pagination/setCanFetchMoreNext" | "pagination/setCanFetchMorePrevious" | "pagination/setHasNextPage" | "pagination/setHasPreviousPage" | "removeLastQueryMore" | "resetQueriesCache" | "setAllTotal" | "setCurrentItems" | "setDefaultCurrentItems" | "setEnVariables" | "setPageSize" | "setTotal" | "setTotalPages";
          delays: "DISPLAY_TIME" | "THROTTLE_TIME";
          guards: never;
          services: "cqrs" | "fetchItems" | "fetchRegisteredQuery" | "getItems" | "getRegisteredQuery" | "getRequiredEnVariables" | "otherConfig";
        };
        eventsCausingActions: {
          "addItems": "CQRS/RECEIVE/MORE";
"addToPreviousQuery": "" | "done.state.table.work.cqrs.cacheMore" | "error.platform.cqrs" | "xstate.stop";
"cqrs/firstPage": "PAGINATION/GOTO_FIRST_PAGE";
"cqrs/goto": "PAGINATION/GOTO";
"cqrs/lastPage": "PAGINATION/GOTO_LAST_PAGE";
"cqrs/nextPage": "PAGINATION/GOTO_NEXT_PAGE";
"cqrs/previousPage": "PAGINATION/GOTO_PREVIOUS_PAGE";
"cqrs/reverseItemsOrder": "CQRS/REVERSE_ORDER";
"escalateBrowserItemsError": "error.platform.getItems";
"escalateConfigError": "error.platform.otherConfig";
"escalateDataerror": "error.platform.cqrs";
"escalateEnvError": "error.platform.getRequiredEnVariables";
"escalateFetchItemsError": "error.platform.fetchItems";
"escalateFetchRegisteredQueryError": "error.platform.fetchRegisteredQuery";
"escalateRegisteredErrorQuery": "error.platform.getRegisteredQuery";
"pagination/firstPage": "PAGINATION/GOTO_FIRST_PAGE";
"pagination/goto": "PAGINATION/GOTO";
"pagination/lastPage": "PAGINATION/GOTO_LAST_PAGE";
"pagination/nextPage": "PAGINATION/GOTO_NEXT_PAGE";
"pagination/previousPage": "PAGINATION/GOTO_PREVIOUS_PAGE";
"pagination/setCanFetchMoreNext": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"pagination/setCanFetchMorePrevious": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"pagination/setHasNextPage": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"pagination/setHasPreviousPage": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"removeLastQueryMore": "done.state.table.work.cqrs.cacheMore" | "error.platform.cqrs" | "xstate.stop";
"resetQueriesCache": "CQRS/SEND/CREATE" | "CQRS/SEND/DELETE" | "CQRS/SEND/REMOVE" | "CQRS/SEND/UPDATE";
"sendCurrentQuery": "" | "CQRS/SEND/REFETCH";
"sendQueryMore": "";
"setAllTotal": "CQRS/RECEIVE/ALL_TOTAL";
"setCurrentItems": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "xstate.after(DISPLAY_TIME)#table.work.pagination.busy" | "xstate.stop";
"setCurrentQuery": "CQRS/SEND/MORE" | "CQRS/SEND/QUERY" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery";
"setDefaultCurrentItems": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"setEnVariables": "done.invoke.getRequiredEnVariables";
"setItemIDs": "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.fetchItems" | "done.invoke.getItems";
"setItems": "CQRS/RECEIVE/ITEMS" | "done.invoke.fetchItems" | "done.invoke.getItems";
"setPageSize": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"setTotal": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"setTotalPages": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
        };
        eventsCausingDelays: {
          "DISPLAY_TIME": "" | "CQRS/RECEIVE/ALL_TOTAL" | "CQRS/RECEIVE/ITEMS" | "CQRS/RECEIVE/MORE" | "PAGINATION/GOTO" | "PAGINATION/GOTO_FIRST_PAGE" | "PAGINATION/GOTO_LAST_PAGE" | "PAGINATION/GOTO_NEXT_PAGE" | "PAGINATION/GOTO_PREVIOUS_PAGE" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"THROTTLE_TIME": "" | "CQRS/SEND/REFETCH" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "done.state.table.work.cqrs.cacheMore" | "done.state.table.work.cqrs.cacheQuery" | "error.platform.fetchRegisteredQuery";
        };
        eventsCausingGuards: {
          "itemsAreDefined": "" | "done.invoke.getRegisteredQuery";
"queryIsCached": "";
        };
        eventsCausingServices: {
          "cqrs": "" | "done.invoke.fetchRegisteredQuery" | "done.invoke.getRegisteredQuery" | "error.platform.fetchRegisteredQuery";
"fetchItems": "done.invoke.getRegisteredQuery" | "error.platform.getRegisteredQuery";
"fetchRegisteredQuery": "";
"getItems": "done.invoke.otherConfig";
"getRegisteredQuery": "done.invoke.getItems" | "error.platform.getItems";
"getRequiredEnVariables": "error.platform.cqrs" | "xstate.init";
"otherConfig": "done.invoke.getRequiredEnVariables";
        };
        matchesStates: "cache" | "cache.browser" | "cache.browser.items" | "cache.browser.query" | "cache.fetch" | "cache.fetch.checkQuery" | "cache.fetch.items" | "cache.fetch.query" | "config" | "config.environment" | "config.error" | "config.other" | "work" | "work.cqrs" | "work.cqrs.busy" | "work.cqrs.cacheMore" | "work.cqrs.cacheMore.check" | "work.cqrs.cacheMore.produce" | "work.cqrs.cacheMore.produce.check" | "work.cqrs.cacheMore.produce.items" | "work.cqrs.cacheMore.produce.send" | "work.cqrs.cacheMore.send" | "work.cqrs.cacheQuery" | "work.cqrs.cacheQuery.check" | "work.cqrs.cacheQuery.produce" | "work.cqrs.cacheQuery.produce.check" | "work.cqrs.cacheQuery.produce.items" | "work.cqrs.cacheQuery.produce.send" | "work.cqrs.cacheQuery.send" | "work.cqrs.ready" | "work.cqrs.resetCache" | "work.pagination" | "work.pagination.busy" | "work.pagination.ready" | { "cache"?: "browser" | "fetch" | { "browser"?: "items" | "query";
"fetch"?: "checkQuery" | "items" | "query"; };
"config"?: "environment" | "error" | "other";
"work"?: "cqrs" | "pagination" | { "cqrs"?: "busy" | "cacheMore" | "cacheQuery" | "ready" | "resetCache" | { "cacheMore"?: "check" | "produce" | "send" | { "produce"?: "check" | "items" | "send"; };
"cacheQuery"?: "check" | "produce" | "send" | { "produce"?: "check" | "items" | "send"; }; };
"pagination"?: "busy" | "ready"; }; };
        tags: never;
      }
  