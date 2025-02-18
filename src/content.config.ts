import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";
import { format } from "date-fns";

const authorsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
    }),
});

const postsCollection = defineCollection({
  type: "content",
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  //   loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: reference("authors"),
      categories: z.array(z.string()),
      date: z
        .string()
        .transform((str) => format(new Date(str), "MMMM d, yyyy")),
      featured: z.boolean().default(false),
      image: image(),
    }),
});
const blog = defineCollection({
  // type: "content",
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = {
  blog,
  authors: authorsCollection,
  posts: postsCollection,
};
