import { newContactForm } from '../../../email-templates/contactEmail'
import { CollectionAfterChangeHook } from 'payload/types'

const OPERATION = 'create'
const SUBJECT = 'New contact submission'
export const ContactEmailToAdmin: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  if (operation === OPERATION) {
    req.payload.sendEmail({
      to: process.env.ADMIN_EMAIL,
      from: process.env.RESEND_SENDER_EMAIL,
      subject: SUBJECT,
      html: newContactForm({
        userName: doc.name,
        email: doc.email,
        subject: doc.subject,
        message: doc.message,
      }),
    })
  }
}
