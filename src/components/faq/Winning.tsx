const Winning = () => {
  return (
    <div className='accordion cmn-accordion' id='faqAcc-three'>
      <div className='card'>
        <div className='card-header' id='h-4'>
          <button
            className='btn btn-link btn-block text-left'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse4'
            aria-expanded='true'
            aria-controls='collapse4'
          >
            How do I deposit funds into my Rifa Lottos account?
          </button>
        </div>
        <div
          id='collapse4'
          className='collapse show'
          aria-labelledby='h-4'
          data-bs-parent='#faqAcc-three'
        >
          <div className='card-body'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.{' '}
            </p>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-header' id='h-5'>
          <button
            className='btn btn-link btn-block text-left collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse5'
            aria-expanded='false'
            aria-controls='collapse5'
          >
            What will the payment reflect as on my credit card statement?
          </button>
        </div>
        <div
          id='collapse5'
          className='collapse'
          aria-labelledby='h-5'
          data-bs-parent='#faqAcc-three'
        >
          <div className='card-body'>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis
              ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas
              accumsan lacus vel facilisis.
            </p>
          </div>
        </div>
      </div>
      <div className='card'>
        <div className='card-header' id='h-6'>
          <button
            className='btn btn-link btn-block text-left collapsed'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#collapse6'
            aria-expanded='false'
            aria-controls='collapse6'
          >
            Why am I unable to deposit funds via credit card on your website?
          </button>
        </div>
        <div
          id='collapse6'
          className='collapse'
          aria-labelledby='h-6'
          data-bs-parent='#faqAcc-three'
        >
          <div className='card-body'>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum
              dignissimos consectetur aspernatur expedita aut reiciendis magni
              tempore ullam libero, voluptate nam accusamus est a debitis,
              obcaecati beatae possimus veniam distinctio?
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Winning
