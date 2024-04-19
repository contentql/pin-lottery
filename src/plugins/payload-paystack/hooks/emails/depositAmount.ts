import { AmountDepositTransaction } from '../../../../email-templates/AmountDepositTransaction'
import { CollectionAfterChangeHook } from 'payload/types'

import { User } from '@/payload-types'

const OPERATION = 'create'
const SUBJECT = 'Deposit successful'
export const depositAmount: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  if (operation === OPERATION) {
    if (doc?.type_of_transaction === 'deposit') {
      req.payload.sendEmail({
        to: (doc.user?.value as User)?.email,
        from: process.env.RESEND_SENDER_EMAIL,
        subject: SUBJECT,
        html: AmountDepositTransaction({ doc: doc }),
      })
    }
  }
}
