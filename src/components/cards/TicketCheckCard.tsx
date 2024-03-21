const TicketCheckCard = ({
  winnerFilters,
  setWinnerFilters,
  handleCheckWinner,
  handleClearFilters,
}: any) => {
  return (
    <div className='number-check-wrapper'>
      <h3 className='title'>Check My Numbers</h3>
      <p>
        Are you holding on to a winning ticket? Here&#39;s an easy way to find
        out.
      </p>
      <form className='check-number-form'>
        {/* <input
          type='tel'
          className='form-control mt-30 mb-30'
          name='check-number1'
          placeholder='Enter Contest No'
        /> */}
        <div className='number-list-wrapper'>
          <p>Enter Your Lottery Numbers</p>
          <input
            type='text'
            className='form-control mt-30 mb-30'
            name='check-number2'
            placeholder='Enter Ticket No'
            onChange={e =>
              setWinnerFilters({
                ...winnerFilters,
                ticketNumber: e.target.value,
              })
            }
          />
          {/* <div className='nice-select select'>
            <select className='border-0'>
              <option>Last 7 days</option>
              <option>Last 6 days</option>
              <option>Last 5 days</option>
              <option>Last 4 days</option>
              <option>Last 3 days</option>
            </select>
          </div> */}
          <div className='text-center mt-100'>
            <button
              type='submit'
              className='cmn-btn'
              onClick={e => handleCheckWinner(e)}>
              check my numbers
            </button>
          </div>
        </div>
      </form>
      <div className='text-center mt-100'>
        <button type='submit' className='cmn-btn' onClick={handleClearFilters}>
          Clear filters
        </button>
      </div>
    </div>
  )
}

export default TicketCheckCard
