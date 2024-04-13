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
      <h3 className='title'>Check My Tickets</h3>
      <p>
        Are you holding on to a winning ticket? Here&#39;s an easy way to find
        out.
      </p>
      <form
        onSubmit={handleSubmit(handleSearchByTicketNumber)}
        noValidate
        className='check-number-form'
      >
        <div className='number-list-wrapper'>
          <input
            type='text'
            className='form-control mt-30 mb-30'
            id='contestNumber'
            placeholder='Enter Contest No'
            {...register('contestNumber', {
              required: true,
            })}
          />
          {errors.contestNumber && (
            <span className='winner-error-message'>
              Please enter contest number
            </span>
          )}
        </div>
        <div className='number-list-wrapper'>
          <p>Enter Your Lottery Number</p>
          <input
            type='text'
            className='form-control mt-30 mb-30'
            id='ticketNumber'
            placeholder='Enter Ticket No'
            {...register('ticketNumber', {
              required: true,
            })}
          />
          <div className='winner-error-message'>
            {errors.ticketNumber && (
              <span>Please enter your ticket number</span>
            )}
          </div>
        </div>
        <div className='text-center mt-80'>
          <button type='submit' className='cmn-btn'>
            check my numbers
          </button>
        </div>
      </form>
      <div className='text-center mt-30'>
        <button type='submit' className='cmn-btn' onClick={handleClearFilters}>
          Clear filters
        </button>
      </div>
    </div>
  )
}

export default TicketCheckCard
