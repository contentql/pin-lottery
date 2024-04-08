import { TRPCError } from '@trpc/server'
import { getPayloadClient } from '../get-payload'
import { BlogIdValidator } from '../lib/validators/blog-id-validator'
import { ContactFormValidator } from '../lib/validators/contact-form-validator'
import { publicProcedure, router } from '../trpc/trpc'

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
      const faqs = await payload.find({ collection: 'faq' })

      return faqs?.docs.at(0)?.faqs
    } catch (error: any) {
      console.error('Error getting FAQs:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get FAQs.',
      })
    }
  }),

  getBlogData: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    try {
      const blogs = await payload.find({ collection: 'blog' })

      const blogDetails = blogs?.docs.map(
        ({ id, title, short_desc, img, updatedAt, createdAt }) => {
          return {
            id: id,
            title: title,
            short_desc: short_desc,
            img: img,
            updatedAt: updatedAt,
            createdAt: createdAt,
          }
        },
      )

      return blogDetails
    } catch (error: any) {
      console.error('Error getting blog data:', error)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error?.message || 'Failed to get blog data.',
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
