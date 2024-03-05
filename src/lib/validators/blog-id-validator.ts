import { z } from 'zod';

export const BlogIdValidator = z.object({
  id: z.string() || null,
});

export type TBlogIdValidator = z.infer<typeof BlogIdValidator>;
