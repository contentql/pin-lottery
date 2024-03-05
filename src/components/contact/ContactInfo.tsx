import Image from 'next/image'

import contact from '/public/images/elements/contact.png'
import contact_1 from '/public/images/icon/contact/1.png'
import contact_2 from '/public/images/icon/contact/2.png'

const ContactInfo = () => {
  return (
    <div className='contact-info-wrapper'>
      <div className='d-flex flex-wrap justify-content-between w-100'>
        <div className='contact-info'>
          <div className='contact-info__icon'>
            <Image src={contact_1} alt='contact 1' />
          </div>
          <div className='contact-info__content'>
            <p>Phone Number</p>
            <span>+0123 456789</span>
          </div>
        </div>
        <div className='contact-info'>
          <div className='contact-info__icon'>
            <Image src={contact_2} alt='contact 2' />
          </div>
          <div className='contact-info__content'>
            <p>Email</p>
            <span>info@rifa.com</span>
          </div>
        </div>
      </div>
      <div className='contact-thumb'>
        <Image src={contact} alt='contact' />
      </div>
    </div>
  )
}

export default ContactInfo
