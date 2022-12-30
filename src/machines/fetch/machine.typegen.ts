
  // This file was automatically generated. Edits will be overwritten

  export interface Typegen0 {
        '@@xstate/typegen': true;
        internalEvents: {
          "": { type: "" };
"done.invoke.fetchArticles": { type: "done.invoke.fetchArticles"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"done.invoke.fetchArticlesJSON.zod:invocation[0]": { type: "done.invoke.fetchArticlesJSON.zod:invocation[0]"; data: unknown; __tip: "See the XState TS docs to learn how to strongly type this." };
"error.platform.fetchArticles": { type: "error.platform.fetchArticles"; data: unknown };
"error.platform.fetchArticlesJSON.zod:invocation[0]": { type: "error.platform.fetchArticlesJSON.zod:invocation[0]"; data: unknown };
"xstate.init": { type: "xstate.init" };
        };
        invokeSrcNameMap: {
          "fetchArticles": "done.invoke.fetchArticles";
"zod": "done.invoke.fetchArticlesJSON.zod:invocation[0]";
        };
        missingImplementations: {
          actions: never;
          delays: never;
          guards: never;
          services: never;
        };
        eventsCausingActions: {
          "assignArticles": "QUERY";
"assignCategoryQuery": "QUERY";
"assignFromQuery": "QUERY";
"assignLanguageQuery": "QUERY";
"assignSourceQuery": "QUERY";
"assignToQuery": "QUERY";
"escalateFecthError": "error.platform.fetchArticles";
"escalateZodError": "error.platform.fetchArticlesJSON.zod:invocation[0]";
"filterByCategory": "";
"filterByFrom": "";
"filterByLanguage": "";
"filterBySource": "";
"filterByTo": "";
"setArticles": "done.invoke.fetchArticlesJSON.zod:invocation[0]";
"setData": "done.invoke.fetchArticles";
        };
        eventsCausingDelays: {
          
        };
        eventsCausingGuards: {
          "articlesAreDefined": "";
"categoryIsDefined": "";
"fromIsDefined": "";
"languageIsDefined": "";
"sourceIsDefined": "";
"toIsDefined": "";
        };
        eventsCausingServices: {
          "fetchArticles": "";
"zod": "done.invoke.fetchArticles";
        };
        matchesStates: "category" | "default" | "error" | "fetch" | "from" | "idle" | "language" | "source" | "success" | "to" | "zod";
        tags: never;
      }
  