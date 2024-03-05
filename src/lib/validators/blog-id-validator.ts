import { z } from 'zod'

export const BlogIdValidator = z.object({
  id: z.string(),
})

export type TBlogIdValidator = z.infer<typeof BlogIdValidator>
