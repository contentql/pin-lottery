import { useForm } from 'react-hook-form'

const TicketCheckCard = ({
  handleClearFilters,
  handleSearchByTicketNumber,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})

  return (
    <div className='number-check-wrapper'>
      <h3 className='title'>Check My Numbers</h3>
      <p>
        Are you holding on to a winning ticket? Here&#39;s an easy way to find
        out.
      </p>
      <form
        onSubmit={handleSubmit(handleSearchByTicketNumber)}
        noValidate
        className='check-number-form'>
        <div className='number-list-wrapper'>
          <p>Enter Your Lottery Numbers</p>
          <input
            type='text'
            className='form-control mt-30 mb-30'
            id='ticketNumber'
            placeholder='Enter Ticket No'
            {...register('ticketNumber', {
              required: true,
            })}
          />
          {errors.ticketNumber && <span>Please enter your ticket number</span>}
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
            <button type='submit' className='cmn-btn'>
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
