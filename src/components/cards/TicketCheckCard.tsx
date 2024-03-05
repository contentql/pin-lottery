const TicketCheckCard = () => {
  return (
    <div className='number-check-wrapper'>
      <h3 className='title'>Check My Numbers</h3>
      <p>
        Are you holding on to a winning ticket? Here&#39;s an easy way to find
        out.
      </p>
      <form className='check-number-form'>
        <input
          type='tel'
          className='form-control mt-30 mb-30'
          name='check-number1'
          placeholder='Enter Contest No'
        />
        <div className='number-list-wrapper'>
          <p>Enter Your Lottery Numbers</p>
          <div className='number-list mt-3 mb-3'>
            <input type='text' name='text1' placeholder='00' />
            <input type='text' name='text2' placeholder='00' />
            <input type='text' name='text3' placeholder='00' />
            <input type='text' name='text4' placeholder='00' />
            <input type='text' name='text5' placeholder='00' />
            <input type='text' name='text6' placeholder='00' />
            <input type='text' name='text7' placeholder='00' />
          </div>
          <div className='nice-select select'>
            <select className='border-0'>
              <option>Last 7 days</option>
              <option>Last 6 days</option>
              <option>Last 5 days</option>
              <option>Last 4 days</option>
              <option>Last 3 days</option>
            </select>
          </div>
          <div className='text-center mt-100'>
            <button type='submit' className='cmn-btn'>
              check my numbers
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default TicketCheckCard
