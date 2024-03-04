import { getPayloadClient } from '../get-payload';
import { ContactFormValidator } from '../lib/validators/contact-form-validator';
import { publicProcedure, router } from '../trpc/trpc';

export const contactRouter = router({
    newContact: publicProcedure
        .input(ContactFormValidator)
        .mutation(async ({ input, ctx }) => {
            const { name, email, message, subject } = input;

            const payload = await getPayloadClient();
            
             try {
                await payload.create({
                    collection: 'contact',
                    data: {
                        name: name,
                        email: email,
                        subject: subject,
                        message: message,
                    }
                })
             } catch (err) {
                console.log(err);
            }
        })
                
});
