import { CollectionAfterChangeHook } from 'payload/types'
import { UserAccountVerification } from '../../../email-templates/userAccountVerification'

const OPERATION = 'update'
const SUBJECT = 'Email Verification'
const ACTIONLABEL = 'verify your email'
const BUTTONTEXT = 'Verify Email'

export const verifyUserEmail: CollectionAfterChangeHook = async ({
  operation,
  req,
  doc,
  previousDoc,
}) => {
  if (operation === OPERATION && previousDoc.email !== doc.email) {
    console.log('previousDoc: ', previousDoc)
    console.log('doc: ', doc)
    req.payload.sendEmail({
      to: doc.email,
      from: process.env.RESEND_SENDER_EMAIL,
      subject: SUBJECT,
      html: UserAccountVerification({
        actionLabel: ACTIONLABEL,
        buttonText: BUTTONTEXT,
        userName: doc.user_name,
        href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${doc._verificationToken}`,
      }),
    })
  }
}
