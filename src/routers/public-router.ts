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
      } catch (err) {
        console.log(err)
      }
    }),

  getFaqs: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    const faqs = await payload.find({ collection: 'faq' })

    return faqs.docs.at(0)?.faqs
  }),

  getBlogData: publicProcedure.query(async () => {
    const payload = await getPayloadClient()

    const blogs = await payload.find({ collection: 'blog' })

    const blogDetails = blogs.docs.map(
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
  }),

  getBlogDetailsById: publicProcedure
    .input(BlogIdValidator)
    .query(async ({ input }) => {
      const payload = await getPayloadClient()

      const { id } = input

      const blogDetails = await payload.findByID({
        collection: 'blog',
        id: id,
      })
      return blogDetails
    }),
  
  getTags: publicProcedure.query(async() => {
    
    const payload = await getPayloadClient();

    const tags=await payload.find({ collection: 'tags' })
    return tags.docs
  })
})
