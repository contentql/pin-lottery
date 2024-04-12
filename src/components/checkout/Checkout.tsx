import { ticketsMetadata } from '@/utils/tickets-metadata'

const Checkout = () => {
  return (
    <div className='checkout-wrapper__body'>
      <ul className='price'>
        <li>
          <div className='left'>
            <h4 className='caption'>Ticket Price</h4>
            <span>(8 tickets X {ticketsMetadata.currency} 4.99)</span>
          </div>
          <div className='right'>
            <span className='price'>{ticketsMetadata.currency}39.92</span>
          </div>
        </li>
        <li>
          <div className='left'>
            <h4 className='caption'>Total</h4>
          </div>
          <div className='right'>
            <span className='price'>{ticketsMetadata.currency}39.92</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Checkout
