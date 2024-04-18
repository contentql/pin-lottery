import { TicketsPurchasedTransaction } from '../../../../email-templates/TicketsPurchasedTransaction'
import { CollectionAfterChangeHook } from 'payload/types'

const OPERATION = 'create'
const SUBJECT = 'Tickets purchased successful'
export const TicketsPurchased: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  if (operation === OPERATION) {
    if (doc?.type_of_transaction === 'tickets_purchased') {
      req.payload.sendEmail({
        to: 'jagadeeshmaripi2001@gmail.com',
        from: process.env.RESEND_SENDER_EMAIL,
        subject: SUBJECT,
        html: TicketsPurchasedTransaction({ doc: doc }),
      })
    }
  }
}
