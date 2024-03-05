import ContactForm from './ContactForm'
import ContactInfo from './ContactInfo'
import SocialMedia from './SocialMedia'

const ContactBody = () => {
  return (
    <section className='mt-minus-270 pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-6'>
            <div className='section-header text-center'>
              <h2 className='section-title'>Contact</h2>
              <p>
                We’d love to talk about how we can work together.Send us a
                message below and we’ll respond as soon as possible.
              </p>
            </div>
          </div>
          <div className='col-lg-12'>
            <div className='contact-wrapper'>
              <div className='row'>
                <div className='col-lg-6'>
                  {/*Contact Form section here */}
                  <ContactForm />
                </div>
                <div className='col-lg-6'>
                  {/*Contact Info section here */}
                  <ContactInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row pt-120 mb-none-30'>
          {/*SOcial Media section here */}
          <SocialMedia />
        </div>
      </div>
    </section>
  )
}

export default ContactBody
