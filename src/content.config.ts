import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
   loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
   schema: () =>
      z.object({
         title: z.string(),
         tags: z.array(z.string()),
         public: z.coerce.boolean().optional().default(true),
         draft: z.coerce.boolean().optional().default(false),
         description: z.string(),
         publishedDate: z.coerce.date(),
         updatedDate: z.coerce.date().optional(),
         relatedProjects: z.array(z.string()).optional(),
         relatedPosts: z.array(z.string()).optional(),
      }),
});



export const collections = { blog };
