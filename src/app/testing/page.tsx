'use client'
import { Contest, Media, User } from '@/payload-types'
import { trpc } from '@/trpc/client'
import Image from 'next/image'

const page = () => {
  const { mutate: addWinner } = trpc.winner.addWinner.useMutation({
    onSuccess: () => {
          console.log('success')
          winnersRefetch()
    },
    onError: () => {
      console.log('failed')
    },
  })
    const { data:winners,refetch:winnersRefetch } = trpc.winner.getWinners.useQuery()

    console.log('winners', winners)
    const tickets =[12121,2323,3434,45452,5622,188,128989,1245,867564]
    const handleAddWinner = () => {
      const randomIndex = Math.floor(Math.random() * tickets.length)
      const randomNumber = tickets[randomIndex]
    const mutation = addWinner({
      contest_id: '65f06a84ec2100a902065627',
      ticket_number: randomNumber,
      user_id: '65efd80106a4be8db10c56a1',
    })
  }
    return (
      <>
        <button onClick={handleAddWinner}>Winner</button>
        <div className='winner-sample'>
          {winners?.map(winner => (
            <>
              <div className='winner-card mb-30 '>
                <div className='winner-card__thumb'>
                  <Image
                    src={
                      ((winner?.contest?.value as Contest)?.img as Media)
                        ?.url as string
                    }
                    width={200}
                    height={200}
                    alt='2323'
                  />
                </div>
                <div className='winner-card__content'>
                  <div className='winner-thumb'>
                    <Image
                      src={
                        (winner?.user?.value as User)?.image
                          ? ((winner?.user?.value as User)?.image as Media)?.sizes?.userProfile?.url as string
                          : '/images/user/pp.png'
                      }
                      alt=''
                      width={150}
                      height={150}
                    />
                  </div>
                  <div className='content-top'>
                    <div className='left'>
                      <h5>{(winner?.contest?.value as Contest).title}</h5>
                    </div>
                    <div className='right'>
                      <span>Draw took place on</span>
                      <p>{winner?.createdAt}</p>
                    </div>
                  </div>
                  <div className='content-bottom'>
                    <div className='number-list-wrapper'>
                      <p>Winning Numbers:</p>
                      <p>{winner?.ticket_number}</p>
                    </div>
                    <div className='right'>
                      <p>Contest No:</p>
                      <span className='contest-num'>
                        {(winner?.contest?.value as Contest)?.contest_no}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </>
    )
}

export default page
