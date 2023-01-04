import { WithoutID } from 'core';
import { Article } from 'core';

export type Cache = { query: string; ids: string[] };

export type CqrsContext = {
  currentQuery?: Query;
  items?: Article[];
  itemIDs?: Article['id'][];
  allTotal?: number;
  currentArticles?: Article[];
  caches?: Cache[];
};

export type Pagination = {
  more?: boolean;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  total?: number;
  totalPages?: number;
};

export type Env = Record<string, string | undefined>;

export type Context = {
  environment?: Env;
  cqrs?: CqrsContext;
  pagination?: Pagination;
  errors?: string[];
};

export type UpdateArticle = Required<Pick<Article, 'id'>> &
  WithoutID<Article>;

export type Query = {
  data: Partial<Article>;
  offset?: number;
  limit?: number;
};

export type QueryMore = Omit<Query, 'offset'> &
  Required<Pick<Query, 'offset'>>;

export type CqrsSend =
  | { type: 'CQRS/SEND/CREATE'; article: WithoutID<Article> }
  | { type: 'CQRS/SEND/UPDATE'; article: UpdateArticle }
  | { type: 'CQRS/SEND/DELETE'; id: Article['id'] }
  | { type: 'CQRS/SEND/REMOVE'; id: Article['id'] }
  | { type: 'CQRS/SEND/QUERY'; data: Query }
  | { type: 'CQRS/SEND/MORE'; data: QueryMore }
  | { type: 'CQRS/SEND/REFETCH' };

export type CqrsReceive =
  | { type: 'CQRS/RECEIVE/ITEMS'; data?: Article[] }
  | { type: 'CQRS/RECEIVE/ALL_TOTAL'; data?: number }
  | { type: 'CQRS/RECEIVE/MORE'; data?: Article[] };

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

export type Services = {
  getItems: {
    data: Article[] | undefined;
  };
  getRegisteredQuery: {
    data: Query | undefined;
  };
  fetchItems: {
    data: Article[] | undefined;
  };
  fetchRegisteredQuery: {
    data: Query | undefined;
  };
  getRequiredEnVariables: {
    data: Env | undefined;
  };
  cqrs: {
    data: unknown;
  };
};
