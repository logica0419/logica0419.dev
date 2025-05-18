import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/article.md", base: "./articles" }),
  schema: z.object({
    title: z.string(),
    date: z.string().date().default("1970-01-01"),
    published: z.boolean().default(true),
  }),
});

export const collections = { articles };
