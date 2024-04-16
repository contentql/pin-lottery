import { getPayloadClient } from '../get-payload'
import { BlogIdValidator } from '../lib/validators/blog-id-validator'
import { ContactFormValidator } from '../lib/validators/contact-form-validator'
import { publicProcedure, router } from '../trpc/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const publicRouter = router({
  newContact: publicProcedure
    .input(ContactFormValidator)
    .mutation(async ({ input, ctx }) => {
      const { name, email, message, subject } = input

      const payload = await getPayloadClient()

      try {
        await payload.create({
          collection: 'contact',
          data: {
            name: name,
            email: email,
            subject: subject,
            message: message,
          },
        })
      } catch (error: any) {
        console.error('Error creating contact:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to create contact.',
        })
      }
    }),

  getFaqs: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const faqs = await payload.findGlobal({ slug: 'faq' })

      return faqs
    } catch (error: any) {
      console.error('Error getting FAQs:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get FAQs.',
      })
    }
  }),

  getBlogData: publicProcedure
    .input(
      z.object({
        filterByTag: z.string(),
        filterByTitle: z.string(),
        pageNumber: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { filterByTag, filterByTitle, pageNumber } = input
      const payload = await getPayloadClient()

      try {
        const blogs = await payload.find({
          collection: 'blog',
          limit: 4,
          page: pageNumber,
          where: {
            ...(filterByTag !== 'all' && {
              tag: {
                equals: filterByTag,
              },
            }),
            and: [
              {
                ...(filterByTitle !== '' && {
                  title: {
                    contains: filterByTitle,
                  },
                }),
              },
            ],
          },
        })
        const totalBlogs = blogs?.totalDocs
        const blogDetails = blogs?.docs.map(
          ({
            id,
            title,
            short_desc,
            img,
            tag,
            updatedAt,
            createdAt,
            author_image,
            author_name,
          }) => {
            return {
              id: id,
              title: title,
              author_image: author_image,
              author_name: author_name,
              short_desc: short_desc,
              img: img,
              tag: tag,
              updatedAt: updatedAt,
              createdAt: createdAt,
            }
          },
        )

        return { blogDetails, totalBlogs }
      } catch (error: any) {
        console.error('Error getting blog data:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get blog data.',
        })
      }
    }),

  getSimilarBlogs: publicProcedure
    .input(z.object({ similarTag: z.string() }))
    .query(async ({ input }) => {
      const payload = await getPayloadClient()
      try {
        const { similarTag } = input
        const similarBlogs = await payload.find({
          collection: 'blog',
          limit: 5,
          where: {
            tag: {
              equals: similarTag,
            },
          },
        })
        return similarBlogs.docs
      } catch (error: any) {
        console.error('Error getting blog details:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get blog details.',
        })
      }
    }),
  getBlogDetailsById: publicProcedure
    .input(BlogIdValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient()

      try {
        const { id } = input

        const blogDetails = await payload.findByID({
          collection: 'blog',
          id: id,
        })

        return blogDetails
      } catch (error: any) {
        console.error('Error getting blog details by ID:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: error?.message || 'Failed to get blog details.',
        })
      }
    }),

  getTags: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const tags = await payload.find({ collection: 'tags' })
      return tags?.docs
    } catch (error: any) {
      console.error('Error getting tags:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get tags.',
      })
    }
  }),
  getTestimonials: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const testimonials = await payload.findGlobal({
        slug: 'testimonial',
      })
      return testimonials
    } catch (error: any) {
      console.error('Error getting testimonials:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get testimonials.',
      })
    }
  }),
  getTeam: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const team = await payload.findGlobal({ slug: 'team' })
      return team
    } catch (error: any) {
      console.error('Error getting team:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get team.',
      })
    }
  }),
  getFeatures: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const features = await payload.findGlobal({ slug: 'features' })
      return features
    } catch (error: any) {
      console.error('Error getting features:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get features.',
      })
    }
  }),
  getAbout: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const about = await payload.findGlobal({ slug: 'about' })
      return about
    } catch (error: any) {
      console.error('Error getting features:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get features.',
      })
    }
  }),

  getHowToPlayInfo: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const howToPlayInfo = await payload.findGlobal({ slug: 'howToPlayInfo' })
      return howToPlayInfo
    } catch (error: any) {
      console.error('Error getting howToPlayInfo:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get howToPlayInfo.',
      })
    }
  }),

  getSupportInfo: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const support = await payload.findGlobal({ slug: 'supportInfo' })
      return support
    } catch (error: any) {
      console.error('Error getting support:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get support.',
      })
    }
  }),
})
