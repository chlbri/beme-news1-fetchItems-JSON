import { z } from 'zod';

export const articleSchema = z
  .object({
    author: z.string().nullish().default('unknown'),
    url: z.string(),
    urlToImage: z.string().nullish(),
    content: z.string().nullish().default(''),
    language: z.string().default('en'),
    publishedAt: z.string().datetime(),
    source: z.object({
      id: z.string().nullish(),
      name: z.string().optional(),
    }),
    title: z.string(),
  })
  .transform(
    ({
      author,
      url,
      urlToImage,
      publishedAt,
      source,
      content,
      language,
      title,
    }) => {
      return {
        author,
        URL: url,
        imageURL: urlToImage,
        publishedAt,
        description: content,
        source: source.name,
        language,
        title,
      };
    },
  );

export type Article = z.output<typeof articleSchema>;
