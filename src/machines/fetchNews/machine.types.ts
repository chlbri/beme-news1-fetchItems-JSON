import type { ArticlesResponse, Category } from '~schemas';
import type { ERRORS } from './constants';

export type FetchArticleQuery = {
  categories?: Category[];
  offset?: number;
  limit?: number;
};

type Errors = typeof ERRORS;

export type Context = {
  API_URL?: string;
  API_KEY?: string;
  URL?: string;
  response?: Response;
  json?: unknown;
  articles?: ArticlesResponse['articles'];
  categories?: string;
  _errors?: Errors['object'];
};

export type Events = {
  type: 'QUERY';
} & FetchArticleQuery;
