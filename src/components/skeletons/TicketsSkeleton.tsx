function TicketsSkeleton() {
  return (
    <div className='past-draw-wrapper'>
      <div className='table-responsive-lg'>
        <table>
          <thead>
            <tr>
              <th>Draw</th>
              <th>Contest No</th>
              <th>Result</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, index) => {
              return (
                <tr className='ticket-isloading' key={index}>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                  <td>
                    <ul className='loading-btn'></ul>
                  </td>
                  <td>
                    <span className='loading-btn'></span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className='load-more'>
        <button
          type='button'
          className='d-flex align-items-center justify-content-lg-center gap-1'
        >
          <span className='loading-btn'></span>
        </button>
      </div>
    </div>
  )
}

export default TicketsSkeleton
