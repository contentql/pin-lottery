import { BsChevronDown } from 'react-icons/bs'

import { postDrawData } from '@/data/userData'

const PastDraws = () => {
  return (
    <div className='past-draw-wrapper'>
      <h3 className='title'>Past Draws</h3>
      <div className='table-responsive-lg'>
        <table>
          <thead>
            <tr>
              <th>Draw</th>
              <th>Contest No</th>
              <th>Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {postDrawData.map(singleData => (
              <tr key={singleData.id}>
                <td>
                  <span className='date'>{singleData.draw}</span>
                </td>
                <td>
                  <span className='contest-no'>{singleData.contest_no}</span>
                </td>
                <td>
                  <ul
                    className={`number-list ${
                      singleData.status ? 'win-list' : ''
                    }`}
                  >
                    {singleData.result.split('').map((itm, i) => (
                      <li key={i}>{itm}</li>
                    ))}
                  </ul>
                </td>
                <td>
                  {singleData.status ? (
                    <span className='win'>Win</span>
                  ) : (
                    <span className='fail'>No Win</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='load-more'>
        <button
          type='button'
          className='d-flex align-items-center justify-content-lg-center gap-1'
        >
          Show More Lotteries <BsChevronDown />
        </button>
      </div>
    </div>
  )
}

export default PastDraws
