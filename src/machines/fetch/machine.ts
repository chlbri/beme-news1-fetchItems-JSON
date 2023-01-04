/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { assign } from '@xstate/immer';
import { Article, articleSchema } from 'core';
import json from 'edit-json-file';
import { createMachine } from 'xstate';
import { escalate } from 'xstate/lib/actions';
import { STRINGS } from '~constants';
import { Context, Events } from './machine.types';

export const FechArticlesJSON = createMachine(
  {
    id: 'fetchArticlesJSON',
    initial: 'idle',
    states: {
      language: {
        always: [
          {
            target: 'category',
            cond: 'languageIsDefined',
            actions: 'filterByLanguage',
          },
          {
            target: 'category',
          },
        ],
      },
      category: {
        always: [
          {
            target: 'from',
            cond: 'categoryIsDefined',
            actions: 'filterByCategory',
          },
          {
            target: 'from',
          },
        ],
      },
      idle: {
        on: {
          QUERY: {
            target: 'default',
            actions: [
              'assignLanguageQuery',
              'assignCategoryQuery',
              'assignFromQuery',
              'assignToQuery',
              'assignSourceQuery',
              'assignArticles',
            ],
          },
        },
      },
      from: {
        always: [
          {
            target: 'to',
            cond: 'fromIsDefined',
            actions: 'filterByFrom',
          },
          {
            target: 'to',
          },
        ],
      },
      to: {
        always: [
          {
            target: 'source',
            cond: 'toIsDefined',
            actions: 'filterByTo',
          },
          {
            target: 'source',
          },
        ],
      },
      source: {
        always: [
          {
            target: 'success',
            cond: 'sourceIsDefined',
            actions: 'filterBySource',
          },
          {
            target: 'success',
          },
        ],
      },
      success: {
        type: 'final',
      },
      fetch: {
        description: 'Get articles from local data.json',
        invoke: {
          src: 'fetchArticles',
          id: 'fetchArticles',
          onDone: [
            {
              target: 'zod',
              actions: 'setData',
            },
          ],
          onError: [
            {
              target: 'error',
              actions: 'escalateFecthError',
            },
          ],
        },
      },
      error: {
        type: 'final',
      },
      default: {
        always: [
          {
            target: 'language',
            cond: 'articlesAreDefined',
          },
          {
            target: 'fetch',
          },
        ],
      },
      zod: {
        invoke: {
          src: 'zod',
          onDone: [
            {
              target: 'language',
              actions: 'setArticles',
            },
          ],
          onError: [
            {
              target: 'error',
              actions: 'escalateZodError',
            },
          ],
        },
      },
    },
    tsTypes: {} as import('./machine.typegen').Typegen0,
    schema: {
      events: {} as Events,
      context: {} as Context,
      services: {} as {
        fetchArticles: { data: unknown };
        zod: { data: Article[] };
      },
    },
    context: {},
    predictableActionArguments: true,
    preserveActionOrder: true,
  },
  {
    actions: {
      assignLanguageQuery: assign((context, { language }) => {
        context.language = language;
      }),
      assignCategoryQuery: assign((context, { category }) => {
        context.category = category;
      }),
      assignFromQuery: assign((context, { from }) => {
        context.from = from;
      }),
      assignToQuery: assign((context, { to }) => {
        context.to = to;
      }),
      assignSourceQuery: assign((context, { source }) => {
        context.source = source;
      }),
      assignArticles: assign((context, { articles }) => {
        context.articles = articles;
      }),
      filterByLanguage: assign(context => {
        context.articles = context.articles?.filter(
          article => article.language === context.language,
        );
      }),
      filterByCategory: assign(context => {
        context.articles = context.articles?.filter(
          article => article.category === context.category,
        );
      }),
      filterByFrom: assign(context => {
        context.articles = context.articles?.filter(article => {
          const from = new Date(context.from!);
          return article.publishedAt >= from;
        });
      }),
      filterByTo: assign(context => {
        context.articles = context.articles?.filter(article => {
          const to = new Date(context.to!);
          return article.publishedAt <= to;
        });
      }),
      filterBySource: assign(context => {
        context.articles = context.articles?.filter(
          article => article.source === context.source,
        );
      }),
      setArticles: assign((context, { data }) => {
        context.articles = data;
      }),
      setData: assign((context, { data }) => {
        context.data = data;
      }),
      escalateZodError: escalate('ZOD_ERROR'),
      escalateFecthError: escalate('FETCH_ERROR'),
    },
    guards: {
      articlesAreDefined: context => !!context.articles,
      languageIsDefined: context => !!context.language,
      categoryIsDefined: context => !!context.category,
      fromIsDefined: context => !!context.from,
      toIsDefined: context => !!context.to,
      sourceIsDefined: context => !!context.source,
    },
    services: {
      fetchArticles: async () => {
        const file = json(STRINGS.DATA_PATH);
        const out = file.get('articles'); //?
        return out;
      },
      zod: ({ data }) => articleSchema.array().parseAsync(data),
    },
  },
);
