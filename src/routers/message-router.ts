import { TRPCError } from "@trpc/server";
import { ContactFormValidator } from "../lib/validators/contact-form-validator";
import { publicProcedure, router } from '../trpc/trpc';

export const messageRouter=router({
    contactWhatsappMessage:publicProcedure.input(ContactFormValidator).mutation(async({input})=>{
        const {name,email,phoneNumber,subject,message}=input
        
        const sid = process.env.TWILIO_ACCOUNT_SID
        const auth = process.env.TWILIO_AUTH_TOKEN
        const client = require('twilio')(sid, auth);
        const body=`
        Name: ${name}
        PhoneNumber: ${phoneNumber}
        Subject: ${subject}
        Message: ${message}
        `
        try {
          const senderData= await client.messages.create({
            body: body,
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+91${phoneNumber}`
          });
          return senderData
        } catch (error:any) {
          console.error('Error while sending message:', error)
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: error?.message || 'Failed to send message.',
          })
        }
      })
})