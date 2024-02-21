const ContactForm = () => {
  return (
    <div className='contact-form-wrapper'>
      <h3 className='title'>Drop us a message</h3>
      <form className='contact-form' action='/'>
        <div className='form-group'>
          <label>
            Name <sup>*</sup>
          </label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Enter Your FullName'
            required
          />
        </div>
        <div className='form-group'>
          <label>
            Email <sup>*</sup>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='Enter Your Email'
            required
          />
        </div>
        <div className='form-group'>
          <label>
            Subject <sup>*</sup>
          </label>
          <input
            type='text'
            name='subject'
            id='subject'
            placeholder='Enter Your Subject'
            required
          />
        </div>
        <div className='form-group'>
          <label>
            Message <sup>*</sup>
          </label>
          <textarea
            name='message'
            id='message'
            placeholder='Write Your Message'
            required
          ></textarea>
        </div>
        <div className='form-group'>
          <button
            type='submit'
            className='cmn-btn justify-content-center w-100'
          >
            send message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
