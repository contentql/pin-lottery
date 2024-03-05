import { CollectionAfterChangeHook } from 'payload/types'
import { getPayloadClient } from '../../../get-payload'
const OPERATION = 'create'
const SUBJECT = 'Welcome To ContentQL'
export const newContactEmail: CollectionAfterChangeHook = async ({
  operation,
  doc,
}) => {
  const payload = await getPayloadClient()
  if (operation === OPERATION) {
    payload.sendEmail({
      to: doc.email,
      from: process.env.SENDGRID_SENDER_EMAIL,
      subject: SUBJECT,
    })
  }
}
