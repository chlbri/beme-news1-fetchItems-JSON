import { Article } from 'src/types/Article';

export type Context = {
  allArticles?: Article[];
  articles?: Article[];
  currentArticles?: Article[];
  currentPage?: number;
  query?: Omit<Events, 'type'>;
  totalArticles?: number;
  totalAllArticles?: number;
  totalQuery?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};

export type Events = {
  type: 'QUERY';
  language?: string;
  category?: string;
  from?: Date;
  to?: Date;
  source?: string;
};
