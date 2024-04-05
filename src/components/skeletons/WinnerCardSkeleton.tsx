const WinnerCardSkeleton = () => {
  return (
    <div className='winner-card mb-30 winner-isloading'>
      <div className='contest-cart__winner contest-cart-image winner-isloading'>
        <div className='product-images'></div>
      </div>
      <div className='winner-card__content'>
        <div className='winner-thumb'>
          <div className='user-image'></div>
        </div>
        <div className='content-top'>
          <div className='left'>
            <div className='title'></div>
          </div>
          <div className='right'>
            <div className='draw-date'></div>
          </div>
        </div>
        <div className='content-bottom'>
          <div className='number-list-wrapper'>
            <p>Winning Numbers:</p>
            <ul className='number-list mt-2'>
              {[1, 2, 3, 4, 5, 6, 7].map((_, i) => (
                <li className='ticket-number' key={i}></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WinnerCardSkeleton
