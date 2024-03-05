import { BsPaypal } from 'react-icons/bs'
import { FiCreditCard } from 'react-icons/fi'

const Payment = () => {
  return (
    <div className='payment-details mt-30'>
      <h3 className='title'>Payment Option</h3>
      <form className='payment-form'>
        <div className='payment-methods'>
          <button type='button' className='checked'>
            <i>
              <FiCreditCard />
            </i>
            <span>Credit Card</span>
          </button>
          <button type='button'>
            <i>
              <FiCreditCard />
            </i>
            <span>Debit Card</span>
          </button>
          <button type='button'>
            <i>
              <BsPaypal />
            </i>
            <span>Credit Card</span>
          </button>
        </div>
        <h5 className='payment-form__title'>Enter Your Card Details </h5>
        <div className='form-row'>
          <div className='form-group col-lg-12'>
            <label>Card Details</label>
            <input type='text' required />
          </div>
          <div className='form-group col-lg-12'>
            <label>Name on the Card</label>
            <input type='text' required />
          </div>
          <div className='form-group col-lg-6'>
            <label>Expiration</label>
            <input type='text' placeholder='MM/YY' required />
          </div>
          <div className='form-group col-lg-6'>
            <label>CVV</label>
            <input type='text' placeholder='CVV' required />
          </div>
          <div className='form-group col-lg-12'>
            <button type='submit' className='cmn-btn'>
              Make payment
            </button>
          </div>
        </div>
      </form>
      <p className='info-text'>
        By Clicking &#34;Make Payment&#34; you agree to the{' '}
        <a href='#0'>terms and conditions</a>
      </p>
    </div>
  )
}

export default Payment
