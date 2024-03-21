import Image from 'next/image'

import { Contest, Media, Ticket, Winner } from '@/payload-types'
import { DateConverter } from '@/utils/date-converter'
import { splitTicketNumber } from '@/utils/split-ticket-number'
import Confetti from '../common/Confetti'

const WinningNumber = ({ contestDetails }: { contestDetails: Contest }) => {
  console.log('winner details', contestDetails)
  return (
    <>
      <Confetti />
      <section className='mt-minus-150'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='winner-details-wrapper bg_img'>
                <div className='left'>
                  <Image
                    src={(contestDetails?.img as Media)?.url || ''}
                    width={400}
                    height={400}
                    alt='contest 1'
                  />
                </div>
                <div className='body'>
                  <p className='contest-number'>
                    Contest No: {contestDetails?.contest_no}
                  </p>
                  <p className='contest-date'>
                    <span>Draw took place on :</span>{' '}
                    {DateConverter(
                      (contestDetails?.winner_ticket?.value as Winner)
                        ?.createdAt,
                    )}
                  </p>
                  <div className='line'></div>
                  <h4 className='title'>The Winning Numbers are:</h4>
                  <ul className='numbers'>
                    {splitTicketNumber(
                      (
                        (contestDetails?.winner_ticket?.value as Winner)?.ticket
                          ?.value as Ticket
                      )?.ticket_number,
                    ).map((number, index) => (
                      <li key={index}>{number}</li>
                    ))}
                  </ul>
                  <div className='btn-grp'>
                    <a href='#0' className='btn-border'>
                      Alerts
                    </a>
                    <a href='#0' className='btn-border'>
                      How to Claim
                    </a>
                  </div>
                </div>
                <div className='right'>
                  <Image
                    className='revert-image'
                    src={(contestDetails?.img as Media)?.url || ''}
                    width={400}
                    height={400}
                    alt='contest 2'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default WinningNumber
