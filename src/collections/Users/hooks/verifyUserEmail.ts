import { CollectionAfterChangeHook } from 'payload/types'

export const verifyUserEmail: CollectionAfterChangeHook = async ({
  operation,
  req,
  doc,
}) => {
  if (operation === 'create') {
   const user=await req.payload.db.collections['users'].findOne({ _id: doc.id})
    console.log('fetched user',user,doc.id)
    console.log("console user after create",doc)

    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/trpc/message.verifyEmail`,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({token:user._verificationToken})
    })
  }
}
