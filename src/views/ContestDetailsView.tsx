'use client'

import Banner from '@/components/common/Banner'
import ContestBody from '@/components/contest-details/ContestBody'
import { Contest, Winner } from '@/payload-types'
import { trpc } from '@/trpc/client'
import { RandomTicketPicker } from '@/utils/random-ticket-picker'
import Image from 'next/image'
import { toast } from 'react-toastify'
import inner_hero_shape from '/public/images/elements/inner-hero-shape.png'

interface PageProps {
  contestId: string
}

const ContestDetailsView = ({ contestId }: PageProps) => {

  const { data: contestDetails ,refetch} = trpc.contest.getContestById.useQuery({
    id: contestId,
  })
    const { data } = trpc.ticket.getContestTickets.useQuery(
      {
        id: contestId,
      },
      // {
      //   refetchOnWindowFocus:false
      // }
    )
    const contestTickets = data as any

  console.log('contest ', contestDetails)
    const { mutate: updateContestStatus } =
      trpc.contest.updateContest.useMutation({
        onSuccess: () => {toast.success(`contest updated successfully`), refetch()},
        onError: () => toast.error(`error while updating contest`),
      })

    const { mutate: addWinner } = trpc.winner.addWinner.useMutation({
      onSuccess:async (data) => {
        toast.success('Winner added')
        console.log('data in onsuccess', data)
         updateContestStatus({
           id: (data?.winner?.contest?.value as Winner)?.id,
           contest_status: true,
           winner_id:data?.winner?.id
         })
      },

      onError: () => {
        toast.success('tickets not available')
        console.log('failed')
      },
    })

    const handleDrawTickets = () => {
      const randomNumber = RandomTicketPicker(contestTickets)
      console.log('random number', randomNumber)
      if (randomNumber === undefined) {
        toast.error(`ticket not picked`)
      } else {
        addWinner({
          contest_id: randomNumber?.contest_id?.value?.id,
          ticket_id:randomNumber?.id
        })
      }
    }

  return (
    <>
      {/* Banner section here */}
      <div className='inner-hero-section'>
        <div className='bg-shape'>
          <Image src={inner_hero_shape} alt='inner_hero_shape' />
        </div>
        <Banner
          breadcrumb={[
            ['Home', '/'],
            ['Contest', '/contest'],
            [
              `Contest No: ${contestDetails?.contest_no}`,
              `/contest/${contestDetails?.id}`,
            ],
          ]}
        />
      </div>
      {/* Bdy section here */}
      <ContestBody
        contestDetails={contestDetails as Contest}
        handleDrawTickets={handleDrawTickets}
      />
    </>
  )
}

export default ContestDetailsView
