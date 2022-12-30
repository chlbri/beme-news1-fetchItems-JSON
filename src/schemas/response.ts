import { z } from 'zod';
import { articleSchema } from './article';

export const responseArticleSchema = z
  .object({
    articles: z.array(articleSchema, {}),
  })
  .passthrough();

export type ArticlesResponse = z.output<typeof responseArticleSchema>;
