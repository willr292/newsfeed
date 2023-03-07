import { z } from "zod";

export const NewsArticleSchema = z.object({
  title: z.string().nullable(),
  body: z.string().nullable(),
  ticker: z.string().nullable(),
  type: z.string().nullable(),
  "smw category": z.string().nullable(),
});

export const NewsArticleArraySchema = NewsArticleSchema.array();

export type NewsArticle = z.infer<typeof NewsArticleSchema>;
export type NewsArticleArray = z.infer<typeof NewsArticleArraySchema>;
