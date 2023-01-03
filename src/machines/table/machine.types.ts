import { Article } from '~types';

export type Cache = { query: Partial<Article>; ids: string[] };

export type CqrsContext = {
  currentQuery?: Partial<Article>;
  items?: Article[];
  itemIDs?: Article['id'];
  allTotal?: number;
  currentArticles?: Article[];
  caches?: Cache[];
};

type Pagination = {
  more?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  total?: number;
  totalPages?: number;
};

export type Context = {
  environment?: Record<string, string | undefined>;
  cqrs?: CqrsContext;
  pagination?: Pagination;
  errors?: string[];
};

export type CqrsSend =
  | { type: 'CQRS/SEND/CREATE' }
  | { type: 'CQRS/SEND/UPDATE' }
  | { type: 'CQRS/SEND/DELETE' }
  | { type: 'CQRS/SEND/REMOVE' }
  | { type: 'CQRS/SEND/QUERY' }
  | { type: 'CQRS/SEND/MORE' }
  | { type: 'CQRS/SEND/REFETCH' };

export type CqrsReceive =
  | { type: 'CQRS/RECEIVE/ITEMS' }
  | { type: 'CQRS/RECEIVE/ALL_TOTAL' }
  | { type: 'CQRS/RECEIVE/MORE' };

export type CqrsEvents =
  | CqrsSend
  | CqrsReceive
  | { type: 'CQRS/REVERSE_ORDER' };

export type PaginationEvents =
  | { type: 'PAGINATION/GOTO_NEXT_PAGE' }
  | { type: 'PAGINATION/GOTO_PREVIOUS_PAGE' }
  | { type: 'PAGINATION/GOTO'; page: number }
  | { type: 'PAGINATION/GOTO_FIRST_PAGE' }
  | { type: 'PAGINATION/GOTO_LAST_PAGE' };

export type Events = CqrsEvents | PaginationEvents | { type: 'RINIT' };
