import { Contest } from '@/payload-types'
import ContestCard from '../cards/ContestCard'

const SimilarContest = ({ contests }: { contests: Contest[] }) => {
  return (
    <section className='pb-120 mt-minus-100'>
      <div className='container'>
        <div
          className='tab-pane fade show active '
          id='dream'
          role='tabpanel'
          aria-labelledby='dream-tab'>
          <div className='row mb-none-30 mt-50'>
            {contests?.map(contest => (
              <div key={contest.id} className='col-xl-4 col-md-6 mb-30'>
                <ContestCard itm={contest} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SimilarContest
