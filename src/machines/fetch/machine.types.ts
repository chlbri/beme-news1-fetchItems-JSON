import { Article } from 'src/types/Article';
import { Category, Language } from '~types';

export type Context = Omit<Events, 'type'> & {
  data?: unknown;
};

export type Events = {
  type: 'QUERY';
  language?: Language;
  category?: Category;
  from?: Date;
  to?: Date;
  source?: string;
  articles?: Article[];
};
