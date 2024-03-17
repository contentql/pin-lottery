import { getPayloadClient } from '../get-payload'
import { WinnerDetailsValidator } from '../lib/validators/winner-details-validator'
import { publicProcedure, router } from '../trpc/trpc'
export const WinnerRouter = router({
    addWinner: publicProcedure.input(WinnerDetailsValidator)
        .mutation(async ({input}) => {
            const { contest_id, ticket_number, user_id } = input
            
            const payload = await getPayloadClient()
            
          const winner=  await payload.create({
              collection: 'winner',
              data: {
                ticket_number,
                contest: { relationTo: 'contest', value: contest_id },
                user:{relationTo:'users',value: user_id}
              },
            })
            return { winner: winner }
        }),
    
    getWinners: publicProcedure.query(async() => {
        
        const payload = await getPayloadClient()
        
        const winners = await payload.find({ collection: 'winner' })
        
         return winners?.docs
    })
   
})
