import { CollectionAfterChangeHook } from 'payload/types'

const OPERATION = 'create'
const SUBJECT = 'Email Verification'
const ACTIONLABEL = 'verify your email'
const BUTTONTEXT = 'Verify Email'

export const verifyUserEmail: CollectionAfterChangeHook = async ({
  operation,
  req,
  doc,
}) => {
  if (operation === 'create') {
   const user=await req.payload.findByID({
      collection:'users',
      id:doc.id
    })
    console.log('fetched user',user,doc.id)
    console.log("console user after create",doc)

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc/message.verifyEmail`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({token:doc._verificationToken})
    })
  }
}
