import { Contest, User } from '@/payload-types'
import payload from 'payload'
import { CollectionAfterChangeHook } from 'payload/types'
import { WinnerAnnouncementEmail } from '../../../email-templates/WinnerAnnouncement'
const OPERATION = 'create'

export const WinnerEmail: CollectionAfterChangeHook = async ({
  operation,
  doc,
  req,
}) => {
  
  if (operation === OPERATION) {
    const ticketsData=await payload.findByID({
      collection:'tickets',
      id:doc.ticket.value || doc.ticket.value.id
  })
  
    req.payload.sendEmail({
      to:(ticketsData?.purchased_by?.value as User)?.email,
      from: process.env.RESEND_SENDER_EMAIL,
      subject: `Congratulation you won ${(ticketsData?.contest_id?.value as Contest)?.title}`, 
      html: WinnerAnnouncementEmail({
        doc:ticketsData
      }),
    })
  }
}
