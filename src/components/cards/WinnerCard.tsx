import Image from 'next/image'

const WinnerCard = ({ winner }: any) => {
  const {
    title,
    draw_at,
    winning_number,
    contest_no,
    winer_img,
    winning_price_img,
  } = winner
  return (
    <div className='winner-card mb-30'>
      <div className='winner-card__thumb'>
        <Image src={winning_price_img} alt={title} />
      </div>
      <div className='winner-card__content'>
        <div className='winner-thumb'>
          <Image src={winer_img} alt={title} />
        </div>
        <div className='content-top'>
          <div className='left'>
            <h5>{title}</h5>
          </div>
          <div className='right'>
            <span>Draw took place on</span>
            <p>{draw_at}</p>
          </div>
        </div>
        <div className='content-bottom'>
          <div className='number-list-wrapper'>
            <p>Winning Numbers:</p>
            <ul className='number-list mt-2'>
              {winning_number.map((itm: any, i: any) => (
                <li key={i}>{itm}</li>
              ))}
            </ul>
          </div>
          <div className='right'>
            <p>Contest No:</p>
            <span className='contest-num'>{contest_no}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinnerCard
