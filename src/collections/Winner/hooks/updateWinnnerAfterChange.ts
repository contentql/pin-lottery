
import { customAlphabet } from 'nanoid'
import { CollectionAfterChangeHook } from 'payload/types'
import { otpEmail } from '../../../email-templates/otpEmail'
export const updateWinnerAfterChange: CollectionAfterChangeHook = async ({
  operation,
  previousDoc,
  doc,
  req,
}) => {
  if (operation === 'update') {
    if(previousDoc.send_otp!==doc.send_otp){
      if(doc.send_otp===true){
        try {
          const { payload } = req

          const { id: winnerId } = doc
          const alphabet = '0123456789'
          const nanoid = customAlphabet(alphabet, 4)
          const otp=nanoid()
         
          const data= await payload.update({
           collection:'winner',
           id:winnerId,
           data:{
            winner_otp: otp,
           }
          })
          await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc/message.otpWhatsAppMessage`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify({otp:otp})
          });
          await payload.sendEmail({
            to:'jagadeeshmaripi2001@gmail.com',
            from: process.env.RESEND_SENDER_EMAIL,
            subject: `opt`, 
            html: otpEmail({
              otpCode:otp
            }),
          })
        } catch (error) {
          console.error('Error in updateWinnerAfterChange:', error)
        }
        
      }
      if(doc.send_otp===false){
        try {
          const { payload } = req

          const { id: winnerId } = doc
          const data= await payload.update({
           collection:'winner',
           id:winnerId,
           data:{
            winner_otp: null,
           }
          })
        } catch (error) {
          console.error('Error in updateWinnerAfterChange:', error)
        }
        
      }
      
    }
  }
}
